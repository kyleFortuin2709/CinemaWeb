const {
  Router
} = require('express');
const path = require('path');
const {
  getMovies
} = require('./home.service')

const homeRouter = Router();

const validate = (req, res, next) => {
  next()
}

homeRouter.get('/', validate, (req, res, next) => {
  return getMovies()
    .then(data => {
      return res.render(path.join(__dirname, '/home.html'), {welcome: data})
    });
});

module.exports = {
  homeRouter
}
