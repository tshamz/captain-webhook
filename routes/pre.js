'use strict';

module.exports = function (req, res) {
  console.log('Incoming Pre Deploy Webhook Request');

  let requestData = '';

  req.on('data', function (data) {
    requestData += data;
  });

  req.on('end', function () {
    let data = JSON.parse(requestData);
    console.log(data);
    res.status(200);
  });
};
