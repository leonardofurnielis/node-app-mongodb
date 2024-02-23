/* eslint-disable global-require */

'use strict';

const express = require('express');
const error_handler = require('node-error-handler');

const app = express();
const environment_loader = require('./environment');
const log_loader = require('./log');
const http_loader = require('./http');
const security_loader = require('./security');
const route_loader = require('./route');

environment_loader();

log_loader();

http_loader(app);

app.use('/api', route_loader());

// 404 handler
app.use((req, res, next) => {
  const error = new Error(`Cannot found '${req.url}' on this server`);
  error.code = 404;
  return next(error);
});

// Error handler
const debug = process.env.LOGGER_LEVEL.toLowerCase() === 'debug' ? true : false;
app.use(error_handler({ debug }));

if (!process.env.NODE_ENV === 'test') {
  security_loader();
}

module.exports = app;
