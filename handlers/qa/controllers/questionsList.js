'use strict';
const QaQuestion = require('../models/qaQuestion');
const url = require('url');
const querystring = require('querystring');

exports.get = function* (query) {
    let items = query.items || 20;
    //let limitByCurrentMoment = new Date.now();
    //if (query.type == 'forHuman' && query.items) return {status: 403};

    //if (query.items > 100) return {status: 400};

    let questionsList = yield QaQuestion
        .find({})
        .skip(query.page * items)
        .limit(items)
        .populate('user', 'displayName') // todo добавить populate для комментариев, ответов, тэгов,
        .sort({created: -1})
        .exec();

    if (questionsList.length === 0) return {status: 204};

    return {status: 200, questionsList}
};

//exports.get = function (mode) {
//    function output(questionsList, ctx) {
//        if (mode == 'forApi') ctx.body = questionsList;
//        if (mode == 'forHuman') ctx.render('questions');
//    }
//    function error(errorCode, ctx) {
//        if (mode == 'forApi') return ctx.status = errorCode;
//        if (mode == 'forHuman') return ctx.throw(errorCode);
//    }
//    return function* () {
//        let requestQuery = url.parse(this.request.url).query;
//        let requestParams = querystring.parse(requestQuery);
//
//        let page   = requestParams.page || 0;
//        let items = requestParams.items || 20;
//
//        if (items > 20) return error(400, this);
//
//        let questionsList = yield QaQuestion.find({})
//            .skip(page * items)
//            .limit(items)
//            .populate('user', 'displayName') // todo добавить populate для комментариев, ответов, тэгов,
//            .sort({created: -1})
//            .exec();
//        if (questionsList.length === 0) return error(204, this);
//        output(questionsList, this);
//    };
//};