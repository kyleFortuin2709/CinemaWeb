const {
  Router
} = require('express');

const {
  images
} = require('../../adapters/theMovieDB');

const imagesRouter = Router();


imagesRouter.get('/', (req, res, next) => {
  return images.getImagePosterFilePathByMovieId(640146)
    .then(result => {
      res.json(result)
    })
})

module.exports = {
  imagesRouter
};
