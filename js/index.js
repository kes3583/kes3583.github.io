// main
(function() {
    var _init = function() {
        console.log('loading')


        //1. 로딩, noscroll 2.로딩이 끝나면 load-wrapper scale -up 3. 로딩 텍스트

        window.addEventListener('scroll', noscroll);

        var container = document.getElementById('container'),
            bar = container.querySelector('.bar'),
            animationEvent = whichAnimationEvent();

        container.classList.add("loading");
        bar.addEventListener(animationEvent, animationEndCallback);


        //load main element when loading finishes
        function animationEndCallback(event) {
            bar.removeEventListener(animationEvent, animationEndCallback);
            console.log('complete!')
            container.classList.remove("loading");
            container.classList.add("loaded");
            //clearInterval( interval );

            window.removeEventListener('scroll', noscroll);
            setTimeout(function() {
                slideText()
            }, 1300)

f
        }




    }
    //end _init

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

    //show TextFx
    function slideText() {
        //for a number of slide
        var slideshow = document.querySelector(".slideshow");
        var slides = [].slice.call(slideshow.querySelectorAll('.slide'));
        var counter = 0;
        slides.forEach(function(el, index) {
            //el.classList.remove('slide--current');
            setTimeout(function() {
                console.log(counter)
                counter++;
                slides[counter - 1].style.opacity = 1;
                //this.slides[counter-1].classList.add('slide--current');
                var letters = new TextFx(slides[counter - 1], 'fx1');

            }, index * 1200);
        })
    }

    _init();

})();

(function(window) {
    'use strict';
    var TextFx = function(el, effect) {
        this.el = el;
        this._init();
        this._animate(effect);
    }
    TextFx.prototype._init = function() {
        this.el.classList.add("letter-effect");
        this.letters = [].slice.call(this.el.querySelectorAll("span")); //letter Array

    }
    // settings for each letter
    TextFx.prototype._effects = {
        fx1: { in: {
                duration: 1000,
                delay: function(el, index) {
                    return 75 + index * 40;
                },
                easing: "easeOutElastic",
                elasticity: 650,
                opacity: {
                    value: 1,
                    easing: "easeOutExpo"
                },
                translateY: ["50%", "0%"]
            },
            out: {
                duration: 400,
                delay: function(el, index) {
                    return index * 40;
                },
                easing: "easeOutExpo",
                opacity: 0,
                translateY: "-100%"
            }
        },
        fx2: { in: {
                duration: 700,
                delay: function(el, index) {
                    return index * 50;
                },
                easing: 'easeOutCirc',
                opacity: 1,
                translateX: function(el, index) {
                    return [(50 + index * 10), 0]
                }
            },
            out: {
                duration: 0,
                opacity: 0
            }
        },
        fx8: { in: {
                duration: 400,
                delay: function(el, index) {
                    return 150 + (el.parentNode.children.length - index - 1) * 20;
                },
                easing: 'easeOutQuad',
                opacity: 1,
                translateY: ['100%', '0%']
            },
            out: {
                duration: 400,
                delay: function(el, index) {
                    return (el.parentNode.children.length - index - 1) * 20;
                },
                easing: 'easeInOutQuad',
                opacity: 0,
                translateY: '-100%'
            }
        },
        'fx15': {
            perspective: 1000,
            in: {
                duration: 400,
                delay: function(el, index) {
                    return 100 + index * 50;
                },
                easing: 'easeOutExpo',
                opacity: 1,
                rotateX: [110, 0]
            },
            out: {
                duration: 400,
                delay: function(el, index) {
                    return index * 50;
                },
                easing: 'easeOutExpo',
                opacity: 0,
                rotateX: -110
            }
        },
        'fx18': { in: {
                duration: 500,
                delay: function(el, index) {
                    return index * 150;
                },
                easing: 'easeInOutQuint',
                opacity: 1,
                scaleY: [8, 1],
                scaleX: [0.5, 1],
                translateY: ['-100%', '0%']
            },
            out: {
                duration: 800,
                delay: function(el, index) {
                    return index * 150;
                },
                easing: 'easeInQuint',
                opacity: 0,
                scaleY: {
                    value: 8,
                    delay: function(el, index) {
                        return 100 + index * 150;
                    },
                },
                scaleX: 0.5,
                translateY: '100%'
            }
        }
    };

    TextFx.prototype._animate = function(effect) {

        var effecSettings = this._effects[effect],
            target = this.letters;

        if (effecSettings.perspective != undefined) {
            this.el.style.WebkitPerspective = this.el.style.perspective = effecSettings.perspective + 'px';
        }
        if (effecSettings.origin != undefined) {
            this.letters.forEach(function(letter) {
                letter.style.WebkitTransformOrigin = letter.style.transformOrigin = effecSettings.origin;
            });
        }

        anime.remove(this.letters);
        this.letters.forEach(function(letter) {
            letter.style.WebkitTransform = letter.style.transform = "";
        });
        anime.timeline({
                targets: target
            })
            .add(effecSettings['in']);
        // .add(effecSettings['out']);
    }
    window.TextFx = TextFx;

})(window);
