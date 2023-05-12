const {
  Router
} = require('express');

const {
  cinemas
} = require('../../adapters/database');

const homeRouter = Router();


homeRouter.get('/', (req, res, next) => {
  return cinemas.getAllCinemas()
    .then(result => {
      res.json(result.recordsets[0]);
    })
})

module.exports = {
  homeRouter
};

