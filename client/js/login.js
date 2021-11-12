const a = document.getElementById('login');
const b = document.getElementById('registro');
const c = document.getElementById('btn');
const closeLogin = document.getElementById('popup-login-close');
//--botones
const login = document.querySelector('.btn-login');//iniciar sesion header
const btnLogout = document.querySelector('.btn-logout');// cerrar sesion header
let iniciarSesion = document.querySelector('#iniciar-sesion');// boton iniciar sesion en formulario
const btnIniciar = document.getElementById('btn-iniciar'); // iniciar sesion formulario (arriba)
const btnRegistrar = document.getElementById('btn-registrar');// registrar formulario

const nombreUsuario = document.getElementById('nombre-usuario');
let Msg = document.getElementById('error');

const correoUsuario = "prueba";
const contra = "123";
//prueba

//     login.style.display = sesion ? "block" : "none"
//     btnLogout.style.display = sesion ? "none" : "block";

btnLogout.addEventListener('click', ()=>{
    logout();
})

function logout(){
    sessionStorage.clear();
    mostrarLogin();

}

iniciarSesion.addEventListener('click',()=>{
    iniciar();
})

function iniciar(){
    
    if(document.getElementById('correo').value == correoUsuario && document.getElementById('contrase_a').value == contra)
    {   
        // window.location.href = "index-copia.html";
        sessionStorage.setItem("usuario", "Fernanda")
        sessionStorage.setItem("correo", document.getElementById('correo').value)
        sessionStorage.setItem("contrase_a", document.getElementById('contrase_a').value)
        sessionStorage.setItem("sesion", true)
        CerrarLoginForm();
        mostrarLogout();
    } 
    else
    {
        Msg.innerText = "Usuario y/o contraseña incorrectos";
        Msg.style.display = "block";
    }
}

btnIniciar.addEventListener('click', () => {
    inicio();
})
btnRegistrar.addEventListener('click', () =>{
    registro();
})

function registro (){
    a.style.left ='-400px';
    b.style.left = '50px';
    c.style.left = '140px'
}

function inicio (){
    a.style.left ='50px';
    b.style.left = '450px';
    c.style.left = '0px';
}
function mostrarLogout(){
    btnLogout.style.display = "block"
    login.style.display = "none"
    // nombreUsuario.innerText = "Bienvenido(a): "+ sessionStorage.getItem('usuario')
}
function mostrarLogin(){
    btnLogout.style.display = "none"
    login.style.display = "block"
    // nombreUsuario.innerText = " "
}

// FormularioLogin 
export function AbrirLoginForm(){
    document.body.classList.add("MostrarLoginForm");
} 
function CerrarLoginForm(){
    const modalLogin = document.getElementById('modal-login');
    modalLogin.style.top = -150 + "%";
    document.body.classList.remove("MostrarLoginForm");
    
    
}

closeLogin.addEventListener('click', ()=>{
    CerrarLoginForm();
})
login.addEventListener('click',()=>{
    AbrirLoginForm();
})

