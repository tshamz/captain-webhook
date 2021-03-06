'use strict';

const get = function (req, res) {
  console.log('Incoming Get Request to /');
  res.sendStatus(200);
};

const post = function (req, res) {
  console.log('Incoming Post Request to /');
  res.sendStatus(200);
};

module.exports = {
  get: get,
  post: post
};
