'use strict';
;
(function($){
    
    $(document).ready( function() {

      $('.modal_test').magnificPopup({
        items:{
            type: 'ajax',
            dataType: 'json',
            // src: '../data/product_one.json'
            src: 'assets/dist/data/product_one.json'
        },
        callbacks: {
            parseAjax: function(mfpResponse) {
              // mfpResponse.shopperName;
              console.log(mfpResponse.data.shopperName);
              // mfpResponse.data is a "data" object from ajax "success" callback
              // for simple HTML file, it will be just String
              // You may modify it to change contents of the popup
              // For example, to show just #some-element:
              // mfpResponse.data = $(mfpResponse.data).find('#some-element');
              mfpResponse.data.shopperName = $(mfpResponse.data.shopperName);

              // mfpResponse.data must be a String or a DOM (jQuery) element

              console.log('Ajax content loaded:', mfpResponse);
            },
            ajaxContentAdded: function() {
              // Ajax content is loaded and appended to DOM
              console.log(this.content);
            }
}

      }); 






    });   




})(jQuery);