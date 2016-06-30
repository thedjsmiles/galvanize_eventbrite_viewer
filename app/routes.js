// our router file for our API
var express = require('express')
router = express.Router()
var eventbriteAPI = require('node-eventbrite');
var token = 'WBRCGRRSTLNGIFMWETP2';
var api = eventbriteAPI({
  token: token,
  version : 'v3'
})
var db = require('./config/db.js')


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
