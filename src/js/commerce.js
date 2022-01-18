
const commerce = {
  //@Operacion Comprobar Contacto
  comprobarContacto: async (email) => {
    try {
      const comprobar = fetch(`/server/ecommerce/crm/getContactoEmail/${email}`)
      return await (await comprobar).json()
    } catch (error) {
      return error
    }
  },
  //@Operacion Crear Contacto
  crearContacto: async (data) => {
    try {
      const crearContacto = fetch(`/server/ecommerce/crm/crearContacto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      return await (await crearContacto).json()
    } catch (error) {
      return error
    }
  },
  //@Operacion Sicronizar Contacto crm -> books
  sincronizarContacto: async (idContactoCRM) => {
    try {
      const syncContacto = fetch(
        `/server/ecommerce/books/syncContactoBooks/${idContactoCRM}`
      )
      return await (await syncContacto).json()
    } catch (error) {
      return error
    }
  },
  //@Operacion Crear Factura
  async crearFactura(idContactoBooks, idItemBooks){
    try {
      //invoice date
      const selectValue = document.getElementById('monto-pago').value
      const formatValue = parseFloat(selectValue)

      var today = new Date()
      today = this.convertirFecha(today)
      var fecha_vencimiento = new Date(
        new Date().setDate(new Date().getDate() + 7)
      )
      fecha_vencimiento = this.convertirFecha(fecha_vencimiento)
      //Invoice
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
            description: 'Pago por Concepto de Apartado',
            quantity: 1,
            rate: formatValue,
          },
        ],
      }
      //Crear invoice
      const enviarFact = fetch(`/server/ecommerce/books/createInvoice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ invoice, selectValue }),
      })
      return await (await enviarFact).json()
    } catch (error) {
      return error
    }
  },
  //@Operacion Enviar factura
  enviarFactura: async (invoice_id) => {
    try {
      const crearFact = fetch(`/server/ecommerce/books/sendInvoice/${invoice_id}`)
      return await (await crearFact).json()
    } catch (error) {
      return error
    }
  },
  //@Operacion Obtener contacto id BOOKS con Correo
  obtenerContactoBooks: async (email) => {
    try {
      const idContactoBooks = fetch(
        `/server/ecommerce/books/getIdContacto/${email}`
      )
      return await (await idContactoBooks).json()
    } catch (error) {
      return error
    }
  },
  // Obtener ID de item de Books
  getItemIdBooks: async () => {
    try {
      const item = document.getElementById('item_seleccionado')
      const manzanaLote = item.dataset.manzanaylote
      let searchItem, request_url
      const element = document.getElementById(manzanaLote)
      console.log(element)
      if (element.dataset.crm === 'true') {
        searchItem = element.dataset.crm_id
        request_url = `/server/ecommerce/books/getIdProducto/${searchItem}`
      } else {
        searchItem = `${item}`
        request_url = `/server/ecommerce/crm/getProductoByName/${searchItem}`
      }
      console.log('searchItem', searchItem)
      const request = await fetch(request_url)
      const data = await request.json()
      // console.log(data)
      return data
    } catch (error) {
      return error
    }
  },
  //Convertir formato fecha
  convertirFecha(fecha) {
    var dd = String(fecha.getDate()).padStart(2, '0')
    var mm = String(fecha.getMonth() + 1).padStart(2, '0')
    var yyyy = fecha.getFullYear()
    fecha = yyyy + '-' + mm + '-' + dd
    return fecha
  },
  //Validar campos vacios o no validos
  validarCampos(email) {
    var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    if (!expr.test(email)) {
      return false
    } else {
      return true
    }
  }
}

export default commerce


