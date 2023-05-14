const {
  tmdbMovies
} = require('../../adapters/theMovieDB');
const {
  movies,
  shows
} = require('../../adapters/database')

const getDateArray = (date) => {
  return date.toLocaleDateString('en-CA').split('T');
};

const getMovieDetails = (data) => {
  return tmdbMovies.getMovieDetails(data.apiMovieId)
    .then(result => {
      return {
        ...data,
        ...result
      };
    });
};

const mapMovieDetail = (data) => {
  return {
    backdropPath: data.backdrop_path,
    genres: data.genres,
    title: data.title,
    runtime: data.runtime,
    posterPath: data.poster_path,
    apiMovieId: data.apiMovieId,
    movieId: data.movieId,
    startDate: getDateArray(data.startDate)[0],
    endDate: getDateArray(data.endDate)[0]
  };
};

const settleMovieDetailsPromises= (movieDetailsPromises) => {
  return Promise.allSettled(movieDetailsPromises)
    .then(results => {
      return results.map(result => {
        if(result.status === 'fulfilled') {
          return mapMovieDetail(result.value);
        };
      });
    });
};

const getGenres = (nowShowingData, comingSoonData) => {
  const nowShowingDataGenres = mapGenres(nowShowingData);
  const comingSoonDataGenres = mapGenres(comingSoonData);
  return removeDuplicates([nowShowingDataGenres, comingSoonDataGenres]);
};

const mapGenres = (movies) => {
  return movies.map(movie => {
    return movie.genres;
  })
  .flatMap(data => data)
  .map(genres => {
    return genres.name
  });
};

const removeDuplicates = (genreData) => {
  const genres = genreData.flatMap(data => data);
  return [...new Set(genres)];
};

const mapShows = (showsData) => {
  return showsData.map(show => {
    const date = new Date(show.startDateTime)
    return `${date.getHours() - 2}:${date.getMinutes()}`
  })
}

module.exports = {
  getBannerDetails: (movieData) => {
    const promises = [];
    movieData.forEach(data => {
      promises.push(getMovieDetails(data));
    });
    return settleMovieDetailsPromises(promises);
  },
  getNowShowingDetails: (movieData) => {
    const promises = [];
    movieData.forEach(data => {
      promises.push(getMovieDetails(data));
    });
    return settleMovieDetailsPromises(promises);
  },
  getComingSoonDetails: (movieData) => {
    const promises = [];
    movieData.forEach(data => {
      promises.push(getMovieDetails(data));
    });
    return settleMovieDetailsPromises(promises);
  },
  getNowShowingMovies: () => {
    return movies.getNowShowingMovies();
  },
  getComingSoonMovies: () => {
    return movies.getComingSoonMovies();
  },
  getShows: () => {
    return shows.getShows();
  },
  getFilters: (nowShowingData, comingSoonData, showsData) => {
    const genres = getGenres(nowShowingData, comingSoonData);
    const shows = mapShows(showsData);
    return {
      genres,
      shows
    };
  }
};