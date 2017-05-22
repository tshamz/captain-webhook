'use strict';

const Q = require('q');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
const router = express.Router();

const index = require('./routes/index.js');
const sites = require('./routes/sites.js');
const preDeploy = require('./routes/preDeploy.js');
const postDeploy = require('./routes/postDeploy.js');

app.set('port', process.env.PORT || 5000);

app.use(router);
app.use(methodOverride());

router.all('*', function(req, res, next){
  if (!req.get('Origin')) {
    return next();
  }
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  if ('OPTIONS' == req.method) {
    return res.send(200);
  }
  next();
});

// API routes
router.get('/', index.get);
router.post('/', index.post);
router.get('/sites', sites.get);
router.get('/sites/:site', sites.getWithParam);
router.post('/sites', sites.post);
router.post('/pre', preDeploy.post);
router.post('/post', postDeploy.post);

app.use(function(req, res, next){  // if route not found, respond with 404
  const jsonData = {
    status: 'ERROR',
    message: 'Sorry, we cannot find the requested URI'
  };
  res.status(404).json(jsonData);  // set status as 404 and respond with data
});

const createExpressServer = function () {
  http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
  });
};

createExpressServer();
