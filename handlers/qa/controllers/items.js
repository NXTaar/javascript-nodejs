var Questions = require('./models/qaQestion');
var Answer = require('./models/qaAnswer');
var Comment = require('./models/qaAswerComment');

var mongoose = require('mongoose');

const makeAnchor = require('textUtil/makeAnchor');

exports.add = function* () {
    var data = this.request.body;
    var checks = require('./checks')(data)

    if (!checks.status) require('./qaStatus')(checks.statusMessages);
    else {
        var addContainer = {
            content: data.content,
            user: data.user
        };
        switch(data.type) {
            case "question":
                addContainer.title = data.title;
                addContainer.slug  = makeAnchor(data.title, true);
                break;
            case "answer":
                addContainer.question   = data.question;
                addContainer.isSolution = data.isSolution;
                break;
            case "comment":
                addContainer.answer = data.answer;
                break;
        }
    }
}
