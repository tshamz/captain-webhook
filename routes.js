'use strict';

const request = require('request');
const UsageStats = require('usage-stats');

const googleAnalyticsUAs = {
  "https://bvaccel.git.beanstalkapp.com/boll-branch.git": "UA-41256563-1",
  "https://bvaccel.git.beanstalkapp.com/staging-gpen.git": "UA-32939967-1"
};

const routes = {
  index: function (req, res) {
    console.log('Incoming Webhook Request');
    console.log(req);
    res.sendStatus(200);
  },
  pre: function (req, res) {
    console.log('Incoming Pre Deploy Webhook Request');
    let requestData = '';
    req.on('data', function (data) {
      requestData += data;
    });
    req.on('end', function () {
      console.log(JSON.parse(requestData));
      res.sendStatus(200);
    });
  },
  post: function (req, res) {
    let requestData = '';
    req.on('data', function (data) {
      requestData += data;
    });
    req.on('end', function () {
      let requestJSON = JSON.parse(requestData);
      const UA = googleAnalyticsUAs[requestJSON.repository_url_https];
      const usageStats = new UsageStats(UA);
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
