'use strict';
const Router = require('koa-router');

const index = require('./controllers/index');

const questions = require('./controllers/questions');
const questionsBySlug = require('./controllers/questionsBySlug');

const apiQuestionsById = require('./controllers/apiQuestionsById');

const questionsList = require('./controllers/questionsList');

let router = module.exports = new Router();

router.get("/", index.get);

router.post("/questions", questions.post);
router.get( "/questions", questionsList.get('forHuman'));
router.get("/questions/:slug", questionsBySlug.get);

//todo PUT для вопроса, например, чтобы отметить, что у вопроса есть решение

router.get("/api/questions/:id", apiQuestionsById.get);
router.get("/api/questions", questionsList.get('forApi'));




// developer, remove when question page render is done
var getQuestionFront = require('./controllers/getQuestionFront');
router.get("/get-question-front", getQuestionFront);
// --- //