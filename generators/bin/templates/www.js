#!/usr/bin/env node
'use strict';

var restify = require('restify');
var extend = require('deep-extend');
var app = require('../lib');

// Get untrackable configurations.
try {
  extend(process.env, require('../config.json'));
} catch (err) {
  if (!err.message || err.code !== 'MODULE_NOT_FOUND') {
    throw err;
  }
}

var serviceName = process.env.npm_package_name || require('../package.json').name;


var server = restify.createServer({
  name: serviceName,
  version: '1.0.0'
});



<% if (acceptAttachment) { %>
server.post('/', restify.bodyParser(), app.index || app);
<% } else { %>
server.post('/', app.index || app);
<% } %>


server.listen(config.port || process.env.npm_package_config_port || 15000);
