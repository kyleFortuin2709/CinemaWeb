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
let bookingEmail;
let data;
let backdropPath;

fetch(`http://13.244.38.48:8080/booking/movie/${movieId}`, {
  method: 'GET',
  headers: { "Content-Type": "application/json" }
})
  .then(response => response.json())
  .then(moviedata => {
    console.log(moviedata);
    backdropPath = getPathUrl(moviedata.movie.backdropPath);
    imageElement = document.getElementById("bannerImage");
    imageElement.src = backdropPath;
    data = moviedata;
    generatePage();
  })
  .catch((error) => {
    console.error('Error:', error);
  });

const getCinemaMovieId = () => {
  console.log("MovieDetail:" + showId)
  console.log("MovieDetails:" + data.cinemaMovieDetails)
  const movieDetail = data.cinemaMovieDetails.find(detail => {
    console.log(detail.showId);
    console.log(showId)
    console.log(detail.showId === Number(showId));
    return detail.showId === Number(showId);
  });
  console.log("MovieDetailAfter:" + movieDetail);
  return movieDetail.cinemaMovieId;
}

function getPathUrl(path) {
	return "https://image.tmdb.org/t/p/w500" + path
}

function generatePage() {
  data.shows.forEach((showTime) => {
    createTimePicker(showTime.time, showTime.showId)
  });

  data.dates.forEach((date) => {
    createDatePicker(date)
  });


  addOnClickMovieSeat()

  generateDropdown();

}

function createDatePicker(date) {
  const values = date.split(" ");
  listItem = document.createElement("li");
  span1 = document.createElement("h2");
  span2 = document.createElement("h2");
  parent = document.getElementById("dates");
  parent.appendChild(listItem);
  listItem.id = date
  addOnClickDate(listItem);
  span1.innerHTML = values[0];
  span2.innerHTML = values[1];
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
      date = this.id;
      console.log("date: "+date);
    } else {
      date = undefined;
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

function saveEmail() {
  bookingEmail = document.getElementById('emailInput').value;
  console.log('Email saved:', bookingEmail);
}

function validateEmail(email) {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!regex.test(email)) {
    throw new Error("Invalid email");
  }
  else {
    return true;
  }
}


// Seat click event for movie seat
function addOnClickMovieSeat() {
  const movieSeatContainer = document.getElementById("movieSeatContainer");
  movieSeatContainer.addEventListener('click', (seat) => {
    if (seat.target.classList.contains('seat') && !seat.target.classList.contains('occupied')) {
      seat.target.classList.toggle('selected-seat');
      const seatId = seat.target.id;
      if (seat.target.classList.contains('selected-seat')) {
        seatIds.push(Number(seatId));
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
  bookingEmail = document.getElementById('emailInput').value;
  cinemaMovieId = getCinemaMovieId();

  if (!validateEmail(bookingEmail)) {
    console.log(error.message);
    return;
  }
  else{
    return postBooking()
    .then((data) => {
      console.log('Email saved:', bookingEmail);
      window.location.href = `/confirmation?id=${data.refNo}`;
    });
  }
};

function onClickExtras() {
  bookingEmail = document.getElementById('emailInput').value;
  cinemaMovieId = getCinemaMovieId();

  if (!validateEmail(bookingEmail)) {
    console.log(error.message);
    console.log("Email: " + bookingEmail)
    return;
  }
  else{
    return postBooking()
    .then((data) => {
      console.log('Email saved:', bookingEmail);
      window.location.href = `/extras?id=${data.refNo}`;
    });
  }
};

function postBooking() {
  //check if any fields are blank and return retry + error popup
  const body = JSON.stringify({
    cinemaMovieId: cinemaMovieId,
    movie: movieId,
    date: date,
    showId: Number(showId),
    seatIds: seatIds,
    email: bookingEmail
  })
  console.log('body : ', body);
  return fetch(`http://13.244.38.48:8080/booking`, {
    method: 'POST',
    mode: "cors",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body
  })
  .then(response => response.json());
};