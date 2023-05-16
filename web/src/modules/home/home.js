//take data -> process the list into html
fetch(`http://localhost:8080/`, {
  method: 'GET',
  headers: {"Content-Type": "application/json"}
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
  var poster = document.getElementById("poster")
  poster.src = `https://image.tmdb.org/t/p/w500`+ data.posterPath
})
.catch((error) => {
  console.error('Error:', error);
});