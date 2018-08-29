// main
(function(window, document, undefined) {
    'use strict';

    /**
     * Selectors
     */
    var doc = document,
        container = doc.getElementById('container'),
        loadWrapper = container.querySelector('.load-wrapper'),
        loadingBar = loadWrapper.querySelector('.bar'),
        animationEvent = whichAnimationEvent();

    /**
     * Methods
     */

    //load main element when loading finishes
    var _init = function() {
        console.log('loading')

        window.addEventListener('scroll', noscroll);
        container.classList.add('loading');

        //detect the end of animations of last element
        var loadWrapper = $('.load-wrapper');
        loadWrapper.on(animationEvent, function(e) {
            //console.log('detecting animationName!', e.originalEvent.animationName)
            var animationName = e.originalEvent.animationName;

            if (animationName === 'animLoadedHeader') {
                //console.log(animationName,'animation has finished');
                console.log('starts textAnimation');
                container.classList.remove("loading");
                container.classList.add("loaded");
                window.removeEventListener('scroll', noscroll);

                textAnimation();
            }
        });
    }
    //end _init

    //no scroll
    function noscroll() {
        window.scrollTo(0, 0);
    }

    //animation end event
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
        var pathHello = doc.querySelector('.path-hello'),
            slide = doc.querySelector('.slide'),
            letters = slide.querySelector('h1.myname'),
            line = letters.querySelector('.line'),
            letterList = letters.querySelectorAll('.t'),
            lettersArr = [];

        forEachReverse(letterList, function(index, value) {
            lettersArr.push(value)
        });


        //this._effects['path'].targets = pathHello;
        anime.timeline()
            .add({
                targets: pathHello,
                strokeDashoffset: [anime.setDashoffset, 0],
                easing: 'easeInOutSine',
                duration: 1000,
                delay: function(el, i) {
                    return i * 1000
                },
                direction: 'forwards',
                loop: false,
                complete: function(anim) {
                    console.log('path completed!')
                }
            })
            .add({
                targets: line,
                duration: 300,
                delay : 300,
                easing: 'easeInOutCubic',
                translateX : 250,
                scaleX: [0, 1],
                complete: function() {
                    line.style.WebkitTransformOrigin = line.style.transformOrigin = '200% 50%';
                    anime({
                        targets: line,
                        duration: 200,
                        easing: 'easeInOutCubic',
                        scaleX: [1, 0],
                        translateX : 250,
                        complete: function() {
                            //console.log(lettersArr)
                            anime({
                                targets: lettersArr,
                                translateX: 250,
                                scaleX: [0, 1],
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

    // settings for animation
    /* textAnimation.prototype._effects = {
        'path': {
            //targets: pathHello,
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 1000,
            delay: function(el, i) {
                return i * 1000
            },
            direction: 'forwards',
            loop: false,
            complete: function(anim) {
                console.log('path completed!')
            }
        }
    } */

    var forEachReverse = function(array, callback, scope) {
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
