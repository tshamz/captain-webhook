'use strict';

const routes = {
  index: function (req, res) {
    console.log(req.body);
    res.sendStatus(200);
  }
};

module.exports = {
  index: routes.index
};
