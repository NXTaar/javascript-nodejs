exports.add = function* () {
    var data = this.request.body;
    var checks = require('./checks')(data);

}