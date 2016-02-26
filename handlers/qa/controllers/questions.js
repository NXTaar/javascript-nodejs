'use strict';
const mongoose = require('mongoose');
const QaQuestion = require('../models/qaQuestion');

const makeAnchor = require('textUtil/makeAnchor');

exports.get = function* () {

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