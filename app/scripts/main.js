/* global $, console, window, google, styles, MarkerClusterer, navigator, document */
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
        };
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
	
		///////////////////////////////////////////////
		// CONTACT FORM VALIDATE
		///////////////////////////////////////////////
	
	 	function sendEmail() {
			$.ajax({
				type: "POST",
				url: 'processForm.cfc',
				data: {
						method: "sendEmail",
						firstName: $('#first_name').val(),
						lastName: $('#last_name').val(),
						phone: $('#phone').val(),
						email: $('#email').val(),
						message: $('#message').val()
					},
				success: function (data) {
					if (data == "true") {
						$('form').hide();
						$('.submitMessage').append('The form has been successfully submitted. Thank you for contacting us.');
					} 
					else {
						$('form').hide();
						$('.submitMessage').append('Oops, an error seems to have occurred.');
					}
				}
			}).fail(function (jqXHR, exception) {
				$('form').hide();
				$('.submitMessage').append('Oops, an error seems to have occurred.');
			});
		 }

		function contactFormInit() {
			$('#contact_form').validator().on('submit', function (e) {
			  if (e.isDefaultPrevented()) {
				 // alert('default prevented')
			  } 
			  else {
				  e.preventDefault(); 
				  $.ajax({
					type: "POST",
					url: 'processForm.cfc',
					data: {
							method: "sendEmail",
							firstName: $('#first_name').val(),
							lastName: $('#last_name').val(),
							phone: $('#phone').val(),
							email: $('#email').val(),
							message: $('#message').val()
						},
					success: function (data) {
						if (data == "true") {
							$('form').hide();
							$('.submitMessage').append('The form has been successfully submitted. Thank you for contacting us.');
						} 
						else {
							$('form').hide();
							$('.submitMessage').append('Oops, an error seems to have occurred.');
						}
					}
				}).fail(function (jqXHR, exception) {
					$('form').hide();
					$('.submitMessage').append('Oops, an error seems to have occurred.');
				});

			  }
			});
		}
		
		///////////////////////////////////////////////
		// PULL PAGE CONTENT
		///////////////////////////////////////////////   
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
					  if (pageName === 'contact_us') {
						 // console.log('contact init');
						  contactFormInit();
					  }
                      if (pageName === 'apply_now') {
//                          document.write('<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD6F8DDumSo3nUet2sUNjLQS5U-SWwm8VQ&callback=initMap"><script src="scripts/map_styles.js"></script>')
                      }
					 
                  }
                });
           }
        }
    

        if($('#content').length || $('.apply_page').length) {
			//console.log('subpage');
            var numbersDoneWhy = false,
                numbersDoneStudent = false;
            pullPage();
            
            $(window).bind("scroll", function(event) {
                checkNav();
                var numCheck = $(".numbers:in-viewport").length; 
                if(numCheck) {
                    //console.log('page has numbers in view');
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
	
	 $("[data-toggle='popover']").popover(); 
 
});

	
///////////////////////////////////////////////
// Google Captcha
///////////////////////////////////////////////  
//	  var onloadCallback = function() {
//		grecaptcha.render('captcha', {
//		  'sitekey' : '6LdADhcTAAAAAPyxjpvRFIcGHsiaQPJgJseey0RV',
//		  'callback' : function(response) {
//			  $.ajax({
//					type: "POST",
//					url: 'processCaptcha.cfc',
//					data: {
//							method: "processCaptcha",
//							captcha: $('.g-recaptcha-response').val()
//						},
//					success: function (data) {
//						console.log('success');
//					}
//				}).fail(function (jqXHR, exception) {
//					console.log('error');
//				});
//			}
//		});
//
//	};


var image = 'styles/img/marker.png';
            
function initMap() {
    var boise = {
        lat: 43.6167,
        lng: -116.2000
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: boise,
        mapTypeControl: false,
        streetViewControl: false,
        scrollwheel: false
    });
    var styledMap = new google.maps.StyledMapType(styles, {
        name: "Styled Map"
    });
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

    $.ajax({
        beforeSend: function (xhr) {
            if (xhr.overrideMimeType) {
                xhr.overrideMimeType("application/json");
            }
        }
    });

    var infowindow = new google.maps.InfoWindow(),
        locationID = 0; 

    // DISPLAY ERROR MESSAGE

    function displayError(message, color) {
        var createError = '<div class="alert alert-' + color + '" role="alert"><div class="container">' + message + '</div></div>';
        $('.alert').remove();
        $('#map').prepend(createError);
    }

    // CLUSTER MARKERS


    function clusterMarkers(markersGroups) {
        var clusterStyles = [
            {
                textColor: 'white',
                url: 'styles/img/clusterMarker.png',
                height: 50,
                width: 50,
                textSize: 15
              },
             {
                textColor: 'white',
                url: 'styles/img/clusterMarker.png',
                height: 50,
                width: 50,
                textSize: 15
              },
             {
                textColor: 'white',
                url: 'styles/img/clusterMarker.png',
                height: 50,
                width: 50,
                textSize: 15
              }
        ];
        var mcOptions = {
            styles: clusterStyles
        };
        var markerCluster = new MarkerClusterer(map, markersGroups, mcOptions);
    }


    // CREATE MARKERS

    var markersGroups = [];

    function createMarker(key, data, theLatLong, lastOne) {
        //resultsMap.setCenter(results[0].geometry.location);

        var marker = new google.maps.Marker({
            map: map,
            position: theLatLong,
            title: data.address + ", " + data.municipality + ", " + data.stateprovince + " " + data.postalcode,
            icon: image
        });
        markersGroups.push(marker);
        marker.setMap(map);
        //console.log(markersGroups);

        var position = (function() {
            if(data.postings.length > 1) {
                //console.log(data.postings.length);
                return "Positions";
            }
            else {
                return "Position";
            }
        })();
        var infowindowConent = '<b>' + data.address + ", " + data.municipality + ", " + data.stateprovince + '</b><br><a href=#" data-toggle="modal" data-target="#' + locationID + '"><span class="badge">' + data.postings.length + '</span>' + position + '</a>';

            marker.addListener('click', function () {
                infowindow.setContent(infowindowConent);
                infowindow.open(map, marker);
            });

                $.each(data.postings, function (i, posting) {
                    var item = '<a href="https://jrsextdev.simplot.com:1443/prodhcm/CandidateSelfService/controller.servlet?dataarea=prodhcm&context.session.key.HROrganization=JRS&context.session.key.JobBoard=EXTERNALNEW&context.session.key.noheader=true&JobPost=' + posting.jobPost + '&JobReq=' + posting.jobID + '" class="list-group-item" target="_blank">' + posting.position + '<i class="fa fa-chevron-circle-right pull-right"></i></a>';
                    //buildBodyContent += item;
                });

                //Build Modal and insert job listings
                var buildModal = '<div class="modal modal-fullscreen fade" id="' + locationID + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' + '<div class="modal-dialog" role="document">' + '<div class="modal-content">' + '<div class="modal-header">' + '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' + '<span aria-hidden="true">&times;</span></button>' + '<h3 class="modal-title" id="myModalLabel">' + data.address + ", " + data.municipality + ", " + data.stateprovince + '</h3></div>' + '<div class="modal-body"></div><table id="' + locationID + '-table" class="table-bordered"></table></div></div></div>';

                $('body').append(buildModal);

                var $table = $('#' + locationID +'-table');

                $table.bootstrapTable({
                    table: [{
                        striped: true	
                    }],
                    columns: [{
                        field: 'postDate',
                        title: 'Date Posted',
                        sortable: true
                    },{
                        field: 'jobID',
                        title: 'Job ID',
                        sortable: true
                    }, {
                        field: 'jobTitle',
                        title: 'Job Title',
                        sortable: true
                    }, {
                        field: 'category',
                        title: 'Category',
                        sortable: true
                    }, {
                        field: 'link',
                        title: '',
                        sortable: true
                    }]
                });
                var row = []; 
                function addRows(){

                    $.each(data.postings, function (i, posting) {
                        row.push({
                            postDate: posting.postBeginDate,
                            jobID: posting.jobID,
                            jobTitle: posting.jobPostTitle,
                            category: posting.category,
                            link: '<a href="' + posting.jobPostURL + '" target="_blank"> View Details </a>'
                        });

                    });
                    return row; 
               } 

                $table.bootstrapTable('append', addRows());

            locationID++;

            if(lastOne){
                //console.log('cluster called');
                clusterMarkers(markersGroups);
            }
        }

    // RUN GEOCODER

    function runGeocoder(key, data, lastOne) {
        var geocoder = new google.maps.Geocoder();

        (function (geocoder, resultsMap) {
            var address = data.address + ", " + data.municipality + ", " + data.stateprovince + " " + data.postalcode;
            geocoder.geocode({
                'address': address
            }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    var theGeoResults = results[0].geometry.location;
                    createMarker(key, data, theGeoResults, lastOne);
                    //console.log('geo results back');
                } else {
                    console.log('Geocode was not successful for the following reason: ' + status);
                }
            });
        })(geocoder, map);
    }

    // GET JOB POSTINGS AND LOOP THROUGH

    $.getJSON('data/data.json')
        .done(function (json) {
            var lastOne = false; 
            $.each(json, function (key, data) {
                if (key == (json.length - 1)) {
                    lastOne = true;
                }
                //console.log("key:" + key + ", json.length:" + json.length);
                //Check if Long and Lat exist
                if((data.long !== "0") || (data.lat !== "0")) {
                    //console.log('coordinates exist');
                    var longitude = data.long * 1, //convert to number from string
                        latitude = data.lat * 1, //convert to number from string
                        latLong = {lat: latitude, lng: longitude};
                    createMarker(key, data, latLong, lastOne);
                }
                else {
                    //console.log('no coordinates');
                    runGeocoder(key, data, lastOne);
                }
            });
        })
        .fail(function () {
            displayError('Unable to get map data.', "danger");
        });
        function disableScrollWheel() {
            //console.log('disable');
            map.setOptions({scrollwheel:false, draggable: false});
        }
        map.addListener('click', function(e) {
            //console.log('map ' + this);
            this.setOptions({scrollwheel:true, draggable: true});
        });
        map.addListener('tap', function(e) {
            this.setOptions({scrollwheel:true, draggable: true});
        });

        $('.map-bar').on('click', function(e){
            disableScrollWheel();
        })
        .on('tap', function(e){
            disableScrollWheel();
        });
        $('#faq').on('click', function(e){
            disableScrollWheel(); 
        });

        function geoSearch() {
           $('.alert').remove(); 
           var search = $('#geo-search').val();
           //console.log(search);
           var geocoder = new google.maps.Geocoder();
                (function (geocoder, resultsMap) {
                    var address = search;
                    geocoder.geocode({
                        'address': address 
                    }, function (results, status) {
                        //console.log(status/
                        if (status === google.maps.GeocoderStatus.OK) {
                            resultsMap.setCenter(results[0].geometry.location);
                            resultsMap.setZoom(6);
                        } else {
                          displayError('Sorry, something went wrong. Unable to process your location.', "danger");
                        }
                    });
                })(geocoder, map);
        }

       $('#custom-search-input .btn-info').click(function(){
            geoSearch(); 
        });
        $('#geo-search').keypress(function(e){
            //console.log(e);
            if(e.which == 13){//Enter key pressed
                geoSearch(); 
            }
        });

        if (!("geolocation" in navigator)) {
            $('#useLocation').hide(); 
        }

        $('#useLocation').on('click', function(e){
            $('.alert').remove(); 
            function success(pos) {
              var crd = pos.coords;					  
              map.setCenter({lat: crd.latitude, lng: crd.longitude}); 
              map.setZoom(8);
            }
            function error(err, pos) {
              console.log(pos + " " + err);
              displayError('Sorry, something went wrong. Unable to process your location.', "danger");
            }
            navigator.geolocation.getCurrentPosition(success, error, {enableHighAccuracy: true, timeout: 5000, maximumAge: 0});
        });

}

