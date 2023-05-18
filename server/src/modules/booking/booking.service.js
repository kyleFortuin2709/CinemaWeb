const {
  movies,
  movieSeat,
  cinemaMovieView,
  shows,
  booking
} = require('../../adapters/database');

const {
  tmdbMovies
} = require('../../adapters/theMovieDB');

const getMovieDetails = (movie) => {
  console.log(movie);
  console.log(movie.apiMovieId);
  return tmdbMovies.getMovieDetails(movie.apiMovieId)
  .then(result => {
    return {
      movieId: movie.id,
      apiMovieId: movie.apiMovieId,
      title: result.title,
      posterPath: result.poster_path,
      backdropPath: result.backdrop_path
    }
  });

}

const getMovieSeats = (cinemaMovie) => {
  return movieSeat.getMovieSeatsByCinemaMovieId(cinemaMovie.cinemaMovieId)
    .then(seats => {
      cinemaMovie.seats = seats;
      return cinemaMovie;
    })
};

const getTime = (startDateTime) => {
  const date = new Date(startDateTime)
  return `${date.getHours() - 2}:${date.getMinutes()}`
}

const mapShows = (showsData) => {
  return showsData.map(show => {
    return {
      showId: show.id,
      time: getTime(show.startDateTime),
    }
  })
}

const getDates = (movie) => {
  console.log(movie.startDate);
  
}

const mapCinemaMovieDetail = (cinemaMovieDetail) => {
  cinemaMovieDetail.startDateTime = getTime(cinemaMovieDetail.startDateTime);
  return cinemaMovieDetail
}

const mapCinemaMovieDetails = (cinemaMovieDetails) => {
  return cinemaMovieDetails.map(details => {
    return mapCinemaMovieDetail(details);
  })
}

module.exports = {
  //      <!-- movie poster -->
      // <!-- date -->
      // <!-- time -->
      // <!-- number of tickets -->
      // <!-- 3D glasses -->
      // <!-- seat control -->
      // <!-- extras -->
  getMovie: (movieId) => {
    return movies.getMovieById(movieId)
  },
  getCinemaMoviesSeats: (cinemaMovieDetails) => {
    const promises = [];
    cinemaMovieDetails.forEach(detail => {
      promises.push(getMovieSeats(detail))
    });
    return Promise.all(promises)
  },
  getCinemaMovieDetails: (movieId) => {
    return cinemaMovieView.getDetails(movieId);
  },
  getShows: () => {
    return shows.getShows();
  },
  mapBooking: async (cinemaMovieDetails, movie, shows) => {
    getDates(movie)
    const apiMovie = await getMovieDetails(movie)
    return {
      shows: mapShows(shows),
      movie: apiMovie,
      cinemaMovieDetails : mapCinemaMovieDetails(cinemaMovieDetails)
    }
  },

}