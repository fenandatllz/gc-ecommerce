const express = require('express')
const router = express.Router()
const crm = require("../controllers/crm")


router.use(express.json())
router.use(express.urlencoded({ extended: true }))

// obtener Producto CRM
router.get('/getProducto/:id', crm.getProducto)

// obtener Contacto (por ID)
router.get('/getContacto/:id', crm.getContacto)

router.get('/getDisponibilidad/:desarrollo/:manzana', crm.getDisponibilidad)

//obtener Cotacto (por correo)
router.get('/getContactoEmail/:email', crm.getContactoEmail)

//crear Contacto
router.post('/crearContacto', crm.crearContacto)

module.exports = router
