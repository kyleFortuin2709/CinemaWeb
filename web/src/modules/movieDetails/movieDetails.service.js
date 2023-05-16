const axios = require('axios')

const getMovie = (movieId) => {
  return axios({
    method: 'get',
    url: `http://localhost:8080/movie/${movieId}/details`
  }).then(apiResponse => {
     // process the response
     const data = apiResponse.data
     console.log(data)
     return data
  })
}


module.exports = {
  getMovie
}