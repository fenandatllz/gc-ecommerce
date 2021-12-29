'use strict'

let containerMapa = document.getElementById('mapa-interactivo')
// const Name_frac = document.getElementById('nombre-desarrollo').textContent
// const fracc = await Zoho.getFraccionamiento( Name_frac )

const mapa = {
  loadManzana: async (desarrollo, manzana, fracc) => {
    fetch(`./desarrollos/${desarrollo}/Manzanas/${manzana}.svg`)
      .then((svg) => svg.text())
      .then((html) => {
        containerMapa.innerHTML = html
        mapa.bloquearManzana(fracc)
      })
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
        lote.style.stroke = '#de9f27'
        lote.dataset.lote = ""
        lote.dataset.crm = false
        lote.classList = "login"
      }
    })
  
  
    disponibilidad.map((product) => {
      try {
        let lote = ''
        if( product.Lote_Letra == null){
          console.log(`M${product.Manzana}-L${product.Lote}`)
          lote = document.getElementById(`M${product.Manzana}-L${product.Lote}`)
        }else{
          console.log(`M${product.Manzana}-L${product.Lote + product.Lote_Letra}`)
          lote = document.getElementById(`M${product.Manzana}-L${product.Lote + product.Lote_Letra}`)
        }
        
  
        lote.dataset.crm_id = product.id
        lote.dataset.crm = true
        lote.dataset.costototal = product.Unit_Price
        lote.dataset.dimension = product.Dimension_del_Terreno_M21
        lote.dataset.costom2 = product.Costo_por_M2
  
        if (product.Estado != "Disponible") {
          lote.style.fill = 'red'
          lote.style.stroke = '#de9f27'
          lote.removeAttribute('onclick')
          console.log("red")
        } else if (product.Estado == "Disponible") {
          lote.style.fill = 'orange'
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
  },
  async bloquearManzana(fracc){
    const Manzanas = document.querySelectorAll('[data-manzana]')

    // const request = await Zoho.getFraccionamiento( Name_frac )
    let secciones = JSON.parse ( fracc.secciones )
    
    Manzanas.forEach(async (m) => {
      let Manzana = m.dataset.manzana.replace('M', '');
      const seccion = secciones.find((e) => Manzana >= e.init && Manzana <= e.end)
      if(seccion === undefined) this.bloquear(m) 
    })
  },
  bloquear(e){
    delete e.dataset.manzana
    delete e.classList
    e.classList.add('disabled')
  },
}

export default mapa