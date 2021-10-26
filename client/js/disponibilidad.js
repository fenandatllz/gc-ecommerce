const mapa = document.getElementById('mapa-interactivo')

const getDisponiblidad = async (fraccionamiento, manzana) => {
  const request = await fetch(
    `/server/ecommerce/crm/getDisponibilidad/${fraccionamiento}/${manzana}`
  )
  //   const data = await request.json()

  const data = await request.json()
  console.log(data)
  poblarLotificacion(data.data)
}

const poblarLotificacion = (disponibilidad) => {
  // escoger el svg correcto
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
