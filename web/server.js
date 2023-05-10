require('dotenv').config({path: `./dotenv/.env.${process.env.NODE_ENV}`});

const express = require('express');
const cors = require('cors');
const path = require('path');
const {
  homeRouter
} = require('./src/modules/home/router');

const port = process.env.WEB_PORT;

const app = express();

app.use(cors())

app.use(express.static('resources'));

app.use('/', homeRouter)
app.use(express.static(path.join(__dirname, 'home')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/home.html'));
});

//1. Web hits this endpoint to get home -> should return home page
app.get('/home', function(req, res) {
  res.send(getMovies())
});

app.use((req, res, error, next) => {

})

app.listen(port);
console.log(`${process.env.SERVER_NAME} Server started at http://localhost:${port}`);