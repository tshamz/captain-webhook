'use strict';

const request = require('request');
const exec = require('child_process').exec;

const sites = require('../sites/sites.js');

module.exports = function (req, res) {
  console.log('Incoming Post Deploy Webhook Request');

  let requestData = '';

  req.on('data', function (data) {
    requestData += data;
  });

  req.on('end', function () {
    let data = JSON.parse(requestData);
    let cmd = `casperjs test tests/casper.js --site=${sites[data.repository].url}`;
    exec(cmd, function(error, stdout, stderr) {
      console.log(stdout);
      request({
        url: sites[data.repository].slackWebhook,
        method: 'POST',
        json: true,
        body: {"text":"Hello, World!"}
      }, function (err, response, body) {
        console.log(body);
      });
      res.sendStatus(200);
    });
  });
}
