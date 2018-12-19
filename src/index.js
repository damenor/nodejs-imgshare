const express = require('express')

const config = require('./server/app')

const app = config(express())

// Starting database
require('./config/database')

// Starting server
app.listen(app.get('PORT'), () => console.log('Server listen on port', app.get('PORT')))