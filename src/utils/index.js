module.exports = {

  randomName: () => {
    const possible = 'abcdefghijklmnñopqrstuvwyz0123456789'
    let randomName = 0
    for(let i = 0; i < 6; i++){
      randomName += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return randomName
  }

}