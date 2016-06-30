var eventbriteAPI = require('node-eventbrite');
var token = 'WBRCGRRSTLNGIFMWETP2';

try {
    var api = eventbriteAPI({
      token: token,
      version : 'v3'
    })
} catch (error) {
    console.log(error.message); // the options are missing, this function throws an error.
}

var getData = api.search({
		'q': 'galvanize',
		'venue.country': 'US'
	}, (err, res) => {
		return res
	})

console.log(getData);
module.exports = {
	var: 11,
	getData : getData
}