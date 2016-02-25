'use strict';
const QaQuestion = require('../models/qaQuestion');
const url = require('url');
const querystring = require('querystring');

exports.get = function* () {
    let requestQuery = url.parse(this.request.url).query;
    let requestParams = querystring.parse(requestQuery);

    let pageNumber   = requestParams.pageNumber || 1;
    let itemsPerPage = requestParams.itemsPerPage || 20;
    this.body = 'ok';
};