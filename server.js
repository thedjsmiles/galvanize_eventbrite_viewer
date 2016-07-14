// require all our dependencies
var morgan = require('morgan')
var port = process.env.PORT || 3000

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'eventbrite'
  }
})
var eventbriteAPI = require('node-eventbrite');
var token = 'WBRCGRRSTLNGIFMWETP2';
var eventbrite = eventbriteAPI({
  token: token,
  version: 'v3'
})

createOrUpdateEventsFromEb = () => {

  eventbriteData = eventbrite.search({
    'q': 'galvanize',
    'venue.country': 'US'
  }, (err, apiRes) => {
    // truncate our table before repopulation
    knex.raw(`TRUNCATE events;`)
      .then(() => {
        // handle paging
        var pages = apiRes.pagination.page_count
        console.log(pages);
        if(pages > 1){
          // we need to loop through the page count
          console.log('more than one page');
          for (var i = 1; i <= pages; i++) {
            eventbrite.search({
              'q' : 'galvanize',
              'venue.country': 'US',
              'page' : i
            }, (err, apiRes) => {
              // nested API call. lets append to database.
              // loop through array of events and insert each one
              apiRes.events.forEach((val, key) => {
                knex('events').insert({
                  'event_name': val.name.text,
                  'event_id': val.id,
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
                  'subcategory_id': val.subcategory_id,
                  'category_id': val.category_id,
                  'format_id': val.format_id,
                  'resource_url': val.resource_url,
                  'logo_url': val.logo_url
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

createOrUpdateEventsFromEb()
