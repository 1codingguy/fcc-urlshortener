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

  deleteAll,
} = require('./controller/url')

// Basic Configuration
const port = process.env.PORT || 3000

app.use(cors())

app.use('/public', express.static(`${process.cwd()}/public`))

// middleware
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
})

app.get('/api/allUrl', getAllUrls)

app.post('/api/shorturl', addUrl)

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
