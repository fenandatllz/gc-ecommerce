
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
