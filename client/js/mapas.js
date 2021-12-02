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
        lote.style.fill = '#2E4D19'
        lote.style.stroke = '#de9f27'
        lote.setAttribute("stroke-width", "1.96")
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
        lote.dataset.trato = product.Product_Name
        lote.dataset.crm = true
        lote.dataset.costototal = product.Unit_Price
        lote.dataset.dimension = product.Dimension_del_Terreno_M21
        lote.dataset.costom2 = product.Costo_por_M2
  
        if (product.Estado != "Disponible") {
          lote.style.fill = '#980C16'
          lote.style.stroke = '#de9f27'
          lote.removeAttribute('onclick')
          console.log("red")
        } else if (product.Estado == "Disponible") {
          lote.style.fill = '#416E23'
          lote.style.stroke = '#de9f27'
          console.log("orange")
        }
      } catch (err) {
        console.log(err)
      }
    })
  
  
  },
  showPopup(e, x, y) {
    //   let mapaSvg = mapa.querySelector('#map')
    //   let map = mapaSvg.getBoundingClientRect()
    e.style.left = x + 'px'
    e.style.top = y + 'px'
    e.style.display = 'block'
  },
  hidePopup(e) {
    e.style.display = 'none'
  }
}

export default mapa