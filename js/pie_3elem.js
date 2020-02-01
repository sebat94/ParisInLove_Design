(function(){


  /*-- La anchura a la que deberá hacer el efecto se determinará con los 'media querys' del css --*/

  var footerBool = true;
  var $footer = $(".pie_3elem");
  var alturaFooter = $footer.height();



  // Necesitamos 'jQuery-migrate' para detectar el navegador desde el que se abre la página
  if( $.browser.webkit ){  // -webkit- es reconocido por chrome y opera
    // En caso de que sea chrome o opera Restamos 3px que es la diferencia de px entre navegadores (es por haber cogido height:auto)
    alturaFooter = ($footer.height() + 3);
  }
  if( /Edge/.test(navigator.userAgent) ){
    // En caso de que sea edge Sumamo 1px que esla diferencia de px entre navegadores
    alturaFooter = ($footer.height() - 1);
  }



  // Hover sobre el submit del newsletter(no se puede en css por el position:absolute)
  $(".submit_newsletter").hover(function(){
    $(".icon_newsletter i").css({
      "background": "#fff",
      "color": "rgb(28, 28, 28)"
    })
  },function(){
    $(".icon_newsletter i").css({
      "background": "rgb(28, 28, 28)",
      "color": "#e9e9e9"
    })
  });



  // Por defecto calculamos la altura del footer, y lo ocultamos nada más cargar el script, en caso de que tenga 'position:fixed'
  if( $footer.css("position") === "fixed" ){
    $footer.css("bottom", "-" + alturaFooter + "px");
  }


  // Función toggle para mostrar y ocultar el footer
  $(".desplegar_pie_3elem").on("click", function(){

    if( $footer.css("position") === "fixed" ){
      // Aplicamos la clase 'transition_footer' para que el pie de página no se muestre brúscamente
      $footer.addClass("transition_footer");

      if( footerBool === true ){
        $footer.css("bottom", "0px");
        $(".desplegar_pie_3elem i").addClass("icono_desplegar_pie_rotate");
        footerBool = false;
      }else if( footerBool === false ){

        $footer.css("bottom", "-" + alturaFooter + "px");
        $(".desplegar_pie_3elem i").removeClass("icono_desplegar_pie_rotate");
        footerBool = true;
      }
    }

  });


  // RESIZE PIE PÁGINA
  $(window).resize(function(e){

    // volvemos a calcular la altura por si rompen los elementos y ocupa más el pie de página que al principio, que detecte la nueva altura
    alturaFooter = $footer.height();

    if( $footer.css("position") === "relative" ){ // Cuando la anchura del footer sea inferior a 824px la mostraremos

      // Mostramos el footer entero
      $footer.css("bottom", "-" + alturaFooter + "px");
      // En caso de que el footer tenga 'position:relative' entonces aplicamos el 'bottom:0' para mostrar el pie de página
      $footer.css("bottom", "0px");
      // Quitamos la transición para cuando agrandemos la pantalla y cambie la posición del footer, no se aprecie la transición
      $footer.removeClass("transition_footer");

    }else{                        // En caso contrario lo dejaremos oculto

      // Escondemos el footer entero
      $footer.css("bottom", "-" + alturaFooter + "px");
      footerBool = true;

    }

  });



  // Función para mostrar o ocultar el pie segun la altura a la que se encuentre en el documento
  function mostrarDesplegarPie(){

    // Por defecto ocultaremos la pestaña de 'ayuda e información'
    $(".desplegar_pie_3elem").css("display", "none");

    // variables
    var cabeceraTop = $('.cabecera_2elem').offset().top;
    var cabeceraBottom = cabeceraTop + $('.cabecera_2elem').height();

    // Dependiendo de la página necesitará una altura para mostrarse la pestaña de 'ayuda e información'
    if( $(".slide").length > 0 ){ // En caso de estar en 'Home' que es donde está el SlideShow haremos lo siguiente:

      var presentacionTop = $('.presentacion').offset().top;

      if( cabeceraBottom >= presentacionTop ){

        $(".desplegar_pie_3elem").css("display", "block");

      }else{
        $(".desplegar_pie_3elem").css("display", "none");
      }

    }else if( $(".proyectos").length > 0 ){ // En caso de estar en 'Proyectos' que es donde está esa clase haremos lo siguiente:

      $(".desplegar_pie_3elem").css("display", "block");

    }else if( $(".contenido_proyectos").length > 0 ){

      $(".desplegar_pie_3elem").css("display", "block");

    }else if( $(".nosotros").length > 0 ){

      $(".desplegar_pie_3elem").css("display", "block");

    }else if( $(".contacto_2elem").length > 0 ){

      $(".desplegar_pie_3elem").css("display", "block");

    }else if( $(".contenido_cookies").length > 0 ){

      $(".desplegar_pie_3elem").css("display", "block");

    }else if( $(".error404container").length > 0 ){

      $(".desplegar_pie_3elem").css("display", "block");

    }



  }mostrarDesplegarPie();



  // Detectará cuando hagamos scroll tanto en 'pc' como en 'móvil' y nos ocultará el footer
  $(document).on("scrollstart",function(){

    mostrarDesplegarPie();

    // Si el footer no se ha bajado a posición relativa, y bottom es menor que 0, entonces quiere decir que está mostrado, por lo tanto lo ocultamos
    if(  ($(window).width() > 860)  &&  (parseInt($footer.css("bottom"), 10)) >= 0  ){
      $footer.css("bottom", "-" + alturaFooter + "px");
      $(".desplegar_pie_3elem i").removeClass("icono_desplegar_pie_rotate");
      footerBool = true;
    }

  });


  /*-- COOKIES --*/
  $(".cookies_message").on("click", function(){
    $(this).css("display","none");
  });



})();
