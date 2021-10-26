const closeMonto = document.getElementById('popup-apartado-close');
const btnEnviar = document.getElementById('btn-enviar');
const btnCancelarPago = document.getElementById('btn-cancelar');
const btnCerrarAlerta = document.getElementById('close'); //Cerrar Alerta Pago exitoso
const btnCerrarAlert = document.getElementById('close-sin-exito');//Cerrar Alerta Pago sin exito

// Abrir Formulario Monto-Pago
 export function openLoginForm(){
        document.body.classList.add("showLoginForm");

        } 
// Cerrar Formulario
   function closeLoginForm(){
            document.body.classList.remove("showLoginForm");
            const modal = document.getElementById('modal');
            modal.style.top = -150 + '%';
        }

 closeMonto.addEventListener('click', ()=>{
    closeLoginForm();
})

// Alerta Pago Exitoso
btnEnviar.addEventListener('click', ()=>{
        showToast();
})

  function showToast(){
        let x;
        let toast = document.getElementById("toast");
        clearTimeout(x);
        toast.style.transform = "translateX(0)";
        x = setTimeout(()=>{
             toast.style.transform = "translateX(400px)"
             }, 4000);
            }
       function closeToast(){
             toast.style.transform = "translateX(400px)";
        }
//Alerta Error Pago 
btnCancelarPago.addEventListener('click', () =>{
        showAlerta();
})

let y;
let alerta = document.getElementById("toast2");

        function showAlerta(){
                clearTimeout(y);
                alerta.style.transform = "translateX(0)";
                y = setTimeout(()=>{
                     alerta.style.transform = "translateX(400px)"
                     }, 4000);
                    }
                function cerrarToast(){
                     alerta.style.transform = "translateX(400px)";
                }
//Cerrar Alertas de pago exitoso y pago sin exito
btnCerrarAlerta.addEventListener('click', ()=>{
        closeToast();
})
btnCerrarAlert.addEventListener('click', ()=>{
        cerrarToast();
})

// Modal Pago Exitoso
const btnPago = document.querySelector('#btn-enviar');
btnPago.addEventListener('click', () => {  
     document.getElementsByClassName("success");
     closeLoginForm();
    });

//Modal Pago Sin Exito
const btnCancelar = document.querySelector('#btn-cancelar');
 btnCancelar.addEventListener('click', () => {  
     document.getElementsByClassName("error");
     closeLoginForm();
    });



