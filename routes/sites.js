'use strict';

const sites = require('../sites/sites.js');

const get = function (req, res) {
  console.log('Incoming Get Request to /sites');
  console.log(req.url);
  res.json(sites);
};

const getWithParam = function (req, res) {
  console.log('Incoming Get Request to /sites/:site');
  console.log(req.params.site);
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
