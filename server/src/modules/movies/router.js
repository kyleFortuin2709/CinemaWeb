const {
  Router
} = require('express');
const {
  moviesController
} = require('./movies.controller');

const moviesRouter = Router();

moviesRouter.get('/:id/details',(req, res, next) => {
  return moviesController.getMovieDetails(req.params.id)
    .then(result => {
      res.status(200).json(result)
    })
    .catch((error) => {
      res.status(404).json(error)
    })
})

module.exports = {
  moviesRouter
};

