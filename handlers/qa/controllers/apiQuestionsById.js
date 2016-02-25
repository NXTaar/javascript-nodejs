'use strict';
const mongoose = require('mongoose');
const idIsValid = mongoose.Types.ObjectId.isValid;

const QaQuestion = require('../models/qaQuestion');

exports.get = function* () {
    if (!idIsValid(this.params.id)) {
        return this.status = 400;
    }

    let question = yield QaQuestion.findById(this.params.id).exec();

    if (question == null) {
        return this.status = 404;
    }

    this.body = question;
};