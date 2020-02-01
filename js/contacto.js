$(document).ready(function(){


    var $tarjeta = $(".tarjeta_contacto");
    var $contactName = $("#contactName");
    var $contactEmail = $("#contactEmail");
    var $contactTitle = $("#contactTitle");
    var $contactDescription = $("#contactDescription");



    function margenesContacto(){

      var anchura = $(window).width();
      var altura = $(window).height() - 110;  // - 110px de padding que tiene '.contacto_2elem' por el header

      var alturaTarjeta = $tarjeta.height();

      var margen = (altura - alturaTarjeta) / 2;

      if( margen >= 0 ){
        $tarjeta.css({
          "margin-top": margen + "px",
          "margin-bottom": margen + "px"
        });
      }

    }margenesContacto();


    $(window).resize(function(){
      margenesContacto();
    });


    // Formulario Animación Entrada
    $tarjeta.css({
      "top": "0",
      "opacity": "1"
    });
    $(".form_tarjeta_contacto form").css("opacity","1");
    $(".form_tarjeta_contacto form h1").css({
      "top": "0",
      "opacity": "1"
    });
    $(".text_decoration").css({
      "top": "60px",
      "opacity": "1"
    });
    // Formulario Animación Labels
    $("#contactName, #contactEmail, #contactTitle, #contactDescription").on("focusin", function(){
      $(this).prev().css({
        "top":"-20px",
        "padding-left":"0",
        "opacity": "1"
      });
    });
    // En caso de que haya algo dentro del input, el label aparecerá arriba del input text
    if( $contactName.val().length > 0 ){
      $contactName.prev().css({
        "top":"-20px",
        "padding-left":"0",
        "opacity": "1"
      });
    }
    if( $contactEmail.val().length > 0 ){
      $contactEmail.prev().css({
        "top":"-20px",
        "padding-left":"0",
        "opacity": "1"
      });
    }
    if( $contactTitle.val().length > 0 ){
      $contactTitle.prev().css({
        "top":"-20px",
        "padding-left":"0",
        "opacity": "1"
      });
    }
    if( $contactDescription.val().length > 0 ){
      $contactDescription.prev().css({
        "top":"-20px",
        "padding-left":"0",
        "opacity": "1"
      });
    }


    /*-- COMPROBACIÓN FORMULARIO --*/
    $('#contactForm').submit(function(){

      if($contactName.val().length == 0){
        $contactName.css("border-color","red");
        $contactName.prev().css("color", "red");
      }
      if($contactEmail.val().length == 0){
        $contactEmail.css("border-color","red");
        $contactEmail.prev().css("color", "red");
      }
      if($contactTitle.val().length == 0){
        $contactTitle.css("border-color","red");
        $contactTitle.prev().css("color", "red");
      }
      if($contactDescription.val().length == 0){
        $contactDescription.css("border-color","red");
        $contactDescription.prev().css("color", "red");
      }

    });


    $contactName.on("keyup input", function(){
      $(this).css("border-color", "rgb(17, 17, 17)");
      $(this).prev().css("color", "rgb(17, 17, 17)");
    });
    $contactEmail.on("keyup input", function(){
      $(this).css("border-color", "rgb(17, 17, 17)");
      $(this).prev().css("color", "rgb(17, 17, 17)");
    });
    $contactTitle.on("keyup input", function(){
      $(this).css("border-color", "rgb(17, 17, 17)");
      $(this).prev().css("color", "rgb(17, 17, 17)");
    });
    $contactDescription.on("keyup input", function(){
      $(this).css("border-color", "rgb(17, 17, 17)");
      $(this).prev().css("color", "rgb(17, 17, 17)");
    });


    $(".contact_send_success").css('opacity', '1');

    $(".close_contact_send_success, .trans_contact_send_success").click(function(e){

      $(".trans_contact_send_success").css('display', 'none');

    });


});
