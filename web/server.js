const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

require('dotenv').config({path: `./dotenv/.env.${process.env.NODE_ENV}`});

const {
  homeRouter
} = require('./src/modules/home/router');

const port = process.env.WEB_PORT;
const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

app.set("view options", {layout: false});
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/resources'));

app.use('/', homeRouter)

app.listen(port);
console.log(`${process.env.SERVER_NAME} Server started at http://localhost:${port}`);