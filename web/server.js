require('dotenv').config({path: `./dotenv/.env.${process.env.NODE_ENV}`});

const express = require('express');
const path = require('path');

const app = express();

const port = process.env.WEB_PORT;

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/home.html'));
});

app.get('/movie', function(req, res) {
  res.sendFile(path.join(__dirname, '/movieDetails.html'));
});

app.use((req, res, error, next) => {

})

app.listen(port);
console.log(`${process.env.SERVER_NAME} Server started at http://localhost:${port}`);