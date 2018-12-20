const path = require('path')
const mongoose = require('mongoose')
const { Schema } = mongoose

const ImageSchema = new Schema({
  title: { type: String },
  description: { type: String },
  filename: { type: String },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now } 
})

// Generar una variable vitual que no se almacena en BBDD
ImageSchema.virtual('uniqueId')
  .get(function() {
    return this.filename.replace(path.extname(this.filename), '')
  })

module.exports = mongoose.model('Image', ImageSchema)