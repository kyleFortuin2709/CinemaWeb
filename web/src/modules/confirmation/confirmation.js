const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const bookingRef = urlParams.get('id');
console.log('bookingRef: ', bookingRef);