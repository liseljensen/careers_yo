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
    
});

