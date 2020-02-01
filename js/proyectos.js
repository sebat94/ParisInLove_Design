$(document).ready(function(){


  //var $fila_proyectos = $(".fila_proyectos");
  var windowTop, windowBottom;


  function transiciones(){

    var windowTop = $(document).scrollTop();
    var windowBottom = windowTop + window.innerHeight;


   $(".fila_proyectos").each(function(){
      if( (windowBottom >= ($(this).offset().top - 200)) && ($(window).width() >= 1200) ){  // El -200 es para que muestre almenos la siguiente columna de proyectos
        $(this).css({ "bottom": "0", "opacity": "1" });
      }
    });

  }transiciones();



  $(window).on("scroll scrollstart", function(){
    transiciones();
  });


});
