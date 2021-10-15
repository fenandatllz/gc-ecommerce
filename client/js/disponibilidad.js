const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)

const mapa = document.querySelector('.contenedor-mapa')
const desarrollo = urlParams.get('Desarrollo')
const manzana = urlParams.get('Manzana')
console.log(desarrollo, manzana)

let lotes = [
  {
    id: '2234337000126263022',
    Lote: 'L3',
    Manzana: 'M1',
    Lote_Letra: null,
    Unit_Price: 10000,
    Nombre_Fraccionamiento: 'Villa Prueba',
    Costo_por_M2: 100,
    Dimension_del_Terreno_M21: 100,
    Uso_Predio: 'Habitacional',
    Manzana_y_Lote: 'M1////L3',
    Fraccionamiento: {
      name: 'Villa Prueba',
      id: '2234337000012338025',
    },
    Product_Name: 'VILLA PRUEBA M1-L3',
    Estado: 'Disponible',
  },
  {
    id: '2234337000126263050',
    Lote: 'L5',
    Manzana: 'M1',
    Lote_Letra: null,
    Unit_Price: 1000,
    Nombre_Fraccionamiento: 'Villa Prueba',
    Costo_por_M2: 10,
    Dimension_del_Terreno_M21: 100,
    Uso_Predio: 'Habitacional',
    Manzana_y_Lote: 'M1////L5',
    Fraccionamiento: {
      name: 'Villa Prueba',
      id: '2234337000012338025',
    },
    Product_Name: 'VILLA PRUEBA M1-L5',
    Estado: 'Vendido',
  },
  {
    id: '2234337000126276554',
    Lote: 'L2',
    Manzana: 'M1',
    Lote_Letra: null,
    Unit_Price: 15129,
    Nombre_Fraccionamiento: 'Villa Prueba',
    Costo_por_M2: 123,
    Dimension_del_Terreno_M21: 123,
    Uso_Predio: 'Habitacional',
    Manzana_y_Lote: 'M1////L2',
    Fraccionamiento: {
      name: 'Villa Prueba',
      id: '2234337000012338025',
    },
    Product_Name: 'VILLA PRUEBA M1-L2',
    Estado: 'Vendido',
  },
  {
    id: '2234337000126263036',
    Lote: 'L4',
    Manzana: 'M1',
    Lote_Letra: null,
    Unit_Price: 10000,
    Nombre_Fraccionamiento: 'Villa Prueba',
    Costo_por_M2: 100,
    Dimension_del_Terreno_M21: 100,
    Uso_Predio: 'Habitacional',
    Manzana_y_Lote: 'M1////L4',
    Fraccionamiento: {
      name: 'Villa Prueba',
      id: '2234337000012338025',
    },
    Product_Name: 'VILLA PRUEBA M1-L4',
    Estado: 'Disponible',
  },
]

const checkDisponibilidad = async () => {
  const request = await fetch(
    `/server/ecommerce/crm/getDisponibilidad/${desarrollo}/${manzana}`
  )
  //   const data = await request.json()

  return await (await request).json()
}

const poblarLotificacion = (disponibilidad) => {
  console.log(disponibilidad)
  const lotes = Array.from(mapa.querySelectorAll('[data-lote]'))
  lotes.forEach((lote) => {
    lotifacion = lote.id.split('-')[1]
    const prodExistente = disponibilidad.find((l) => l.Lote == lotifacion)
    if (prodExistente) {
      if (prodExistente.Estado != 'Disponible') {
        lote.style.fill = 'red'
        lote.removeAttribute('onclick')
      } else {
        lote.style.fill = 'green'
        //   console.log(lote)
      }
      lote.dataset.crm_id = prodExistente.id
      lote.dataset.crm_manzana = prodExistente.Manzana
      lote.dataset.sku = prodExistente.Manzana_y_Lote
      lote.dataset.estado = prodExistente.Estado
      lote.dataset.fraccionamiento = prodExistente.Nombre_Fraccionamiento
      lote.dataset.crm = true
    } else {
      // Pendientes por crear en CRM
      lote.style.fill = 'LawnGreen'
      lote.dataset.fraccionamiento = 'VILLA PRUEBA'
      lote.dataset.crm = false
    }
  })
  //   console.log(lotes)
}

checkDisponibilidad().then((data) => poblarLotificacion(data))
// poblarLotificacion(lotes)

// Event Listener
mapa.addEventListener('click', (e) => {
  if (e.target.matches('[data-lote]')) {
    const span = document.getElementById('item_seleccionado')
    span.textContent = ''
    producto = e.target.id
    lotifacion = producto.split('-')[1]
    console.log(lotifacion)
    span.textContent = e.target.id
  }
})
