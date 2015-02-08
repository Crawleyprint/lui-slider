'use strict';

;(function setupLUISlider(window, undefined) {

  /**
   * @module Slider app prototype
   *
   * @author Mladen Stepanić <mladen.stepanic@gmail.com>
   * @license GNU GPL3
   *
   * @param {Object} options - Slider options map
   *
   * @return {Object} LuiSlider
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
    this.images = options.imageArray || [];
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
    // get all images
    var images = this.el.getElementsByTagName('img') || [];
    var that = this;

    // setup event listeners for next and previous buttons
    this.nextElement.addEventListener('click', this.next.bind(this));
    this.prevElement.addEventListener('click', this.previous.bind(this));

    Array
      .prototype
      .slice
      .call(images)
      .forEach(this.addImageToSlider.bind(this));

    return this;
  };

  LuiSlider.prototype.addImageToSlider = function addImageToSlider(img) {
    var isActive = img.classList.contains(this.activeClass);
    this.images.push({
      src: img.getAttribute('src'),
      alt: img.getAttribute('alt'),
      isActive: isActive
    });
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
    this.images.forEach(function(image) {
      html.push(that.template(image));
    });
    this.el.innerHTML = html.join('');
    return this;
  };

  LuiSlider.prototype.switchSlide = function switchSlide(direction) {
    var totalLength = this.images.length;
    var activeIndex = this.findActiveSlide();
    var destIndex;
    var active = this.images[activeIndex];
    var dest;

    // remove active flag from it
    active.isActive = false;
    // if first item is active, set that last element of the image array
    // should go next
    if (direction === 'next') {
      if (activeIndex === totalLength - 1) {
        destIndex = 0;
      } else {
        destIndex = activeIndex + 1;
      }
    } else {
      if (activeIndex === 0) {
        destIndex = totalLength - 1;
      } else {
        destIndex = activeIndex - 1;
      }
    }
    dest = this.images[destIndex];
    dest.isActive = true;
    this.images.splice(activeIndex, 1, active);
    this.images.splice(destIndex , 1, dest);
    this.transitionToSlide(destIndex);
  };

  LuiSlider.prototype.next = function(e) {
    if (e) {
      e.preventDefault();
    }
    this.switchSlide('next');
  };


  LuiSlider.prototype.previous = function(e) {
    if (e) {
      e.preventDefault();
    }
    this.switchSlide('prev');
  };

  /**
   * Iterate through images collection and find index of one that has
   * active property set to true
   *
   * @return {{Number}}
   */
  LuiSlider.prototype.findActiveSlide = function findActiveSlide() {
    var activeIndex = -1;
    this.images.forEach(function filterImages(image, idx) {
      if (image.isActive === true) {
        activeIndex = idx;
      }
    });

    return activeIndex;
  };

  LuiSlider.prototype.transitionToSlide = function(toIndex) {
    var fromSlide = this.el.getElementsByClassName(this.activeClass)[0];
    var toSlide = this.el.childNodes[toIndex];

    var csswidth = window.getComputedStyle(toSlide).getPropertyValue('width');
    var width = parseInt(csswidth, 10);
    var factor;

    fromSlide.classList.remove(this.activeClass);
    toSlide.classList.add(this.activeClass);

    if (toIndex < 3) {
      factor = 0;
    } else if (toIndex < this.images.length - 2) {
      factor = toIndex - 2;
    }

    this.el.style.marginLeft = -1 * factor * width + 'px';
  };

  window.mainSlider = new LuiSlider({
    elementId: 'slider'
  });

})(window);
