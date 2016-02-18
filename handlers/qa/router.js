'use strict';

const Router = require('koa-router');

const index = require('./controllers/index');
const questions = require('./controllers/questions');
//var getQuestionsAll = require('./controllers/getQuestionsAll');


let router = module.exports = new Router();

router.get("/", index.get);

router.post("/questions", questions.post);

router.get("/questions", questions.get);

router.get("/questions/:id", questions.byId.get);

//router.get("/get-questions-all", getQuestionsAll);





// developer
var getQuestionFront = require('./controllers/getQuestionFront');
// test function for html layout
router.get("/get-question-front", getQuestionFront);
// --- //