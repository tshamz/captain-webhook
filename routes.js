'use strict';

const request = require('request');
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

    let requestData = '';
    req.on('data', function (data) {
      requestData += data;
    });

    req.on('end', function () {
      let requestJSON = JSON.parse(requestData);
      let analyticsEventQuery = {
        v: 1,
        tid: 'UA-41256563-1',
        cid: 'beanstalk'
        t: 'event',
        ec: 'development',
        ea: 'deployment',
        el: requestJSON.comment
      };
      let url = `https://www.google-analytics.com/collect?${querystring.stringify(analyticsEventQuery)}`;
      console.log(url);
      request.post(url);
      res.sendStatus(200);
    });
  }
};

module.exports = {
  index: routes.index,
  pre: routes.pre,
  post: routes.post
};
