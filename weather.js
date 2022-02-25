'use strict';

const axios = require('axios');

// const errorResponse = require('./error.js');

// const data = require('./data/weather.json');

async function getWeather(request, response) {

  let lat = request.query.lat;
  let lon = request.query.lon;

  let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=3&lat=${lat}&lon=${lon}&`;
  try {
    let weatherData = await axios.get(url);

    const weatherArr = weatherData.data.data.map(day => new Forecast(day));
    // const weatherArr = cityObj.data.map(day => new Forecast(day));
    response.send(weatherArr);
  } catch (error) {
    response.status(500).send(error.message);
  }
}
class Forecast {
  constructor(weatherData) {
    this.description = `Low of ${weatherData.low_temp}, high of ${weatherData.high_temp} with ${weatherData.weather.description.toLowerCase()}`;
    this.date = `${weatherData.datetime}`;
  }
}

module.exports = getWeather;


