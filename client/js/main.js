'use strict'

import Login from './login.js'
import Loader from './loader.js'

// get fracionamientos
const getJSON = async () => {
    let Desarollos = fetch("./data/details.json")
    return await (await Desarollos).json()
}
const data = await getJSON()
const cards = document.getElementById("cards")

// agrega cartas de los fracionamientos 
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

// agrega login/pay dinamicamente
// let login = document.getElementById('btn-login')
let logout = document.getElementById('btn-logout')
if (sessionStorage.getItem("sesion")) {
    Login.innerPay()
    Login.mostrarBoton()
} else {
    Login.innerLogin()
    Login.mostrarBoton()
}

// open login
// login.addEventListener('click', () => {
//     Login.viewModal(true)
// })

// cerrar sesion
logout.addEventListener('click', () => {
    Login.logout()
})

// inico de sesion 
// const iniciarSesion = document.getElementById('iniciar-sesion')
// let pay = true
// iniciarSesion.addEventListener('click', () => {
//     Login.login(pay)
// })

// cerrar modal

const containerModal = document.getElementById('container-modal')
containerModal.addEventListener('click', (e) => {
    if (e.target.id == "container-modal") {
        Login.viewModal(false)
    }
})

// evento login/registro

// const btnIniciar = document.getElementById('btn-iniciar') // iniciar sesion formulario (arriba)
// const btnRegistrar = document.getElementById('btn-registrar') // registrar formulario

// btnIniciar.addEventListener('click', () => {
//     Login.inicio();
// })
// btnRegistrar.addEventListener('click', () => {
//     Login.registro();
// })


Loader.toggleLoader()
