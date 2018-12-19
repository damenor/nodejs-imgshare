const path = require('path')
const express = require('express')
const hbs = require('express-handlebars')
const morgan = require('morgan')
const multer = require('multer')
const errorHandler = require('errorhandler')

const routes = require('../routes')

module.exports = app =>  {
  
  // Settings
  app.set('PORT', process.env.PORT || 3000)
  app.set('views', path.join(__dirname, '..', 'views'))
  app.engine('.hbs', hbs({
    defaultLayout: 'main',
    partialsDir: path.join(app.get('views'), 'partials'),
    layoutsDir:  path.join(app.get('views'), 'layouts'),
    extname: '.hbs',
    helpers: require('./helpers')
  }))
  app.set('view engine', '.hbs')

  // Middlewares
  app.use(morgan('dev'))
  app.use(multer({ dest: path.join(__dirname, '..', 'public/upload/tmp') }).single('image'))
  app.use(express.urlencoded({extended: false}))
  app.use(express.json())

  // Routes
  routes(app)

  // Static files
  app.use('/public', express.static(path.join(__dirname, '..', 'public')))

  // Error handlers
  app.get('env') === 'development' ? app.use(errorHandler) : null

  return app
}