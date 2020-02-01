(function(){


  $.slideShow = function( opciones ){

    opciones = $.extend({

      slides:[],
      x: [],
      y: [],
      transitionVelocity: null,
      transitionDuration: null,

      automaticSlide: true,

      ubicacion: undefined

    }, opciones);




    //----------------------------//
    //--                        --//
    //-- VALIDACIONES SLIDESHOW --//
    //--                        --//
    //----------------------------//

    // Si no hay slides No se ejecuta el plugin
    if( opciones.slides.length === 0 ){
      alert("Las imagenes son necesarias");
      return;
    }
    // Si no está especificada la ubicación del slideshow no se ejecutará el plugin
    if( opciones.ubicacion === undefined ){
      alert("Debes especificar el div donde se va a insertar éste plugin. Ya sea una '.clase', un '#id' ó una 'etiqueta' ");
      return;
    }


    //--------------------------------//
    //--                            --//
    //-- FIN VALIDACIONES SLIDESHOW --//
    //--                            --//
    //--------------------------------//




    // VARIABLES GLOBALES SLIDESHOW
    var actual = 0;        // Imagen actual
    var ancho = 100;       // Cada '<li>' ocupa el 100%, por lo tanto moveremos el 100% de la pantalla cada vez que queramos mostrar una img diferente



    // INSERTAR CÓDIGO HTML DEL SLIDESHOW
    var html  = '';
    html += '<div class="SlideShow-Contenedor">';
    html += '<div class="Img-SlideShow">';
    html += '<ul>';

    // Generar tantas imagenes como slides mandemos por parámetro
    for( var i = 0; i < opciones.slides.length; i++ ){

      // En caso de que no esten los parametros 'x' e 'y', no incluiremos en el html, los 'data-x' y 'data-y', y en la función
      // 'adaptar_imagen_slideshow' le aplicaremos un 100% de ancho y de alto a las imagenes
      //html += '<li><div class="Escalar-Img-SlideShow" data-x="'+ opciones.x[i] +'" data-y="'+ opciones.y[i] +'"><img src="'+ opciones.slides[i] +'" alt=""></div></li>';
      html += '<li><div class="Escalar-Img-SlideShow"';
      if( opciones.x.length > 0 ){
        html +=  ' data-x="'+ opciones.x[i] +'"';
      }
      if( opciones.y.length > 0 ){
        html += ' data-y="'+opciones.y[i]+'"';
      }
      html += '><img src="'+ opciones.slides[i] +'" alt=""></div></li>';

    }

    html += '</ul>';
    html += '</div>';
    html += '<div class="Thumbs-SlideShow">';

    // GENERAR MINIATUAS / DOTS
    html += '<div class="Dots-SlideShow">';
      for( var z = 0; z < opciones.slides.length; z++ ){

        html += '<div class="Dot-SlideShow" data-idx="'+ z +'"></div>';

      }
    html += '</div>';


    html += '</div>';
    html += '<div class="Flecha-SlideShow Flecha-SlideShow-Der" data-dir="sig"><div><span></span><span></span></div></div>';
    html += '<div class="Flecha-SlideShow Flecha-SlideShow-Izq" data-dir="ant"><div><span></span><span></span></div></div>';
    html += '<div id="ProgressBar-SlideShow"><div></div></div>';
    html += '</div>';

    // Estilos css para el correcto funcionamiento del plugin
    $("body, html").css({ "height": "100%", "min-height": "100%" });  // Aplicamos el 'height:100%' al body y al html para que el slideshow se adapte correctamente al 100% de la altura de la pantalla
    $(opciones.ubicacion).css({ "width": "100%", "height": "100%", "overflow":"hidden", "position":"relative" }); // Aplicamos estilos necesarios para la '.clase / #id / etiqueta' que contenga el plugin del slideshow

    // Agregamos el SlideShow
    $(opciones.ubicacion).prepend(html); // Agregamos todo el contenido del Slideshow al div que mandamos por parametro



    // VARIABLES GLOBALES POST CREACIÓN DE CÓDIGO
    var $contenedorImagenes  =  $(".Img-SlideShow ul");
    var $dotsSlideShow       =  $(".Dots-SlideShow");
    var widthLineBanner      =  0;
    var tiempoBanner         =  0;


    // Calculamos el ancho del 'ul' dependiendo de cuantas imagenes haya en el SlideShow
    $contenedorImagenes.css("width", (opciones.slides.length * ancho) + "%");
    // Ponemos la clase 'Dot-SlideShow-Active' sobre el primer dot
    $(".Dot-SlideShow").first().addClass("Dot-SlideShow-Active");

    // Aparecer Flechas y Dots cuando hagamos hover en el SlideShow
    $(".SlideShow-Contenedor").hover(function(){

      $(".Flecha-SlideShow").css("opacity", "1");
      $(".Thumbs-SlideShow").css("opacity", "1");

    }, function(){

      $(".Flecha-SlideShow").css("opacity", "0");
      $(".Thumbs-SlideShow").css("opacity", "0");

    });





    // FUNCIÓN PARA DETECTAR LA DIRECCIÓN EN LA QUE SE ESTÁ MOVIENDO EL SLIDESHOW
    $(".Flecha-SlideShow").on("click", function( event ){

      stop_automatic_slideshow();     // Paramos la animación automática

      var dir = $(this).data("dir");

      mover( dir );

      resume_automatic_slideshow();   // Reanudamos la animación automática

    });


    function stop_automatic_slideshow(){
      // Paramos el 'setTimout' cuando clicamos las flechas, y una vez realizada la acción, lo reanudamos
      if( opciones.automaticSlide === true ){
        clearInterval(IntID);
      }
    }

    function resume_automatic_slideshow(){
      // Reanudamos la función setTimout
      if( opciones.automaticSlide === true ){
        // Limpiamos antes de volver a darle el intervalo, ya que si está activo cuando le hemos dado se nos volverá loco
        clearInterval(IntID);
        IntID = setTimer();
      }
    }

    // PASAR LAS IMAGENES AUTOMÁTICAMENTE
    if( opciones.automaticSlide === true ){

      var IntID = setTimer();

      function setTimer(){
        intervalo = setInterval(function(){

          mover( "sig" );

        }, opciones.transitionDuration);
        return intervalo;
      }

    }





    // FUNCIÓN QUE DESPLAZA EL SLIDESHOW A LA POSICIÓN INDICADA Y DESPLAZA LA MINIATURA O EL DOT
    function mover( dir ){

        // Comprobación de cual ha sido el anterior dot/miniatura activo
        // Aqui nos traemos en caso de que se pulsen los dots o miniaturas antes el número identificador de la clase
        // activa , para así al hacer click sobre la flecha que suma o resta 1, lo haga sobre el resultado(numero) anterior
        actual = "-" + $(".Dot-SlideShow-Active").data("idx");

        // Suma o Resta 1 según el último elemento con la clase activa
        (dir === "sig") ? actual-- : actual++;

        // Validación --> si llega a la última imagen vuelve a la primera y si llega a la primera vuelve a la última
        if( actual > 0 ){
          actual = (opciones.slides.length - 1) * -1;
        }else if( actual <= (opciones.slides.length * -1) ){
          actual = 0;
        }

        // Calculamos el margin-left que se sumará o restará para cada movimiento
        mover_por_punto( actual );

      }



    // FUNCIONES PARA MOVER DESDE LOS PUNTOS CLICANDO SOBRE ELLAS
    $(".Dot-SlideShow").on("click", function(){

      stop_automatic_slideshow();     // Paramos la animación automática

      var idx = $(this).data("idx");

      idx = idx * -1; // Como el slideShow trabaja con negativos lo multiplicamos por '-1' para tener el index en positivo

      mover_por_punto( idx );

      resume_automatic_slideshow();   // Reanudamos la animación automática

    });



    function mover_por_punto( actual ){

      // Calculamos el ancho a desplazarse
      var margen = actual * ancho;
      // Como al avanzar, restamos margin, el al retroceder, le sumamos, multiplicamos por '-1' para indicar correctamente si es el elemento siguiente o el anterior de las miniaturas
      var idx = actual * -1;

      var $dotActual = $dotsSlideShow.find("div").eq(idx);
      var $demasDots = $dotsSlideShow.find("div").not($dotActual);


      // Ejecutamos la animación del SlideShow, y una vez haya acabado cargará el timer
      efectos_transicion_img( idx, margen );


      // ProgressBar
      progress(100, $("#ProgressBar-SlideShow"), true);


      // Añadimos la clase activa para obtener el número del último elemento activo y poder sumarle o restarle 1
      // Cuando cliquemos en las flechas en la funcion mover()
      $dotActual.addClass("Dot-SlideShow-Active");
      $demasDots.removeClass("Dot-SlideShow-Active");

    }



    // Se deberá ejecutar por separado que la 'linea del baner' , primero cargará el efecto y luego la linea
    function efectos_transicion_img( idx, margen ){

      // TRANSICIONES SOLO CON JQUERY
      $contenedorImagenes.clearQueue();
      // Función para adaptar la siguiente imágen
      adaptar_imagen_slideshow( idx );


      // Desplamiento para mostrar la siguiente imagen
      //$contenedorImagenes.animate({ opacity: "0" }, 300 )
      //  .animate({ marginLeft: margen + "%" }, 0 )
      //  .animate({ opacity: "1" }, 300);

      // Con tweenmax podriamos controlar que salga un poco antes, además si añadimos en el html un identificador,podremos hacer un if
      // preguntando en que imagen se encuentra y en esta función decir si es la primera, haz tales efectos, si es la segunda otros...
      $contenedorImagenes.animate({ opacity: "0" }, opciones.transitionVelocity / 2 )
        .animate({ marginLeft: margen + "%" }, 0 )
        .animate({ opacity: "1" }, opciones.transitionVelocity / 2);

    }



    function progress(percent, $element, bool){

      if( bool === true ){
        $element.find("div").stop();                      // Cancelamos la animación anterior
        $element.find("div").animate({ width: 0 }, 0);    // Vuelve a poner a '0' la 'ProgressBar-SlideShow' y cancelamos el timing de la animación
      }

      var progressBarWidth = percent * $element.width() / 100;
      $element.find("div").animate({ width: progressBarWidth }, opciones.transitionDuration);

    }progress(100, $("#ProgressBar-SlideShow"));




    // FUNCIÓNES PARA MOSTRAR LAS IMÁGENES A SU ESCALA ORIGINAL Y EN CASO DE NO CABER
    // SE ADAPTARÁN AL HUECO DE LA PANTALLA SIN PERDER SU PROPORCIÓN
    function adaptar_imagen_slideshow( idx ){

      // Si el resultado obtenido en 'x' e 'y' es .... entonces aplicaremos el 100% de ancho y de alto para la imagen.
      // Y detendremos el resto de la función
      if( opciones.x.length === 0 || opciones.y.length === 0 ){

        $contenedorImagenes.find("div").eq(idx).css({
          "height": "auto",
          "width": "100%"
        });
        return;

      }

      // Definimos las variables que van a almacenar el valor final del ancho y alto de la imagen
      var anchoImagenProporcional = null;
      var altoImagenProporcional  = null;

      // Agarramos el div que contiene los data-x Y data-y a través del idx
      var altoOriginal  = $contenedorImagenes.find("div").eq(idx).data("y");
      var anchoOriginal = $contenedorImagenes.find("div").eq(idx).data("x");

      // Calculamos la altura máxima que tenemos para mostrar la imagen
      var alturaContenedorImg  = $(".Img-SlideShow").height();
      // Calculamos la anchura máxima que tenemos para mostrar la imagen
      var anchuraContenedorImg = $(".Img-SlideShow").width();

      // En caso de que el alto de la imagen imagen sea menor que la del contenedor, la dejaremos con su altura y anchura por defecto
      if( altoOriginal < alturaContenedorImg ){
        altoImagenProporcional = altoOriginal;
        anchoImagenProporcional = anchoOriginal;
        $contenedorImagenes.find("div").eq(idx).css({
          "height": altoImagenProporcional + "px",
          "width": anchoImagenProporcional + "px"
        });
      }


      // Si el alto o el ancho de la imagen es mayor que el alto del contenedor, calcularemos proporcionalmente el tamaño
      // ( Ancho Deseado * Alto Original ) / Ancho Original = Y
      // ( Alto Deseado * Ancho Original ) / Alto original = X
      if( altoOriginal >= alturaContenedorImg ){
        anchoImagenProporcional = ( (alturaContenedorImg * anchoOriginal) / altoOriginal );
        $contenedorImagenes.find("div").eq(idx).css({
          "height": alturaContenedorImg + "px",
          "width": anchoImagenProporcional + "px"
        });
      }

      if( anchoImagenProporcional >= anchuraContenedorImg ){
        altoImagenProporcional = ( (anchuraContenedorImg * altoOriginal) / anchoOriginal );
        $contenedorImagenes.find("div").eq(idx).css({
          "width": anchuraContenedorImg + "px",
          "height": altoImagenProporcional + "px"
        });
      }


    }adaptar_imagen_slideshow( 0 ); // Cargamos la primera imagen por defecto para que se ajuste al slideshow



    // Resize
    $( window ).resize(function(){

      // SACAR IDX A TRAVÉS DE LA CLASE ACTIVA PARA ENVIÁRSELO A LA FUNCIÓN
      var idx = $dotsSlideShow.find(".Dot-SlideShow-Active").data(idx);
      //console.log(idx.idx);
      adaptar_imagen_slideshow( idx.idx );

    });





  };

})();
