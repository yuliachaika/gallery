'use strict';
;
(function($){
    
    
    $(document).ready( function() {

//////
// // var hBlock = document.getElementById('testH').clientHeight;
// var hBlock = $('.three-col__col').height();
// var hBrowser = $('body').height();
// var topX = hBlock - hBrowser;

// $(window).scroll(function (){
//   var scrolled = $(window).scrollTop() || $(document).scrollTop();
//   $('.three-col__col').each(function() {
//     // if(hBrowser >= hBlock){
//     // this.style = 'position:fixed; right:0;';
//    // }else if(scrolled >= topX){
//    if(scrolled >= topX){
//    this.style = 'position:fixed;bottom:0';
//    }else{
//    this.style = '';
//    }
//   });
// });




// var hBrowser = document.body.clientHeight;
// var topX = hBlock - hBrowser;
// window.onscroll = function() {
//   var scrolled = window.pageYOffset || document.documentElement.scrollTop;
//   if(hBrowser >= hBlock){
//     document.getElementById('testH').style = 'position:fixed; right:0;';
//  }else if(scrolled >= topX){
//  document.getElementById('testH').style = 'position:fixed;right:0;bottom:0';
//  }else{
//  document.getElementById('testH').style = '';
//  }
// }






//////






      $("#filter").keyup(function(){
 
        var filter = $(this).val();
 
        $(".three-col__img-wrap img").each(function(){
 
            if ($(this).attr('data-product-id').search(new RegExp(filter, "i")) < 0) {
                $(this).parent().fadeOut();

            } else {
                $(this).parent().show();
            }
        });

      });

///////////////////

      //change modal content
      $(function() {
        var modalOne = $("#modal-info-show").html();
        var modalTwo = $("#modal-info-hide").html();
        
        $('.modal-footer__submit').on('click', function(e) {
          $(".modal-info__content")
          .html(modalTwo)
          .addClass('modal-info__content-hide');
        });

        $('.modal-footer__submit-hide').on('click', function(e) {
          console.log("modalOne");
          $(".modal-info__content")
          .html(modalOne)
          .removeClassClass('modal-info__content-hide');
        });


      });


      //redirect to home page
      $(".content-bg").on('click', function(e) { //.header__row
        if ( e.target == $(this)[0] ) {
          var url = "index.html";
          $(location).attr('href',url);
        }
      });

      //quick-view
      $(function() {
        if ($.fn.quickView) {
            $('.content').quickView(); 
        }   
      });

      //show conditions
      $('.modal-footer__link').on('click', function(e) {
        e.preventDefault();
        $('.modal-hide').toggleClass('is-active');
      });

      //stickyfill 
      var elements = $('.three-col__title, .three-col-nav');
      Stickyfill.add(elements);

      //--scroll to top 
      $(function (){
        $("#back-top").hide();
      
        $(window).scroll(function (){
          if ($(this).scrollTop() > 100){
            $("#back-top").fadeIn();
          } else{
            $("#back-top").fadeOut();
          }
        });

        $("#back-top a").click(function (){
          $("body,html").animate({
            scrollTop:0
          }, 800);
          return false;
        });

        //--scroll to top ie
        if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident.*rv:/)) {
          $("body").scroll(function (){
            if ($(this).scrollTop() > 100){
              $("#back-top").fadeIn();
            } else{
              $("#back-top").fadeOut();
            }
          });

          $("#back-top a").click(function (){
            $("body").animate({
              scrollTop:0
            }, 800);
            return false;
          });
        }

      });

      //tabs
        $('.three-col-nav__link').on('click', function(e) {
          e.preventDefault();
          var element = $(this);
          var href = $($(this).attr('href'));

          element
          .addClass('three-col__link--active')
          .parent()
          .addClass('three-col-nav__item--active')
          .siblings()
          .removeClass('three-col-nav__item--active')
          .find('.three-col__link--active')
          .removeClass('three-col__link--active');
          $('.three-col__tab')
          .not(href)
          .removeClass('three-col__tab--active'); 
          href.addClass('three-col__tab--active');
        });
      });   




})(jQuery);