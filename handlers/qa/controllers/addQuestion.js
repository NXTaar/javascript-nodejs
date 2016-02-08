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
            yield question.persist();
        }
        catch(e) {
        }
    }
};