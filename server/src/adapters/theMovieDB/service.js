const axios = require('axios')

const tmdbUrl = 'https://api.themoviedb.org/3/movie/';
const key = 'd4b67fd57d1cdeb41b8695e4ae790cf0';

module.exports = {
  apiCall: (data) => {
    const {path, urlQuery} = data;
    const apiKey = `?api_key=${key}`
    const query = urlQuery ? `${apiKey}&${urlQuery}` : apiKey
    return axios({
      method: 'get',
      url: `${tmdbUrl}${path}${query}`
    }).then(data => {
      return data.data;
    });
  }
};