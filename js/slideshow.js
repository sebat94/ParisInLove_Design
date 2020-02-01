$(document).ready(function(){

    var aei = 1;
    var ini = 1;
    var max = 2;
    var $content_slide = $(".content_slide");

    function changePic(){

      if(aei > max) aei = ini;
      if(aei == 0) aei = max;

      // ProgressBar
      progress(100, $("#ProgressBar-SlideShow"), true);

      $content_slide.clearQueue();
      $content_slide.animate({ opacity: 0 }, 400, function(){
        $content_slide.html(
          "<img src='img/slide/" + (aei-1) + ".jpg' alt=''>"
        );
      }).animate({ opacity: 1 }, 400);

      aei++;
    }
    changePic();
    var interval = setInterval(changePic, 5000);

    $('.Flecha-SlideShow-Izq').click(function(){
      aei-=2;
      clearInterval(interval);
      interval = setInterval(changePic, 5000);
      changePic();
    });

    $('.Flecha-SlideShow-Der').click(function(){
      clearInterval(interval);
      interval = setInterval(changePic, 5000);
      changePic();
    });


    function progress(percent, $element, bool){

      if( bool === true ){
        $element.find("div").stop();                      // Cancelamos la animación anterior
        $element.find("div").animate({ width: 0 }, 0);    // Vuelve a poner a '0' la 'ProgressBar-SlideShow' y cancelamos el timing de la animación
      }

      var progressBarWidth = percent * $element.width() / 100;
      $element.find("div").animate({ width: progressBarWidth }, 5000);

    }

});
