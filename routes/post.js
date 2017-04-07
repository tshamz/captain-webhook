'use strict';

const casperTests = require('../casper.js');

module.exports = function (req, res) {
  console.log('Incoming Post Deploy Webhook Request');

  let requestData = '';

  req.on('data', function (data) {
    requestData += data;
  });

  req.on('end', function () {
    let data = JSON.parse(requestData);
    console.log(data);

    casperTests.run(data.repository);
    res.status(200);
  });
}
