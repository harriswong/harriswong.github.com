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
    Drawpad.paper = Raphael($("#canvas")[0], Drawpad.paperW, Drawpad.paperH);
    Drawpad.paperX = $(Drawpad.paper.canvas).offset().left;   //paper x-coord
    Drawpad.paperY = $(Drawpad.paper.canvas).offset().top;   //paper y-coord

    // Creates a rectangle background
    Drawpad.rect = Drawpad.paper.rect(0, 0, Drawpad.paperW, Drawpad.paperH);
    Drawpad.rect.attr('fill', '#ddd');

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
            if (Drawpad.eraserOn) {
                //if eraser
                //TODO: Very slow.  Improve on speed.
                erasePath(x - 10, y - 10, x + 10, y + 10);
            } else {
                drawPath(oldX, oldY, x, y);
            }
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
        x = x - Drawpad.paperX;
        y = y - Drawpad.paperY;
        x2 = x2 - Drawpad.paperX;
        y2 = y2 - Drawpad.paperY;
        var path = Drawpad.paper.path("M" + x + " " + y + "L" + x2 + " " + y2);
        path.attr('stroke', Drawpad.inkColour);
        path.attr('stroke-width', Drawpad.inkSize);
        console.log('Path drawn: ', path);
    };

    /**
     * erase everything that's erasable
     */
    var erasePath = function (x, y, x2, y2) {
        for (i = x; i <= x2; i++) {
            for (j = y; j <= y2; j++) {
                var element = Drawpad.paper.getElementByPoint(i, j);
                console.log('Erasing: ', element, i, j);
                if (element.type == 'path') {
                    element.remove();
                }
            }
        }
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
    Drawpad.rect.drag(startMoving, startDrawing, stopDrawing);
            
    //bind all events
    Drawpad.bind();
    Drawpad.hideColourPalette();
}

/**
 * Bind all events
 */
Drawpad.bind = function() {
    Drawpad.bindColourPanel();
    Drawpad.bindNewPad();
    Drawpad.bindEraserButton();
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

/**
 * Bind new pad button
 */
Drawpad.bindNewPad = function () {
    var newPad = $('.new-pad');
    newPad.bind('click', function(evt) {
        $('path').remove();
    });
}

/**
 * Bind eraser
 */
Drawpad.bindEraserButton = function () {
    var eraserButton = $('.eraserButton');
    eraserButton.bind('click', function(evt) {
        var clickedButton = $(evt.currentTarget);
        if (clickedButton.hasClass('clickedEraserButton')) {
            Drawpad.eraserOn = false;
            Drawpad.eraserArea.remove();
            clickedButton.removeClass('clickedEraserButton');
        } else {
            clickedButton.addClass('clickedEraserButton');
            Drawpad.eraserOn = true;
            Drawpad.eraserArea = Drawpad.paper.rect(-100, -100, 20, 20, 2);
            Drawpad.eraserArea.attr('stroke', 'black');
            Drawpad.rect.mousemove(function(e, x, y) {
                Drawpad.eraserArea.attr('x', x - 10 - Drawpad.paperX);
                Drawpad.eraserArea.attr('y', y - 10 - Drawpad.paperY);
            });
        }
    });
}

Drawpad.hideColourPalette = function() {
    //hide radio
    $('.radio').hide();
}
