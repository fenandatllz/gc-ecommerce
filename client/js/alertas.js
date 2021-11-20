// const modalPay = document.getElementById('modal')

// modalPay.innerHTML = `
// <div id="popup-apartado-close" class="popup-close" >×</div>
//         <form class="form">
//             <div class="header">
//                 Introduzca Datos del Contacto
//                 <div class="division-modal"></div>
//             </div>
//             <div class="element">
//                 <span class="info-apartado"> </span>
//             </div>
//             <div class="element">
//                 <label>¿Desea dar un enganche?</label>
//                 <input type="checkbox" id="checkEnganche" onclick="MostrarDiv(this)">
//             </div>
//             <div class="element" id="mostrarEnganche" style="display: none;">
//                 <select name="monto-enganche" id="monto-enganche">
//                     <option value="0" disabled selected> Seleccione Monto de Enganche </option>
//                     <option value="1" >$ 100.00 DLLS</option>
//                     <option value="2" >$ 200.00 DLLS</option>
//                     <option value="3" >$ 300.00 DLLS</option>
//                     <option value="4" >$ 400.00 DLLS</option>
//                 </select>
//             </div>
//             <div class="element"> 
//                 <select name="monto-pago" id="monto-pago" >
//                     <option value="0" disabled selected> Seleccione Monto de Apartado </option>
//                     <option value="1" >$ 50.00 DLLS</option>
//                     <option value="2" >$ 100.00 DLLS</option>
//                     <option value="3" >$ 150.00 DLLS</option>
//                     <option value="4" >$ 200.00 DLLS</option>
//                 </select>
//             </div>              
//                 <div class="element">                          
//                     <button type="submit" id="btn-enviar" class="enviar">Enviar</button>
//                 </div>
//                 <div class="element">
//                     <button type="submit" id="btn-cancelar" class="cancelar">Cancelar</button>
//                 </div>
//         </form>
// `

const closeMonto = document.getElementById('popup-apartado-close');
const btnEnviar = document.getElementById('btn-enviar');
const btnCancelarPago = document.getElementById('btn-cancelar');
const btnCerrarAlerta = document.getElementById('close'); //Cerrar Alerta Pago exitoso
const btnCerrarAlert = document.getElementById('close-sin-exito');//Cerrar Alerta Pago sin exito

closeMonto.addEventListener('click', ()=>{
    console.log('clesed monto')
   closeLoginForm();
})

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



