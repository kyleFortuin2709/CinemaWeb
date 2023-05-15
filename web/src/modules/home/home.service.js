const axios = require('axios')

//2. function called on get home -- Makes call to server to get data
const getMovies = () => {
  return axios({
    method: 'get',
    url: 'http://localhost:8080/'
  }).then(apiResponse => {
     // process the response
     const data = apiResponse.data
     console.log(data)
     return data
  })
}

const postHome = () => {
  return adapter.post('url', data, params) // params is optional
}

const postBooking = () => {
  axios
    .post(url, {
      movieid: 11,
      moviename: "Morbeus",
      movieDateTime: "",
      email: "tombrad@asd.com",
      snacks: {},
    })
    .then((response) => displayOutput(response))
    .catch((err) => console.log(err));
};

module.exports = {
  getMovies
}