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
    let cmd = `casperjs test tests/casper.js --site=${site.url}?preview_theme_id=${site.testingThemeId}`;
    exec(cmd, function(error, stdout, stderr) {
      console.log(stdout);

      let parsedOutput = stdout.split('\n');
      console.log(parsedOutput);

      request({
        url: sites[data.repository].slackWebhook,
        method: 'POST',
        json: true,
        body: {"text": stripAnsi(stdout)}
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
//             "title": "Slack API Documentation",
//             "title_link": "https://api.slack.com/",
//             "text": "Optional text that appears within the attachment",
//             "fields": [
//                 {
//                     "title": "Clicking on cart icon takes you to the cart page",
//                     "value": "Pass",
//                     "short": false
//                 }
//             ],
//             "image_url": "http://my-website.com/path/to/image.jpg",
//             "thumb_url": "http://example.com/path/to/thumb.png",
//             "footer": "Slack API",
//             "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
//             "ts": 123456789
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
