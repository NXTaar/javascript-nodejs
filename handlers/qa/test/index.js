'use strict';
const mongoose = require('lib/mongoose');
const Schema = mongoose.Schema;
var Sessions = mongoose.model('Sessions', new Schema({ sid: String, updatedAt: Date, blob: String}), 'sessions');     // collection name

let request = require("co-request");
var jar = request.jar();
request = request.defaults({jar: jar});


var csrfToken = null;

function postFormWithCSRFToken(form) {
    form = form || {};
    form._csrf = csrfToken;
    return form;
}

function getCsrf(jar) {
    var cookie = jar.getCookies('http://javascript.in').filter(cookie => cookie.key == 'XSRF-TOKEN')[0];
    return cookie && cookie.value;
}



describe.only('Q&A', function () {

    before(function*() {
        yield Sessions.remove({});

        var login = yield request({url: "http://javascript.in/auth/login-as/iliakan"});
        if (login.statusCode == 200) console.log('login Successfull!');

        csrfToken = getCsrf(jar);
    });


    it('it should add valid question data to the database', function*() {
        yield request({
            method: 'POST',
            url: "http://javascript.in/qa/add-question",
            form: postFormWithCSRFToken({
                title: 'hello world',
                content: "hi its me!"
            })
        });
    });
});