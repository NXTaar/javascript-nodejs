'use strict';
const mongoose = require('lib/mongoose');
const Schema = mongoose.Schema;

const User = require('users').User;


var Sessions = mongoose.model('Sessions', new Schema({ sid: String, updatedAt: Date, blob: String}), 'sessions');     // collection name

let qaQuestion = require('../models/qaQuestion');
let fixtureUser;

let request = require("co-request");
var jar = request.jar();
request = request.defaults({jar: jar});

const makeAnchor = require('textUtil/makeAnchor');

var csrfToken = null;

function formWithCSRFToken(form) {
    form = form || {};
    form._csrf = csrfToken;
    return form;
}

function getCsrf(jar) {
    var cookie = jar.getCookies('http://javascript.in').filter(cookie => cookie.key == 'XSRF-TOKEN')[0];
    return cookie && cookie.value;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


describe('Q&A adding questions service', function () {

    before(function*() {
        yield Sessions.remove({});

        var login = yield request({url: "http://javascript.in/auth/login-as/iliakan"});
        if (login.statusCode == 200) console.log('login Successfull!');

        csrfToken = getCsrf(jar);

        fixtureUser = yield User.findOne({ profileName: 'iliakan' }).exec();
    });

    beforeEach(function* () {
       yield qaQuestion.remove({});
    });

    it('should add valid question data to the database', function*() {
        var fixture = {title: 'Привет мир?', content: "ля ля ля!"};

        var response = yield request({
            method: 'POST',
            url: "http://javascript.in/qa/questions",
            form: formWithCSRFToken(fixture)
        });

        var body = JSON.parse(response.body);

        var question = yield qaQuestion.findById(body.questionId).exec();

        var checkObject = {content: question.content, title: question.title};

        delete fixture._csrf;
        checkObject.should.eql(fixture);
    });

    it('should return status 400 if one of the required fields is missing or have invalid type', function* () {
        var fixture = {title: 'Привет мир?'};

        var response = yield request({
            method: 'POST',
            url: "http://javascript.in/qa/questions",
            form: formWithCSRFToken(fixture)
        });

        response.statusCode.should.eql(400);
    });

    describe('the situation when questions have similar slugs', function () {

        it('should add number to the slug if the slug of the title of this question is already in the database', function* () {

            var fixture_1 = {title: "Одинаковое название вопроса", content: "содержание 1"};
            var fixture_2 = {title: "Одинаковое название вопроса", content: "содержание 2"};

            var response_1 = yield request({
                method: 'POST',
                url: "http://javascript.in/qa/questions",
                form: formWithCSRFToken(fixture_1)
            });

            var response_2 = yield request({
                method: 'POST',
                url: "http://javascript.in/qa/questions",
                form: formWithCSRFToken(fixture_2)
            });

            var secondQuestionBody = JSON.parse(response_2.body);

            var repeatedQuestion = yield qaQuestion.findById(secondQuestionBody.questionId).exec();

            var requiredSlug = makeAnchor(fixture_2.title, true) + 1;

            repeatedQuestion.slug.should.eql(requiredSlug);
        });

        it('should add the question with the "slug" properly if there is "slug" and "slug1" already in the database', function* () {
            var fixture_1 = {
                title: "Вопрос с доступом по id",
                content: "Содержание вопроса",
                slug: makeAnchor("Вопрос с доступом по id", true),
                user: fixtureUser
            };

            var fixture_2 = {
                title: "Вопрос с доступом по id1",
                content: "Содержание вопроса",
                slug: makeAnchor("Вопрос с доступом по id1", true),
                user: fixtureUser
            };

            yield new qaQuestion(fixture_1).persist();
            yield new qaQuestion(fixture_2).persist();

            var response = yield request({
                method: 'POST',
                url: "http://javascript.in/qa/questions",
                form: formWithCSRFToken({
                    title: "Вопрос с доступом по id",
                    content: "бла бла бла"
                })
            });

            response.statusCode.should.eql(201);
        });
    });
});