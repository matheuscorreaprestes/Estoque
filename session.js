const expressSession = require('express-session');

const sessionMiddleware = expressSession({
  secret: 'programa_do_matheus',
  resave: false,
  saveUninitialized: true
});

module.exports = sessionMiddleware;