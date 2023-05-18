const { query } = require('../../service');

module.exports.extras = {
  getAllExtras: () => {
    console.log('Get Extras');
    const statement = `
    SELECT
      *
    FROM "Extras"
  `;
  return query(statement)
    .then(results => {
      return results.recordset;
    })
  },
}