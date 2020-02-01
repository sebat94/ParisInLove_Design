(function(){
  $(document).ready(function(){


    // 2º bloque ( Cada uno de los '.historia_nosotros' )
    var $thn1 = $(".thn1");
    var $thn2 = $(".thn2");
    var elementPositionTop1 = $thn1.offset().top - 50; // Restamos ya que el bottom lo baja aún m´s de su posicion
    var elementPositionTop2 = $thn2.offset().top - 50; // Restamos ya que el bottom lo baja aún m´s de su posicion


    // 3er bloque
    var $img1 = $(".imagenes_nosotros_1");
    var $img2 = $(".imagenes_nosotros_2");
    var $txt1 = $(".txt_imagenes_nosotros_1");
    var $txt2 = $(".txt_imagenes_nosotros_2");
    var elementPositionTop3 = $(".imagenes_nosotros").offset().top + 200;  // Más o menos altura a la que queremos que ocurra el efecto
    $img1.hide();
    $img2.hide();
    $txt1.hide();
    $txt2.hide();



    // Variables globales
    var windowTop = $(document).scrollTop();
    var windowBottom = windowTop + window.innerHeight;



    // 1er bloque - Se ejecutará nada más cargar la web
    $(".title_nosotros").css({ "top": "0", "opacity": "1" });
    setTimeout(function(){
      $(".txt_content_nosotros").css({ "left": "0", "opacity": "1" });
      $(".img_content_nosotros").css({ "right": "0", "opacity": "1" });
    }, 1000);



    // Función 2º y 3er bloque
    function transiciones(){

      // 2ª bloque
      windowTop = $(document).scrollTop();
      windowBottom = windowTop + window.innerHeight;

      if( windowBottom >= elementPositionTop1 ){
        $thn1.css({ "bottom": "0", "opacity": "1" });
      }
      if( windowBottom >= elementPositionTop2 ){
        $thn2.css({ "bottom": "0", "opacity": "1" });
      }


      // 3er bloque -
      if( windowBottom >= elementPositionTop3 ){
        $img1.show(2000);
        $img2.show(2000);
        $txt1.show(2000);
        $txt2.show(2000);
      }

    }transiciones();


    $(window).scroll(function(){
      transiciones();
    });



  });
})();
