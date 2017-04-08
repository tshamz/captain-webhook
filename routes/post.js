'use strict';

const spawn = require('child_process').spawnSync;

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
    let child = spawn('casperjs', ['test', 'tests/casper.js', `--site=${sites[data.repository].url}`]);

    console.log(child.stdout.toString());
    console.log(child.stderr.toString());

    res.status(200);
  });
}
