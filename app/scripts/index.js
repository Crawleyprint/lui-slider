'use strict';

;(function setupLUISlider(window, undefined) {

  /**
   * Slider app prototype
   *
   * @param {Object} o - Slider options map
   * @author Mladen Stepanić <mladen.stepanic@gmail.com>
   * @license GNU GPL3
   */
  function LuiSlider(options) {
    /**
     * first, store reference to DOM node that is going to house our slider
     */
    this.el = document.getElementById(options.elementId);
    this.activeClass = options.activeClass || 'lui-slider__item--active';
    this.prevElement = document
        .getElementById(options.prevElement || 'previous');
    this.nextElement = document
        .getElementById(options.prevElement || 'next');
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

  LuiSlider.prototype.setup = function luiSetup() {
    var loadedImages = [];
    var images = this.el.getElementsByTagName('img');
    var that = this;

    this.nextElement.addEventListener('click', this.next.bind(this));
    this.prevElement.addEventListener('click', this.previous.bind(this));

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

  /**
   * Resets the stage so JavaScript can begin drawing the slider
   */
  LuiSlider.prototype.clean = function() {
    var element = this.el;
    while(element.hasChildNodes()) {
      element.removeChild(element.firstChild);
    }
    return this;
  };

  /**
   * Provide string template
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
    var that = this;
    var html = [];
    that.clean();
    this.images.forEach(function(image) {
      html.push(that.template(image));
    });
    this.el.innerHTML = html.join('');
    return this;
  };

  LuiSlider.prototype.next = function(e) {
    if (e) {
      e.preventDefault();
    }
    var activeIndex = -1;
    var sliderLength = this.images.length;
    var next;

    this.images.forEach(function filterImages(image, idx) {
      if (image.isActive === true) {
        activeIndex = idx;
      }
    });
    this.images[activeIndex].isActive = false;
    if (activeIndex === sliderLength - 1) {
      next = 0;
    } else {
      next = activeIndex + 1;
    }
    this.images[next].isActive = true;
    this.render();
  };

  LuiSlider.prototype.previous = function(e) {
    if (e) {
      e.preventDefault();
    }
    var activeIndex = -1;
    var prev;

    // find active image index
    this.images.forEach(function filterImages(image, idx) {
      if (image.isActive === true) {
        activeIndex = idx;
      }
    });
    // remove active flag from it
    this.images[activeIndex].isActive = false;
    // if first item is active, set that last element of the image array
    // should go next
    if (activeIndex === 0) {
      prev = this.images.length - 1;
    } else {
      prev = activeIndex - 1;
    }
    this.images[prev].isActive = true;
    this.render();
  };

  window.mainSlider = new LuiSlider({
    elementId: 'slider'
  });

})(window);
