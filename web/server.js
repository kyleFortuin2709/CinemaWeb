require('dotenv').config({path: `./dotenv/.env.${process.env.NODE_ENV}`});

const express = require('express');
const path = require('path');
const {
  homeRouter
} = require('./src/modules/home/router');
const app = express();

const port = process.env.WEB_PORT;

app.use('/', homeRouter)
app.use(express.static(path.join(__dirname, 'home')));
// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, '/home.html'));
// });

// app.get('/movie', function(req, res) {
//   res.sendFile(path.join(__dirname, '/movieDetails.html'));
// });

// app.use((req, res, error, next) => {

// })

app.listen(port);
console.log(`${process.env.SERVER_NAME} Server started at http://localhost:${port}`);