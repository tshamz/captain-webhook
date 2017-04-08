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

    exec(`casperjs test ./tests/casper.js --site=${sites[data.repository].url}`, function (error, stdout, stderr) {
      console.log(error);
      console.log(stdout);
      console.log(stderr);
    });

    res.status(200);
  });
}
