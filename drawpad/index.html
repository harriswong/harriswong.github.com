<html>
<head>
    <script type="text/javascript" src="../lib/jquery.js"></script>
    <script type="text/javascript" src="raphael.js"></script>
    <script type="text/javascript" src="drawpad.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            var paperX = 10;   //paper x-coord
            var paperY = 50;   //paper y-coord
            var paperW = 320;   //paper width
            var paperH = 320; //paper height
            var oldX;   //last clicked pen point-x
            var oldY;   //last clicked pen point-y
            
            // Creates canvas 320 × 320 at 10, 50, absolute
            var paper = Raphael(paperX, paperY, paperW, paperH);

            // Creates a rectangle
            var rect = paper.rect(0, 0, paperW, paperH);
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
//                path.attr('stroke', '#4D0066');
//                path.attr('stroke-width', '2');
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
        });
    </script>
    <link rel="stylesheet" type="text/css" href="styles.css" />
</head>

<body>
    <p>Draw here: </p>
    <div id="canvas"></div>
</body>
</html>
