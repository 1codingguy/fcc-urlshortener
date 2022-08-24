require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

require('dotenv').config()

const connectDB = require('./db/connect')



// Basic Configuration
const port = process.env.PORT || 3000

app.use(cors())

app.use('/public', express.static(`${process.cwd()}/public`))

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
})

app.post('/api/shorturl', (req, res) => {
  const { url: original_url } = req.body

  // To-do: validate the URL

  res.status(201).json(req.body)
})

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
