const axios = require('axios')
const catalystSDK = require('zcatalyst-sdk-node')
const catalystToken = require('../catalysToken')

const catalyst = {
  getCartas: async (req, res) => {
    const app = catalystSDK.initialize(req)
    // console.log(req)
    // res.json({req})

    let query = `SELECT Fraccionamiento, logo, img FROM fraccionamientos`
    console.log(query)

    let zcql = app.zcql()
    let zcqlPromise = zcql.executeZCQLQuery(query)
    zcqlPromise.then(async (queryResult) => {
      if (queryResult.length === 0) {
        res.send({ message: 'No hay fraccionamientos' })
      } else {
        res.send(queryResult)
      }
    })
  },
  getDetails: async (req, res) => {
    const app = catalystSDK.initialize(req)
    // console.log(req)
    // res.json({req})

    let query = `SELECT * FROM fraccionamientos`
    console.log(query)

    let zcql = app.zcql()
    let zcqlPromise = zcql.executeZCQLQuery(query)
    zcqlPromise.then(async (queryResult) => {
      if (queryResult.length === 0) {
        res.send({ message: 'No hay fraccionamientos' })
      } else {
        res.send(queryResult)
      }
    })
  },
}

module.exports = catalyst
