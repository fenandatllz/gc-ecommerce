// Navegacion Flecha Arriba
$(document).ready(function(){

	$('.arriba').click(function(){
		$('body, html').animate({
			scrollTop: '0px'
		}, 300);
	});

	$(window).scroll(function(){
		if( $(this).scrollTop() > 0 ){
			$('.arriba').slideDown(300);
		} else {
			$('.arriba').slideUp(300);
		}
	});

});
//DivEnganche
        function MostrarDiv(checkEnganche) {
        let dvEnganche = document.getElementById("mostrarEnganche");
        dvEnganche.style.display = checkEnganche.checked ? "block" : "none";
    }
//Botones Zoom
let zoom = 1;
let height = 95;
		
		$('.zoom').on('click', function(){
			zoom += 0.1;
            height += 5;
			$('.target').css('transform', 'scale(' + zoom + ')');
            $('.mapa-interactivo').height(height + 'vh');
		});
		$('.zoom-init').on('click', function(){
			zoom = 1;
			$('.target').css('transform', 'scale(' + zoom + ')');
		});
		$('.zoom-out').on('click', function(){
            if(zoom != 1){
                zoom -= 0.1;
                $('.target').css('transform', 'scale(' + zoom + ')');
            }	
		});
        
// currWidth = 2400;
// $('.zoom').on('click', function(){
//     svg.style.width = (currWidth + 100) + "px"
// })

// Carrusel
if(document.querySelector('#container-slider')){
    setInterval('fntExecuteSlide("next")',5000);
 }
 //------------------------------ LIST SLIDER -------------------------
 if(document.querySelector('.listslider')){
    let link = document.querySelectorAll(".listslider li a");
    link.forEach(function(link) {
       link.addEventListener('click', function(e){
          e.preventDefault();
          let item = this.getAttribute('itlist');
          let arrItem = item.split("_");
          fntExecuteSlide(arrItem[1]);
          return false;
       });
     });
 }
 
 function fntExecuteSlide(side){
     let parentTarget = document.getElementById('slider');
     let elements = parentTarget.getElementsByTagName('li');
     let curElement, nextElement;
 
     for(var i=0; i<elements.length;i++){
 
         if(elements[i].style.opacity==1){
             curElement = i;
             break;
         }
     }
     if(side == 'prev' || side == 'next'){
 
         if(side=="prev"){
             nextElement = (curElement == 0)?elements.length -1:curElement -1;
         }else{
             nextElement = (curElement == elements.length -1)?0:curElement +1;
         }
     }else{
         nextElement = side;
         side = (curElement > nextElement)?'prev':'next';
 
     }
     //Resalta los puntos 
     let elementSel = document.getElementsByClassName("listslider")[0].getElementsByTagName("a");
     elementSel[curElement].classList.remove("item-select-slid");
     elementSel[nextElement].classList.add("item-select-slid");
     elements[curElement].style.opacity=0;
     elements[curElement].style.zIndex =0;
     elements[nextElement].style.opacity=1;
     elements[nextElement].style.zIndex =1;
 }