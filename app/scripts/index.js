'use strict';

;(function setupLUISlider(window, undefined) {

  /**
   * Slider app prototype
   *
   * @param {Object} o - Slider options map
   */
  function LuiSlider(options) {
    /**
     * first, store reference to DOM node that is going to house our slider
     */
    this.el = document.getElementById(options.elementId);
    this.activeClass = options.activeClass || 'lui-slider__item--active';
    /**
     * ... then, see what's already in there and store an instance variable
     * with list of those images and basic attributes
     */
    this.setup();

    /**
     * Remove all images to make scene for template rendering
     */
    this.clean();
    this.render();
    /**
     * ... and return slider object to allow chaining of methods
     */
    return this;
  }

  LuiSlider.prototype.setup = function luiGatherFacts() {
    var loadedImages = [];
    var images = this.el.getElementsByTagName('img');
    var that = this;


    Array.prototype.slice.call(images).forEach(function addImageToInitial(img) {
      var isActive = img.classList.contains(that.activeClass);
      loadedImages.push({
        src: img.getAttribute('src'),
        alt: img.getAttribute('alt'),
        isActive: isActive
      });
    });

    this.images = loadedImages;

    return this;
  };

  LuiSlider.prototype.clean = function() {
    var element = this.el;
    while(element.hasChildNodes()) {
      element.removeChild(element.firstChild);
    }
    return this;
  };

  /**
   * Makes default template if no template string is provided to constructor
   *
   * @param {Object} item - JSON object for image to render
   */
  LuiSlider.prototype.template = function(item) {
    var activeClass = item.isActive ? ' lui-slider__item--active': '';
    return [
      '<div class="lui-slider__item' + activeClass + '">',
        '<img ',
          'class="lui-slider__image" ',
          'src="' + item.src + '" alt="' + item.alt + '">',
      '</div>'
    ].join('');
  };

  LuiSlider.prototype.render = function() {
    var html = [];
    var that = this;
    this.images.forEach(function(image) {
      html.push(that.template(image));
    });
    this.el.innerHTML = html.join('');
    return this;
  };

  var mainSlider = new LuiSlider({
    elementId: 'slider'
  });

})(window);
