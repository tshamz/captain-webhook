casper.test.begin('Clicking on cart icon takes you to the cart page', 2, function suite(test) {
  casper.start(casper.cli.options.site, function () {
    test.assertExists('.icon-cart', 'Cart icon exists');
  });

  casper.thenClick('.icon-cart', function () {
    test.assertUrlMatch(/\/cart/, 'Navigates to /cart page');
  });

  casper.run(function () {
    test.done();
  });
});
