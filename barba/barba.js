$('document').ready(function(){
           var transEffect = Barba.BaseTransition.extend({
               start: function(){
                 this.newContainerLoading.then(val => this.fadeInNewcontent($(this.newContainer)));
               },
               fadeInNewcontent: function(nc) {
                 console.log(nc);
                 nc.hide();
                 var _this = this;
                 $(this.oldContainer).fadeOut(1000).promise().done(() => {
                   nc.css('visibility','visible');
                   nc.fadeIn(1000, function(){
                     _this.done();
                   })
                 });
               }
           });

           Barba.Pjax.getTransition = function() {
             alert(1)
             return transEffect;
           }
           Barba.Pjax.start();
         });
