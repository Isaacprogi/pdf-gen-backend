const express = require('express')
const router = express.Router()
const { createPdf, fetchPdf,recreateSaved,getAllSavedPdfs,deletePdf } = require('../controllers/pdf')


router.get('/',getAllSavedPdfs) //get all pdfs data from database
router.post('/createPdf',createPdf) //to generate pdf
router.get('/fetchPdf',fetchPdf) //send pdf file
router.get('/recreate/:id',recreateSaved) //generate from data base
router.delete('/:id',deletePdf) //delete from cloudinary and mongoose

module.exports = router