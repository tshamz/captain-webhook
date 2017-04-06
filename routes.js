'use strict';

const routes = {
  index: function (req, res) {
    console.log('Incoming Webhook Request');
    console.log(req);
    res.sendStatus(200);
  }
};

module.exports = {
  index: routes.index
};
