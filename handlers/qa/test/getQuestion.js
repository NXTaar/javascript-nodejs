'use strict';

const QaQuestion = require('../models/qaQuestion');
const User = require('users').User;

let request = require("co-request");

const makeAnchor = require('textUtil/makeAnchor');
var questionIdForRequest;

describe.only('Q&A get question by ID or slug service', function () {
    before(function*() {
        let fixtureUser = yield User.findOne({ profileName: 'iliakan' }).exec();

        var idFixture = {
            title: "Вопрос с доступом по id",
            content: "Содержание вопроса",
            slug: makeAnchor("Вопрос с доступом по id", true),
            user: fixtureUser
        };

        var slugFixture = {
            title: "Вопрос с доступом по slug",
            content: "Содержание вопроса",
            slug: makeAnchor("Вопрос с доступом по slug", true),
            user: fixtureUser
        };

        yield QaQuestion.remove({});

        var idQuestion = yield new QaQuestion(idFixture).persist();
        yield new QaQuestion(slugFixture).persist();

        questionIdForRequest = idQuestion._id;
    });

    it('get question should be ok', function* () {

    })
});