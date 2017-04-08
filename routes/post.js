'use strict';

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
    console.log(data);

    let cmd = `casperjs test /tests/ --site=${sites[data.repository].url}`;
    exec(cmd, function(error, stdout, stderr) {
      console.log(stdout);
      res.sendStatus(200);
    });
  });
}
