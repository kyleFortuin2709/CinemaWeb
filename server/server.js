require('dotenv').config({path: `./dotenv/.env.${process.env.NODE_ENV}`});

const express = require('express');
const path = require('path');

const app = express();

const port = process.env.SERVER_PORT;

//create endpoint
app.get('/', function(req, res) {
});

app.get('/movie', function(req, res) {
});

app.listen(port);
console.log(`${process.env.SERVER_NAME} Server started at http://localhost:${port}`);