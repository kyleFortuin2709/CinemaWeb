const {
  Router
} = require('express');

const homeRouter = Router();

const validate = (req, res, next) => {
  next()
}

homeRouter.get('/', validate, (req, res, next) => {
  next(new Error())
})
