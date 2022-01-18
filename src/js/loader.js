'use strict'

import Login from './login.js'
import Mapas from './mapas.js'
import {MostrarAlerta} from './navegacion.js'
import {zoomIn, zoomOut, zoomInit} from './mapas.js'
import { validarSesion } from '../index.js'
export let loteSeleccionado

let fracc = []
// let loaderBg = document.querySelector('.loader_bg')
const loader = {
  // toggleLoader: () => {
  //     loaderBg.style.animation = "fadeIn 10s 1";
  // },
  async getDesarollos(type) {
    const getJSON = async () => {
      let Desarollos = {}
      if (type == 'true') {
        console.log('type 2: ' + type)
        Desarollos = fetch('/server/ecommerce/catalyst/getDetails')
      } else {
        console.log('type 1: ' + type)
        Desarollos = fetch('/server/ecommerce/catalyst/getCartas')
      }

      return await (await Desarollos).json()
    }
    const data = await getJSON()
    console.log(data)
    console.log('type')
    console.log(type)

    if (type == 'true') {
      console.log('loadDetails')
      this.loadDetails(data)
    } else {
      console.log('loadIndex')
      this.loadIndex(data)
    }
  },
  loadIndex(data) {
    const cards = document.getElementById('cards')
    data.map((i, index) => {
      console.log(i.fraccionamientos.logo)
      let card = document.createElement('a')
      card.href = `details.html?index=${index}`
      card.classList = 'card'
      card.innerHTML = `
                    <div class="desarrollo">
                        <div class="nombre-desarrollo">${i.fraccionamientos.Fraccionamiento}</div>
                            <img src="${i.fraccionamientos.img}">
                            <div class="capa"><img src="${i.fraccionamientos.logo}" alt=""></div>
                    </div>
                `
      cards.appendChild(card)
    })
  },
  async loadDetails(data) {
    const valores = window.location.search
    const urlParams = new URLSearchParams(valores)
    var index = urlParams.get('index')
    const carrucel = document.getElementById('img-carrusel')

    // Slider
    const frac = data[index].fraccionamientos
    fracc = frac
    const imgs = JSON.parse(frac.imgs)
    console.log(imgs)
    imgs.forEach((element, index) => {
      let li = document.createElement("li")
      let img = document.createElement('img')
      img.src = `${element}`
      carrucel.appendChild(li);
      li.appendChild(img);
      carrucel.style.display = "flex";
    })

    // agrega detalles
    const article = document.createElement('article')
    const h1 = document.createElement('h1')
    h1.setAttribute('id', 'nombre-desarrollo')
    h1.innerText = frac.Fraccionamiento
    article.appendChild(h1)

    // agrega parrafos de detalles
    const descripcion = document.getElementById('descripcion')
    const div = document.createElement('div')
    div.classList = 'division-detalle'
    article.appendChild(div)
    const descripciones_array = JSON.parse(frac.descripciones)
    descripciones_array.forEach((element, index) => {
      let p = document.createElement('p')
      p.innerText = element
      article.appendChild(p)
    })
    descripcion.appendChild(article)

    // agrega amenidades
    const amenidades = document.getElementById('amenidades')
    const amenidades_array = JSON.parse(frac.amenidades)
    amenidades_array.forEach((element, index) => {
      let p = document.createElement('p')
      p.innerHTML = `<i class="fas fa-${element.icon}"></i>${element.name}`
      amenidades.appendChild(p)
    })

    // agrega servicios
    const servicios = document.getElementById('servicios')
    const servicios_array = JSON.parse(frac.servicios)
    servicios_array.forEach((element, index) => {
      let p = document.createElement('p')
      p.innerHTML = `<i class="fas fa-${element.icon}"></i>${element.name}`
      servicios.appendChild(p)
    })

    // agrega galeria 
    const galeria = document.querySelector('.gallery');

       imgs.forEach(element => {
       let enlaceImagen = document.createElement('A');
       enlaceImagen.setAttribute("href", `${element}`);
       galeria.appendChild(enlaceImagen);

       let imagen = document.createElement('img');
       imagen.src = `${element}`;
       enlaceImagen.appendChild(imagen);

        lightGallery(document.querySelector('.gallery'));
    });

    // agrega mapa
    let mapa = document.getElementById('mapa-interactivo')
    const desarrollo = frac.Fraccionamiento.toLowerCase().replace(' ', '-')

    mapa.innerHTML = ''
    const loadPlano = await fetch(`./desarrollos/${desarrollo}/plano.svg`)
    // const loadPlano = await fetch('https://grupoconcordia.com/paginawebimg/plano.svg')

    console.log(loadPlano)

    let temp_svg = await loadPlano.text()
    console.log( temp_svg )
    mapa.innerHTML = temp_svg

    Mapas.bloquearManzana(fracc)
    this.mapEvent()
    zoomIn()
    zoomOut()
    zoomInit()
  },
  //Fetch Pago PM & Enganche
  loadOpciones() {
    const valores = window.location.search
    const urlParams = new URLSearchParams(valores)
    var index = urlParams.get('index')
    const select = document.getElementById('monto-enganche')
    let inputPM = document.getElementById('mensualidad')
    fetch('./data/details.json')
      .then((res) => res.json())
      .then((data) => {
        //carga enganches
        const fraccPago = data[index]
        inputPM.value = `Pago de primer mensualidad: ${fraccPago.pagoPM}`
        fraccPago.pagoEnganche.forEach((e, i) => {
          let option = document.createElement('option')
          option.value = i
          option.innerText = e
          console.log('e')
          console.log(e)
          select.appendChild(option)

          // let html = ''
          // html += `
          //        <option value="0" disabled selected> Seleccione Monto de Enganche </option>
          //        <option>${opcion.Enganche[0]}</option>
          //        <option>${opcion.Enganche[1]}</option>
          //        <option>${opcion.Enganche[2]}</option>
          //       `
          // select.innerHTML = html
        })
        //carga Primer Mensualidad
        // fraccPago.pagoPM.forEach((opcion) => {
        // inputPM.value = `Pago de primer mensualidad: ${fraccPago.pagoPM}`
        // })
      })
  },
  mapEvent() {
    // Eventos Mapa
    let posicionY = 0
    let posicionX = 0

    const toolTip = document.getElementById('info-lote')
    let mapa = document.getElementById('mapa-interactivo')

    mapa.addEventListener('click', async (e) => {
      if (e.target.matches('[data-manzana]')) {
        // const manzana = e.target.id
        let auxManzana = e.target.id.split('-')
        const manzana = auxManzana[0]
        /*posicionY = e.pageY;
                posicionX = e.pageX;*/
        const svgNombre = e.target.closest('svg').dataset.desarrollo
        const fraccionamiento =
          document.getElementById('nombre-desarrollo').textContent
        console.log(fraccionamiento, manzana)
        await Mapas.loadManzana(svgNombre, manzana, fracc)
        // Mapas.bloquearManzana(fracc)
        Mapas.getDisponiblidad(fraccionamiento, manzana)
        // console.log()
      }
    })

    mapa.addEventListener('click', (e) => {
      if (e.target.matches('[data-lote]')) {
        loteSeleccionado = e
        console.log("Lote: "+ loteSeleccionado)
        if(e.target.dataset.disponible == "true")
        {
          Login.viewModal(true, e.target.id)
          validarSesion()
          if(sessionStorage.getItem("sesion"))
          Login.mostrarInfoLote(loteSeleccionado)          
          }else{
            MostrarAlerta()
          }
      }
    })

    mapa.addEventListener('mouseover', (e) => {
      if (e.target.matches('[data-lote]') && e.target.dataset.disponible == 'true') {
        toolTip.innerHTML = ''
        let lote = document.createElement('p')
        lote.textContent = e.target.id
        toolTip.appendChild(lote)
        let dimension = document.createElement('p')
        dimension.textContent =
          'Dimension: ' + e.target.dataset.dimension + ' m2'
        toolTip.appendChild(dimension)
        let costoMetro = document.createElement('p')
        costoMetro.textContent = 'Costo M2: $ ' + e.target.dataset.costom2
        toolTip.appendChild(costoMetro)
        let total = document.createElement('p')
        total.textContent = 'Costo total: $ ' + e.target.dataset.costototal
        toolTip.appendChild(total)
        posicionX = e.pageX
        posicionY = e.pageY
        e.target.style.fill = '#e5b252'
        e.target.style.cursor = 'pointer'
        Mapas.showPopup(toolTip, posicionX, posicionY)
      }
    })

    mapa.addEventListener('mouseout', (e) => {
      if (e.target.matches('[data-lote]') && e.target.dataset.disponible == 'true') {
        e.target.style.fill = '#de9f27'              
        Mapas.hidePopup(toolTip)
      }
    })
  },
}

export default loader
