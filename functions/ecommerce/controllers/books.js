const axios = require('axios')
const catalystToken = require('../catalysToken')

const { crmC } = require('./')

const books = {
  // Obtener ID item books con ID del producto CRM
  getIdProducto: async (req, res) => {
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
  },
  // Obtener id contacto con correo
  getIdContacto: async (req, res) => {
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
  },
  // Obtener factura por ID
  getInvoiceById: async (req, res) => {
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
  },
  // Obtener facturas
  getInvoices: async (req, res) => {
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
  },
  // Crear invoice
  createInvoice: async (req, res) => {
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
  },
  // Enviar Factura
  sendInvoice: async (req, res) => {
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
  },
  // Obtener un producto por ID
  getItemById: async (req, res) => {
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
  },
  // Obtener ID de producto utilizando el ID de producto en CRM
  getIdItem: async (req, res) => {
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
  },
  // Obtener contacto por id
  getContacto: async (req, res) => {
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
  },
  // Obtener contacto por id
  getContacto: async (req, res) => {
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
  },
  //Sincronizar contacto books
  syncContactoBooks: async (req, res) => {
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
  },
  // fer
  async createProduct(name, req, res) {
    const accessToken = await catalystToken(req)

    //Config Axios
    const data = {
      //
    }

    const config = {
      method: 'get',
      url: `https://books.zoho.com/api/v3/contacts/items?name=${name}?organization_id=${process.env.ORGANIZATION_BOOKS}`,
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
  },
  createFactura: async (req, res) => {
    console.log('Creando Factura...')
    const { item, position, esEnganche, select } = req.body

    const FRACCIONAMIENTOS = [
      {
        fracionamiento: 'Costa Dorada',
        code: 'CD',
        pagoPM: 500,
        pagoEnganche: [1000, 1500, 2000],
        esSecciones: true,
        secciones: [
          {
            id: 46545646545645,
            name: 'ORO',
            init: 1,
            end: 26,
          },
          {
            id: 46545646545645,
            name: 'PERLA',
            init: 27,
            end: 78,
          },
          {
            id: 46545646545645,
            name: 'ELITE',
            init: 79,
            end: 120,
          },
        ],
      },
    ]

    //  fer
    if (item.includes('-')) {
      let name = ' '
      let name_array = item.split()
      let manzana = name_array[1]
      if (FRACCIONAMIENTOS.esSecciones) {
        FRACCIONAMIENTOS.secciones.foreach((e) => {
          if (manzana >= e.init && manzana <= e.emd)
            name = FRACCIONAMIENTOS.code + ' ' + e.name + ' ' + item
        })
      }
      this.createProduct(item_name, req, res)
    }

    // Consular que Tipo de Politica envio el usuario
    const tipoDePolitica = esEnganche ? 'Enganche' : 'Primer Mensualidad'
    const rateInvoice = esEnganche
      ? FRACCIONAMIENTOS[position].pagoEnganche[select]
      : FRACCIONAMIENTOS[position].pagoPM

    const invoice = {
      customer_id: idContactoBooks,
      reference_number: 'Pago de Pagina Web',
      date: today,
      due_date: fecha_vencimiento,
      custom_fields: [
        {
          label: 'Commerce',
          value: idContactoBooks,
        },
      ],
      line_items: [
        {
          item_id: idItemBooks,
          description: `Pago por Concepto de ${tipoDePolitica}`,
          quantity: 1,
          rate: rateInvoice,
        },
      ],
    }
    res.end()
  },
}

module.exports = books
