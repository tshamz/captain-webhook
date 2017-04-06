'use strict';

const routes = {
  index: function (req, res) {
    console.log('Incoming Webhook Request');
    console.log(req);
    res.sendStatus(200);
  },
  pre: function (req, res) {
    console.log('Incoming Pre Deploy Webhook Request');
    console.log(res);
    res.sendStatus(200);
  },
  post: function (req, res) {
    console.log('Incoming Post Deploy Webhook Request');
    // console.log(req.query);
    res.sendStatus(200);
  }
};

module.exports = {
  index: routes.index,
  pre: routes.pre,
  post: routes.post
};
