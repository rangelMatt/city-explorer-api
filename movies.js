'use strict';

const axios = require('axios');

async function getMovie(request, response) {

  let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.Movie_API_KEY}&query=$seattle`;

  try {
    let movieData = await axios.get(movieUrl);

    const movieArr = movieData.data.total_pages.map(movie => new Blockbuster(movie));
    response.send(movieArr);
  } catch (error) {
    response.status(500).send(error.message);
  }
}

class Blockbuster {
  constructor(movieData) {
    this.movies = movieData.slice(0, 20);
  }
}

module.exports = getMovie;
