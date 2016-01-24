/* global $, console, window, document */
var newsItems = []; 
function jsonpCallbackNews(data) {
    $.each(data.news, function(key, story) {
        var title = '<li><a href="' + story.url + '" target="_blank">' + story.title + '</a></li>';
        newsItems.push(title);
    });
}

$(function() {
    $.ajax({
        beforeSend: function (xhr) {
            if (xhr.overrideMimeType) {
                xhr.overrideMimeType("application/json");
            }
        }
    });

    var $container = $('#mosaic');
  	var mapExists = false; 
    
    $container.packery({
      itemSelector: '.item',
      gutter: 15,
      percentPosition: true
    });    
    
    //HOVER EFFECTS ON HOME PAGE
    function onHover() {
        for (var prop in this) {
          //console.log(this[prop]);
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
    
        $.get('content/footer.html')
            .done(function (data) {
                //console.log('news items' + newsItems + "done.");
                $('footer').append(data); 
                $.each(newsItems, function(i, data){
                    //console.log(data);
                   $('#news').append(data); 
                });
            })
            .fail(function () {
                console.log('failed');
            });
    

        function animateNumbers() {
                (function() {
                    $('#nae').animateNumber(
                       {
                        number: 6786
                      },
                        2000
                    ).delay(1000);
                    $('#nal').animateNumber(
                       {
                        number: 193
                      },
                      2000
                    ).delay(2000);
                    $('#tenure').animateNumber(
                       {
                        number: 10
                      },
                      2000
                    ).delay(3000);

                    $('#value').animateNumber(
                       {
                        number: 97
                      },
                        2000
                    ).delay(1000);
                    $('#fulltime').animateNumber(
                       {
                        number: 92
                      },
                      2000
                    ).delay(2000);
                    $('#employed').animateNumber(
                       {
                        number: 40
                      },
                      2000
                    ).delay(3000);
                }()); 
                numbersDone = true;
                //console.log(numbersDone);
            }
    
        function checkNav() {
            if ($(document).scrollTop() > 100) {
                $('header.fixed').addClass('small');
                $('.navbar-brand img').addClass('small');
            } 
            else {
                $('header.fixed').removeClass('small');
                $('.navbar-brand img').removeClass('small');
            }
        }
        
        function canSeeNumbers() {
            var numCheck = $(".numbers:in-viewport").length; 
            //console.log(numbersDone);
            if((numCheck !== 0)) {
                animateNumbers();
            }
        }
   
        function pullPage() {   
           var pageName = getUrlParameter('page'),
               page = "content/" + pageName + ".html" || undefined,
               content; 
           if(page) {
               $("#content").load( page, function( response, status, xhr ) {
                  if ( status == "error" ) {
                    var msg = "Sorry but there was an error: ";
                    $( "#content" ).html( msg + xhr.status + " " + xhr.statusText );
                  } 
                  else {
                      //console.log('success');
                      $('#' + pageName).addClass('active');
                      if($('.numbers').length) {
                          //console.log('has numbers');
                          $('[src="scripts/main.js"]').before('<script src="scripts/jquery-animateNumber.js"></script>');
                          canSeeNumbers();
                      }
                  }
                });
           }
        }
    

        if($('#content').length || $('#map').length) {
            var numbersDone = false; 
            pullPage();
            
            $(window).bind("scroll", function(event) {
                //console.log(numbersDone);
                checkNav();
                if ((numbersDone === false) && ($('#nae').length !== 0) || ($('#value').length !== 0)) {
                    canSeeNumbers();
                    
                }
            });
        }

//    var $window = $(window),
//        navAdded = false;
//
//    function checkWidth() {
//        var visible = $('#global-nav').is(':visible');
//        
//        if (!(visible) && (navAdded === false)) {
//            var globalNav = $('#global-nav > .navbar').clone();
//            $('#global-nav-mobile').append(globalNav);
//            navAdded = true;
//        }
//        else if((visible) && (navAdded === true)) {
//            $('#global-nav-mobile').empty(); 
//            navAdded = false; 
//        }
//    }
//    // Execute on load
//    checkWidth();
//    // Bind event listener
//    $(window).resize(checkWidth);
});

