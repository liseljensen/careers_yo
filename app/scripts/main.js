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
    
    function Square(el) {
        this.parent = $(el).parent(), 
        this.figure = this.parent.find('figure'),
        this.link = this.parent.find('.link a'),
        this.image = this.parent.find('img'),
        this.hoverEffect = function() {
            for (var prop in this) {
                if (this.hasOwnProperty(prop)) {
                    $(this[prop]).addClass('hover');
                }
            }
        },
        this.mouseOut = function() {
            for (var prop in this) {
                if (this.hasOwnProperty(prop)) {
                    $(this[prop]).removeClass('hover');
                }
            }
        }
    }
    
    $('.overlay')
        .hover(function(e) {
		//console.log('hover');
            var el = this;
            var sq = new Square(el);
                sq.hoverEffect(); 
        })
        .click(function(e){
            var el = this;
            var sq = new Square(el);
                sq.hoverEffect(); 
        })
        .on('tap', function(e){
            var el = this;
            var sq = new Square(el);
                sq.hoverEffect(); 
        })
        .mouseout(function(e) {
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
                var year = new Date().getFullYear();
                $('footer').append(data); 
                $.each(newsItems, function(i, data){
                   $('#news').append(data); 
                });
                $('#trademark').append('© ' + year + ' J.R. Simplot Company');
            })
            .fail(function () {
                $('footer').append('Unable to load footer content.');
            });
    

        function animateNumbersWhy() {
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
                }()); 
                numbersDoneWhy = true;
            }
            function animateNumbersStudent() {
                (function() {
                    $('#value').animateNumber(
                       {
                        number: 100
                      },
                        2000
                    ).delay(1000);
                    $('#fulltime').animateNumber(
                       {
                        number: 75
                      },
                      2000
                    ).delay(2000);
                    $('#employed').animateNumber(
                       {
                        number: 100
                      },
                      2000
                    ).delay(3000);
                }()); 
                numbersDoneStudent = true;
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
            if(($('#nae').length !== 0) && (numbersDoneWhy === false)) {
                animateNumbersWhy();
            }
            else if(($('#value').length !== 0) && (numbersDoneStudent === false)) {
                animateNumbersStudent();
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
                  }
                });
           }
        }
    

        if($('#content').length || $('#map').length) {
            var numbersDoneWhy = false,
                numbersDoneStudent = false;
            pullPage();
            
            $(window).bind("scroll", function(event) {
                checkNav();
                var numCheck = $(".numbers:in-viewport").length; 
                if(numCheck) {
                    //console.log('page has numbers in view');
                    canSeeNumbers(); 
//                    if (($('#nae').length !== 0) || ($('#value').length !== 0)) {
//                          
//                          
//                    }
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
    
    $("[data-toggle='popover']").popover(); 
});

