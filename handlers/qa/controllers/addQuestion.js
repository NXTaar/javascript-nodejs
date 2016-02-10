const makeAnchor = require('textUtil/makeAnchor');
var QaQuestion = require('../models/qaQuestion');


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
            if (e.name == 'ValidationError') {
                this.body = { errorMessages: [] };
                for (var field in e.errors) {
                    if (field !== 'slug') this.body.errorMessages.push(e.errors[field].message);
                }
                if (this.body.errorMessages.length > 0) this.status = 400;
                else {
                    this.body = undefined;
                    try {
                        if (e.errors.slug.kind == "notunique") yield saveWithIncrementedSlug(this, data);
                    }
                    catch (ex) {}
                }
            }
        }
    }
};


function* saveWithIncrementedSlug(ctx, questionData) {
    var slugToSearch = makeAnchor(questionData.title, true);

    var original = yield QaQuestion.findOne({slug: slugToSearch}).exec();
    var counter = original.slugCount + 1;

    var question = new QaQuestion({
        title: questionData.title,
        content: questionData.content,
        user: ctx.user,
        slug: makeAnchor(questionData.title, true) + counter
    });

    yield QaQuestion.findByIdAndUpdate({ _id: original._id }, {$inc: {slugCount:1}});

    try {
        var addResult = yield question.persist();
        ctx.status = 200;
        ctx.body = {
            questionId: addResult._id,
            status: 'ok'
        }
    }
    catch (e) {
        console.log(e);
        ctx.status = 500;
    }
}