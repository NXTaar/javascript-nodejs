'use strict';
const url = require('url');
const querystring = require('querystring');

const questionsList = require('./questionsList');

exports.get = function* () {
    let requestQuery = url.parse(this.request.url).query;
    let requestParams = querystring.parse(requestQuery);

    let page   = requestParams.page || 0;
    let items = requestParams.items || 20;

    if (items > 100) return this.status = 400;

    let result = yield questionsList.get({page, items});

    if (result.status !== 200) return this.status = result.status;

    this.body = result.questionsList;
};