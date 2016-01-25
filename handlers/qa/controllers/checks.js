module.exports = function(data) {
    var result = {};
    result.statusMessages = [];
    result.checks = [];

    var qaItemTypes = ['question', 'answer', 'tag', 'comment'];

    if (data.type !== undefined && data.type !== null) {

        if (qaItemTypes.indexOf(data.type) == 0) result.checks.push(true);
        else {
            result.statusMessages.push('Wrong Q&A item type -', data.type);
            result.checks.push(false);
        }

        if (data.type == 'question') {
            if (data.title == undefined) {
                result.statusMessages.push('No title of the question!');
                result.checks.push(false);
            }
            else if (/^\s+$|^\t+$/g.test(data.title)) {
                result.statusMessages.push('The title of the question should contain some text, not only the spaces or tabs');
                result.checks.push(false);
            }
            else result.checks.push(true);
        }

        if (data.content == undefined)            result.statusMessages.push(`The ${data.type} has no content!`);
        else if (/^\s+$|^\t+$/g.test(data.title)) result.statusMessages.push(`The body of the ${data.type} should contain some text, not only the spaces or tabs`);
        else result.status = true;
    }
    else {
        result.statusMessages.push('No Q&A item type');
        result.checks.push(false);
    }

    return result;
}