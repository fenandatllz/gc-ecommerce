const express = require('express')
const router = express.Router()

const { booksC } = require('../controllers')

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

// Obtener ID item books con ID del producto CRM
router.get('/getIdProducto/:id', booksC.getIdProducto)

// Obtener id contacto con correo
router.get('/getIdContacto/:email', booksC.getIdContacto)

// Obtener factura por ID
router.get('/getInvoiceById/:id', booksC.getInvoiceById)

// Obtener facturas
router.get('/getInvoices/:customer_name&:item_name', booksC.getInvoices)

// Crear invoice
// router.post('/createInvoice', booksC.createInvoice)

// Enviar Factura
router.get('/sendInvoice/:id', booksC.sendInvoice)

// Obtener un producto por ID
router.get('/getItemById/:id', booksC.getItemById)

// Obtener ID de producto utilizando el ID de producto en CRM
router.get('/getIdItem/:id', booksC.getIdItem)

// Obtener contacto por id
router.get('/getContacto/:id', booksC.getContacto)

//Sincronizar contacto books
router.get('/syncContactoBooks/:id', booksC.syncContactoBooks)

router.post('/createFactura', booksC.createFactura)

module.exports = router
