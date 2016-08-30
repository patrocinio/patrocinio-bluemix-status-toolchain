var express = require('express'),
  R = require('ramda'),
  Promise = require('bluebird'),
  router = express.Router(),
  Bluemix = require('../lib/bluemix');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Bluemix Status',
  });
});

router.get('/api/bluemix/org', function(req, res, next){
  var bluemix = new Bluemix();
  bluemix.getOrgs().then((data) => {
    res.send(data);
  });
});

router.get('/api/bluemix/space/:space/apps', function(req, res, next){
  var bluemix = new Bluemix();
  bluemix.getSpaceApps(req.params.space).done((promises) => {
    res.send({data: promises});
}, console.error);
});

module.exports = router;
