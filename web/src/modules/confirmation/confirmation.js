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

	})
	.catch((error) => {
		console.error('Error:', error);
});