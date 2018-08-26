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

    //_init();

})();
