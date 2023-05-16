const http = require("http");

require('dotenv').config({path: `./dotenv/.env.${process.env.NODE_ENV}`});

const {
  homeRouter
} = require('./src/modules/home/router');
const {
  movieDetailsRouter
} = require('./src/modules/movieDetails/router');

const port = process.env.WEB_PORT;

const requestListener = async function (req, res) {
  switch (req.url) {
    case '/':
      await homeRouter(req, res)
      .then(contents => {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(contents);
      });
      break;
    case '/movie':
      await movieDetailsRouter(req, res)
      .then(contents => {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(contents);
      });
      break
    default:
      res.writeHead(404);
      res.end(JSON.stringify({error:"Resource not found"}));
  }
};

const server = http.createServer(requestListener);
server.listen(port, () => {
    console.log(`${process.env.SERVER_NAME} Web Server started at http://localhost:${port}`);
});