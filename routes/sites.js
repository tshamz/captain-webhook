'use strict';

const sites = require('../sites/sites.js');

const get = function (req, res) {
  console.log('Incoming Get Request to /sites');
  res.json(sites);
};

const post = function (req, res) {
  console.log('Incoming Post Request to /');
  res.sendStatus(200);
};

module.exports = {
  get: get,
  post: post
};
