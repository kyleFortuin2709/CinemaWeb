const {
  tmdbMovies
} = require('../../adapters/theMovieDB');
const {
  movies
} = require('../../adapters/database');


const mapGenres = (genres) => {
  return genres.map(genre => {
    return genre.name
  }).join(' /')
};

const formatRunTime = (runtime) => {
  const sixtyMinutes = 60;
  const hours = Math.floor(runtime / sixtyMinutes)
  const minutes = runtime - (hours * sixtyMinutes)
  const hourString = hours > 1 ? 'Hours' : 'Hour';
  return `${hours} ${hourString} ${minutes} Min`
}

module.exports = {
  getMovie: (movieId) => {
    return movies.getMovieById(movieId)
  },
  getMovieDetails: (apiMovieId) => {
    return tmdbMovies.getMovieDetails(apiMovieId)
    .then(result => {
      const genres = mapGenres(result.genres)
      const runTime = formatRunTime(result.runtime);
      return {
        runTime,
        apiMovieId,
        genres,
        title: result.title,
        posterPath: result.poster_path,
        language: 'English',
        release: result.release_date.split('-')[0],
        overview: result.overview
      }
    });

  }
};