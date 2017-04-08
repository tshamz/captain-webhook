casper.test.begin('cart and search icons exist', 2, function suite(test) {
  casper.start(casper.cli.options.site);

  casper.then(function () {
    test.assertExists('.icon-cart', 'cart icon exists');
    test.assertExists('.icon-search', 'search icon exists');
  });

  // casper.thenClick('.icon-cart', function () {
  //   test.assertUrlMatch(/\/cart/, 'Navigates to /cart page');
  // });

  casper.run(function () {
    test.done();
  });
});
