// add login

const login = {
    loadModals: () => {
        const modalLogin = document.getElementById('modal-login')
        const modalPay = document.getElementById('modal-pay')

        modalLogin.innerHTML = `
        <div class="button-box">
            <div id="popup-login-close" class="popup-close-login">×</div>
            <div id="btn"></div>
            <button id="btn-iniciar" type="button" class="toggle-btn">Iniciar Sesión</button>
            <button id="btn-registrar" type="button" class="toggle-btn">Registrar</button>
        </div>
        <form id="login" class="input-group">
            <input id="correo" type="email" class="input-field" placeholder="Correo electrónico" required>
            <input id="contrase_a" type="password" class="input-field" placeholder="Contraseña" required>
            <input type="checkbox" class="checkbox"><span id="text-check">Recordar Contraseña</span>
            <button type="button" class="submit-btn" id="iniciar-sesion">Iniciar Sesión</button>
        </form>
        <span id="error"></span>
        <form id="registro" class="input-group">
            <input type="text" class="input-field" placeholder="Nombre(s)" required>
            <input type="text" class="input-field" placeholder="Apellidos" required>
            <input type="tel" class="input-field" placeholder="Telefono" required>
            <input type="email" class="input-field" placeholder="Correo Electrónico" required>
            <input type="password" class="input-field" placeholder="Contraseña" required>
            <input type="password" class="input-field" placeholder="Confirmar Contraseña" required>
            <input type="checkbox" id="check-registro" class="checkbox"><span>Acepto los terminos y condiciones</span>
            <button type="submit" class="submit-btn" id="registrar-usuario">Registrar</button>
        </form>
        `
        modalPay.innerHTML = `
        <div id="popup-apartado-close" class="popup-close" >×</div>
                <form class="form">
                    <div class="header">
                        Introduzca Datos del Contacto
                        <div class="division-modal"></div>
                    </div>
                    <div class="element">
                        <span class="info-apartado"> </span>
                    </div>
                    <div class="element">
                        <label>¿Desea dar un enganche?</label>
                        <input type="checkbox" id="checkEnganche" onclick="MostrarDiv(this)">
                    </div>
                    <div class="element" id="mostrarEnganche" style="display: none;">
                        <select name="monto-enganche" id="monto-enganche">
                            <option value="0" disabled selected> Seleccione Monto de Enganche </option>
                            <option value="1" >$ 100.00 DLLS</option>
                            <option value="2" >$ 200.00 DLLS</option>
                            <option value="3" >$ 300.00 DLLS</option>
                            <option value="4" >$ 400.00 DLLS</option>
                        </select>
                    </div>
                    <div class="element"> 
                        <select name="monto-pago" id="monto-pago" >
                            <option value="0" disabled selected> Seleccione Monto de Apartado </option>
                            <option value="1" >$ 50.00 DLLS</option>
                            <option value="2" >$ 100.00 DLLS</option>
                            <option value="3" >$ 150.00 DLLS</option>
                            <option value="4" >$ 200.00 DLLS</option>
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
        return true
    },
    opernModal: (login) => {
        const containerLogin = document.getElementById('container-login')

        if(!login){

        }else{

        }

    }
}

module.export = login





// fin login 

// const a = document.getElementById('login');
// const b = document.getElementById('registro');
// const c = document.getElementById('btn');
// const closeLogin = document.getElementById('popup-login-close');
// //--botones
// const login = document.querySelector('.btn-login');//iniciar sesion header
// const btnLogout = document.querySelector('.btn-logout');// cerrar sesion header
// let iniciarSesion = document.querySelector('#iniciar-sesion');// boton iniciar sesion en formulario
// const btnIniciar = document.getElementById('btn-iniciar'); // iniciar sesion formulario (arriba)
// const btnRegistrar = document.getElementById('btn-registrar');// registrar formulario

// const nombreUsuario = document.getElementById('nombre-usuario');
// let Msg = document.getElementById('error');

// btnLogout.addEventListener('click', ()=>{
//     logout();
// })

// function logout(){
//     sessionStorage.clear();
//     mostrarLogin();

// }

// iniciarSesion.addEventListener('click',()=>{

//     let body = {
//         email: document.getElementById('correo').value,
//         password: document.getElementById('contrase_a').value
//     }

//     fetch("/server/ecommerce/auth/sign-in",{
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(body)
//     })
//     .then(data => data.json())
//     .then(res => {
//         if(res.code != 0) {
//             console.log("No Login !!")
//             document.getElementById('correo').value = " "
//             document.getElementById('contrase_a').value = " "
//             Msg.innerText = "Usuario y/o contraseña incorrectos";
//             Msg.style.display = "block";
//         }else{
//             iniciar();  
//         }
//     })
// })

// function iniciar(){
//         // window.location.href = "index-copia.html";
//         sessionStorage.setItem("usuario", "Fernanda")
//         sessionStorage.setItem("correo", document.getElementById('correo').value)
//         // sessionStorage.setItem("contrase_a", document.getElementById('contrase_a').value)
//         sessionStorage.setItem("sesion", true)
//         CerrarLoginForm();
//         mostrarLogout();
// }

// btnIniciar.addEventListener('click', () => {
//     inicio();
// })
// btnRegistrar.addEventListener('click', () =>{
//     registro();
// })

// function registro (){
//     a.style.left ='-400px';
//     b.style.left = '50px';
//     c.style.left = '140px'
// }

// function inicio (){
//     a.style.left ='50px';
//     b.style.left = '450px';
//     c.style.left = '0px';
// }
// function mostrarLogout(){
//     btnLogout.style.display = "block"
//     login.style.display = "none"
//     // nombreUsuario.innerText = "Bienvenido(a): "+ sessionStorage.getItem('usuario')
// }
// function mostrarLogin(){
//     btnLogout.style.display = "none"
//     login.style.display = "block"
//     // nombreUsuario.innerText = " "
// }

// // FormularioLogin 
// export function AbrirLoginForm(){
//     document.body.classList.add("MostrarLoginForm");
//     const modalLogin = document.getElementById('modal-login');
//     modalLogin.style.top = 0 + "%";
//     modalLogin.style.position = "fixed"
// } 
// function CerrarLoginForm(){
//     const modalLogin = document.getElementById('modal-login');
//     // modalLogin.style.top = -150 + "%";
//     document.body.classList.remove("MostrarLoginForm");
    
    
// }

// closeLogin.addEventListener('click', ()=>{
//     CerrarLoginForm();
// })
// login.addEventListener('click',()=>{
//     AbrirLoginForm();
// })
