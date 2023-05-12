require('dotenv').config({path: `./dotenv/.env.${process.env.NODE_ENV}`});

const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();

const port = process.env.SERVER_PORT;

const {
    homeRouter,
    imagesRouter
} = require('./src/modules/routes');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', homeRouter);
app.use('/images', imagesRouter)
app.use('/getMovies', function(req, res) {
    res.send("Hello world")
});

app.use('/movie', function(req, res) {
    res.send('movies')
});

app.listen(port);
console.log(`${process.env.SERVER_NAME} Server started at http://localhost:${port}`);