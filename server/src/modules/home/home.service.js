const {
  tmdbMovies
} = require('../../adapters/theMovieDB');
const {
  movies
} = require('../../adapters/database')

const getMovieDetails = (data) => {
  return tmdbMovies.getMovieDetails(data.apiMovieId)
    .then(result => {
      return {
        ...data,
        ...result
      };
    });
};

const getDate = (date) => {
  return date.toLocaleDateString('en-CA').split('T')[0];
}

const mapMovieDetail = (data) => {
  return {
    backdropPath: data.backdrop_path,
    genres: data.genres,
    title: data.title,
    runtime: data.runtime,
    posterPath: data.poster_path,
    overview: data.overview,
    apiMovieId: data.apiMovieId,
    startDate: getDate(data.startDate),
    endDate: getDate(data.endDate)
  }
}

const settleMovieDetailsPromises= (movieDetailsPromises) => {
  return Promise.allSettled(movieDetailsPromises)
    .then(results => {
      return results.map(result => {
        if(result.status === 'fulfilled') {
          return mapMovieDetail(result.value);
        };
      });
    });
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
  getFilters: (nowShowingData, comingSoonData) => {
    const genres = getGenres(nowShowingData, comingSoonData);
    return {
      genres
    }
  }
}

const getGenres = (nowShowingData, comingSoonData) => {
  const nowShowingDataGenres = mapGenres(nowShowingData);
  const comingSoonDataGenres = mapGenres(comingSoonData);
  return removeDuplicates([nowShowingDataGenres, comingSoonDataGenres]);
}

const mapGenres = (movies) => {
  return movies.map(movie => {
    return movie.genres
  })
  .flatMap(data => data)
  .map(genres => {
    return genres.name
  })
}

const removeDuplicates = (genreData) => {
  const genres = genreData.flatMap(data => data);
  return [...new Set(genres)]
}