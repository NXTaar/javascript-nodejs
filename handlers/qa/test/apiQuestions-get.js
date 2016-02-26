'use strict';
var mongoose = require('mongoose');
const QaQuestion = require('../models/qaQuestion');
var randomstring = require("randomstring");
const User = require('users').User;

let request = require("co-request");

const makeAnchor = require('textUtil/makeAnchor');

let testId = null;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe.only('Get list of all question sorted by parameter (default the new ones)', function () {
    beforeEach(function*() {
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

    it('should return a list of 5 questions', function* () {
        var response = yield request({
            method: 'GET',
            url: "http://javascript.in/qa/api/questions?items=5"
        });
        let questions = JSON.parse(response.body);
        questions.length.should.eql(5);
    });

    it('should return right paginated questions', function* () {
        var response1 = yield request({
            method: 'GET',
            url: "http://javascript.in/qa/api/questions?page=5&items=5"
        });

        var response2 = yield request({
            method: 'GET',
            url: "http://javascript.in/qa/api/questions?page=6&items=5"
        });

        let questions1 = JSON.parse(response1.body);
        let questions2 = JSON.parse(response2.body);

        var check = yield QaQuestion.find({_id: {$gt: questions2[0]._id}}).sort({_id: 1 }).limit(1).exec();
        check[0]._id.toString().should.eql(questions1[4]._id);
    });

    it('should return 400 if the query tries get more than 20 items per page', function* () {
        var response = yield request({
            method: 'GET',
            url: "http://javascript.in/qa/api/questions?items=500"
        });
        response.statusCode.should.eql(400);
    });

    it('should return 204 if it tries to query non-existing items', function* () {
        var response = yield request({
            method: 'GET',
            url: "http://javascript.in/qa/api/questions?page=30"
        });
        response.statusCode.should.eql(204);
    })
});