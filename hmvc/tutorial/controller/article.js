const mongoose = require('mongoose');
const Article = require('../models/article');
const Task = require('../models/task');
const ArticleRenderer = require('../renderer/articleRenderer');
const TaskRenderer = require('../renderer/taskRenderer');
const _ = require('lodash');
const CacheEntry = require('cache').CacheEntry;
const makeAnchor = require('textUtil/makeAnchor');

exports.get = function *get(next) {

  var renderedArticle = yield* renderArticle(this.params.slug);

  if (!renderedArticle) {
    yield* next;
    return;
  }

  var locals = renderedArticle;
  locals.sitetoolbar = true;

  var sections = [];
  if (renderedArticle.isFolder) {

    sections.push({
      title: 'Смежные разделы',
      links: renderedArticle.siblings
    });

  } else {

    sections.push({
      title: 'Раздел',
      links: [renderedArticle.breadcrumbs[renderedArticle.breadcrumbs.length-1]]
    });

    var headerLinks = renderedArticle.headers
      .filter(function(header) {
        // [level, titleHtml, anchor]
        return header.level == 2;
      }).map(function(header) {
        return {
          title: header.title,
          url:   '#' + header.anchor
        };
      });

    if (headerLinks.length) {
      sections.push({
        title: 'Навигация по уроку',
        links: headerLinks
      });
    }

  }

  if (!renderedArticle.isFolder) {

    var section2 = {
      class: '_separator_before',
      links: []
    };

    if (renderedArticle.tasks.length) {
      section2.links.push({
        title: 'Задачи (' + renderedArticle.tasks.length + ')',
        url: '#tasks'
      });
    }

    section2.links.push({
      title: 'Комментарии',
      url:   '#disqus_thread'
    });

    sections.push(section2);

  }


  locals.sidebar = {
    class: "sidebar_sticky-footer",
    sections: sections
  };

  this.body = this.render(renderedArticle.isFolder ? "folder" : "article", locals);

};

// body
// metadata
// modified
// title
// isFolder
// prev
// next
// path
// siblings
function* renderArticle(slug) {

  const article = yield Article.findOne({ slug: slug }).exec();
  if (!article) {
    return null;
  }

  var renderer = new ArticleRenderer();

  var rendered = yield* renderer.renderWithCache(article);

  rendered.isFolder = article.isFolder;
  rendered.modified = article.modified;
  rendered.title = article.title;
  rendered.isFolder = article.isFolder;
  rendered.weight = article.weight;

  const tree = yield* Article.findTree();
  const articleInTree = tree.byId(article._id);

  yield* renderPrevNext();
  yield* renderBreadCrumb();
  yield* renderSiblings();
  yield* renderChildren();
  yield* renderTasks();

  function* renderPrevNext() {

    var prev = tree.byId(articleInTree.prev);

    if (prev) {
      rendered.prev = {
        url:   Article.getUrlBySlug(prev.slug),
        title: prev.title
      };
    }

    var next = tree.byId(articleInTree.next);
    if (next) {
      rendered.next = {
        url:   Article.getUrlBySlug(next.slug),
        title: next.title
      };
    }
  }

  function* renderBreadCrumb() {
    var path = [];
    var parent = articleInTree.parent;
    while (parent) {
      var a = tree.byId(parent);
      path.push({
        title: a.title,
        url:   Article.getUrlBySlug(a.slug)
      });
      parent = a.parent;
    }
    path.push({
      title: 'Учебник',
      url: '/tutorial'
    });
    path.push({
      title: 'JavaScript.ru',
      url: 'http://javascript.ru'
    });

    path = path.reverse();

    rendered.breadcrumbs = path;
  }

  function* renderSiblings() {
    var siblings = tree.siblings(articleInTree._id);
    rendered.siblings = siblings.map(function(sibling) {
      return {
        title: sibling.title,
        url:   Article.getUrlBySlug(sibling.slug)
      };
    });
  }

  function* renderChildren() {
    if (!articleInTree.isFolder) return;
    var children = articleInTree.children || [];
    rendered.children = children.map(function(child) {
      var renderedChild = {
        title: child.title,
        url:   Article.getUrlBySlug(child.slug),
        weight: child.weight
      };

      if (child.isFolder) {
        renderedChild.children = (child.children || []).map(function(subChild) {
          return {
            title: subChild.title,
            url:   Article.getUrlBySlug(subChild.slug),
            weight: child.weight
          };
        });
      }

      return renderedChild;
    });
  }

  function *renderTasks() {
    var tasks = yield Task.find({
      parent: article._id
    }).sort({weight: 1}).exec();

    const taskRenderer = new TaskRenderer();


    rendered.tasks = [];

    for (var i = 0; i < tasks.length; i++) {
      var task = tasks[i];

      var taskRendered = yield* taskRenderer.renderWithCache(task);
      rendered.tasks.push({
        url: task.getUrl(),
        title: task.title,
        anchor: makeAnchor(task.title),
        importance: task.importance,
        content: taskRendered.content,
        solution: taskRendered.solution
      });

    }

  }

  return rendered;

}

