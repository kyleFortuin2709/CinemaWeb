const {
  query
} = require('../../service');

export const getAllMovies = () => {
  const statement = ``
  return query(statement);
}

export const getMovieById = (data) => {
  const statement = ``;
  const values = [
    data.id
  ];
  return query(statement, values);
}