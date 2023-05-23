const {
  movies,
  movieSeat,
  cinemaMovieView,
  shows,
  booking,
  seats,
  tickets
} = require('../../adapters/database');

const {
  tmdbMovies
} = require('../../adapters/theMovieDB');

const getSeats = (seatIds) => {
  return seats.getAllSeats()
    .then(seatObjects => {
      const data = seatObjects.map(seat => {
        return {
          id: seat.id,
          seat: seat.seatRow + seat.seatNumber
        };
      });
      return seatIds.map(seatId => {
        const seatCombined = seatId.toLowerCase();
        return data.find(seatData => seatData.seat === seatCombined).id;
      });
    })
}

const getMovieDetails = (movie) => {
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
};

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
  const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const startDate = new Date(movie.startDate);
  const endDate = new Date(movie.endDate);
  const startDay = startDate.getDate()
  const endDay = endDate.getDate()

  const dates = []
  for (let index = startDay; index < endDay + 1; index++) {
    startDate.setDate(index)
    dates.push(`${weekday[startDate.getDay()]} ${index}`)
  };
  return dates
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
    const apiMovie = await getMovieDetails(movie)
    return {
      shows: mapShows(shows),
      movie: apiMovie,
      cinemaMovieDetails : mapCinemaMovieDetails(cinemaMovieDetails),
      dates: getDates(movie)
    }
  },
  mapSeats: (seatsIds) => {
    return getSeats(seatsIds)
      .then(data => {
        return data
      });
  },
  createTickets: (data) => {
    return tickets.createTickets(data);
  },
  createBooking: (email) => {
    return booking.createBooking(email);
  },
  bookMovieSeats: (data) => {
    return movieSeat.bookMovieSeats(data);
  }
};