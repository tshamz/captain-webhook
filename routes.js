'use strict';

const routes = {
  index: function (req, res) {
    console.log(req);
    res.send(200);
  }
};

module.exports = {
  index: routes.index
};
