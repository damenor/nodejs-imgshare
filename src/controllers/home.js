const { Image } = require('../models')

const sidebar = require('../utils/sidebar')

class HomeController {
  async index (req, res, next){

    // 1 ascendente -1 descendente
    const images = await Image.find().sort({ timestamp:  -1})
    let viewModel = { images: [] }
    viewModel.images = images
    viewModel = await sidebar(viewModel)
    return res.render('index', viewModel)
    
  }
}

module.exports = new HomeController()