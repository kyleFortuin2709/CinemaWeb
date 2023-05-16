// const {
//   Router
// } = require('express');
// const path = require('path');
// const {
//   movieDetails
// } = require('./movieDetails')

// const movieDetailsRouter = Router();

// movieDetailsRouter.get('/:id/details', (req, res, next) => {
//   res.render(path.join(__dirname, '/movieDetails.html'))
//   const movieId = req.params.id;
//   return movieDetails.getDetails(movieId)
//   .then(data => {
//       // return res.render(path.join(__dirname, '/movieDetails.html'))
//     })
// });

const fs = require('fs').promises;

module.exports = {
  movieDetailsRouter: async (req, res) => {
    const queryParams = req.queryParams
    const movieId = queryParams.id;
    // const data = await movieDetails.getDetails(movieId)
    return fs.readFile(__dirname + '/movieDetails.html')
  }
}
