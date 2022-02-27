'use strict';

const axios = require('axios');

async function getMovies(request, response) {
  let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${request.query.location}`;

  try {
    let movieData = await axios.get(movieUrl);

    const movieArr = movieData.data.results.map(movie => new Blockbuster(movie));
    response.send(movieArr);
  } catch (error) {
    response.status(500).send(error.message);
  }
}

class Blockbuster {
  constructor(movie) {
    this.movie = movie.title;
  }
}

module.exports = getMovies;
