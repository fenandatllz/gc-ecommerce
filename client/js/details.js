const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
var index = urlParams.get('index');


const carrucel = document.getElementById('slider')
const descripcion = document.getElementById('descripcion')

const getJSON = async () => {
    let Desarollos = fetch("./data/details.json")
    return await (await Desarollos).json()
}

const data = await getJSON()

const frac = data[index]

frac.imgs.forEach((element, index) => {
    let li = document.createElement('li') 
    if(index == 0) {
        li.style = `background-image: url('${element}'); z-index:0; opacity: 1;`
    }else{
        li.style = `background-image: url('${element}');`
    }
    carrucel.appendChild(li)
})

// agrega detalles 
const article = document.createElement("article") 
const h1 = document.createElement("h1") 
h1.setAttribute("id",'nombre-desarrollo')
h1.innerText = frac.fracionamiento
article.appendChild(h1)

const div = document.createElement("div") 
div.classList = "division-detalle"
article.appendChild(div)


frac.descripciones.forEach((element, index) => {
    let p = document.createElement('p') 
    p.innerText = element
    article.appendChild(p)
})

descripcion.appendChild(article)
// fin de detalles 

const amenidades = document.getElementById("amenidades") 

frac.amenidades.forEach((element, index) => {
    let p = document.createElement('p')
    p.innerHTML = `<i class="fas fa-${element.icon}"></i>${element.name }`
    amenidades.appendChild(p)
})


const servicios = document.getElementById("servicios")

frac.servicios.forEach((element, index) => {
    let p = document.createElement('p')
    p.innerHTML = `<i class="fas fa-${element.icon}"></i>${element.name }`
    servicios.appendChild(p)

})


// agregar mapa 
let mapa = document.getElementById('mapa-interactivo')
const desarrollo = data[index].fracionamiento.toLowerCase()
.replace(' ', '-')

mapa.innerHTML = ''
fetch(`./desarrollos/${desarrollo}/plano.svg`)
  .then((svg) => svg.text())
  .then((html) => (mapa.innerHTML = html))
