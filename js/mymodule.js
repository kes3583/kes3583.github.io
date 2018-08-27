'use strict';
var Module = (function () {

    /*** Selectors */

    var svgPath = document.querySelector('.svg-path'),
        slide = document.querySelector('.slide'),
        myName = slide.querySelector('.name'),

        line = myName.querySelector('.line'),
        letterList = myName.querySelectorAll('.t'),
        letters = [];

    /*** Methods */

    var myModule = {};
    var _privateMethod = function () {
        console.log('privateMethod')
    };
    myModule.textAnimation = function () {
        //get the letters -- in reverse
        var forEach = function (array, callback, scope) {
          for (var i = array.length; i--;) {
            callback.call(scope, i, array[i]); // passes back stuff we need
          }
        };

        forEach(letterList, function (index, value) {
            letters.push(value)
        });

        var basicTimeline = anime.timeline();
        basicTimeline
        .add({
            targets: svgPath,
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 1000,
            delay: function(el, i) { return i * 1000 },
            direction: 'forwards',
            loop: false,
              complete: function(anim) {
              $('.container').addClass('completed');
                  //alert('complete!')
            }
        })
        .add({
          targets: line,
          //translateX: 250,
          duration: 200,
          easing: 'easeInOutCubic',
          scaleX: [0,1],
          complete: function() {
              line.style.WebkitTransformOrigin = line.style.transformOrigin = '100% 50%';
              anime({
                  targets: line,
                  duration: 200,
                  easing: 'easeInOutCubic',
                  scaleX: [1,0],
                  complete: function() {
                      anime({
                          targets: letters,
                          translateX: 250,
                          opacity: 1,
                          direction: 'alternate',
                          loop: false,
                          delay: function(el, i, l) {
                              return i * 100;
                          }
                      });
                  }
              });
          }
        });
    };
    myModule.anotherPublicMethod = function () {

    };

    return myModule; // returns the Object with public methods
})();

//Module.textAnimation();
