// our router file for our API
var express = require('express')
router = express.Router()
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



router.route('/').get(function(req, res) {
  eventbriteData = api.search({
      'q': 'galvanize',
      'venue.country': 'US'
    }, (err, apiRes) => {
    res.json(apiRes)  
  })
})


// send our router to our app
module.exports = router
