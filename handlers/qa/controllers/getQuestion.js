var mongoose = require('mongoose');
var idIsValid = mongoose.Types.ObjectId.isValid;

var QaQuestion = require('../models/qaQuestion');

module.exports = function* () {
    var data = this.request.body;
    console.log(idIsValid(data.questionId));
    if (data.questionId && idIsValid(data.questionId)) {

        var question = yield QaQuestion.findById(data.questionId).exec();

        if (question == null) {
            // todo change for error page render
            this.status = 404;
            this.body = { errorMessage: "Question not found" }
        }
        // todo change for question page render
        else this.body = question;
    }
    else {
        // todo change for error page render
        this.status = 400;
        this.body = { errorMessage: "The id of the question is not provided" }
    }
};