// fetch(`http://localhost:8080/movie/1/details`, {
//   method: 'GET',
//   headers: {"Content-Type": "application/json"}
// })
// .then(response => response.json())
// .then(data => {
//   console.log('Success:', data);
//   var poster = document.getElementById("poster")
//   poster.src = `https://image.tmdb.org/t/p/w500`+ data.posterPath
// })
// .catch((error) => {
//   console.error('Error:', error);
// });

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const movieId = urlParams.get('movieId');

// Use the movieId as needed
console.log("movieId:", movieId);