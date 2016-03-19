'use strict';
const QaQuestion = require('../models/qaQuestion');
const url = require('url');
const querystring = require('querystring');

exports.get = function* (query) {
    let questionsList = yield QaQuestion
        .find({
            created: {
                $lt: query.dateLimit
            }
        })
        .skip(query.page * query.items)
        .limit(query.items)
        .populate('user', 'displayName') // todo добавить populate для комментариев, ответов, тэгов,
        .sort({created: -1})
        .exec();

    if (questionsList.length === 0) return {status: 204};

    return { status: 200, questionsList, dateLimit: query.dateLimit };
};