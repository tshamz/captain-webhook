'use strict';

const sites = require('../sites/sites.js');

const get = function (req, res) {
  console.log('Incoming Get Request to /sites');
  console.log(req.hostname);
  res.json(sites);
};

const post = function (req, res) {
  console.log('Incoming Post Request to /sites');
  res.sendStatus(200);
};

module.exports = {
  get: get,
  post: post
};
