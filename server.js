'use strict';

// once we have express, we must USE express
const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3002;
const cors = require('cors');

// - middleware - allows us to USE cors
app.use(cors());

const data = require('./data/weather.json');

app.get('/', (request, response) => {
  response.send('Hello, this is Server.');
});


app.get('/weather', (request, response) => {
  let searchQuery = request.query;
  console.log('data',data);
  console.log('search query',searchQuery);
  let cityObj = data.find(weather => weather.city_name.toLowerCase() === searchQuery.cityName.toLowerCase());
  try {


    const weatherArr = cityObj.data.map(day => new Forecast(day));

    response.send(weatherArr);
  } catch (error) {
    throw new Error('Weather not here.');
  }
});



app.get('*', (request, response) => {
  response.status(404).send('Not Available');
});


function Forecast(day) {
  // constructor(day) {
  this.description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description.toLowerCase()}`;
  this.date = `${day.datetime}`;
  // }
}

app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
