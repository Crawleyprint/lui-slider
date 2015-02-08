'use strict';

;(function setupLUISlider(window, undefined) {

  /**
   * Slider app prototype
   *
   * @param {Object} o - Slider options map
   */
  function LuiSlider(elementName) {
    /**
     * first, store reference to DOM node that is going to house our slider
     */
    this.el = document.getElementById(elementName);
    /**
     * ... then, see what's already in there and store an instance variable
     * with list of those images and basic attributes
     */
    this.images = this.setup();

    /**
     * ... and return slider object to allow chaining of methods
     */
    return this;
  }

  LuiSlider.prototype.setup = function luiGatherFacts() {
    var loadedImages = [];
    var images = this.el.getElementsByTagName('img');

    Array.prototype.slice.call(images).forEach(function addImageToInitial(img) {
      loadedImages.push({
        src: img.getAttribute('src'),
        alt: img.getAttribute('alt')
      });
    });

    return loadedImages;
  };

  var mainSlider = new LuiSlider('slider');

})(window);
