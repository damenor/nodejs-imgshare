const Stats = require('./stats')
const Images = require('./images')
const Comments = require('./comments')

module.exports = async viewModel => {
  const result = await Promise.all([
    Images.popular(),
    Stats(),
    Comments.newest()
  ])
  viewModel.sidebar = {
    popular: result[0],
    stats: result[1],
    comments: result[2]
  }
  return viewModel
}