const {
  Router
} = require('express');
const path = require('path');
const {
  getMovies
} = require('./movieDetails.service')

const movieDetailsRouter = Router();

const validate = (req, res, next) => {
  next()
}

movieDetailsRouter.get('/getMovie', validate, (req, res, next) => {
  return getMovie()
    .then(data => {
      res.send("movieID is set to " + req.params.movieId);
    });
});

module.exports = {
  movieDetailsRouter
}
