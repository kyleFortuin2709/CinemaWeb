const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const movieId = urlParams.get('movieId');
console.log(movieId);

fetch(`http://13.244.38.48:8080/movie/${movieId}/details`, {
  method: 'GET',
  headers: {"Content-Type": "application/json"}
})
.then(response => response.json())
.then(data => {
  console.log(data);
  const poster = document.getElementById("poster")
  poster.src = `https://image.tmdb.org/t/p/w500`+ data.posterPath

  document.getElementById('movieTitle').textContent = data.title;
  document.getElementById('runtime').textContent = data.runTime;
  document.getElementById('genres').textContent = data.genres;
  document.getElementById('language').textContent = data.language;
  document.getElementById('release').textContent = data.release;
  document.getElementById('overview').textContent = data.overview;

  document.getElementById('bookTicket')
    .addEventListener('click', function() {
      const url = `/booking?movieId=${movieId}`;
      window.location.href = url;
    });
})
.catch((error) => {
  console.error('Error:', error);
});
