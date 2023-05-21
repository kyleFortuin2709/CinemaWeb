const {
  apiCall
} = require('../service');

module.exports.images = {
  getImageBackDropFilePathByMovieId: (movieId) => {
    const path = `${movieId}/images`;
    return apiCall({path})
      .then(result => {
        const data = result.backdrops.find(data => data.iso_639_1 === 'en');
        return {
          filePath: data.file_path
        }
      })
  },
  getImagePosterFilePathByMovieId: (movieId) => {
    const path = `${movieId}/images`;
    return apiCall({path})
      .then(result => {
        const data = result.backdrops.find(data => data.iso_639_1 === 'en');
        return {
          filePath: data.file_path
        }
      })
  },
}