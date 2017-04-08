'use strict';

const exec = require('child_process').exec;
const sites = require('./sites/sites.js');

const routes = {
  pre: function (req, res) {
    console.log('Incoming Pre Deploy Webhook Request');

    let requestData = '';

    req.on('data', function (data) {
      requestData += data;
    });

    req.on('end', function () {
      let data = JSON.parse(requestData);
      console.log(data);
    });

    res.status(200);
  },
  post: function (req, res) {
    console.log('Incoming Post Deploy Webhook Request');

    let requestData = '';

    req.on('data', function (data) {
      requestData += data;
    });

    req.on('end', function () {
      let data = JSON.parse(requestData);
      console.log(data);
      console.log(sites[data.repository].url);

      exec(`casperjs test ../tests/casper.js --site=${sites[data.repository].url}`, function (error, stdout, stderr) {
        console.log(error);
        console.log(stdout);
        console.log(stderr);
      });

      res.status(200);
    });
  }
}

module.exports = {
  pre: routes.pre,
  post: routes.post
};
