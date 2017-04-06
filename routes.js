'use strict';

const routes = {
  index: function (req, res) {
    console.log('Incoming Webhook Request');
    console.log(req);
    res.sendStatus(200);
  },
  pre: function (req, res) {
    console.log('Incoming Pre Deploy Webhook Request');

    var jsonString = '';

    req.on('data', function (data) {
      jsonString += data;
    });

    req.on('end', function () {
      console.log(JSON.parse(jsonString));
      res.sendStatus(404);
    });
  },
  post: function (req, res) {
    console.log('Incoming Post Deploy Webhook Request');

    var jsonString = '';

    req.on('data', function (data) {
      jsonString += data;
    });

    req.on('end', function () {
      console.log(JSON.parse(jsonString));
      res.sendStatus(200);
    });
  }
};

module.exports = {
  index: routes.index,
  pre: routes.pre,
  post: routes.post
};
