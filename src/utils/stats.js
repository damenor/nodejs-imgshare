const { Image, Comment } = require('../models')

async function imagesCounter(){
  return await Image.countDocuments()
}

async function commentsCounter(){
  return await Comment.countDocuments()
}

async function imagesTotalViewCounter(){
  const result = await Image.aggregate([{$group: {
    _id: '1',
    viewTotals: {$sum: '$views'}
  }}])
  return result[0].viewTotals
}

async function likesTotalCounter(){
  const result = await Image.aggregate([{$group: {
    _id: '1',
    likesTotals: {$sum: '$likes'}
  }}])
  return result[0].likesTotals
}

module.exports = async () => {
  const result = await Promise.all([
    imagesCounter(),
    commentsCounter(),
    imagesTotalViewCounter(),
    likesTotalCounter()
  ])
  return {
    images: result[0],
    comments: result[1],
    totalViews: result[2],
    totalLikes: result[3]
  }
}