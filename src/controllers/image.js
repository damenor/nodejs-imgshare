const path = require('path')
const fs = require('fs-extra')
const md5 = require('md5')
const { randomName } = require('../utils')

const { Image, Comment } = require('../models')

const sidebar = require('../utils/sidebar')

class ImageController {

  async index (req, res, next){
    const { imageId } = req.params
    let viewModel = { images: {}, comments: {} }
    const image = await Image.findOne({ filename: {$regex: imageId} })
     console.log('uniqueid', image.filename.replace())
    if(image){
      image.views += 1
      await image.save()
      const comments = await Comment.find({ image_id: image._id })
      viewModel.image = image
      viewModel.comments = comments
      viewModel = await sidebar(viewModel)
      return res.render('image', viewModel)
    }else{
      res.redirect('/')
    }
  }

  create (req, res, next){
    const { title, description } = req.body  
    
    const saveImage = async () => {
      let imageName = randomName()
  
      const images = await Image.find({ filename: imageName })
      if(images.length > 0) {
        saveImage()
      } else {
        const imageTempPath = req.file.path
        const imageExt = path.extname(req.file.originalname).toLowerCase()
        const targetPath = path.resolve(`src/public/upload/${imageName}${imageExt}`)
    
        if(imageExt === '.png' || imageExt === '.jpg' || imageExt === '.jpeg' || imageExt === '.gif'){
          await fs.rename(imageTempPath, targetPath)
          const newImage = new Image({
            title,
            description,
            filename: imageName + imageExt
          })
          const imageSaved = await newImage.save()
          res.redirect(`/images/${imageName}`)
        } else {
          await fs.unlink(imageTempPath)
          res.status(500).json({ error: 'Only images are allowed (png, jpg, jpeg, gif)' })
        }
      }

    }

    saveImage()

  }

  async like (req, res, next){
    const image = await Image.findOne({ filename: { $regex: req.params.imageId } })
    if(image){
      image.likes += 1
      await image.save()
      res.json({ likes: image.likes })
    }else{
      res.status(404).json({ error: 'Internal Error' })
    }
  }

  async comment (req, res, next){
    const image = await Image.findOne({ filename: { $regex: req.params.imageId } })
    if(image){
      const newComment = new Comment(req.body)
      newComment.gravatar = md5(newComment.email)
      newComment.image_id = image._id
      newComment.save()
      return res.redirect(`/images/${image.uniqueId}`)
    }else{
      res.redirect('/')
    }
  }

  async delete (req, res, next){
    const image = await Image.findOne({ filename: { $regex: req.params.imageId } })
    console.log(image.filename)
    if(image){
      await fs.unlink(path.resolve(`./src/public/upload/${image.filename}`))
      await Comment.deleteOne({ image_id: image._id })
      await image.remove()
      res.json(true)
    }else{

    }
  }

}

module.exports = new ImageController()