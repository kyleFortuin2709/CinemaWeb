// var poster = document.getElementById("poster")

// poster.src = `https://image.tmdb.org/t/p/w500/5ik4ATKmNtmJU6AYD0bLm56BCVM.jpg`;
// // let poster


const {
  getMovie
} = require('./movieDetails.service');

const setPoster = (movieData) => {
  if (typeof window !== 'undefined') {
    console.log('elo');
    // poster = document.getElementById("poster");
  
  }
  else {
    console.log('nope');
  }
}

module.exports.movieDetails = {
  getDetails: (movieId) => {
    return getMovie(movieId)
      .then(movieData => {
        setPoster(movieData);
        return movieData;
      })
  }

}