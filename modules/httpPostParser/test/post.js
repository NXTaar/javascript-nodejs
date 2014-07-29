const app = require('app');
const supertest = require('supertest');
const should = require('should');

describe("HttpPostParser", function() {

  before(function* () {

    app.use(function*(next) {
      if ('/test/http-post-parser' != this.path) return yield next;
      this.body = this.req.body;
    });

    yield app.run();

  });

  it("parses body", function(done) {

    var message = { name: 'Manny', species: 'cat' };
    supertest(app)
      .post('/test/http-post-parser')
      .send(message)
      .end(function(error, res) {
        res.body.should.be.eql(message);
        done(error);
      });

  });

});
