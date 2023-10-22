const express = require('express')
const router = express.Router()
const { createChart, getChart,deleteChart, getCharts } = require('../controllers/chart')


router.get('/',getCharts) //get all charts
router.post('/',createChart) //create chart
router.get('/:id',getChart) //get single charrt
router.delete('/:id',deleteChart) //delete chart

module.exports = router