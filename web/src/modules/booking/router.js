const {
  Router
} = require('express');
const path = require('path');

const bookingRouter = Router();

const validate = (req, res, next) => {
  next()
}

bookingRouter.get('/', validate, (req, res, next) => {
  // return getMovies()
  //   .then(data => {
  //     return res.render(path.join(__dirname, '/home.html'), {welcome: data})
  //   });
  return res.render(path.join(__dirname, '/bookingRouter.html'))
});

module.exports = {
  bookingRouter
}
