// Navegacion Flecha Arriba
$(document).ready(function () {

    $('.arriba').click(function () {
        $('body, html').animate({
            scrollTop: '0px'
        }, 300);
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.arriba').slideDown(300);
        } else {
            $('.arriba').slideUp(300);
        }
    });

});

//DivEnganche
function MostrarDiv(checkEnganche) {
    let dvEnganche = document.getElementById("mostrarEnganche");
    let mensualidad = document.getElementById('mensualidad')
    dvEnganche.style.display = checkEnganche.checked ? "block" : "none";
    mensualidad.style.display = checkEnganche.checked ? "none" : "block"
}



