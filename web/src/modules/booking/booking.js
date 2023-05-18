const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const movieId = urlParams.get('movieId');

fetch(`http://localhost:8080/booking/movie/${movieId}`, {
  method: 'GET',
  headers: {"Content-Type": "application/json"}
})
.then(response => response.json())
.then(data => {
  console.log(data);
})
.catch((error) => {
  console.error('Error:', error);
});
