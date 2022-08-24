const mongoose = require('mongoose')

const URLSchema = new mongoose.Schema({
  original_url: String,
  id: Number,
})

module.exports = mongoose.model('URL', URLSchema)
