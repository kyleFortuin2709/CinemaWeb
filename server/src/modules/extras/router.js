
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

extrasRouter.post('/', (req, res, next) => {
  return extrasController.processExtrasPurchasedItems(req.body)
    .then(data => {
      return res.status(200).json(data)
    });
})

module.exports = {
  extrasRouter
};

