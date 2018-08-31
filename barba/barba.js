$('document').ready(function() {
    var transEffect = Barba.BaseTransition.extend({
        start: function() {
            this.newContainerLoading.then(val => this.fadeInNewcontent($(this.newContainer)));
        },
        fadeInNewcontent: function(nc) {
            //console.log(nc); //div.barba-container
            //nc.hide();
            nc.classList.remove('on');
            console.log('this', this)
            var _this = this;
            $(this.oldContainer).fadeOut(1000).promise().done(() => {
                nc.classList.remove('on');
                nc.css('visibility', 'visible');
                nc.fadeIn(1000, function() {
                    _this.done();
                })
            });
        }
    });

    Barba.Pjax.getTransition = function() {
        console.log('nextpage')
        return transEffect;
    }
    Barba.Pjax.start();
});
