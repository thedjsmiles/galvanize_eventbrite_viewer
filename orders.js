// require all our dependencies
var knexfile = require('./app/config/knexfile')['local']
var knex = require('knex')(knexfile)
var schedule = require('node-schedule')
var eventbriteAPI = require('node-eventbrite');
var token = 'WBRCGRRSTLNGIFMWETP2';
var eventbrite = eventbriteAPI({
  token: token,
  version: 'v3'
})

getAllGalvanizeEvents = () => {
  eventbriteData = eventbrite.user_owned_events_orders({
    'user_id': '65962156417'
  }, (err, apiRes) => {
    // truncate our table before repopulation
    knex.raw(`TRUNCATE orders;`)
      .then(() => {
        // handle paging
        //set it to an arbitrary number 
        //apiRes.pagination was creating errors
        var pages = 30
        console.log(pages);
        if(pages > 1){
          // we need to loop through the page count
          console.log('more than one page');
          for (var i = 1; i <= pages; i++) {
            eventbrite.user_owned_events_orders({
              'user_id': '65962156417',
              'page' : i
            }, (err, apiRes) => {
              // nested API call. lets append to database.
              // loop through array of events and insert each one
              apiRes.orders.forEach((val, key) => {
                knex('orders').insert({
                  'order_id': val.id
                  /*'event_name': val.name.text,
                  'event_description': val.description.text,
                  'start_timezone': val.start.timezone,
                  'start_local_time': val.start.local,
                  'start_utc': val.start.utc,
                  'end_timezone': val.end.timezone,
                  'end_local_time': val.end.local,
                  'end_utc': val.end.utc,
                  'event_created_time': val.created,
                  'event_changed_at': val.changed,
                  'capacity': val.capacity,
                  'currency': val.currency,
                  'status': val.status,
                  'listed': val.listed,
                  'shareable': val.shareable,
                  'online_event': val.online_event,
                  'tx_time_limit': val.tx_time_limit,
                  'hide_start_date': val.hide_start_date,
                  'hide_end_date': val.hide_end_date,
                  'locale': val.locale,
                  'is_locked': val.is_locked,
                  'privacy_setting': val.privacy_setting,
                  'is_series': val.is_series,
                  'is_series_parent': val.is_series_parent,
                  'is_reserved_seating': val.is_reserved_seating,
                  'logo_id': val.logo_id,
                  'organizer_id': val.organizer_id,
                  'venue_id': val.venue_id,
                  'category_id': val.category_id,
                  'subcategory_id': val.subcategory_id,
                  'format_id': val.format_id,
                  'resource_uri': val.resource_uri
                  //'logo_url': val.logo.id*/
                }).catch((e) => {console.log(e);})
              })

              console.log('page load');
            })
          }
        } else {
          // only one page. create in database
        }
      })

  })
}
// schedule our task:
// schedule.scheduleJob('*/1 * * * *', function(){
//   getAllGalvanizeEvents()
// })
// schedule.scheduleJob('*/1 * * * *', function(){
  // console.log('The answer to life, the universe, and everything!');
// })
getAllGalvanizeEvents();
// createOrUpdateEventsFromEb()
