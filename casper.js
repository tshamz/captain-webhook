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

// req.on('end', function () {
//   let data = JSON.parse(requestData);
//   console.log(data);

//   casperTests.run(data.repository);
//   res.status(200);
// });

'use strict';

const request = require('request');
const stripAnsi = require('strip-ansi');
const exec = require('child_process').exec;

const sites = require('../sites/sites.js');

module.exports = function (req, res) {
  console.log('Incoming Post Deploy Webhook Request');

  let requestData = '';

  req.on('data', function (data) {
    requestData += data;
  });

  req.on('end', function () {
    let data = JSON.parse(requestData);
    let site = sites[data.repository];
    let cmd = `casperjs test tests/ --site=${site.url}?preview_theme_id=${site.testingThemeId}`;
    exec(cmd, function(error, stdout, stderr) {
      console.log(stdout);
      let cleanedInput = stripAnsi(stdout);
      let parsedInput = cleanedInput.match(/(.|\n)*skipped./gm)[0];
      let tests = parsedInput.match(/Test file(.|\n)*?tests\)/gm);
      let results = parsedInput.match(/.*skipped\./gm)[0];

      let testsData = tests.map(function (test) {
        return test.split('\n').reduce(function (testInfo, line, index) {
          if (index === 0) {
            testInfo.file = line;
          } else if (index === 1) {
            testInfo.title = line;
          } else if (line.slice(0, 4) === 'PASS' || line.slice(0, 4) === 'FAIL') {
            testInfo.results.push(line);
          }
          return testInfo;
        }, {results: []});
      }).map(function (test) {
        let testPassed = test.results.every(function (result) {
          return result.indexOf('PASS') !== -1
        });
        return {
          "fallback": test.title,
          "color": (testPassed) ? "#5cb85c" : "#d9534f",
          "title": test.title,
          "author_name": test.file,
          "fields": test.results.map(function (result) {
            return {
              "title": result.slice(5, result.length),
              "value": result.slice(0, 4),
              "short": false
            };
          })
        }
      });

      request({
        url: sites[data.repository].slackWebhook,
        method: 'POST',
        json: true,
        body: {
          "text": `*${results}*`,
          "attachments": testsData
        }
      });

      if (results.slice(0, 4) === 'FAIL') {
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    });
  });
};



// {
//   source: 'beanstalkapp',
//   author: 'tshamz',
//   comment: 'Merge branch \'1234-feature-branch\' into testing',
//   author_name: 'Tyler Shambora',
//   author_email: 'tyler@bvaccel.com',
//   deployed_at: '2017/04/08 14:36:02 +0000',
//   revision: '1a064ac02f146d0a1f12cf65fbacf46b6a90b824',
//   repository: 'testing-workflow',
//   environment: 'TESTING',
//   server: 'TESTING',
//   repository_url: 'git@bvaccel.git.beanstalkapp.com:/bvaccel/testing-workflow.git',
//   repository_url_https: 'https://bvaccel.git.beanstalkapp.com/testing-workflow.git',
//   repository_url_ssh: 'git@bvaccel.git.beanstalkapp.com:/bvaccel/testing-workflow.git'
// }
