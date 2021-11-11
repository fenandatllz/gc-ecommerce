import { openLoginForm } from './alertas.js'
import { AbrirLoginForm } from "./login.js";

// const btnGetDesarrollo = document.querySelector('#get-desarrollo');
// const getDesarrollo = document.querySelector('#nombre-desarrollo');
// console.log(getDesarrollo.innerHTML);
const correoUsuario = "fernandaciprian31@gmail.com";
const contra = "123456";
let posicionY = 0
let posicionX = 0

const toolTip = document.getElementById('info-lote')
let mapa = document.getElementById('mapa-interactivo')

const loadManzana = async (desarrollo, manzana) => {
  fetch(`./desarrollos/${desarrollo}/Manzanas/${manzana}.svg`)
    .then((svg) => svg.text())
    .then((html) => (mapa.innerHTML = html))
}

// btnGetDesarrollo.addEventListener('click', (e) => {
//   const desarrollo = document
//     .querySelector('#desarrollo')
//     .value.toLowerCase()
//     .replace(' ', '-')

//   mapa.innerHTML = ''
//   fetch(`./desarrollos/${desarrollo}/plano.svg`)
//     .then((svg) => svg.text())
//     .then((html) => (mapa.innerHTML = html))
// })

// Obtener disponibilidad
const getDisponiblidad = async (fraccionamiento, manzana) => {
  const request = await fetch(
    `/server/ecommerce/crm/getDisponibilidad/${fraccionamiento}/${manzana}`
  )
  //   const data = await request.json()

  const data = await request.json()
  console.log(data)
  poblarLotificacion(data.data)
}

// Iluminar disponibilidad de lotes
const poblarLotificacion = (disponibilidad) => {
  // escoger el svg correcto
  const lotes = Array.from(mapa.querySelectorAll('[data-lote]'))
  lotes.forEach((lote) => {
    const lotifacion = lote.id.split('-')[1]
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

const desarrollo = document
  .querySelector('#nombre-desarrollo')
  .innerHTML.toLowerCase()
  .replace(' ', '-')

mapa.innerHTML = ''
fetch(`./desarrollos/${desarrollo}/plano.svg`)
  .then((svg) => svg.text())
  .then((html) => (mapa.innerHTML = html))

mapa.addEventListener('click', (e) => {
  if (e.target.matches('[data-manzana]')) {
    // const manzana = e.target.id
    let auxManzana = e.target.id.split('-') 
    const manzana = auxManzana[0];
    posicionY = e.pageY;
    posicionX = e.pageX;
    const svgNombre = e.target.closest('svg').dataset.desarrollo
    const fraccionamiento =
      document.getElementById('nombre-desarrollo').textContent
    console.log(fraccionamiento, manzana)
    loadManzana(svgNombre, manzana)
    getDisponiblidad(fraccionamiento, manzana)
    // console.log()
  }
})

mapa.addEventListener('click', (e) => {
  const desarrollo = document.querySelector('#nombre-desarrollo').innerHTML
  const info = document.querySelector('.info-apartado')
  let posicionModal = e.pageY
  const modal = document.getElementById('modal')
  if (e.target.matches('[data-lote]')) {
    console.log(`${desarrollo} ${e.target.id}`)
    console.log(`posicion:  ${posicionModal}`)
    if(sessionStorage.getItem("correo") == correoUsuario && sessionStorage.getItem("contrase_a") == contra)
    {
      modal.style.top = posicionModal + 'px'
      openLoginForm()
      info.innerHTML = desarrollo + ' ' + e.target.id
      info.dataset.manzanaylote = e.target.id
    }
    else{
      modalLogin.style.top = posicionModal + 'px';
      AbrirLoginForm();
    }
   
    
  }
})

mapa.addEventListener('mouseover', (e) => {
  if (e.target.matches('[data-lote]')) {
    toolTip.innerHTML = ''
    let lote = document.createElement('p')
    lote.textContent = e.target.id
    toolTip.appendChild(lote)
    let dimension = document.createElement('p')
    dimension.textContent = 'Dimension: ' + e.target.dataset.dimension + ' m2'
    toolTip.appendChild(dimension)
    let costoMetro = document.createElement('p')
    costoMetro.textContent = 'Costo M2: $ ' + e.target.dataset.costom2
    toolTip.appendChild(costoMetro)
    let total = document.createElement('p')
    total.textContent = 'Costo total: $ ' + e.target.dataset.costototal
    toolTip.appendChild(total)
    posicionX = e.pageX
    posicionY = e.pageY
    showPopup()
  }
})

mapa.addEventListener('mouseout', (e) => {
  if (e.target.matches('[data-lote]')) {
    hidePopup()
  }
})

function showPopup(evt) {
  let mapaSvg = mapa.querySelector('#map')
  let map = mapaSvg.getBoundingClientRect()
  toolTip.style.left = posicionX + 'px'
  toolTip.style.top = posicionY + 'px'
  toolTip.style.display = 'block'
}

function hidePopup(evt) {
  toolTip.style.display = 'none'
}

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
