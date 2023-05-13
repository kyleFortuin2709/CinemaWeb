const {
  Router
} = require('express');

const {
  homeController
} = require('./home.controller');

const homeRouter = Router();


homeRouter.get('/', (req, res, next) => {
  return homeController.getHomePageDetails()
    .then(results => {
      return res.status(200).json(results)
    })
})

module.exports = {
  homeRouter
};

