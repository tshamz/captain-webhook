'use strict';

const request = require('request');
const UsageStats = require('usage-stats');

const sites = require('../sites/sites.js');

module.exports = {
  post: function (req, res) {
    console.log('Incoming Post Deploy Webhook Request');

    let requestData = '';

    req.on('data', function (data) {
      requestData += data;
    });

    req.on('end', function () {
      res.sendStatus(200);
      let requestJSON = JSON.parse(requestData);
      let site = sites[requestJSON.repository];

      if (site !== undefined && site.hasOwnProperty('googleAnalyticsUA')) {
        let usageStats = new UsageStats(site.googleAnalyticsUA);
        usageStats.event('development', 'deployment', {el: requestJSON.comment});
        usageStats.send();
      }
    });
  }
};
