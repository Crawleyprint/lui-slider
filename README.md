# Libre UI slider

### Look ma', no jQuery!

Data-driven image slider implemented in vanilla JavaScript.

LUI Slider uses JavaScript to determine which slide is selected and to set up event listeners for "next" and "previous" buttons, while CSS is responsible for positioning and animating.

_Coniguration:_

    var slider = new LUISlider({
      // host element (currently only id is supported)
      el: 'element-id',
      // id of element used for going to next slide
      // default: 'prev',
      nextElement: 'next-element-id',
      // id of element used for going to previous slide
      // default: 'next',
      prevElement: 'prev-element-id',
      // className for active slide
      // default: .lui-slider__item--active
      activeClass: 'classname',
      // set initial active slide
      // default: 3
      activeSlide: 1,
    });

_Building:_

- Clone this repo or download zip
- Install nodeJS
- Install gulp - `npm install -g gulp`
- Install bower - `npm install -g bower`
- Go to your downloaded directory in your terminal app and execute `npm start`
- Open [http://localhost:8000](http://localhost:8000)

_Demo:_ [crawleyprint.github.io/lui-slider](crawleyprint.github.io/lui-slider)


