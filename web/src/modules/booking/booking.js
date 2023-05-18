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
  const datePicker = document.getElementById("date-picker");
  const timePicker = document.getElementById("timePicker");

  data.shows.forEach((showTime) => {
    const timeListItem = document.createElement('li');
    timeListItem.addEventListener('click', function () {
      selectTime(this, showTime.time);
		});
    timeListItem.innerHTML = showTime.time;
    timePicker.appendChild(timeListItem);
  })
})
.catch((error) => {
  console.error('Error:', error);
});

function selectTime(selectedItem, date) {
  const dateItems = document.querySelectorAll('.time-picker li');
  dateItems.forEach(function(item) {
    item.classList.remove('selected');
  });
  selectedItem.classList.add('selected');
  console.log('Selected time:', time);
  // Your code for handling the selected time
}


function selectTime(selectedItem, time) {
  const timeItems = document.querySelectorAll('.time-picker li');
  timeItems.forEach(function(item) {
    item.classList.remove('selected');
  });
  selectedItem.classList.add('selected');
  console.log('Selected time:', time);
  // Your code for handling the selected time
}

let ticketCounter = 0;

function ticketIncrement() {
  if (ticketCounter == 48) {
  return;
  }
  ticketCounter++;
  updateTicketCounterValue();
}

function ticketDecrement() {

  if (ticketCounter > 0) {
    ticketCounter--;
    updateTicketCounterValue();
  }

}

function updateTicketCounterValue() {
  document.getElementById('ticketCounter').textContent = ticketCounter.toString();
}

let glassesCounter = 0;

function glassesIncrement() {
  if (glassesCounter == 48) {
  return;
  }
  glassesCounter++;
  updateGlassesCounterValue();
}

function glassesDecrement() {

  if (glassesCounter > 0) {
    glassesCounter--;
    updateGlassesCounterValue();
  }

}

function updateGlassesCounterValue() {
  document.getElementById('glassesCounter').textContent = glassesCounter.toString();
}