'use strict'

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

        if(type == "true"){
            console.log("loadDetails")
            this.loadDetails(data)
        }else{
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
    loadDetails(data) {
        const valores = window.location.search;
        const urlParams = new URLSearchParams(valores);
        var index = urlParams.get('index');
        const carrucel = document.getElementById('slider')

        const frac = data[index]
        frac.imgs.forEach((element, index) => {
            let li = document.createElement('li')
            if (index == 0) {
                li.style = `background-image: url('${element}'); z-index:0; opacity: 1;`
            } else {
                li.style = `background-image: url('${element}');`
            }
            carrucel.appendChild(li)
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
        fetch(`./desarrollos/${desarrollo}/plano.svg`)
            .then((svg) => svg.text())
            .then((html) => (mapa.innerHTML = html))
    }
}

export default loader

