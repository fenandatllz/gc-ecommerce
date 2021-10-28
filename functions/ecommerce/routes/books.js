const express = require('express')
const axios = require('axios')
const catalystToken = require('../catalysToken')
// const fetch = require('node-fetch')
let router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

// Obtener ID item books con ID del producto CRM
router.get('/getIdProducto/:id', async (req, res) => {
  // obtener access token
  const accessToken = await catalystToken(req)

  const config = {
    method: 'get',
    url: `https://books.zoho.com/api/v3/items?zcrm_product_id=${req.params.id}&organization_id=${process.env.ORGANIZATION_BOOKS}`,
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
    },
  }

  // Realizar peticion con Axios
  try {
    const resp = await axios(config)
    res.json(resp.data.items[0].item_id)
    // console.log(resp.data)
  } catch (error) {
    console.log(error)
  }
})

// Obtener id contacto con correo
router.get('/getIdContacto/:email', async (req, res) => {
  // obtener access token
  const accessToken = await catalystToken(req)

  const config = {
    method: 'get',
    url: `https://books.zoho.com/api/v3/contacts?email=${req.params.email}&organization_id=${process.env.ORGANIZATION_BOOKS}`,
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
    },
  }

  // Realizar peticion con Axios
  try {
    const resp = await axios(config)
    res.json(resp.data.contacts[0].contact_id)
    // console.log(resp.data)
  } catch (error) {
    console.log(error)
  }
})

// Obtener factura por ID
router.get('/getInvoiceById/:id', async (req, res) => {
  // obtener access token
  const accessToken = await catalystToken(req)

  const config = {
    method: 'get',
    url: `https://books.zoho.com/api/v3/invoices/${req.params.id}?organization_id=${process.env.ORGANIZATION_BOOKS}`,
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
    },
  }

  // Realizar peticion con Axios
  try {
    const resp = await axios(config)
    res.send(resp.data)
    // console.log(resp.data)
  } catch (error) {
    console.log(error)
  }
})

// Obtener facturas
router.get('/getInvoices/:customer_name&:item_name', async (req, res) => {
  // obtener access token
  const accessToken = await catalystToken(req)

  const config = {
    method: 'get',
    url: `https://books.zoho.com/api/v3/invoices?customer_name=${req.params.customer_name}&item_name=${req.params.item_name}&page=1&sort_column=created_time&sort_order=A&organization_id=${process.env.ORGANIZATION_BOOKS}`,
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
    },
  }

  // Realizar peticion con Axios
  try {
    const respInvoices = await axios(config)
    if (respInvoices.data.page_context.has_more_page == true) {
      console.log('Consiguiendo mas facturas...')
      let config2 = {
        method: 'get',
        url: `https://books.zoho.com/api/v3/invoices?customer_name=${req.params.customer_name}&item_name=${req.params.item_name}&page=2&sort_column=created_time&sort_order=A&organization_id=${process.env.ORGANIZATION_BOOKS}`,
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
        },
      }
      const resp2 = await axios(config2)
      const allInvoices = [
        ...respInvoices.data.invoices,
        ...resp2.data.invoices,
      ]
      console.log('size', allInvoices.length)
      res.send(allInvoices)
    } else {
      res.send(respInvoices.data.invoices)
    }
  } catch (error) {
    console.log(error)
  }
})

// Crear invoice
router.post('/createInvoice', async (req, res) => {
  const apartados = new Map()
  apartados.set('0', 50.0)
  apartados.set('1', 50.0)
  apartados.set('2', 100.0)
  apartados.set('3', 150.0)
  apartados.set('4', 200.0)

  try {
    if (apartados.get(req.body.selectValue) === undefined)
      throw Error('Opcion invalida')

    const valorApartado = apartados.get(req.body.selectValue)
    const invoice = req.body.invoice

    let item = invoice.line_items[0]

    item.rate = valorApartado

    const accessToken = await catalystToken(req)

    // Config Axios
    const config = {
      method: 'post',
      url: `https://books.zoho.com/api/v3/invoices?organization_id=${process.env.ORGANIZATION_BOOKS}`,
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
      },
      data: invoice,
    }

    const resp = await axios(config)
    res.send(resp.data)
  } catch (err) {
    console.error('Problema: ', err.message)
  }
})

// Enviar Factura
router.get('/sendInvoice/:id', async (req, res) => {
  // obtener access token
  const accessToken = await catalystToken(req)

  //Config Axios
  const invoiceId = req.params.id

  const config = {
    method: 'post',
    url: `https://books.zoho.com/api/v3/invoices/${invoiceId}/status/sent?organization_id=${process.env.ORGANIZATION_BOOKS}`,
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
    },
  }

  // Realizar peticion con Axios
  try {
    const resp = await axios(config)
    res.send(resp.data)
  } catch (error) {
    console.log(error)
  }
})

// Obtener un producto por ID
router.get('/getItemById/:id', async (req, res) => {
  // obtener access token
  const accessToken = await catalystToken(req)

  //Config Axios
  const idProductoBooks = req.params.id

  const config = {
    method: 'get',
    url: `https://books.zoho.com/api/v3/items/${idProductoBooks}?organization_id=${process.env.ORGANIZATION_BOOKS}`,
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
    },
  }

  // Realizar peticion con Axios
  try {
    const resp = await axios(config)
    res.send(resp.data.item)
  } catch (error) {
    console.log(error)
  }
})

// Obtener ID de producto utilizando el ID de producto en CRM
router.get('/getIdItem/:id', async (req, res) => {
  // obtener access token
  const accessToken = await catalystToken(req)

  //Config Axios
  const idProductoBooks = req.params.id

  const config = {
    method: 'get',
    url: `https://books.zoho.com/api/v3/items?zcrm_product_id=${idProductoBooks}&organization_id=${process.env.ORGANIZATION_BOOKS}`,
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
    },
  }

  // Realizar peticion con Axios
  try {
    const resp = await axios(config)
    res.send(resp.data.items[0].item_id)
  } catch (error) {
    console.log(error)
  }
})

// Obtener contacto por id
router.get('/getContacto/:id', async (req, res) => {
  // obtener access token
  const accessToken = await catalystToken(req)

  //Config Axios
  const idContacto = req.params.id

  const config = {
    method: 'get',
    url: `https://books.zoho.com/api/v3/contacts/${idContacto}?organization_id=${process.env.ORGANIZATION_BOOKS}`,
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
    },
  }

  // Realizar peticion con Axios
  try {
    const resp = await axios(config)
    res.send(resp.data)
  } catch (error) {
    console.log(error)
  }
})

//Sincronizar contacto books
router.get('/syncContactoBooks/:id', async (req, res) => {
  // obtener access token
  const accessToken = await catalystToken(req)

  //Conf Axios
  const contactID = req.params.id

  const config = {
    method: 'post',
    url: `https://books.zoho.com/api/v3/crm/contact/${contactID}/import?organization_id=${process.env.ORGANIZATION_BOOKS}`,
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
    },
  }

  // Realizar peticion con Axios
  try {
    const resp = await axios(config)
    res.send(resp.data)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router
