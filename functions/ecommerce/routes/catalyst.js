const express = require('express')
const router = express.Router()

const { catalystC } = require('../controllers')

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.get('/getCartas', catalystC.getCartas)

router.get('/getDetails', catalystC.getDetails)

module.exports = router
