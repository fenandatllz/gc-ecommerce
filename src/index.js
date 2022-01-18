'use strict'

import Login from './js/login.js'
import Loader from './js/loader.js';
import './styles.css';
import './css/all.css';
import './css/load.css';
import './css/login.css';
import './css/mapas.css';
import './css/pay.css';

// carga de Cards/Detaills
const body = document.getElementsByTagName('body')
let type = body[0].dataset.type
Loader.getDesarollos(type)

// agrega login/pay dinamicamente
export function validarSesion(){
  if (sessionStorage.getItem("sesion")) {
      if(type) Login.innerPay()
      Loader.loadOpciones()
      Login.mostrarBoton()
  } else {
      Login.innerLogin(type)
      Login.mostrarBoton()
  }
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
validarSesion()
