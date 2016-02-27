'use strict';
const QaQuestion = require('../models/qaQuestion');
const url = require('url');
const querystring = require('querystring');

module.exports = class {
    get(mode) {

        function output(questionsList, ctx) {
            if (mode == 'forApi') return ctx.body = questionsList;
            // todo configure human output when page render is ready
            //if (this.mode == 'human') return ctx.render('./questions', questionsList);
        }
        function error(errorCode, ctx) {
            if (mode == 'forApi') return ctx.status = errorCode;
            if (mode == 'forHuman') return ctx.throw(errorCode);
        }

        return function* () {
            let requestQuery = url.parse(this.request.url).query;
            let requestParams = querystring.parse(requestQuery);

            let page   = requestParams.page || 0;
            let items = requestParams.items || 20;

            if (items > 20) return error(400, this);

            let questionsList = yield QaQuestion.find({})
                .skip(page * items)
                .limit(items)
                .populate('user', 'displayName') // todo добавить populate для комментариев, ответов, тэгов,
                .sort({created: -1})
                .exec();

            if (questionsList.length === 0) return error(204, this);

            output(questionsList, this);
        };
    }
};