const express = require('express')
const axios = require('axios')
const catalystToken = require('../catalysToken')
let router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

// obtener Producto CRM
router.get('/getProducto/:id', async (req, res) => {
  // obtener access token
  const accessToken = await catalystToken(req)

  // Config para axios
  const idProducto = req.params.id
  const config = {
    method: 'get',
    url: `https://www.zohoapis.com/crm/v2/Products/${idProducto}`,
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
    },
  }

  // Realizar peticion con Axios
  try {
    const resp = await axios(config)
    res.send(resp.data.data[0])
    // console.log(resp.data)
  } catch (error) {
    console.log(error)
  }
})

// obtener Contacto (por ID)
router.get('/getContacto/:id', async (req, res) => {
  // obtener access token
  const accessToken = await catalystToken(req)

  // Config para axios
  const idContacto = req.params.id
  const config = {
    method: 'get',
    url: `https://www.zohoapis.com/crm/v2/Contacts/${idContacto}`,
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

router.get('/getDisponibilidad/:desarrollo/:manzana', async (req, res) => {
  // obtener access token
  const accessToken = await catalystToken(req)
  const numManzana = req.params.manzana.replace(/\D+/, '')
  // const disponibilidad = 'Disponible'
  // url: `https://www.zohoapis.com/crm/v2/Products/search?criteria=((Manzana:equals:${req.params.manzana})and(Nombre_Fraccionamiento:equals:${req.params.desarrollo})and(Estado:equals:${disponibilidad}))`,

  const config = {
    method: 'get',
    // url: `https://www.zohoapis.com/crm/v2/Products/search?criteria=((Manzana:equals:${req.params.manzana})and(Nombre_Fraccionamiento:equals:${req.params.desarrollo}))`,
    url: `https://www.zohoapis.com/crm/v2/Products/search?criteria=((Nombre_Fraccionamiento:starts_with:${encodeURI(
      req.params.desarrollo
    )})and(Manzana:equals:${numManzana}))`,
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
    },
  }

  try {
    const resp = await axios(config)

    const data = resp.data.data
    const crmJSON = [...data].map((lote) => {
      return {
        id: lote.id,
        Lote: lote.Lote,
        Manzana: lote.Manzana,
        Lote_Letra: lote.Lote_Letra,
        Unit_Price: lote.Unit_Price,
        Nombre_Fraccionamiento: lote.Nombre_Fraccionamiento,
        Costo_por_M2: lote.Costo_por_M2,
        Dimension_del_Terreno_M21: lote.Dimension_del_Terreno_M21,
        Uso_Predio: lote.Uso_Predio,
        Manzana_y_Lote: lote.Manzana_y_Lote,
        Fraccionamiento: lote.Fraccionamiento,
        Product_Name: lote.Product_Name,
        Estado: lote.Estado,
      }
    })
    res.status(200).send({ data: crmJSON, length: crmJSON.length })
    // console.log(resp.data)
  } catch (error) {
    res.status(400).send(error)
  }
})

//obtener Cotacto (por correo)
router.get('/getContactoEmail/:email', async (req, res) => {
  // obtener access token
  const accessToken = await catalystToken(req)

  // Config para axios
  const email = req.params.email
  const config = {
    method: 'get',
    url: `https://www.zohoapis.com/crm/v2/Contacts/search?email=${email}`,
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
    },
  }

  // Realizar peticion con Axios
  try {
    const resp = await axios(config)
    // console.log(resp.data)
    res.json(resp.data)
  } catch (error) {
    console.log(error)
    res.status(404).send(error)
  }
})

//crear Contacto
router.post('/crearContacto', async (req, res) => {
  // obtener access token
  const accessToken = await catalystToken(req)

  const config = {
    method: 'post',
    url: `https://www.zohoapis.com/crm/v2/Contacts`,
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
    },
    data: req.body,
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

module.exports = router
