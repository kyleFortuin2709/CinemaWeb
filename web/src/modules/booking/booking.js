const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const movieId = urlParams.get('movieId');

let cinemaMovieId;
let date;
let showId;
let seatIds = [];
let ticketCounter = 0;
let glassesCounter = 0;


fetch(`http://localhost:8080/booking/movie/${movieId}`, {
  method: 'GET',
  headers: { "Content-Type": "application/json" }
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
    generatePage(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

function generatePage(data) {
  data.shows.forEach((showTime) => {
    createTimePicker(showTime.time, showTime.showId)
  });

  data.dates.forEach((date) => {
    const values = date.split(" ");
    createDatePicker(values[0], values[1])
  });

  const movieSeatContainer = document.getElementById("movieSeatContainer");

  addOnClickMovieSeat(movieSeatContainer)

}

function createDatePicker(val1, val2) {
  listItem = document.createElement("li");
  span1 = document.createElement("span");
  span2 = document.createElement("span");
  parent = document.getElementById("dates");
  parent.appendChild(listItem);
  addOnClickDateTime(listItem);
  span1.innerHTML = val1;
  span2.innerHTML = val2;
  listItem.appendChild(span1);
  listItem.appendChild(span2);
}

function createTimePicker(val, id) {

  listItem = document.createElement("li");
  parent = document.getElementById("times");
  parent.appendChild(listItem);
  listItem.id = id;
  addOnClickDateTime(listItem);
  listItem.innerHTML = val;
}



function createTicketCounterButtons(value) {
  const counterArea = document.getElementById("number-of-tickets");

  const addButton = document.createElement('button');
  addButton.classList.add('add');
  addButton.addEventListener('click', () => {
    ticketIncrement();
  });

  const addImage = document.createElement('img');
  addImage.classList.add('selectItem');
  addImage.src = '/resources/add.png';

  addButton.appendChild(addImage);
  counterArea.appendChild(addButton);

  const counter = document.createElement("span");
  counter.innerHTML = value;
  counter.id = "ticketCounter";
  counterArea.appendChild(counter);

  const removeButton = document.createElement('button');
  removeButton.classList.add('remove');
  removeButton.addEventListener('click', () => {
    ticketDecrement();
  });
  const removeImage = document.createElement('img');
  removeImage.classList.add('selectItem');
  removeImage.src = '/resources/remove.png';

  removeButton.appendChild(removeImage);
  counterArea.appendChild(removeButton);
}

function createGlassesCounterButtons(value) {
  const counterArea = document.getElementById("number-of-glasses");

  const addButton = document.createElement('button');
  addButton.classList.add('add');
  addButton.addEventListener('click', () => {
    glassesIncrement();
  });

  const addImage = document.createElement('img');
  addImage.classList.add('selectItem');
  addImage.src = '/resources/add.png';

  addButton.appendChild(addImage);
  counterArea.appendChild(addButton);

  const counter = document.createElement("h2");
  counter.innerHTML = value;
  counter.id = "glassesCounter";
  counterArea.appendChild(counter);

  const removeButton = document.createElement('button');
  removeButton.classList.add('remove');
  removeButton.addEventListener('click', () => {
    glassesDecrement();
  });
  const removeImage = document.createElement('img');
  removeImage.classList.add('selectItem');
  removeImage.src = '/resources/remove.png';

  removeButton.appendChild(removeImage);
  counterArea.appendChild(removeButton);
}

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


// Seat click event for movie seat
function addOnClickMovieSeat(movieSeatContainer) {
  movieSeatContainer.addEventListener('click', (seat) => {
    if (seat.target.classList.contains('seat') && !seat.target.classList.contains('occupied')) {
      seat.target.classList.toggle('selected-seat');
      const seatId = seat.target.id;
      if (seat.target.classList.contains('selected-seat')) {
        seatIds.push(seatId);
      } else {
        const index = seatIds.indexOf(seatId);
        if (index !== -1) {
          seatIds.splice(index, 1);
        }
      }
      console.log(seatIds)
    }
  });
}


function addOnClickDateTime(item) {
  item.addEventListener('click', function () {
    this.classList.add('active');
    var siblings = Array.from(this.parentNode.children).filter(function (el) {
      return el !== this;
    }, this);
    siblings.forEach(function (sibling) {
      sibling.classList.remove('active');
    });
  });
}

function onClickPostBooking() {
  postBooking()
	window.location.href = `/confirmation`;
}

function onClickExtras() {
  postBooking();
  window.location.href = `/extras`;
}

function postBooking() {
  fetch(`http://localhost:8080/booking`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: {
      "cinemaMovieId": cinemaMovieId,
      "movie": movieId,
      "date": date,
      "showId": showId,
      "glasses": glassesCounter,
      "seatIds": seatIds
    }
  });
}