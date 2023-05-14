const {
  Router
} = require('express');
const path = require('path');

const extrasRouter = Router();

const validate = (req, res, next) => {
  next()
}

extrasRouter.get('/', validate, (req, res, next) => {
  // return getMovies()
  //   .then(data => {
  //     return res.render(path.join(__dirname, '/home.html'), {welcome: data})
  //   });
  return res.render(path.join(__dirname, '/home.html'), {welcome: "Hello!"})
});

module.exports = {
  extrasRouter
}
