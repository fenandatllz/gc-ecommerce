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

//Botones Zoom
let zoom = 1;
let height = 95;

$('.zoom').on('click', function () {
    zoom += 0.1;
    height += 5;
    $('.target').css('transform', 'scale(' + zoom + ')');
    $('.mapa-interactivo').height(height + 'vh');
});
$('.zoom-init').on('click', function () {
    zoom = 1;
    $('.target').css('transform', 'scale(' + zoom + ')');
});
$('.zoom-out').on('click', function () {
    if (zoom != 1) {
        zoom -= 0.1;
        $('.target').css('transform', 'scale(' + zoom + ')');
    }
});

