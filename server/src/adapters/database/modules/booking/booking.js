const {
    query
  } = require('../../service');
  
  module.exports.booking = {
    postBooking : () => {
      const statement = `
        SELECT * FROM CinemaComplexView
      `;
      return query(statement)
        .then(response => {
          console.log(response);
          return response;
        })
    }
  }