# Eventbrite API integration for Galvanize

## What is this?

A headless Node.js program which queries the Eventbrite API each day and populates the JSON data into a mysql database.

## How to use?

  1. clone and run ```npm install``` in directory.
  2. Open app/config/knexfile and alter the local configuration to your own local mysql database.
  3. ```node server.js``` to run.
