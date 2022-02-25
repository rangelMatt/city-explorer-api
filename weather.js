'use strict';

const axios = require('axios');

// const errorResponse = require('./error.js');

// const data = require('./data/weather.json');

async function getWeather(request, response) {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&days=3&key=${process.env.WEATHER_API_KEY}`;

    let citObj = await axios.get(url);

    const weatherArr = citObj.data.data.map(day => new Forecast(day));
    // const weatherArr = cityObj.data.map(day => new Forecast(day));
    response.send(weatherArr);
  } catch (error) {
    // errorResponse(error, request, response);
  }
}

// let searchQuery = request.query.searchQuery;
// let cityObj = data.find(weather => weather.city_name.toLowerCase() === searchQuery.toLowerCase());





function Forecast(day) {
  // constructor(day) {
  this.description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description.toLowerCase()}`;
  this.date = `${day.datetime}`;
  // }
}

module.exports = getWeather;
