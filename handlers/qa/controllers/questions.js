'use strict';
const mongoose = require('mongoose');
const idIsValid = mongoose.Types.ObjectId.isValid;

const QaQuestion = require('../models/qaQuestion');

const makeAnchor = require('textUtil/makeAnchor');

exports.byId = {};

exports.byId.get  = function* () {
    let question;

    if (idIsValid(this.params.id)) {
        question = yield QaQuestion.findById(this.params.id).exec();
    }
    else {
        let slug = this.params.id;
        question = yield QaQuestion.findOne({slug}).exec();
    }

    if (question == null) this.throw(404);

    //todo change to template render
    this.body = question;

};

exports.get = function* () {

};


exports.post = function* () {
    if (!this.user) this.throw(403);

    let body = this.request.body;

    let slug = makeAnchor(body.title, true);

    while (true) {
        let existingQuestion = yield QaQuestion.findOne({slug});

        if (!existingQuestion) break;

        existingQuestion.slugCount++;

        slug = slug + existingQuestion.slugCount;

        yield existingQuestion.persist();
    }

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