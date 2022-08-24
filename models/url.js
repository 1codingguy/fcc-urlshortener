const mongoose = require('mongoose')

const URLSchema = new mongoose.Schema({
  url: String,
  id: Number,
})

module.exports = mongoose.model('URL', URLSchema)
