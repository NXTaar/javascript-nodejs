const makeAnchor = require('textUtil/makeAnchor');
var QaQuestion = require('../models/qaQuestion');


function saveWithIncrementedSlug(ctx, questionData) {

}

module.exports = function* () {
    if (this.user) {
        var data = this.request.body;

        var question = new QaQuestion({
            title: data.title,
            content: data.content,
            user: this.user,
            slug: makeAnchor(data.title, true)
        });

        try {
            var addResult = yield question.persist();
            this.body = {
                questionId: addResult._id,
                status: 'ok'
            }
        }
        catch(e) {
            console.log(e); //debug
            if (e.name == 'ValidationError') {
                this.body = { errorMessages: [] };
                for (var field in e.errors) {
                    if (field !== 'slug') this.body.errorMessages.push(e.errors[field].message);
                }
                if (this.body.errorMessages.length > 0) this.status = 400;
                else {
                    this.body = undefined;
                    try {
                        if (e.errors.slug.kind == "notunique") saveWithIncrementedSlug(this, data);
                    }
                    catch (ex) {}
                }
            }
        }
    }
};