'use strict';
var mongoose = require('mongoose');
const QaQuestion = require('../models/qaQuestion');
const User = require('users').User;

let request = require("co-request");

const makeAnchor = require('textUtil/makeAnchor');
var originalQuestion;
var questionIdForm;

describe.only('Q&A get question by ID', function () {
    before(function*() {
        let fixtureUser = yield User.findOne({ profileName: 'iliakan' }).exec();

        var idFixture = {
            title: "Вопрос с доступом по id",
            content: "Содержание вопроса",
            slug: makeAnchor("Вопрос с доступом по id", true),
            user: fixtureUser
        };

        yield QaQuestion.remove({});

        var idQuestion = yield new QaQuestion(idFixture).persist();

        questionIdForm = { questionId: idQuestion._id.toString() };
    });

    it('should return the question object by request with id', function* () {

        var response = yield request({
            method: 'GET',
            url: "http://javascript.in/qa/get-question",
            form: questionIdForm
        });

        var questionInfo = JSON.parse(response.body);
        questionInfo._id.should.eql(questionIdForm.questionId);
    });

    it('should return status 400 if there is no id field in the request', function* () {
        var response = yield request("http://javascript.in/qa/get-question");
        response.statusCode.should.eql(400);
    });
    
    it('should return status 404 if there is no such question in the database', function* () {
        var response = yield request({
            method: 'GET',
            url: "http://javascript.in/qa/get-question",
            form: {questionId: "56bd197752137e5b158ead8e"}
        });
        response.statusCode.should.eql(404);
    });

    it('should return status 400 if the transmitted id is invalid', function* () {
        var response = yield request({
            method: 'GET',
            url: "http://javascript.in/qa/get-question",
            form: {questionId: "invalidId"}
        });
        response.statusCode.should.eql(400);
    });
});