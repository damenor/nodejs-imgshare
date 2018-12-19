const mongoose = require('mongoose')
const { database } = require('./keys')

mongoose.connect(database.URI, { useNewUrlParser: true })
  .then(db => console.log('Database is connected'))
  .catch(console.error)