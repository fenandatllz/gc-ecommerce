'use strict'

import Login from './login.js'
import Loader from './loader.js'

// carga de Cards/Detaills
const body = document.getElementsByTagName('body')
let type = body[0].dataset.type
Loader.getDesarollos(type)

// agrega login/pay dinamicamente
if (sessionStorage.getItem('sesion')) {
  if (type) Login.innerPay()
  Login.mostrarBoton()
} else {
  Login.innerLogin(type)
  Login.mostrarBoton()
}

// cerrar sesion
let logout = document.getElementById('btn-logout')
logout.addEventListener('click', () => {
  Login.logout()
})

// cerrar modal
const containerModal = document.getElementById('container-modal')
containerModal.addEventListener('click', (e) => {
  if (e.target.id == 'container-modal') {
    Login.viewModal(false)
  }
})

Loader.toggleLoader()
