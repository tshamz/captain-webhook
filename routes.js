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

    var jsonString = '';

    req.on('data', function (data) {
      jsonString += data;
    });

    req.on('end', function () {
      console.log(JSON.parse(jsonString));
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
      let requestJSON = JSON.parse(jsonString);
      let analyticsEventQuery = {
        v: 1,
        tid: 'UA-41256563-1',
        t: 'event',
        ec: 'development',
        ea: 'deployment',
        el: requestJSON.comment
      };
      request
        .post(`https://www.google-analytics.com/collect?${querystring.stringify(analyticsEventQuery)}`)
        .then(function () {
          console.log('great success!');
        })
        .catch(function () {
          console.log(':(');
        });
      res.sendStatus(200);
    });
  }
};

module.exports = {
  index: routes.index,
  pre: routes.pre,
  post: routes.post
};
