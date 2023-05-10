const path = require('path');
const {
  Router
} = require('express');

const homeRouter = Router();

const validate = (req, res, next) => {
  next()
}

homeRouter.get('/', validate, (req, res, next) => {
  res.sendFile(path.join(__dirname, '/home.html'));
})

module.exports = {
  homeRouter
}
