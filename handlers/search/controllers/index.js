var elasticClient = require('elastic').client;

var Task = require('tutorial').Task;
var Article = require('tutorial').Article;

// known types and methods to convert hits to showable results
// FIXME: many queries to MongoDB for parents (breadcrumbs) Cache them?
var searchTypes = {
  articles: {
    title: 'Учебник',
    hit2url: function(hit) {
      return Article.getUrlBySlug(hit.fields.slug[0]);
    },
    hit2breadcrumb: function*(hit) {
      var article = yield Article.findById(hit._id).select('slug title isFolder parent').exec();
      if (!article) return null;
      var parents = yield* article.findParents();
      parents.forEach(function(parent) {
        parent.url = parent.getUrl();
      });
      return parents;
    }
  },

  tasks: {
    title: 'Задачи',
    hit2url: function(hit) {
      return Task.getUrlBySlug(hit.fields.slug[0]);
    },
    hit2breadcrumb: function*(hit) {
      var task = yield Task.findById(hit._id).select('slug title parent').exec();
      if (!task) return null;
      var article = yield Article.findById(task.parent).select('slug title isFolder parent').exec();
      if (!article) return null;
      var parents = (yield* article.findParents()).concat(article);
      parents.forEach(function(parent) {
        parent.url = parent.getUrl();
      });
      return parents;
    }
  }

};

exports.get = function *get(next) {

  var locals = {};
  locals.sitetoolbar = true;
  locals.sidebar = false;

  var searchQuery = locals.searchQuery = this.request.query.query || '';
  var searchType = locals.searchType = this.request.query.type || 'articles';

  locals.title = searchQuery ? 'Результаты поиска' : 'Поиск';

  if (!searchTypes[searchType]) {
    this.throw(400);
  }

  locals.searchTypes = searchTypes;

  locals.results = [];

  // for every type - total results#
  locals.resultsCountPerType = {};

  if (searchQuery) {
    var result = yield* search(searchQuery);

    var hits = result[searchType].hits.hits;

    // will show these results
    for (var i = 0; i < hits.length; i++) {
      var hit = hits[i];

      var hitFormatted = {
        url: searchTypes[hit._type].hit2url(hit),
        title: hit.highlight.title ? hit.highlight.title.join('… ') : hit.fields.title[0],
        search: hit.highlight.search.join('… '),
        breadcrumb: yield* searchTypes[hit._type].hit2breadcrumb(hit)
      };

      if (!hitFormatted.url || !hitFormatted.breadcrumb) {
        this.log.error("Cannot find result from the search response in MongoDB", hit);
        continue;
      }

      locals.results.push(hitFormatted);
    }

    // will just show counts
    for(var type in result) {
      locals.resultsCountPerType[type] = result[type].hits.total;
    }
  }

  this.body = this.render("index", locals);

};


/**
 * search all types
result = {
   articles:
     { took: 4,
       timed_out: false,
       _shards: { total: 1, successful: 1, failed: 0 },
       hits: { total: 54, max_score: 2.7859237, hits: [Object] } },
  tasks:
   { took: 2,
     timed_out: false,
     _shards: { total: 1, successful: 1, failed: 0 },
     hits: { total: 28, max_score: 2.7859237, hits: [Object] } } }
 */
function* search(query) {

  /*jshint -W106 */
  var queryBody = {
    size: 50,
    filter:    {
      bool:  {
        must_not: {
          term: {isFolder: true}
        }
      }
    },
    query:     {
      multi_match: {
        query:  query,
        fields: ['title^10', 'search']
      }
    },
    fields:    ["title", "slug"],
    highlight: {
      pre_tags : ["<mark class=\"search-results__marked\">"],
      post_tags : ["</mark>"],
      fields: {
        search: {type: 'postings'},
        title:  {type: 'plain'}
      }
    }
  };

  var queries = {};
  for(var type in searchTypes) {
    // object of promises
    queries[type] = elasticClient().search({
      index: 'js',
      type: type,
      body: queryBody
    });
  }

  // 1 query per type to ES
  // maybe: replace w/ ES aggregations?
  var result = yield queries;

  return result;
}