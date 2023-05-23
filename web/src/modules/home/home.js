function generateImages(data) {
	const nowShowing = document.getElementById('nowShowing');
	const comingSoon = document.getElementById('comingSoon');

	// Loop through the image paths array
	data.nowShowingData.forEach((item) => {
		const movieId = item.movieId;
		const posterPath = item.posterPath;

		const listItem = document.createElement('li');
		const image = document.createElement('img');
		image.src = getPathUrl(posterPath);
		image.id = movieId
		listItem.appendChild(image);
		nowShowing.appendChild(listItem);

		listItem.classList.add('col');
		listItem.addEventListener('click', function () {
			// Route to /movie.html with movieId as a query parameter
			const url = `/movie?movieId=${movieId}`;
			window.location.href = url;
		});

		console.log("movieId:", movieId);
		console.log("posterPath:", posterPath);
	});

	data.comingSoonData.forEach((item) => {
		const movieId = item.movieId;
		const posterPath = item.posterPath;

		const listItem = document.createElement('li');
		const image = document.createElement('img');
		image.src = getPathUrl(posterPath);
		image.id = movieId
		listItem.appendChild(image);
		comingSoon.appendChild(listItem);

		listItem.classList.add('col');
		listItem.addEventListener('click', function () {
			// Route to /movie.html with movieId as a query parameter
			const url = `/movie?movieId=${movieId}`;
			window.location.href = url;
		});

		console.log("movieId:", movieId);
		console.log("posterPath:", posterPath);
	});
}

document.addEventListener("DOMContentLoaded", function() {
	const navigationPlaceholder = document.getElementById("navigationPlaceholder");
	const navigationURL = "/resources/navigation.html";
	
	fetch(navigationURL)
	  .then(response => response.text())
	  .then(data => {
		navigationPlaceholder.innerHTML = data;
	  })
	  .catch(error => {
		console.error("Error fetching navigation:", error);
	  });
  });

fetch(`http://localhost:8080/`, {
	method: 'GET',
	headers: { "Content-Type": "application/json" }
})
	.then(response => response.json())
	.then(data => {
		generateImages(data);

	})
	.catch((error) => {
		console.error('Error:', error);
	});


function getPathUrl(path) {
	return "https://image.tmdb.org/t/p/w500" + path
}