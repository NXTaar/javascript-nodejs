'use strict';
const QaQuestion = require('../models/qaQuestion');
const User = require('users').User;

let request = require("co-request");

const makeAnchor = require('textUtil/makeAnchor');
let questionIdForm;

describe('API Q&A get question by ID', function () {
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

        questionIdForm = idQuestion._id.toString();
    });



    it('should return the question object by request with id', function* () {
        var response = yield request({
            method: 'GET',
            url: "http://javascript.in/qa/api/questions/"+questionIdForm
        });

        var questionInfo = JSON.parse(response.body);
        questionInfo._id.should.eql(questionIdForm);
    });

    //it('should return the question object by request with slug', function* () {
    //    var response = yield request({
    //        method: 'GET',
    //        url: "http://javascript.in/qa/questions/vopros-s-dostupom-po-id"
    //    });
    //
    //    var questionInfo = JSON.parse(response.body);
    //    questionInfo.slug.should.eql("vopros-s-dostupom-po-id");
    //});

    it('should return status 404 if there is no such questionId in the database', function* () {
        var response = yield request({
            method: 'GET',
            url: "http://javascript.in/qa/api/questions/56bd197752137e5b158ead8e"
        });
        response.statusCode.should.eql(404);
    });

    it('should return status 400 if the id is not valid', function* () {
        var response = yield request({
            method: 'GET',
            url: "http://javascript.in/qa/api/questions/56bd197752137e5b158ead8e"
        });
        response.statusCode.should.eql(404);
    });
});