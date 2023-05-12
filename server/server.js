require('dotenv').config({path: `./dotenv/.env.${process.env.NODE_ENV}`});

const express = require('express');
const path = require('path');

const app = express();

const port = process.env.SERVER_PORT;

const {
    homeRouter
} = require('./src/modules/home/router');


app.get('/', homeRouter);
//create endpoint

//3. endpoint for home data -- sends data as response
app.get('/getMovies', function(req, res) {
    res.send("Hello world")

});

app.get('/movie', function(req, res) {
});

app.listen(port);
console.log(`${process.env.SERVER_NAME} Server started at http://localhost:${port}`);