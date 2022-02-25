'use strict';

const axios = require('axios');
// once we have express, we must USE express
const express = require('express');
const cors = require('cors');

const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3002;

let getWeather = require('./weather');

// - middleware - allows us to USE cors
app.use(cors());



app.get('/', (request, response) => {
  response.send('Hello, this is Server.');
});


app.get('/weather', getWeather);



app.get('*', (request, response) => {
  let newError = new Error;
  newError.status = 404;
  newError.message = 'Not Available';
  throw newError;
});


app.use((error, request, response, next) => {
  response.status(500).send(`${error.status}: ${error.message}`);
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
