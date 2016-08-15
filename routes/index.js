var express = require('express');
var router = express.Router();
var collectionParser = require('../lib/collectionParsor');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});

router.get('/collection', function(req, res, next) {
	return res.send(collectionParser.getTwitterApiCollection().toJSON());
});

router.use('/mock', function(req, res, next) {
	var responseVal = collectionParser.getResponse(req.url, req.method, req.query);
	res.headers = responseVal.headers;
	res.send(responseVal);
});
module.exports = router;
