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
