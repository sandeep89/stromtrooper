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

/**
* Route which mock any required request based on the collection uplaoded
*/
router.use('/mock', function(req, res, next) {
	var responseVal = collectionParser.getResponse(req.path, req.method, req.query);
	res.headers = responseVal.headers;
	res.statusCode = responseVal.statusCode;
	res.send(responseVal.body);
});
module.exports = router;
