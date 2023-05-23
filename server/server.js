require('dotenv').config({path: `./dotenv/.env.${process.env.NODE_ENV}`});

const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();

const port = process.env.SERVER_PORT;

const {
    homeRouter,
    moviesRouter,
    bookingRouter,
    extrasRouter,
    confirmationRouter
} = require('./src/modules/routes');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use('/', homeRouter);
app.use('/movie', moviesRouter);
app.use('/booking', bookingRouter)
app.use('/extras', extrasRouter);
app.use('/confirmation', confirmationRouter);


app.listen(port, '0.0.0.0', () => {
    console.log(`${process.env.SERVER_NAME} Server started at ${port}`);
});