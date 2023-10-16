const fs = require('fs')
const pdf = require('pdf-creator-node')
const path = require('path')

const homeView = (req,res,next) => {
    res.render('download')
}

module.exports ={
    homeView
}