var Router = require('koa-router');

var index = require('./controllers/index');
var addQuestion = require('./controllers/addQuestion');
var getQuestion = require('./controllers/getQuestion');
var getQuestionsAll = require('./controllers/getQuestionsAll');

// developer
var questionGet = require('./controllers/questionGet');
// --- //

var router = module.exports = new Router();

router.get("/", index.get);

router.post("/add-question", addQuestion);

router.get("/get-question", getQuestion);

router.get("/get-questions-all", getQuestionsAll);

// test function for html layout
router.get("/get-question-front", questionGet);

