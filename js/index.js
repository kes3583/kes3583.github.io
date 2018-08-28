// main
(function(window, document, undefined) {
    'use strict';

    /**
     * Selectors
     */
    var doc = document,
        container = doc.getElementById('container'),

        animEndEventName = whichAnimationEvent();

    /**
     * Methods
     */

     //load main element when loading finishes
    var _init = function() {
        console.log('loading')


        //callback after the end of the animation
        var animationEndCallback = function () {

            console.log('animation completed!')
            this.removeEventListener(animEndEventName, animationEndCallback);
            console.log('call another function!')

            //textAnimation();
            test();
        }


        window.addEventListener('scroll', noscroll);
        container.classList.add("loading");

        var loadWrapper = document.querySelector('loading');
        loadWrapper.addEventListener(animEndEventName, animationEndCallback);


    }
    //end _init

    function test(){
        console.log('test')
    }

    //no scroll
    function noscroll() {
        window.scrollTo(0, 0);
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
        console.log('starts textAnimation')
        container.classList.remove("loading");
        container.classList.add("loaded");
        window.removeEventListener('scroll', noscroll);

        var pathHello = document.querySelector('.path-hello'),
            slide = doc.querySelector('.slide'),
            letters = slide.querySelector('h1.myname'),
            line = letters.querySelector('.line'),
            letterList = letters.querySelectorAll('.t'),
            lettersArr = [];

        forEachReverse(letterList, function (index, value) {
            lettersArr.push(value)
        });

        console.log('lettersArr', lettersArr)


        var basicTimeline = anime.timeline();
        basicTimeline
        .add({
            targets: pathHello,
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 1000,
            delay: function(el, i) { return i * 1000 },
            direction: 'forwards',
            loop: false,
              complete: function(anim) {
              //$('.container').addClass('completed');
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
        console.log('forEachReverse')
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
