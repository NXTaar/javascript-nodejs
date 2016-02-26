'use strict';
const QaQuestion = require('../models/qaQuestion');
const User = require('users').User;

let request = require("co-request");

const makeAnchor = require('textUtil/makeAnchor');
let questionIdForm;

describe('Q&A get question by slug', function () {
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

    it('should return the question object by request with slug', function* () {
        var response = yield request({
            method: 'GET',
            url: "http://javascript.in/qa/questions/vopros-s-dostupom-po-id"
        });

        var questionInfo = JSON.parse(response.body);
        questionInfo.slug.should.eql("vopros-s-dostupom-po-id");
    });

    it('should return status 404 if there is no such question in the database', function* () {
        var response = yield request({
            method: 'GET',
            url: "http://javascript.in/qa/questions/test-12312"
        });
        response.statusCode.should.eql(404);
    });
});