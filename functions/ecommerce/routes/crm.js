const express = require('express')
const router = express.Router()
const crm = require("../controllers/crm")

console.log("Crm router")
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

// obtener Producto CRM verify?
router.get('/getProducto/:id', crm.getProducto)

router.get('/getDisponibilidad/:desarrollo/:manzana', crm.getDisponibilidad)

module.exports = router
