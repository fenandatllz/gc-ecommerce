const axios = require('axios')
const jwt = require('jsonwebtoken')
const catalyst = require('zcatalyst-sdk-node')
const catalystToken = require('../catalysToken')

// const { crmC, catalystC } = require('./')

const functions = require('../functions/token')

const ctly = {
  async getIdItem(item, accessToken) {
    // obtener access token
    // const accessToken = await catalystToken(req)

    //Config Axios
    const idProductoBooks = item

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
      return resp.data.items[0].item_id
    } catch (error) {
      return error
    }
  },
  async createProductBooks(name, sku, rate, accessToken) {

    const data = { name, rate, sku }

    const config = {
      method: 'post',
      url: `https://books.zoho.com/api/v3/contacts/items?organization_id=${process.env.ORGANIZATION_BOOKS}`,
      headers: {
        "Authorization": `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json;charset=UTF-8"
      },
      data: JSON.stringify(data)
    }

    // Realizar peticion con Axios
    try {
      // const resp = await axios(config)
      // return resp.data
      return config
    } catch (error) {
      return error
    }
  },
  async createProductCRM(name, sku, rate, accessToken) {

    const data = { name, rate, sku }

    const config = {
      method: 'post',
      url: `https://books.zoho.com/api/v3/contacts/items?organization_id=${process.env.ORGANIZATION_BOOKS}`,
      headers: {
        "Authorization": `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json;charset=UTF-8"
      },
      data: JSON.stringify(data)
    }

    // Realizar peticion con Axios
    try {
      // const resp = await axios(config)
      // return resp.data
      return config
    } catch (error) {
      return error
    }
  },
  geContactByEmail: async (email, accessToken) => {

    const config = {
      method: 'get',
      url: `https://books.zoho.com/api/v3/contacts?email=${email}&organization_id=${process.env.ORGANIZATION_BOOKS}`,
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
      },
    }

    // Realizar peticion con Axios
    try {
      const resp = await axios(config)
      // console.log(resp.data.contacts[0].contact_id)
      return resp.data.contacts[0].contact_id
      // console.log(resp.data)
    } catch (error) {
      return error
    }
  },
}


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
  // Obtener ID de producto utilizando el ID de producto en CRM
  // new script 
  async getIdItem(req, res) {
    // obtener access token
    const accessToken = await catalystToken(req)

    //Config Axios
    const idProductoBooks = req.body.item

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
      return resp.data.items[0].item_id
    } catch (error) {
      return error
    }
  },
  async createProduct(name, sku, rate, accessToken) {

    const data = { name, rate, sku }

    const config = {
      method: 'post',
      url: `https://books.zoho.com/api/v3/contacts/items?organization_id=${process.env.ORGANIZATION_BOOKS}`,
      headers: {
        "Authorization": `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json;charset=UTF-8"
      },
      data: JSON.stringify(data)
    }

    // Realizar peticion con Axios
    try {
      // const resp = await axios(config)
      // return resp.data
      return config
    } catch (error) {
      return error
    }
  },
  createFactura: async (req, res) => {
    if (req.session.login) {
      console.log('Creando Factura...')

      const { item, position, esEnganche, select } = req.body

      const accessToken = await catalystToken(req)
      const app = catalyst.initialize(req)

      let contact_books_id, item_books_id

      let query = `SELECT * FROM fraccionamientos`

      let zcql = app.zcql()
      let queryResult = await zcql.executeZCQLQuery(query)
      console.log('------------------------------------------------')
      console.log(item)
      console.log(queryResult.length)
      console.log('------------------------------------------------')
      if (queryResult.length === 0) {

      } else {
        const data = queryResult[position].fraccionamientos
        if (item.includes('-')) {
          let nombre_fracionamiento, Fraccionamiento, item_name, sku
          let rate = 200000
          let name_array = item.split('')
          let manzana = parseInt(name_array[1])

          if (data.esSecciones) {

            let secciones_array = JSON.parse(data.secciones)
            secciones_array.map((e) => {
              if (manzana >= e.init && manzana <= e.end) {
                item_name = data.code + ' ' + e.name + ' ' + item
                sku = name_array[0] + "" + name_array[1] + "" + e.symbol + "" + name_array[3] + "" + name_array[4]
                Fraccionamiento = e.id
                if(e.name){
                  nombre_fracionamiento = data.Fraccionamiento + " " +e.name
                }else{
                  nombre_fracionamiento = data.Fraccionamiento
                }
                
              }
            })

          }

          console.log('------------------------------------------------')
          console.log(nombre_fracionamiento)

          // item_crm_id = await ctly.createProductCRM(item_name, sku, rate, nombre_fracionamiento, Fraccionamiento, accessToken)
          item_books_id = await ctly.createProductBooks(item_name, sku, rate, accessToken)
          
        } else {
          item_books_id = await ctly.getIdItem(item, accessToken)
        }
      }

      console.log(item_books_id)

      const decoded = jwt.verify(req.session.token, process.env.JWT_SECRET)
      console.log(decoded)

      let query_user = `SELECT * FROM users WHERE users.ROWID = '${decoded.idUser}'`;

      let user = await zcql.executeZCQLQuery(query_user);
      if (user[0]) {
        let email = user[0].users.email
        if (email) {
          contact_books_id = await ctly.geContactByEmail(email, accessToken)
        }
        
      }else{
        contact_books_id = await ctly.createContact(fist_name, last_name, email, phone, accessToken)
      }
      // get contact

      console.log(item_books_id)
      console.log(contact_books_id)



      // data = [{ "id": 46545646545645, "name": "ORO", "symbol": "'", "init": 1, "end": 26 }, { "id": 46545646545645, "name": "PERLA", "symbol": "}", "init": 27, "end": 78 }, { "id": 46545646545645, "name": "ELITE", "symbol": ":", "init": 79, "end": 120 }]

      /*
  
      // Consular que Tipo de Politica envio el usuario
      const tipoDePolitica = esEnganche ? 'Enganche' : 'Primer Mensualidad'
      const rateInvoice = esEnganche
        ? data[position].pagoEnganche[select]
        : data[position].pagoPM
  
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
      res.end()*/
      res.send({ code: 0, message: 'Valid user !!' })
    } else {
      console.log('Invalid user  !!')
      res.send({ code: 10, message: 'Invalid user  !!' })
    }
  },
}

module.exports = books
