// eq to const urls = mongoose.model('URL', URLSchema)
const Url = require('../models/url')

const getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find({})
    res.status(200).json({ urls })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const addUrl = async (req, res) => {
  try {
    // get allUrls stored in DB
    const allUrls = await Url.find({})
    const id = allUrls.length !== 0 ? allUrls.length + 1 : 1
    const { url: original_url } = req.body

    const url = await Url.create({ original_url, id })

    res.status(200).json({ url })
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
}
