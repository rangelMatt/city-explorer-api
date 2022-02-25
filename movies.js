'use strict';

const axios = require('axios');

async function getMovie(request, response) {

  let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.Movie_API_KEY}&query=$seattle`;

  try {
    let movieData = await axios.get(movieUrl);

    const movieArr = movieData.data.data.map(day => new Forecast(day));
  }
}

module.exports = getMovies;