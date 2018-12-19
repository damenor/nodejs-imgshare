class ImageController {

  index (req, res, next){
    return res.send('Images Page')
  }

  create (req, res, next){
    return res.send('Images create')
  }

  like (req, res, next){
    return res.send('Images like')
  }

  comment (req, res, next){
    return res.send('Images comment')
  }

  delete (req, res, next){
    return res.send('Images delete')
  }

}

module.exports = new ImageController()