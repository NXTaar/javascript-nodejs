'use strict';
var mongoose = require('mongoose');
const QaQuestion = require('../models/qaQuestion');
var randomstring = require("randomstring");
const User = require('users').User;

let request = require("co-request");

const makeAnchor = require('textUtil/makeAnchor');


describe('Get list of all question sorted by parameter (default the new ones)', function () {
    before(function*() {
        let fixtureUser = yield User.findOne({ profileName: 'iliakan' }).exec();

        yield QaQuestion.remove({});

        for (var i = 0; i < 60; i++) {
            var fixture = {
                content: randomstring.generate({charset: "lorem inpusum hello world"}),
                user: fixtureUser
            };
            fixture.title = randomstring.generate(15);
            fixture.slug = makeAnchor(fixture.title, true);

            yield new QaQuestion(fixture).persist();
        }
    });

    it('should return a list of 10 questions sorted by adding date ', function* () {

    });
});