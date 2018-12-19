const express = require('express')
const router = express.Router()

const homeController = require('../controllers/home')
const imageController = require('../controllers/image')

module.exports = app => {

  router.get('/', homeController.index)
  router.get('/images/:imageId', imageController.index)
  router.delete('/images/:imageId', imageController.delete)
  router.post('/images', imageController.create)
  router.post('/images/:imageId/comment', imageController.comment)
  router.post('/images/:imageId/like', imageController.like)

  app.use(router)

}