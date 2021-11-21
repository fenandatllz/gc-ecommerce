'use strict'

import Login from './login.js'
import Loader from './loader.js'

const getJSON = async () => {
    let Desarollos = fetch("./data/details.json")
    return await (await Desarollos).json()
}

const data = await getJSON()


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
let login = document.getElementById('btn-login')
let logout =document.getElementById('btn-logout')
if(sessionStorage.getItem("sesion")){
    Login.innerPay()
    login.style.display = "none"
    logout.style.display = "block"
}else{
    Login.innerLogin()
    login.style.display = "block"
    logout.style.display = "none"
}

login.addEventListener('click', () => {
    // console.log(this)
    Login.viewModal(true)
})



Loader.toggleLoader()
