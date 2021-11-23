'use strict'

let containerMapa = document.getElementById('mapa-interactivo')

const mapa = {
  loadManzana: async (desarrollo, manzana) => {
    fetch(`./desarrollos/${desarrollo}/Manzanas/${manzana}.svg`)
      .then((svg) => svg.text())
      .then((html) => (containerMapa.innerHTML = html))
  },
  // Obtener disponibilidad
  async getDisponiblidad(fraccionamiento, manzana){
    const request = await fetch(
      `/server/ecommerce/crm/getDisponibilidad/${fraccionamiento}/${manzana}`
    )
    //   const data = await request.json()

    const data = await request.json()
    console.log(data)
    this.poblarLotificacion( await data.data)
  },
  poblarLotificacion(disponibilidad){

    const tempLotes = document.querySelectorAll(".cls-2")
    const lostes2 = Array.from(tempLotes)
    const Inexistentes = []
  
    lostes2.map((lote) => {
      if (lote.id.includes("L")) {
        lote.style.fill = 'green'
        lote.dataset.lote = ""
        lote.dataset.crm = false
        lote.classList = "login"
      }
    })
  
  
    disponibilidad.map((product) => {
      console.log(`M${product.Manzana}-L${product.Lote}`)
      // console.log(`M${product.Manzana}-L${product.Lote}`)
      try {
        let lote = document.getElementById(`M${product.Manzana}-L${product.Lote}`)
  
        lote.dataset.crm_id = product.id
        lote.dataset.crm = true
        lote.dataset.costototal = product.Unit_Price
        lote.dataset.dimension = product.Dimension_del_Terreno_M21
        lote.dataset.costom2 = product.Costo_por_M2
  
        if (product.Estado != "Disponible") {
          lote.style.fill = 'red'
          lote.removeAttribute('onclick')
          console.log("red")
        } else if (product.Estado == "Disponible") {
          lote.style.fill = 'orange'
          console.log("orange")
        }
      } catch (err) {
        console.log(err)
      }
    })
  
  
  },
  // showPopup(evt) {
  //   //   let mapaSvg = mapa.querySelector('#map')
  //   //   let map = mapaSvg.getBoundingClientRect()
  //   toolTip.style.left = posicionX + 'px'
  //   toolTip.style.top = posicionY + 'px'
  //   toolTip.style.display = 'block'
  // },
  // hidePopup(evt) {
  //   toolTip.style.display = 'none'
  // }
}

export default mapa



/*
  fetch(`./desarrollos/${desarrollo}/plano.svg`)
    .then((svg) => {
      if (!svg.ok) {
        throw Error('No esta disponible por el momento')
      }
      svg.text()
    })
    .then((html) => (mapa.innerHTML = html))
    .catch((err) => alert(err))
*/
