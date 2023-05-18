
const {
  extrasController
} = require('./extras.controller');

const extrasRouter = require('express').Router();


extrasRouter.get('/', (req, res, next) => {
  return extrasController.getAll()
    .then(results => {
      return res.status(200).json(results)
    })
})

module.exports = {
  extrasRouter
};

