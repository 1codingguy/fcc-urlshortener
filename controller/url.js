// the url model defined with schema
// eq to const urls = mongoose.model('URL', URLSchema)
const Url = require('../models/url')

// node url module
const url = require('node:url')

const deleteAll = async (req, res) => {
  try {
    const result = await Url.deleteMany({})
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const getUrl = async (req, res) => {
  try {
    const { id: short_url } = req.params
    const exist = await Url.find({ short_url })
    if (exist.length === 0) return res.status(404).json({msg: 'short_url not found'})

    console.log(exist[0])
    console.log(exist[0].original_url)

    res.status(302).redirect(exist[0].original_url)
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find({})
    res.status(200).json(urls)
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const addUrl = async (req, res) => {
  try {
    const hostname = url.parse(req.body.url).hostname
    if (!hostname) return res.json({ error: 'invalid url' })

    // get allUrls stored in DB
    const allUrls = await Url.find({})
    const short_url = allUrls.length !== 0 ? allUrls.length + 1 : 1

    const { url: original_url } = req.body
    const created = await Url.create({ original_url, short_url })

    res.status(200).json(created)
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const deleteUrl = async (req, res) => {
  try {
    const { id } = req.params
    const url = await Url.findOneAndDelete({ id })
    if (!url) return res.status(404).json({ msg: `no url with id ${id}` })
    res.status(200).json({ url })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

module.exports = {
  getAllUrls,
  addUrl,
  deleteUrl,
  deleteAll,
  getUrl,
}
