
const {
  adapter
} = require('?');

export const getHomeInfo = () => {
  // call server url to /home
  return adapter.get('url', params) // this is Initial idea for adapter
}

const postHome= () => {
  return adapter.post('url', data, params) // params is optional
}