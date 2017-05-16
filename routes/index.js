'use strict';

const get = function (req, res) {
  console.log('Incoming Get Request to /');
  console.log(req);
  res.sendStatus(200);
};

const post = function (req, res) {
  console.log('Incoming Post Request to /');
  console.log(req);
  res.sendStatus(200);
};

module.exports = {
  get: get,
  post: post
};
