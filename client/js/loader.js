'use strict'

import Login from './login.js'
import Mapas from './mapas.js'

const loader = {
    toggleLoader: () => {
        setTimeout(function () {
            $('.loader_bg').fadeToggle();
        }, 1500)
    },
    async getDesarollos(type) {
        const getJSON = async () => {
            let Desarollos = fetch("./data/details.json")
            return await (await Desarollos).json()
        }
        const data = await getJSON()
        console.log("type")
        console.log(type)


        if (type == "true") {
            console.log("loadDetails")
            this.loadDetails(data)
        } else {
            console.log("loadIndex")
            this.loadIndex(data)
        }
    },
    loadIndex(data) {
        const cards = document.getElementById("cards")
        data.map((i, index) => {
            let card = document.createElement('a')
            card.href = `details.html?index=${index}`
            card.classList = "card"
            card.innerHTML = `
                    <div class="desarrollo">
                        <div class="nombre-desarrollo">${i.fracionamiento}</div>
                            <img src="${i.img}">
                            <div class="capa"><img src="${i.logo}" alt=""></div>
                    </div>
                `
            cards.appendChild(card)
        })
    },
    async loadDetails(data) {
        const valores = window.location.search;
        const urlParams = new URLSearchParams(valores);
        var index = urlParams.get('index');
        const carrucel = document.getElementById('img-carrusel');
        const select = document.getElementById('monto-enganche');

        // Slider
        const frac = data[index]
        frac.imgs.forEach((element, index) => {
            let img = document.createElement('img')
            if (index == 0) {
                img.src = `${element}`
            } else {
                img.src = `${element}`
            }
            carrucel.appendChild(img)
            carrucel.style.display = "flex";
        })

        const fraccPago = data[index]
        //foreach para cargar enganches
        fraccPago.pagoEnganche.forEach((opcion) =>{
            let html = ""    
            html += `
            <option value="0" disabled selected> Seleccione Monto de Enganche </option>
            <option>${opcion.Enganche[0]}</option>
            <option>${opcion.Enganche[1]}</option>
            <option>${opcion.Enganche[2]}</option>
            `
            select.innerHTML = html
    
         })
    //foreach para cargar Primer Mensualidad
    let inputPM = document.getElementById('mensualidad');

    fraccPago.pagoPM.forEach((opcion) =>{
        inputPM.value = `Pago de primer mensualidad: ${opcion.Mensualidad}`;
      
    })
        // agrega detalles 
        const article = document.createElement("article")
        const h1 = document.createElement("h1")
        h1.setAttribute("id", 'nombre-desarrollo')
        h1.innerText = frac.fracionamiento
        article.appendChild(h1)

        // agrega parrafos de detalles
        const descripcion = document.getElementById('descripcion')
        const div = document.createElement("div")
        div.classList = "division-detalle"
        article.appendChild(div)
        frac.descripciones.forEach((element, index) => {
            let p = document.createElement('p')
            p.innerText = element
            article.appendChild(p)
        })
        descripcion.appendChild(article)

        // agrega amenidades
        const amenidades = document.getElementById("amenidades")
        frac.amenidades.forEach((element, index) => {
            let p = document.createElement('p')
            p.innerHTML = `<i class="fas fa-${element.icon}"></i>${element.name}`
            amenidades.appendChild(p)
        })

        // agrega servicios
        const servicios = document.getElementById("servicios")
        frac.servicios.forEach((element, index) => {
            let p = document.createElement('p')
            p.innerHTML = `<i class="fas fa-${element.icon}"></i>${element.name}`
            servicios.appendChild(p)

        })


        // agrega mapa 
        let mapa = document.getElementById('mapa-interactivo')
        const desarrollo = data[index].fracionamiento.toLowerCase()
            .replace(' ', '-')

        mapa.innerHTML = ''
        const loadPlano = await fetch(`./desarrollos/${desarrollo}/plano.svg`)
            .then((svg) => svg.text())
            .then((html) => (mapa.innerHTML = html))

        this.mapEvent()
    },
    mapEvent(){
        // Eventos Mapa 
        let posicionY = 0
        let posicionX = 0

        const toolTip = document.getElementById('info-lote')
        let mapa = document.getElementById('mapa-interactivo')


        mapa.addEventListener('click', (e) => {
            if (e.target.matches('[data-manzana]')) {
                // const manzana = e.target.id
                let auxManzana = e.target.id.split('-')
                const manzana = auxManzana[0];
                /*posicionY = e.pageY;
                posicionX = e.pageX;*/
                const svgNombre = e.target.closest('svg').dataset.desarrollo
                const fraccionamiento =
                    document.getElementById('nombre-desarrollo').textContent
                console.log(fraccionamiento, manzana)
                Mapas.loadManzana(svgNombre, manzana)
                Mapas.getDisponiblidad(fraccionamiento, manzana)
                // console.log()
            }
        })

        mapa.addEventListener('click', (e) => {
            // const desarrollo = document.querySelector('#nombre-desarrollo').innerHTML
            // const info = document.querySelector('.info-apartado')
            // let posicionModal = e.pageY
            // const modal = document.getElementById('modal')
            // const modalLogin = document.getElementById("modal-login")
            if (e.target.matches('[data-lote]')) {
                Login.viewModal(true)
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
                Mapas.showPopup(toolTip, posicionX, posicionY)
            }
        })

        mapa.addEventListener('mouseout', (e) => {
            if (e.target.matches('[data-lote]')) {
                Mapas.hidePopup(toolTip)
            }
        })
    }
}

export default loader

