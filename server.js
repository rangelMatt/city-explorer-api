'use strict';

console.log('Hello World, from our FIRST server!');

// in our servers, we MUST use require instead of import
// to create server, bring in Express. as per docs
const express = require('express');

// once we have express, we must USE express
const app = express();

// bring in dotenv if we are going to use a .env

require('dotenv').config();
const PORT = process.env.PORT || 3002;


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


