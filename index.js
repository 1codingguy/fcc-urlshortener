require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

require('dotenv').config()

const connectDB = require('./db/connect')
const {
  getAllUrls,
  addUrl,
  deleteUrl,
  getUrl,
  deleteAll,
} = require('./controller/url')

// Basic Configuration
const port = process.env.PORT || 3000

app.use(cors())

app.use('/public', express.static(`${process.cwd()}/public`))

// middleware
app.use(express.json()) // for testing in postman
app.use(express.urlencoded({ extended: true })) // necessary for fcc checker because it's html form

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
})

// necessary route and functions
app.get('/api/shorturl/:id', getUrl)
app.post('/api/shorturl', addUrl)

// functions not required but needed to check status
app.get('/api/allUrl', getAllUrls)
app.delete('/api/:id', deleteUrl)
app.delete('/api/:id/deleteAll', deleteAll)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
