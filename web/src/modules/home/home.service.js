
const {
  adapter
} = require('?');

export const getHomeInfo = () => {
  // call server url to /home
  return adapter.get('url', params) // this is Initial idea for adapter
}

//2. function called on get home -- Makes call to server to get data
export const getMovies = () => {
  axios({
    method: 'get',
    url: 'http://localhost:8080/getMovies'
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

export function getMovies()