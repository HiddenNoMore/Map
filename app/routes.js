var core = require('./controllers/core.js');

module.exports = function (app) {
  app.get('/', core.home);
  app.get('/org', core.org);
  app.get('/about', core.about);
}