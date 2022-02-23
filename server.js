'use strict';

const express = require('express');
const cors = require('cors');

require('dotenv').config();
const PORT = process.env.PORT || 3002;

const app = express();
app.use(cors());

const data = require('./data/weather.json');



// console.log('Hello World, from our FIRST server!');


// in our servers, we MUST use require instead of import
// to create server, bring in Express. as per docs


// once we have express, we must USE express

// cors does request to the backend to the front end

// bring in dotenv if we are going to use a .env

app.get('/weather', (request, response) => {
  let searchQuery = request.query.searchQuery;

  let forecastObj = data.find(weather => weather.city_name.toLowerCase() === searchQuery.toLowerCase());
  console.log('This', forecastObj.data);
  const weatherArr = forecastObj.data.map(day => new Forecast(day));

  response.send(weatherArr);
});

app.get('*', (request, response) => {
  response.send(`WARNING: ERROR`);
});

class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.description = day.weather.description;
  }
}


// creating basic default route
app.get('/', (request, response) => {
  response.send('Hello, from our server!');
});

app.get('/banana', (request, response) => {
  response.send('mmmmm bananas');
});

app.get('/sayHello', (request, response) => {
  console.log(request.query);
  let firstName = request.query.firstName;
  let lastName = request.query.lastName;

  response.send(`Hello ${firstName} ${lastName}`);
});





app.listen(PORT, () => console.log(`Listening on port ${PORT}`));



