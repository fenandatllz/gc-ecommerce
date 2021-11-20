const login = document.querySelector('.btn-login');//iniciar sesion header
const btnLogout = document.querySelector('.btn-logout');// cerrar sesion header
const nombreUsuario = document.getElementById('nombre-usuario');

setTimeout(function(){
    $('.loader_bg').fadeToggle();
}, 1500);

window.onload = mostrarBoton();

function mostrarBoton(){
    if(sessionStorage.getItem("sesion"))
    {
        btnLogout.style.display = "block"
        login.style.display = "none"
        nombreUsuario.innerText = "Bienvenido(a): "+ sessionStorage.getItem('usuario')
    }
    else
    {
        btnLogout.style.display = "none"
        login.style.display = "block"
        nombreUsuario.innerText = " "
    }
}
