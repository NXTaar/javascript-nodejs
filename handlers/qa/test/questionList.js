'use strict';
const QaQuestion = require('../models/qaQuestion');
const User = require('users').User;

let request = require("co-request");
var randomstring = require("randomstring");

const makeAnchor = require('textUtil/makeAnchor');
function* addFixtures(quantity, noRemove) {
    let fixtureUser = yield User.findOne({ profileName: 'iliakan' }).exec();

    if (!noRemove) yield QaQuestion.remove({});

    for (var i = 0; i < quantity; i++) {
        var fixture = {
            content: randomstring.generate({charset: "lorem inpusum hello world"}),
            user: fixtureUser
        };
        fixture.title = randomstring.generate(15);
        fixture.slug = makeAnchor(fixture.title, true);

        yield new QaQuestion(fixture).persist();
    }
}
describe('list of questions service', function () {
    beforeEach(function*() {
        yield addFixtures(5);
    });
    it('should return only date limited questions', function*() {
        let response1 = yield request({
            method: 'GET',
            url: "http://javascript.in/qa/api/questions?items=1"
        });
        let response1Body1 = JSON.parse(response1.body);

        yield addFixtures(1, true);

        let response2 = yield request({
            method: 'GET',
            url: `http://javascript.in/qa/api/questions?items=1&dateLimit=${response1Body1.dateLimit}`
        });
        let response1Body2 = JSON.parse(response2.body);
        response1Body1.should.eql(response1Body2);
    });
});