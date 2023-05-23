const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const bookingRef = urlParams.get('id');
console.log('bookingRef: ', bookingRef);

fetch(`http://13.244.38.48:8080/confirmation/${bookingRef}`, {
	method: 'GET',
	headers: { "Content-Type": "application/json" }
})
	.then(response => response.json())
	.then(data => {
		console.log(data);
		const poster = document.getElementById("poster")
		poster.src = `https://image.tmdb.org/t/p/w500`+ data.posterPath
		
		const backdrop = document.getElementById("backdrop")
		backdrop.src = `https://image.tmdb.org/t/p/w500`+ data.backdropPath
            
		document.getElementById('movieTitle').textContent = data.title;
		document.getElementById('movieTitle1').textContent = data.title;
		document.getElementById('bookingSeats').textContent = data.seats;
		document.getElementById('bookingSeats1').textContent = data.seats;
		document.getElementById('movieDate').textContent = data.date;
		document.getElementById('movieDate1').textContent = data.date;
		document.getElementById('movieStartTime').textContent = data.startTime;
		document.getElementById('movieStartTime1').textContent = data.startTime;
		document.getElementById('movieEndTime').textContent = data.endTime;
		document.getElementById('movieEndTime1').textContent = data.endTime;
		document.getElementById('cinemaName').textContent = data.cinemaName;
		document.getElementById('bookingPrice').textContent = data.price;

	})
	.catch((error) => {
		console.error('Error:', error);
});