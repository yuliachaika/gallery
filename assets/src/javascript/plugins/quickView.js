'use strict';

(function( $ ) {

    var QuickView = function( element, options ) {
        this.$element = $(element);
        this.element = element;
        this.options = options;
        this.$canvas = $(this.options.selectors.quickViewCanvas);
        this._init();
        this._stop();
    }

    QuickView.defaultOptions = {
        selectors: {
            quickViewModal: '.quick-view-modal',
            quickViewItem: '.three-col__img-wrap',
            quickViewOverlay: '.quick-view-overlay',
            quickViewCanvas: '.quick-view-canvas'
        },
        classNames: {
            active: ['is-active']
        }
    };
    
    QuickView.prototype = {
        _init: function() {
            this.$element.on('click', '.three-col__img-wrap', this._triggerHandler.bind(this));
        },
        _stop: function () {
            $(this.options.selectors.quickViewOverlay).on('click', this._overlayHandler.bind(this));
        },
        _triggerHandler: function(event) {
            this._openModal();      
        },
        _overlayHandler: function(event) {
            this._closeModal();      
        },
        _closeHandler: function(event) {
            this._closeModal();      
        },
        _openModal: function() {
            var $currentProduct = $(event.target).closest(this.options.selectors.quickViewItem),
                $productUrl = 'assets/dist/product-data/product.json'; 

            $.ajax( $productUrl ).done(function(response) {
                $('.modal-info__carre') 
                .html('carre: ' + response.itemId);

                $('.modal-info__size')
                .html('size: ' + response.itemSize);

                $('.modal-info__fabric')
                .html('fabric: ' + response.itemFabric);

                $('.modal-info__price')
                .html('price: ' + response.itemPrice);

                // $('.modal-img__wrap')
                // .html(response.img);

                this._resetModal();
                $(this.options.selectors.quickViewModal)
                .toggleClass(this.options.classNames.active
                .join(' '));
            }.bind(this));

        },
        _closeModal: function() {
            $(this.options.selectors.quickViewModal)
            .removeClass(this.options.classNames.active
            .join(' '));
        },
        _resetModal: function() {
            this.$canvas.removeAttr("style");
        }
    } 

    $.fn.quickView = function( element, options ) {
        return this.each(function() {
            new QuickView(this, $.extend({}, QuickView.defaultOptions, options));
        });
    }; 

})( jQuery );






