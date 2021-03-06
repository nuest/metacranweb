var request = require('request');
var cache = require('../lib/cache');
var urls = require('../lib/urls');

function cleanup(x) { return JSON.parse(x).stars; }

function get_gh_stars(package, callback) {

    cache('ghstars:' + package, callback, cleanup, function(key, cb) {
	var url = urls.docsdb + '/gh-stars/' + package;
	request(url, function(error, response, body) {
	    if (error || response.statusCode != 200) {
		cb(null, '{}');
	    } else {
		cb(null, body);
	    }
	});
    });
}

module.exports = get_gh_stars;
