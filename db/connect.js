const mongoose = require('mongoose')

const connectDB = url => {
  // this returns a promise
  return mongoose.connect(url, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
}

module.exports = connectDB
