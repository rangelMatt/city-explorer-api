'use strict';

let cache = require('./cache.js');

const axios = require('axios');

async function getWeather(latitude, longitude) {
  // let lat = request.query.lat;
  // let lon = request.query.lon;

  // create a custom key for each route and result
  const key = 'weather-' + latitude + longitude;

  // if the cache exists, AND is valid, send THAT data

  const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=3&lat=${latitude}&lon=${longitude}&`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 1000 * 60 * 60 * 24)) {
    console.log('Cache hit, found weather');
  } else {
    console.log('Cache miss, where is the weather?');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = await axios.get(url)
      .then(response => parseWeather(response.data));
  }

  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Weather {
  constructor(weatherData) {
    this.description = `Low of ${weatherData.low_temp}, high of ${weatherData.high_temp} with ${weatherData.weather.description.toLowerCase()}`;
    this.date = `${weatherData.datetime}`;
  }
}

module.exports = getWeather;
