'use strict';

const moment     = require('moment');
const request    = require('request');
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

      console.log(requestJSON);

      if (requestJSON.environment.toLowerCase().indexOf('production') !== -1) {
        let site = sites[requestJSON.repository];

        if (site && site.hasOwnProperty('googleAnalyticsUA') && requestJSON.comment.search(/\[no[-| ]annotate\]/g) === -1) {
          let now = moment().format('MM-DD-YYYY HH:mm:ss');
          let message = `${requestJSON.comment} (time: ${now}, revision: ${requestJSON.revision})`;
          let usageStats = new UsageStats(site.googleAnalyticsUA);

          usageStats.event('development', 'deployment', {el: message});
          usageStats.send();

          console.log(`Annotation for ${site.repo} made by ${requestJSON.author} - ${message}`);
        }
      }
    });
  }
};
