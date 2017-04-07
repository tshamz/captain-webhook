'use strict';

const casper = require('casper').create();

const sites = require('../sites/sites.js');

const runTests = function (repo) {
  const urlBase = sites[repo].url;

  casper.test.begin('Click on cart icon takes you to the cart page', 2, function suite(test) {
    casper.start(urlBase, function () {
      test.assertExists('.icon-cart', 'cart icon exists');
    });

    casper.thenClick('.icon-cart', function () {
      test.assertUrlMatch(/\/cart/, 'clicking on cart icon navigates to /cart page');
    });

    casper.run(function () {
      test.done();
    });
  });
};

module.exports = {
  run: runTests
};
