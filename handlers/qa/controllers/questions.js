'use strict';
const mongoose = require('mongoose');
const QaQuestion = require('../models/qaQuestion');

const makeAnchor = require('textUtil/makeAnchor');
const url = require('url');
const querystring = require('querystring');

const questionsList = require('./questionsList');

exports.get = function* () {
    let requestQuery  = url.parse(this.request.url).query;
    let requestParams = querystring.parse(requestQuery);

    let page      = requestParams.page || 0;
    let dateLimit = requestParams.dateLimit || (new Date).toISOString();

    let result = yield questionsList.get({page, dateLimit});

    if (result.status !== 200) this.throw(result.status);

    // todo заменить заглушку когда будет готов шаблон
    this.body = {questionsList: result.questionsList, dateLimit: result.dateLimit};
};


exports.post = function* () {
    if (!this.user) this.throw(403);

    let body = this.request.body;

    let slug = makeAnchor(body.title, true);

    let existingQuestions = yield QaQuestion.count({slug: new RegExp(`^${slug}\\d*$`)});

    if (existingQuestions > 0) slug += existingQuestions;

    let question = new QaQuestion({
        title: body.title,
        content: body.content,
        user: this.user,
        slug
    });


    try {
        let addResult = yield question.persist();
        this.status = 201;
        this.body = { questionId: addResult._id };
    }

    catch (e) {
        if (e.name !== 'ValidationError') {
            throw e;
        } else {
            let message;
            for(let key in e.errors) {
                message = e.errors[key].message;
                break;
            }
            this.throw(400, message);
        }
    }
};