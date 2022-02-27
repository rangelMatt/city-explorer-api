'use strict';

let cache = require('./cache.js');

const axios = require('axios');

async function getMovies(req, res) {
  try {
    let nameOfCity = req.query.nameOfCity;
    const key = 'movies-' + nameOfCity;
    if (cache[key] && (Date.now() - cache[key].timestamp < 1000 * 60 * 60 * 24)) {
      console.log('Cache hit, found movies');
      res.status(200).send(cache[key].data);
    } else {
      console.log('Cache miss, where are the movies?');
      let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${req.query.location}`;

      let movieData = await axios.get(movieUrl);

      const movieArr = movieData.data.results.map(movie => new Blockbuster(movie));
      cache[key] = {};
      cache[key].timestamp = Date.now();
      cache[key].data = movieArr;
      res.send(movieArr);
    }
    return cache[key].data;
  } catch (error) {
    res.status(500).send(error.message);
  }
}

class Blockbuster {
  constructor(movie) {
    this.movie = movie.title;
  }
}
module.exports = getMovies;
