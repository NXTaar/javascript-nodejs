var QaQuestion = require('../models/qaQuestion');

module.exports = function* () {
    console.log(this.params.profileNameOrEmailOrId);
    this.body = 'ok';
};