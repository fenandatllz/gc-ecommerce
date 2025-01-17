'use strict'

import Loader from './loader.js'
import { loteSeleccionado } from './loader.js'

// add login
const modal = document.getElementById('modal')
const nombreUsuario = document.getElementById('nombre-usuario')
const body = document.getElementsByTagName("body")
let type = body[0].dataset.type
let loginForms,c
export let sesionPago = false

const login = {
    innerLogin(pay){
        modal.innerHTML = " "
        modal.innerHTML = `
        <div class="button-box">
            <div id="btn" id="btn-active-login"></div>
            <button id="btn-iniciar" type="button" class="toggle-btn">Iniciar Sesión</button>
            <button id="btn-registrar" type="button" class="toggle-btn">Registrar</button>
        </div>
        <div id="login-forms" class="login-forms-login">
            <form id="login" class="input-group">
                <input id="correo" type="email" class="input-field" placeholder="Correo electrónico" required>
                <input id="contrase_a" type="password" class="input-field" placeholder="Contraseña" required>
                <div class="checkbox">
                    
                    <input type="checkbox"/>
                    <label>Recordar Contraseña</label>
                </div>
                <button type="button" class="submit-btn" id="iniciar-sesion">Iniciar Sesión</button>
                <span id="error"></span>
            </form>
            <form id="registro" class="input-group">
                <input type="text" class="input-field" placeholder="Nombre(s)" required>
                <input type="text" class="input-field" placeholder="Apellidos" required>
                <input type="tel" class="input-field" placeholder="Telefono" required>
                <input type="email" class="input-field" placeholder="Correo Electrónico" required>
                <input type="password" class="input-field" placeholder="Contraseña" required>
                <input type="password" class="input-field" placeholder="Confirmar Contraseña" required>
                <button type="submit" class="submit-btn" id="registrar-usuario">Registrar</button>
            </form>
        </div>
        
        `
        c = document.getElementById('btn')
        loginForms = document.getElementById('login-forms')
        // open login
        let btnLogin = document.getElementById('btn-login')

        btnLogin.addEventListener('click', () => {
            this.viewModal(true)
            sesionPago = true;
        })

        // inicio de sesion 
        let iniciarSesion = document.getElementById('iniciar-sesion')
        iniciarSesion.addEventListener('click', () => {
            this.login(pay)
        })

        // evento login/registro
        let btnIniciar = document.getElementById('btn-iniciar') // iniciar sesion formulario (arriba)
        let btnRegistrar = document.getElementById('btn-registrar') // registrar formulario

        btnIniciar.addEventListener('click', () => {
            this.inicio();
        })
        btnRegistrar.addEventListener('click', () => {
            this.registro();
        })
        return true
    },
    innerPay: () => {
        modal.innerHTML = " "
        modal.innerHTML = `
        <form class="pay-form"> 
            <div class="pay-header">
                Introduzca Datos del Contacto
                <div class="pay-division-modal"></div>
            </div>
            <div class="element" id="info-apartado">
                <div class="info-title">INFORMACIÓN DE PRODUCTO</div>
                <div id="info-product" class="info-product">
            
                </div>
            </div>
            <div class="element" id="input-mensualidad">
                <input type="text" id="mensualidad" disabled>
            </div>
            <div class="element">
                <label>¿Desea dar un enganche?</label>
                <input type="checkbox" id="checkEnganche">
            </div>
            <div class="element" id="mostrarEnganche" style="display: none;">
                <select name="monto-enganche" id="monto-enganche">
                </select>
            </div>            
                <div class="element">                          
                    <button type="submit" id="btn-enviar" class="enviar">Enviar</button>
                </div>
                <div class="element">
                    <button type="submit" id="btn-cancelar" class="cancelar">Cancelar</button>
                </div>
        </form>
        `
        const checkEn = document.getElementById('checkEnganche')
        checkEn.addEventListener('click', (e) =>{
            login.MostrarDiv(e.target)
        })
        return true
    },
    MostrarDiv(checkEnganche) {
        // const checkPrueba = document.getElementById('checkEnganche');
        console.log(checkEnganche)
        let dvEnganche = document.getElementById("mostrarEnganche");
        let mensualidad = document.getElementById('mensualidad')
    
        dvEnganche.style.display = checkEnganche.checked ? "block" : "none";
        mensualidad.style.display = checkEnganche.checked ? "none" : "block"
    },

    mostrarInfoLote : (loteSeleccionado) =>{
        const info = document.getElementById('info-product')
        const trato = document.createElement('P');
        const dimension = document.createElement('P');
        const costo = document.createElement('P');
        const total = document.createElement('P');
        trato.textContent = "Producto: " + loteSeleccionado.target.dataset.trato;
        info.appendChild(trato);
        dimension.textContent = "Dimensión m2: " + loteSeleccionado.target.dataset.dimension;
        info.appendChild(dimension);
        costo.textContent = 'Costo M2 : $' + loteSeleccionado.target.dataset.costom2;
        info.appendChild(costo);
        total.textContent = 'Total: $' + loteSeleccionado.target.dataset.costototal;
        info.appendChild(total);
        
    },
    viewModal:  (view) => {
        let modal = document.getElementById('container-modal')
        if(view){
            modal.style.display = "flex"
        }else{
            modal.style.display = "none"
        }
    },
    registro: () =>{
        c.style.left = '140px'
        loginForms.classList = "login-forms-register"
    },
    inicio: () =>{
        c.style.left = '0px';
        loginForms.classList = "login-forms-login"
    },
    login(pay){
        console.log("Login: "+pay)
        let email = document.getElementById('correo')
        let password = document.getElementById('contrase_a')
        const Msg = document.getElementById('error')

        let body = {
            email: email.value,
            password: password.value
        }
    
        fetch("/server/ecommerce/auth/sign-in",{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
        .then(data => data.json())
        .then(res => {
            if(res.code != 0) {
                console.log("No Login !!")
                email.value = " "
                password.value = ""
                Msg.innerText = "Usuario y/o contraseña incorrectos";
                Msg.style.display = "block";
                this.ocultarError()
                return false
            }else{
                this.iniciar(pay)
                document.getElementById('')
                return true  
            }
        })

    },
    logout(){
        const loagout = fetch("/server/ecommerce/auth/sign-out",{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
        })
        console.log(loagout)
        sessionStorage.removeItem("usuario")
        sessionStorage.removeItem("correo")
        sessionStorage.removeItem("sesion")
        this.innerLogin(type);
        this.mostrarBoton()
    },
    iniciar(pay){
        sessionStorage.setItem("usuario", "Fernanda")
        sessionStorage.setItem("correo", document.getElementById('correo').value)
        sessionStorage.setItem("sesion", true)
        this.mostrarBoton()
        this.viewModal(false)
        if(sesionPago == false)
        {
            this.viewModal(true)
            if(pay) this.innerPay()
            Loader.loadOpciones()
            this.mostrarInfoLote(loteSeleccionado) 
        }
        console.log("SesionPago: " + sesionPago)    
          
    },
    mostrarBoton: () =>{
        let btnLogin = document.getElementById('btn-login')
        let btnLogout = document.getElementById('btn-logout')
        if(sessionStorage.getItem("sesion") == null)
        {
            btnLogout.style.display = "none"
            btnLogin.style.display = "block"
            nombreUsuario.innerText = " "
        }

        if(sessionStorage.getItem("sesion"))
        {
            btnLogout.style.display = "block"
            btnLogin.style.display = "none"
            nombreUsuario.innerText = "Bienvenido(a): "+ sessionStorage.getItem('usuario')
        }
    },
    // Mensaje error login 
    ocultarError(){
        const msgError = document.getElementById('error')
        setTimeout(() => {      
            msgError.remove();  
        }, 3500);
    }
}

export default login



