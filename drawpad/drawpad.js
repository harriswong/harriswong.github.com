var Drawpad = Drawpad || {};

//default global variables
Drawpad.inkColour = 'black'; //CSS code for pen colour, default black ink
Drawpad.inkSize = 2;    //integer, > 0, path line width in pixels
Drawpad.paperW = 320;   //paper width
Drawpad.paperH = 320; //paper height

// init.
Drawpad.init = function(paperW, paperH) {
    Drawpad.paperW = paperW || Drawpad.paperW;
    Drawpad.paperH = paperH || Drawpad.paperH;
    Drawpad.yellow = $('.yellow');
    Drawpad.blue = $('.blue');
    Drawpad.black = $('.black');

    var oldX;   //last clicked pen point-x
    var oldY;   //last clicked pen point-y
    
    // Creates canvas 320 × 320 at 10, 50, absolute
    var paper = Raphael($("#canvas")[0], Drawpad.paperW, Drawpad.paperH);
    var paperX = $(paper.canvas).offset().left;   //paper x-coord
    var paperY = $(paper.canvas).offset().top;   //paper y-coord

    // Creates a rectangle background
    var rect = paper.rect(0, 0, Drawpad.paperW, Drawpad.paperH);
    rect.attr('fill', '#ddd');

    /*
     * start drawing
     * @param   int     x position of the mouse
     * @param   int     y position of the mouse
     * @param   obj     DOM event obj
     */
    var startDrawing = function(x, y, e) {
        console.log('startDrawing: ', x, y, e);
    };
    
    /*
     * stop drawing
     * @param   int     x position of the mouse
     * @param   int     y position of the mouse
     * @param   obj     DOM event obj
     */
    var stopDrawing = function(x, y, e) {
        //reset old coordinates
        oldX = 0;
        oldY = 0;
        console.log('stopDrawing: ', x, y, e);
    };


    /*
     * start moving
     * @param   int     shift by x from the start point
     * @param   int     shift by y from the start point
     * @param   int     x position of the mouse
     * @param   int     y position of the mouse
     * @param   obj     DOM event obj
     */
    var startMoving = function(dx, dy, x, y, e) {
        console.log('startMoving: ', dx, dy, x, y, e, oldX, oldY);
        if (oldX && oldY) {
            drawPath(oldX, oldY, x, y);
        }
        oldX = x;
        oldY = y;
    };

    /**
     * Draw a path with SVG path format
     * http://www.w3.org/TR/SVG/paths.html#PathData
     * TODO: Implements auto mapping for different curves based on 3 points.  
     *
     * @param   int     x position of start point
     * @param   int     y position of start point
     * @param   int     x position of end point
     * @param   int     y position of end point
     */
    var drawPath = function(x, y, x2, y2) {
        x = x - paperX;
        y = y - paperY;
        x2 = x2 - paperX;
        y2 = y2 - paperY;
        var path = paper.path("M" + x + " " + y + "L" + x2 + " " + y2);
        path.attr('stroke', Drawpad.inkColour);
        path.attr('stroke-width', Drawpad.inkSize);
        console.log('Path drawn: ', path);
    };

    /**
     * track movement, ultimately, draw a line following mouse down
     * Drag's API
     * 
     * onmove    function    handler for moving
     * onstart    function    handler for drag start
     * onend    function    handler for drag end
     * mcontext    object    context for moving handler
     * scontext    object    context for drag start handler
     * econtext    object    context for drag end handler 
     */
    rect.drag(startMoving, startDrawing, stopDrawing);
            
    //bind all events
    Drawpad.bind();
    Drawpad.hideColourPalette();
}

/**
 * Bind all events
 */
Drawpad.bind = function() {
    Drawpad.bindColourPanel();
}

/**
 * Bind colour panel events
 */
Drawpad.bindColourPanel = function () {
    var commonBindings = function (that) {
    };

    Drawpad.yellow.bind("click", function (evt) {
        var clickedButton = $(evt.currentTarget);
        Drawpad.inkColour = 'yellow';
        commonBindings(Drawpad.yellow);
    });
    Drawpad.blue.bind("click", function (evt) {
        var clickedButton = $(evt.currentTarget);
        Drawpad.inkColour = 'blue';
        commonBindings(Drawpad.blue);
    });
    Drawpad.black.bind("click", function (evt) {
        var clickedButton = $(evt.currentTarget);
        Drawpad.inkColour = 'black';
        commonBindings(Drawpad.black);
    });
}

Drawpad.hideColourPalette = function() {
    //hide radio
    $('.radio').hide();
}
