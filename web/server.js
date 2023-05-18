const http = require("http");
const path = require("path");
const fs = require("fs");

require('dotenv').config({path: `./dotenv/.env.${process.env.NODE_ENV}`});

const {
  homeRouter
} = require('./src/modules/home/router');
const {
  movieDetailsRouter
} = require('./src/modules/movieDetails/router');
const {
  bookingRouter
} = require('./src/modules/booking/router');
const {
  extrasRouter
} = require('./src/modules/extras/router');

const port = process.env.WEB_PORT;

const processUrl = (url) => {
  const urlArray = url.split('?');
  return {
    url: urlArray[0],
  };
}

const requestListener = async function (req, res) {
  console.log('incoming url: ',req.url);
  const { url  } = processUrl(req.url);

  if (req.method === "GET" && (url.startsWith("/resources") || url.startsWith("/src/modules"))) {
    serveStaticFile(res, url);
    return; 
  }
  switch (url) {
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
        })
        .catch((error) => {
          res.writeHead(404);
          res.end(JSON.stringify({error:error.message}));
        });
    break;
    case '/booking':
      await bookingRouter(req, res)
      .then(contents => {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(contents);
      });
      break
    case '/extras':
      await extrasRouter(req, res)
      .then(contents => {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(contents);
      });
      break
    case '/confirmation': // work in progress
    default:
      res.writeHead(404);
      res.end(JSON.stringify({error:"Resource not found"}));
  }
};

const server = http.createServer(requestListener);
server.listen(port, () => {
    console.log(`${process.env.SERVER_NAME} Web Server started at http://localhost:${port}`);
});

function serveStaticFile(res, url)  { 
  const filePath = path.join(__dirname, url);
  const contentType = getContentType(filePath); 
  fs.readFile(filePath, (err, data) => { 
    if (err) {
      res.writeHead(404); res.end("404 Not Found");
      return; 
    } 
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  }); 
} 
  // Function to determine the content type based on the file extension 

function getContentType(filePath) {
  const extname = path.extname(filePath); 
    switch (extname) { 
      case ".html": 
        return "text/html"; 
      case ".css": 
        return "text/css"; 
      case ".js":
        return "text/javascript"; 
      case ".png":
        return "image/png"; 
      case ".jpg": 
      case ".jpeg": 
      return "image/jpeg"; 
      default: 
        return "application/octet-stream"; } 
 }