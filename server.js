'use strict';

const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3002;

const getWeather = require('./weather');
const getMovies = require('./movies');
//./movies

// - middleware - allows us to USE cors
app.use(cors());


app.get('/', (request, response) => {
  response.send('Hello, this is Server.');
});


app.get('/weather', getWeather);
app.get('/movies', getMovies);


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
