'use strict';

const request = require('request');
const UsageStats = require('usage-stats')
const querystring = require('querystring');

const routes = {
  index: function (req, res) {
    console.log('Incoming Webhook Request');
    console.log(req);
    res.sendStatus(200);
  },
  pre: function (req, res) {
    console.log('Incoming Pre Deploy Webhook Request');

    var requestData = '';

    req.on('data', function (data) {
      requestData += data;
    });

    req.on('end', function () {
      console.log(JSON.parse(requestData));
      res.sendStatus(200);
    });
  },
  post: function (req, res) {
    console.log('Incoming Post Deploy Webhook Request');

    const usageStats = new UsageStats('UA-41256563-1', {
      an: 'beanstalk-deployments'
    });

    let requestData = '';
    req.on('data', function (data) {
      requestData += data;
    });

    req.on('end', function () {
      let requestJSON = JSON.parse(requestData);
      usageStats.event('development', 'deployment', {el: requestJSON.comment})
      usageStats.send();
      res.sendStatus(200);
    });
  }
};

module.exports = {
  index: routes.index,
  pre: routes.pre,
  post: routes.post
};
