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
		var apiItems = twitterCollection.items ? twitterCollection.items.members : [] ,
			matchedApiItem = {};
		for (var i = apiItems.length - 1; i >= 0; i--) {
			var apiItem = apiItems[i];
			if (apiItem && apiItem.request && apiItem.request.url.toString() == twitterUrl) {
				matchedApiItem = apiItem;
				break;
			}
		};
		return matchedApiItem;
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
		var postmanItem = getItem(url);
		postmanItem = new postmanCollection.Item(postmanItem.toJSON());
		var postmanResponse = [];
		if(postmanItem && postmanItem.responses){
			postmanItem.responses.members.forEach( function(response){
				postmanResponse.push(new postmanCollection.Response(response));
			});
			return postmanResponse;
		}
	}
	return public;
}

module.exports = collectionParsor();
