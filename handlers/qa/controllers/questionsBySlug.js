'use strict';
const QaQuestion = require('../models/qaQuestion');

exports.get  = function* () {

    let slug = this.params.slug;

    let question = yield QaQuestion.findOne({slug}).exec();

    if (question == null) this.throw(404, "Такого вопроса не существует");

    //todo change to template render
    this.body = question;
};