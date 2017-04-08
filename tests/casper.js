casper.test.begin('Click on cart icon takes you to the cart page', 2, function suite(test) {
  casper.start(casper.cli.options.site, function () {
    test.assertExists('.icon-cart', 'cart icon exists');
  });

  casper.thenClick('.icon-cart', function () {
    test.assertUrlMatch(/\/cart/, 'clicking on cart icon navigates to /cart page');
  });

  casper.run(function () {
    test.done();
  });
});
