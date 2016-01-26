var User = require('../users/models/user');
var mongoose = require('mongoose');

module.exports = function* (next, data) {
    var result = {};
    result.statusMessage = "";
    result.checks = false;

    var qaItemTypes = ['question', 'answer', 'tag', 'comment', 'vote'];

    if (data.type == undefined || data.type == null) {
        result.statusMessage = `No Q&A item type`;
        return result;
    }

    if (qaItemTypes.indexOf(data.type) == -1) {
        result.statusMessage = `Wrong Q&A item type - ${data.type}`;
        return result;
    }

    if (data.type == 'question') {
        if (data.title == undefined) {
            result.statusMessage = 'No title of the question!';
            return result;
        }
        if (/^\s+$|^\t+$/g.test(data.title)) {
            result.statusMessage = 'The title of the question should contain some text, not only the spaces or tabs';
            return result;
        }
    }

    if (data.content == undefined) {
        result.statusMessage = `The ${data.type} has no content!`;
        return result;
    }

    if (/^\s+$|^\t+$/g.test(data.content)) {
        result.statusMessage = `The body of the ${data.type} should contain some text, not only the spaces or tabs`;
        return result;
    }

    return result;
}                                 