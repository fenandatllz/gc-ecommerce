//Obtener boton send
const send = document.getElementById('btn-enviar')

//@Operacion Comprobar Contacto
const comprobarContacto = async (email) => {
  try {
    const comprobar = fetch(`/server/ecommerce/crm/getContactoEmail/${email}`)
    return await (await comprobar).json()
  } catch (error) {
    return error
  }
}
//@Operacion Crear Contacto
const crearContacto = async (data) => {
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
}
//@Operacion Sicronizar Contacto crm -> books
const sincronizarContacto = async (idContactoCRM) => {
  try {
    const syncContacto = fetch(
      `/server/ecommerce/books/syncContactoBooks/${idContactoCRM}`
    )
    return await (await syncContacto).json()
  } catch (error) {
    return error
  }
}
//@Operacion Crear Factura
const crearFactura = async (idContactoBooks, idItemBooks) => {
  try {
    //invoice date
    const selectValue = document.getElementById('monto-pago').value
    const formatValue = parseFloat(selectValue)

    var today = new Date()
    today = convertirFecha(today)
    var fecha_vencimiento = new Date(
      new Date().setDate(new Date().getDate() + 7)
    )
    fecha_vencimiento = convertirFecha(fecha_vencimiento)
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
}
//@Operacion Enviar factura
const enviarFactura = async (invoice_id) => {
  try {
    const crearFact = fetch(`/server/ecommerce/books/sendInvoice/${invoice_id}`)
    return await (await crearFact).json()
  } catch (error) {
    return error
  }
}
//@Operacion Obtener contacto id BOOKS con Correo
const obtenerContactoBooks = async (email) => {
  try {
    const idContactoBooks = fetch(
      `/server/ecommerce/books/getIdContacto/${email}`
    )
    return await (await idContactoBooks).json()
  } catch (error) {
    return error
  }
}

// Obtener ID de item de Books
const getItemIdBooks = async () => {
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
}

//Convertir formato fecha
function convertirFecha(fecha) {
  var dd = String(fecha.getDate()).padStart(2, '0')
  var mm = String(fecha.getMonth() + 1).padStart(2, '0')
  var yyyy = fecha.getFullYear()
  fecha = yyyy + '-' + mm + '-' + dd
  return fecha
}
//Validar campos vacios o no validos
function validarCampos(email) {
  var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
  if (!expr.test(email)) {
    return false
  } else {
    return true
  }
}

//Evento click boton Enviar
// send.addEventListener('click', async () => {
//   const selectValue = document.getElementById('monto-pago').value
//   const formatValue = parseFloat(selectValue)
//   console.log(formatValue)
// })

send.addEventListener('click', async (e) => {
  e.preventDefault()

  let email = document.getElementById('correo-cliente').value
  let lname = document.getElementById('apellidos-cliente').value
  let fname = document.getElementById('nombres-cliente').value
  // let movil = document.getElementById('movil').value

  const item_id = await getItemIdBooks()

  //Validar correo vacios o no validos
  if (validarCampos(email) === true) {
    //Comprobar contacto CRM con email
    const resp = await comprobarContacto(email)
    console.log(resp)
    if (resp != '') {
      //Existe contacto CRM
      //Obtener contacto id BOOKS con email
      const idContactoBooks = await obtenerContactoBooks(email)

      console.log('item de books: ', item_id)
      //Crear factura
      const respInvoice = await crearFactura(idContactoBooks, item_id)
      //Enviar factura
      let invoice_id = respInvoice.invoice.invoice_id
      const respSendInvoice = await enviarFactura(invoice_id)
      console.log(respInvoice)
      console.log(respSendInvoice)
    } else {
      //No existe contacto CRM
      //Crear contacto
      //Datos de contacto
      const data = {
        data: [
          {
            Last_Name: lname,
            First_Name: fname,
            Email: email,
            // Mobile: movil,
          },
        ],
      }
      //Crear contacto
      const respCrearContacto = await crearContacto(data)
      console.log(respCrearContacto.data[0])
      //Sincronizar contacto crm -> books
      let idContactCRM = respCrearContacto.data[0].details.id
      const respSyncContacto = await sincronizarContacto(idContactCRM)
      console.log(respSyncContacto)
      //Crear factura
      let idBooks = respSyncContacto.data.customer_id
      const respInvoice = await crearFactura(idBooks, item_id)
      //Enviar factura
      let invoice_id = respInvoice.invoice.invoice_id
      const respSendInvoice = await enviarFactura(invoice_id)
      console.log(respInvoice)
      console.log(respSendInvoice)
    }
  } else {
    window.alert('Error: La dirección de correo ' + email + ' es incorrecta.')
  }
})
