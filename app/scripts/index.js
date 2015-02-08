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
    this.initialActiveSlideIndex = (options.activeSlide || 3) - 1;
    console.log(this.initialActiveSlideIndex);

    /**
     * Sets up control elements
     */
    this.prevElement = document
        .getElementById(options.prevElement || 'previous');
    this.nextElement = document
        .getElementById(options.prevElement || 'next');

    /**
     * ... and initial image array
     */
    this.images = options.imageArray || [];
    /**
     * ... then, see what's already in there and store an instance variable
     * with list of those images and basic attributes
     */
    this.setup();
    /**
     * ... and return slider object to allow chaining of methods
     */
    return this;
  }

  LuiSlider.prototype.setup = function luiSetup() {
    // get all images
    var images = this.el.getElementsByTagName('img') || [];

    // setup event listeners for next and previous buttons
    this.nextElement.addEventListener('click', this.next.bind(this));
    this.prevElement.addEventListener('click', this.previous.bind(this));

    Array
      .prototype
      .slice
      .call(images)
      .forEach(this.addImageToSlider.bind(this));

    window.onresize = this.transition.bind(this);

    /**
     * Remove all images to make scene for template rendering
     */
    this.empty();
    this.render();
    this.setActiveSlideIndex(this.initialActiveSlideIndex);
    this.transition();

    return this;
  };

  /**
   * Add individual image to slider model.
   * Separated as method for importing json data after initial page load.
   */
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
  LuiSlider.prototype.empty = function() {
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
    return [
      '<div class="lui-slider__item">',
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
    Array
      .prototype
      .slice
      .call(this.el.childNodes)
      .forEach(this.setupSlideActions.bind(this));

    return this;
  };

  LuiSlider.prototype.setupSlideActions =
      function setupSlideActions(child, idx) {
        child.addEventListener('click', this.imageNavClick.bind(this, idx));
      };

  LuiSlider.prototype.imageNavClick = function imageNavClickHandler(idx) {
    this.setActiveSlideIndex(idx);
    this.transition();
    return false;
  };

  LuiSlider.prototype.switchSlide = function switchSlide(direction) {
    var totalLength = this.images.length;
    var activeIndex = this.getActiveSlideIndex();
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
    this.transition();
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
  LuiSlider.prototype.getActiveSlideIndex = function getActiveSlideIndex() {
    var activeIndex = -1;
    this.images.forEach(function filterImages(image, idx) {
      if (image.isActive === true) {
        activeIndex = idx;
      }
    });

    return activeIndex;
  };

  LuiSlider.prototype.setActiveSlideIndex = function setActiveSlideIndex(idx) {
    this.images.forEach(function setActiveSlide(image, index) {
      if (index === idx) {
        image.isActive = true;
      } else {
        image.isActive = false;
      }
    });
  };

  /**
   * Once active slide has been set, it performs a transition in browser
   */
  LuiSlider.prototype.transition = function transition() {
    var toIndex = this.getActiveSlideIndex();
    var fromSlide = this.el.getElementsByClassName(this.activeClass)[0] ||
      this.el.childNodes[0];
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
    } else {
      factor = this.images.length - 5;
    }

    this.el.style.marginLeft = -1 * factor * width + 'px';
  };

  window.mainSlider = new LuiSlider({
    elementId: 'slider'
  });

})(window);