/*

const data2 = [
      //oro
      { "id": "2234337000054406057", "name": "ORO", "symbol": "'", "init": 4, "end": 22, "Lotes": {"init": 1, "end": 19} }, 
      { "id": "2234337000054406057", "name": "ORO", "symbol": "'", "init": 23, "end": 35, "Lotes": {"init": 1, "end": 26} },
      { "id": "2234337000054406057", "name": "ORO", "symbol": "'", "init": 36, "end": 37, "Lotes": null }, 
      { "id": "2234337000054406057", "name": "ORO", "symbol": "'", "init": 129, "end": 133, "Lotes": null }, 
      { "id": "2234337000054406057", "name": "ORO", "symbol": "'", "init": 139, "end": 144, "Lotes": null },
      // perla 
      { "id": "2234337000054406063", "name": "PERLA", "symbol": "}", "init": 22, "end": 22, "Lotes": {"init": 20, "end": 44} }, 
      { "id": "2234337000054406063", "name": "PERLA", "symbol": "}", "init": 35, "end": 35, "Lotes": {"init": 27, "end": 53} },
      { "id": "2234337000054406063", "name": "PERLA", "symbol": "}", "init": 41, "end": 52, "Lotes": null },
      { "id": "2234337000054406063", "name": "PERLA", "symbol": "}", "init": 60, "end": 100, "Lotes": null },
      { "id": "2234337000054406063", "name": "PERLA", "symbol": "}", "init": 127, "end": 128, "Lotes": null },
      { "id": "2234337000054406063", "name": "PERLA", "symbol": "}", "init": 134, "end": 138, "Lotes": null },
      { "id": "2234337000054406063", "name": "PERLA", "symbol": "}", "init": 150, "end": 162, "Lotes": null },
      { "id": "2234337000054406063", "name": "PERLA", "symbol": "}", "init": 164, "end": 170, "Lotes": null },
      { "id": "2234337000054406063", "name": "PERLA", "symbol": "}", "init": 172, "end": 186, "Lotes": null },
      { "id": "2234337000054406063", "name": "PERLA", "symbol": "}", "init": 188, "end": 188, "Lotes": null },
      { "id": "2234337000054406063", "name": "PERLA", "symbol": "}", "init": 192, "end": 194, "Lotes": null },
      //ELITE
      { "id": "2234337000054406069", "name": "ELITE", "symbol": ":", "init": 101, "end": 105, "Lotes": null },
      { "id": "2234337000054406069", "name": "ELITE", "symbol": ":", "init": 107, "end": 109, "Lotes": null },
      { "id": "2234337000054406069", "name": "ELITE", "symbol": ":", "init": 111, "end": 112, "Lotes": null },
      { "id": "2234337000054406069", "name": "ELITE", "symbol": ":", "init": 196, "end": 199, "Lotes": null }
      
    ]

    
let item = "M102-L40"
    
let nombre_fracionamiento, Fraccionamiento, item_name, sku
let rate = 200000
// let name_array = item.split('')
let name_array2 = item.split('-')
let tempManzana = name_array2[0].replace('M', '');
let tempLote = name_array2[1].replace('L', '');

let manzana = parseInt(tempManzana)

if (true) {

  let secciones_array = data2
  secciones_array.forEach ((e) => {
    console.log( " Lotes ")
    console.log( e.Lotes)
    console.log(" Manzana: " + manzana + " init: " + e.init + " end: " + e.end )
    if (manzana >= e.init && manzana <= e.end) {
    	if(e.Lotes != null){
      console.log( " Lote: " + tempLote + " init: " + e.Lotes.init + " end: " + e.Lotes.end)
    		if (tempLote >= e.Lotes.init && tempLote <= e.Lotes.end){
        
          console.log("Lotes: true")
          // 
          item_name = ' CD ' + e.name + ' ' + item
          console.log('item_name')
          console.log(item_name)
          sku = name_array2[0] + "" + e.symbol + "" + name_array2[1] 
          console.log("sku")
          console.log(sku)
          Fraccionamiento = e.id.toString()
          if(e.name){
            nombre_fracionamiento = "Costa Dorada " +e.name
          }else{
            nombre_fracionamiento = "Costa Dorada"
          }
          console.log('nombre_fracionamiento')
          console.log(nombre_fracionamiento)
        }
      }else {
        console.log("Lotes: false")
        item_name = 'CD ' + e.name + ' ' + item
        console.log('item_name')
        console.log(item_name)
        sku = name_array2[0] + "" + e.symbol + "" + name_array2[1] 
        console.log("sku")
        console.log(sku)
        Fraccionamiento = e.id.toString()
        if(e.name){
          nombre_fracionamiento = "Costa Dorada " +e.name
        }else{
          nombre_fracionamiento = "Costa Dorada "
        }
        console.log('nombre_fracionamiento')
        console.log(nombre_fracionamiento)

    	}
    } 
  })
  console.log('-----------------------------------------------')
  console.log("item_name: "+ item_name)
  console.log('-----------------------------------------------')

}

*/