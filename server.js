'use strict';

const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3002;

const weather = require('./modules/weather');
const getMovies = require('./modules/movies');

// app.get('/', (request, response) => {
//   response.send('Hello, this is Server.');
// });

app.use(cors());

app.get('/weather', weatherHandler);
app.get('/movies', getMovies);

async function weatherHandler(request, response) {
  const lat = request.query.lat;
  const lon = request.query.lon;
  console.log('look', lat, lon);
  weather(lat, lon)
    .then(summaries => response.send(summaries))

    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!');

    });
}

app.listen(PORT, () => console.log(`Server up on ${PORT}`));
