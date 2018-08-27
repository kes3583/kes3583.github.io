// main
(function(window, document, undefined) {
    'use strict';

    /**
     * Selectors
     */
    var doc = document,
        container = doc.getElementById('container'),
        loadingBar = container.querySelector('.bar');

    /**
     * Methods
     */
    var _init = function() {
        console.log('loading')
        var animationEvent = whichAnimationEvent();
        window.addEventListener('scroll', noscroll);
        container.classList.add("loading");
        loadingBar.addEventListener(animationEvent, animationEndCallback);


        //load main element when loading finishes
        animationEndCallback(loadingBar);

    }
    //end _init

    //no scroll
    function noscroll() {
        window.scrollTo(0, 0);
    }

    //callback after the end of the animation
    function animationEndCallback(event) {
        loadingBar.removeEventListener(animationEvent, animationEndCallback);
        console.log('animation loaded!')
        container.classList.remove("loading");
        container.classList.add("loaded");
        //clearInterval( interval );

        window.removeEventListener('scroll', noscroll);

    }

    //detect the end of animations
    function whichAnimationEvent() {
        var t,
            el = document.createElement("fakeelement");

        var animations = {
            "animation": "animationend",
            "OAnimation": "oAnimationEnd",
            "MozAnimation": "animationend",
            "WebkitAnimation": "webkitAnimationEnd"
        }

        for (t in animations) {
            if (el.style[t] !== undefined) {
                return animations[t];
            }
        }
    }

    function textAnimation() {
        var svgPath = doc.querySelector('.svg-path'),
        slide = doc.querySelector('.slide'),
        letters = slide.querySelector('.letters'),
        line = myName.querySelector('.line'),
        letterList = myName.querySelectorAll('.t'),
        letters = [];
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


    var forEachReverse = function (array, callback, scope) {
      for (var i = array.length; i--;) {
        callback.call(scope, i, array[i]); // passes back stuff we need
      }
    };




    /**
     * Events/APIs/init
     */

    _init();
    //var custom = typeof effect === 'string' && effect === 'fx17' && direction === 'out';
    //if( custom ) {}
    // if (!this.classList.contains('active')) {
    //     this.classList.add('active');
    // }

})(window, document);
