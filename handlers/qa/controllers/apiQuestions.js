'use strict';
const QaQuestion = require('../models/qaQuestion');
const url = require('url');
const querystring = require('querystring');

exports.get = function* () {
    let requestQuery = url.parse(this.request.url).query;
    let requestParams = querystring.parse(requestQuery);

    let page   = requestParams.page || 0;
    let items = requestParams.items || 20;

    if (items > 20) return this.status = 400;

    let questionsList = yield QaQuestion.find({})
                                        .skip(page * items)
                                        .limit(items)
                                        .populate('user', 'displayName') // todo добавить populate для комментариев, ответов, тэгов,
                                        .sort({created: -1})
                                        .exec();

    // todo спросить Илью про еще возможные параметры
    if (questionsList.length === 0) return this.status = 204;

    this.body = questionsList;
};