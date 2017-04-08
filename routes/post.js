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

      testData = tests.map(function (test) {
        return test.split('\n').reduce(function (testInfo, line, index) {
          if (index === 0) {
            testInfo.file = line;
          } else if (index === 1) {
            testInfo.title = line;
          } else if (line.slice(0, 4) === 'PASS') {
            testInfo.pass.push(line);
          } else if (line.slice(0, 4) === 'FAIL') {
            testInfo.fail.push(line);
          }
          return testInfo;
        }, {pass:[], fail:[]});
      })

      console.log(results);
      console.log(testsData);

      request({
        url: sites[data.repository].slackWebhook,
        method: 'POST',
        json: true,
        body: {"text": cleanedInput}
      });
      res.sendStatus(200);
    });
  });
};

// {
//     "attachments": [
//         {
//             "fallback": "Required plain-text summary of the attachment.",
//             "color": "#36a64f",
//             "pretext": "Optional text that appears above the attachment block",
//             "title": "# Clicking on cart icon takes you to the cart page",
//             "text": "Optional text that appears within the attachment",
//             "fields": [
//                 {
//                     "title": "Clicking on cart icon takes you to the cart page",
//                     "value": "Pass",
//                     "short": false
//                 }
//             ]
//         }
//     ]
// }

// {
//   "text": "*# Clicking on cart icon takes you to the cart page*",
//     "attachments": [
//         {
//             "fallback": "Required plain-text summary of the attachment.",
//             "color": "#36a64f",
//             "title": "Cart icon exists",
//             "text": "PASS"
//         },
//     {
//             "fallback": "Required plain-text summary of the attachment.",
//             "color": "#36a64f",
//             "title": "Navigates to /cart page",
//             "text": "PASS"
//         }
//     ]
// }



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
