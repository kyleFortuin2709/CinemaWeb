const { homeRouter } = require('./home/router');
const { imagesRouter } = require('./images/router');
const { moviesRouter } = require('./movies/router');
const { bookingRouter } = require('./booking/router');
const { extrasRouter } =require('./extras/router');

module.exports = {
  homeRouter,
  imagesRouter,
  moviesRouter,
  bookingRouter,
  extrasRouter
}