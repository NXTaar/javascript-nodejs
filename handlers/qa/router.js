var Router = require('koa-router');

var index = require('./controllers/index');
var addQuestion = require('./controllers/addQuestion');

var router = module.exports = new Router();

router.get("/", index.get);

router.post("/add-question", addQuestion);

