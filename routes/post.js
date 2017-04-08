'use strict';

const spawn = require('child_process').spawn;

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

    let child = spawn('casperjs', ['test' 'tests/casper.js' `--site=${sites[data.repository].url}`]);

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    res.status(200);
  });
}
