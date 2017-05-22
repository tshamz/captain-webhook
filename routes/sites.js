'use strict';

const sites = require('../sites/sites.js');

const get = function (req, res) {
  console.log('Incoming Get Request to /sites');
  res.json(sites);
};

const getWithParam = function (req, res) {
  console.log('Incoming Get Request to /sites/:site');
  res.json(sites[req.params.site]);
};

const post = function (req, res) {
  console.log('Incoming Post Request to /sites');
  res.sendStatus(200);
};

module.exports = {
  get: get,
  getWithParam: getWithParam,
  post: post
};
