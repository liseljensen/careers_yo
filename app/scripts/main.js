$(function() {
    var $container = $('#mosaic');
    
    $container.packery({
      itemSelector: '.item',
      gutter: 15,
      percentPosition: true
    });    
    
    //HOVER EFFECTS ON HOME PAGE
    function onHover() {
        for (var prop in this) {
          console.log(this[prop]);
          $(this[prop]).addClass('hover');
        }
    }
    function onMouseout() {
        for (var prop in this) {
          //console.log(this[prop]);
          $(this[prop]).removeClass('hover');
        }
    }
    
    function Square(el) {
        this.parent = $(el).parent(), 
        this.figure = this.parent.find('figure'),
        this.link = this.parent.find('.link a'),
        this.image = this.parent.find('img'),
        this.hoverEffect = onHover,
        this.mouseOut = onMouseout
    }
    
    $('.overlay')
        .hover(function(e) {
            var el = this;
            var sq = new Square(el);
                sq.hoverEffect(); 
        })
        .click(function(){
            var el = this;
            var sq = new Square(el);
                sq.hoverEffect(); 
        })
        .mouseout(function() {
            var el = this;
            var sq = new Square(el);
                sq.mouseOut(); 
        });
    
        var getUrlParameter = function getUrlParameter(sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        };
    
        function animateNumbers() {
//                var percent_number_step = $.animateNumber.numberStepFactories.append(' %');
                (function() {
                    $('#holidays').animateNumber(
                       {
                        number: 10
                      },
                        2000
                    ).delay(1000);
                    $('#years').animateNumber(
                       {
                        number: 14
                      },
                      2000
                    ).delay(2000);
                    $('#weeks').animateNumber(
                       {
                        number: 4
                      },
                      2000
                    ).delay(3000);

                    $('#value').animateNumber(
                       {
                        number: 97,
                        numberStep: percent_number_step
                      },
                        2000
                    ).delay(1000);
                    $('#fulltime').animateNumber(
                       {
                        number: 92,
                        numberStep: percent_number_step
                      },
                      2000
                    ).delay(2000);
                    $('#employed').animateNumber(
                       {
                        number: 40,
                        numberStep: percent_number_step
                      },
                      2000
                    ).delay(3000);
                }()); 
                numbersDone = true;
                console.log(numbersDone);
            }
    
        function checkNav() {
            if ($(document).scrollTop() > 100) {
                $('#global-nav').fadeOut(100); 
                $('.navbar-brand img').addClass('small');
            } 
            else {
                $('#global-nav').fadeIn(250); 
                $('.navbar-brand img').removeClass('small');
            }
        }
        
        function canSeeNumbers() {
            var numCheck = $(".numbers:in-viewport").length; 
            console.log(numbersDone);
            if((numCheck !== 0)) {
                animateNumbers();
            }
        }
   
        function pullPage() {    
           var page = "content/" + getUrlParameter('page') + ".html" || undefined; 
           var content; 
           if(page) {
               $("#content").load( page, function( response, status, xhr ) {
                  if ( status == "error" ) {
                    var msg = "Sorry but there was an error: ";
                    $( "#content" ).html( msg + xhr.status + " " + xhr.statusText );
                  } 
                  else {
                      console.log('success');
                      if($('.numbers').length) {
                          console.log('has numbers');
                          $('[src="scripts/main.js"]').before('<script src="scripts/jquery-animateNumber.js"></script>');
                          canSeeNumbers();
                      }
                  }
                });
           }
        };
    

        if($('#content').length) {
            var numbersDone = false; 
            pullPage();
            
            $(window).bind("scroll", function(event) {
                console.log(numbersDone);
                checkNav();
                if ((numbersDone === false) && ($('#holidays').length != 0) || ($('#value').length != 0)) {
                    //canSeeNumbers();
                    
                }
            });
        }
    
        
});

