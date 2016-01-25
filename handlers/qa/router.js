var Router = require('koa-router');

var index = require('./controllers/index');
var items = require('./controllers/items');

var router = module.exports = new Router();

router.get("/", index.get);

router.post("/addItem", items.add);

