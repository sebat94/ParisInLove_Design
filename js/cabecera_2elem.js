(function(){


  var $cabecera = $(".cabecera_2elem");
  var $logo = $(".cabecera_izq");
  var $menu = $(".cabecera_der");


  $(window).scroll(function() {

    mostrarBackground();

  });


  function mostrarBackground(){
    var windowTop = $(document).scrollTop();
    if( windowTop > 0 ){

      $cabecera.css({
        //"background":"#fff",
        "height":"80px"
      });
      $logo.css("width", "70px");
      $menu.css("top","80px");
      $(".cabecera_der nav > ul > li > a").css("line-height", "80px");
      $(".hamburguesa").css("top", "21px");

    }else{

      $cabecera.css({
        //"background":"transparent",
        "height":"110"
      });
      $logo.css("width", "100px");
      $menu.css("top"  , "110px");
      $(".cabecera_der nav > ul > li > a").css("line-height", "110px");
      $(".hamburguesa").css("top", "31px");

    }
  }mostrarBackground();


  // DESPLEGAR MENU CABECERA AL CLICAR LA HAMBURGUESA
  $(".hamburguesa").on("click", function(){

    $(".cabecera_der").toggle("fast");

  });



  // Detectará cuando hagamos scroll tanto en 'pc' como en 'móvil' y nos ocultará el menu de la cabecera
  $(document).on("scrollstart",function(){
    // Si el footer no se ha bajado a posición relativa, y bottom es menor que 0, entonces quiere decir que está mostrado, por lo tanto lo ocultamos
    if(  ($(window).width() <= 700)  &&  ($cabecera.css("display") === "block")  ){
      $(".cabecera_der").hide("fast");
    }
  });



})();
