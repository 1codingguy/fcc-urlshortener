// eq to const urls = mongoose.model('URL', URLSchema)
const Url = require('../models/url')

const getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find({})
    console.log(urls)
    res.status(200).json({ urls })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

module.exports = {
  getAllUrls,
}
