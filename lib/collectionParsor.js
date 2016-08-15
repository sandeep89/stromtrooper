/**
	Module which parses postman collections into required format
*/

var fs = require('fs'), // needed to read JSON file from disk
	postmanCollection = require('postman-collection'),
	Collection = require('postman-collection').Collection,
	twitterCollection;

// Load a collection to memory from a JSON file on disk (say, sample-collection.json)
twitterCollection = new Collection(JSON.parse(
	fs.readFileSync('/Users/sandeep/Documents/project/experiments/stromtrooper/lib/twitter.postman_collection').toString()));
var collectionParsor = function() {

	/**
	 * Private functions
	 */

	/**
	 * Method to get the postman collection Item based on urlSuffix
	 */
	var getItem = function(urlSuffix) {
		var twitterUrl = "https://api.twitter.com" + urlSuffix; //eg:1.1/search/tweets.json?q=home"
		var apiItems = twitterCollection.items ? twitterCollection.items.members : [],
			matchedApiItem = null;
		for (var i = apiItems.length - 1; i >= 0; i--) {
			var apiItem = apiItems[i];
			if (apiItem && apiItem.request && apiItem.request.url.toString() == twitterUrl) {
				matchedApiItem = apiItem;
				break;
			}
		};
		return matchedApiItem;
	};

	/**
	 * Method to generate express response object.
	 * Existing response object constructor do not give an array of header objects
	 */
	var generateResponse = function(item, method, query) {
		var responses = item.responses ? item.responses.members : [],
			response = null,
			responseOut = {
				headers: {},
				body: {error: "Not found"},
				statusCode: 404
			}; // Default url not found response
		method = method ? method : 'GET';
		var status = query && query.status ? query.status: 200;
		for (var i = responses.length - 1; i >= 0; i--) {
			var currentReponse = responses[i];
			// TODO: add more query params
			if (currentReponse.code == status) {
				response = currentReponse;
				break;
			}
		};

		if (response) {
			console.log(response);
			response.headers.members.forEach(function(header) {
				responseOut.headers[header.key] = header.value;
			});
			responseOut.body = JSON.parse(response.body);
			responseOut.status = response.code;
		}
		return responseOut;
	}
	var public = {};

	/**
	 *	Method to get entire twitter api collection
	 */
	public.getTwitterApiCollection = function() {
		return twitterCollection;
	}

	/**
	 * Method to generate a mock response form stored postman collection
	 * Based on the request method and query params generate response for the request
	 */
	public.getResponse = function(url, method, query) {
		console.log(url);
		var postmanItem = getItem(url);
		postmanItem = postmanItem ? new postmanCollection.Item(postmanItem.toJSON()) : {};
		return generateResponse(postmanItem, method, query);
	}
	return public;
}

module.exports = collectionParsor();
