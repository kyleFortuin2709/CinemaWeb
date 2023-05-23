let cinemaData = {
  "cinemas": [
  {
    cinemaId: 1,
    cinema: "Menlyn Park"
  },
  {
    cinemaId: 2,
    cinema: "Emperors Palace"
  },
  {
    cinemaId: 3,
    cinema: "Board Walk"
  },
  {
    cinemaId: 4,
    cinema: "The Glen"
  },
]};

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const movieId = urlParams.get('movieId');

let cinemaMovieId;
let cinemaId;
let date;
let showId;
let seatIds = [];
let ticketCounter = 0;
let glassesCounter = 0;


fetch(`http://13.244.38.48:8080/booking/movie/${movieId}`, {
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


  addOnClickMovieSeat()

  generateDropdown();

}

function createDatePicker(val1, val2) {
  listItem = document.createElement("li");
  span1 = document.createElement("h2");
  span2 = document.createElement("h2");
  parent = document.getElementById("dates");
  parent.appendChild(listItem);
  addOnClickDate(listItem);
  span1.innerHTML = val1;
  span2.innerHTML = val2;
  listItem.appendChild(span1);
  listItem.appendChild(span2);
}

function createTimePicker(val, id) {
  var listItem = document.createElement("li");
  var parent = document.getElementById("times");
  parent.appendChild(listItem);
  listItem.id = id;
  console.log("id: " + id);
  console.log("listItem.id: " + listItem.id);
  listItem.innerHTML = val;
  addOnClickTime(listItem);
}

function addOnClickTime(item) {
  item.addEventListener('click', function () {
    var isActive = this.classList.contains('active');

    var elements = Array.from(this.parentNode.children);
    elements.forEach(function (el) {
      el.classList.remove('active');
    });

    if (!isActive) {
      this.classList.add('active');
      showId = this.id;
      console.log("showId: "+showId);
    } else {
      showId = undefined;
    }
  });
}

function addOnClickDate(item) {
  item.addEventListener('click', function () {
    var isActive = this.classList.contains('active');

    var elements = Array.from(this.parentNode.children);
    elements.forEach(function (el) {
      el.classList.remove('active');
    });

    if (!isActive) {
      this.classList.add('active');
      showId = this.id;
      console.log("showId: "+showId);
    } else {
      showId = undefined;
    }
  });
}

// Add the dropdown to the page
function generateDropdown(){
  dropdown.addEventListener("change", function() {
    cinemaId = this.value;
    console.log(cinemaId); // Log the selected cinemaId
  });
  
  cinemaData.cinemas.forEach(function(cinemaItem) {
    const option = document.createElement("option");
    console.log(cinemaItem);
    option.value = cinemaItem.cinemaId;
    option.text = cinemaItem.cinemaName;
    dropdown.appendChild(option);
  });

  const dropdown = document.createElement("select");
  const container = document.getElementById("dropdownContainer");
  container.appendChild(dropdown);
}


// Seat click event for movie seat
function addOnClickMovieSeat() {
  const movieSeatContainer = document.getElementById("movieSeatContainer");
  movieSeatContainer.addEventListener('click', (seat) => {
    if (seat.target.classList.contains('seat') && !seat.target.classList.contains('occupied')) {
      seat.target.classList.toggle('selected-seat');
      const seatId = seat.target.id;
      if (seat.target.classList.contains('selected-seat')) {
        seatIds.push(seatId);
      } 
      else {
        const index = seatIds.indexOf(seatId);
        if (index !== -1) {
          seatIds.splice(index, 1);
        }
      }
      console.log(seatIds)
    }
  });
}


function onClickPostBooking() {
  return postBooking()
  .then((data) => {
    window.location.href = `/confirmation?id=${data.refNo}`;
  });
};

function onClickExtras() {
  return postBooking()
  .then((data) => {
    window.location.href = `/extras?id=${data.refNo}`;
  });
};

function postBooking() {
  return fetch(`http://13.244.38.48:8080/booking`, {
    method: 'POST',
    mode: "cors",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    // body: JSON.stringify({
    //   cinemaMovieId: cinemaMovieId,
    //   movie: movieId,
    //   date: date,
    //   showId: showId,
    //   glasses: glassesCounter,
    //   seatIds: seatIds
    // })
    body: JSON.stringify({
      "cinemaMovieId": 1,
      "movie":"1",
      "showId": 1,
      "glasses":0,
      "seatIds":["A3", "A4"]
    })
  })
  .then(response => response.json());
};