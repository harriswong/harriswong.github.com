Heartstring.Fontbar = Heartstring.Fontbar || {};

/** 
 * component code 
 */
Heartstring.Fontbar = function (container, config) {
    var that = Heartstring.init(Heartstring.Fontbar, config);
    that.lineHeightRatio = 18.0/that.config.selectors.DEFAULT_FONT_SIZE;  //1 font-size = ? line height?
    
    //this function adjust fontsize based on the new font size given.
    var adjustFontSize = function(that, newFontSize) {
        var content = Heartstring.select(that.config.selectors.content);
        content.css('font-size', newFontSize + "px");
        content.css('line-height', Math.ceil(newFontSize * that.lineHeightRatio) + "px");
        // reflect changes on slider, adjust slider position
        Heartstring.select(that.config.selectors.controllerSlider).slider( "value", newFontSize);
    };
    
    /** 
     * Bind rows 
     */
    that.bindRow = function (that) {
        /** 
         * This function returns the ID from the id we use
         * in this module.  All ID of rows have the format of <prefix>-number.
         */
        var getRowId = function (rowObject, rowPrefix) {
            return rowObject.attr('id').substr(rowPrefix.length + 1);
        };
        var contentRows = Heartstring.select(that.config.selectors.contentRow);
        contentRows.bind("click", function (evt) {
            var clickedRow = $(evt.currentTarget);
            var contentId = getRowId(clickedRow, that.config.selectors.contentRow);
            window.location.href = that.config.url + contentId;
        });
    }
    
    /**
     * Bind slider 
     */
    that.bindSlider = function(that) {
        Heartstring.select(that.config.selectors.controllerSlider).slider({
            value: that.config.selectors.DEFAULT_FONT_SIZE,
            min: that.config.selectors.MIN_FONT_SIZE,
            max: that.config.selectors.MAX_FONT_SIZE,
            step: 1,
            slide: function( event, ui ) {
                adjustFontSize(that, ui.value);
            }
        });
    }
    
    /* bind fontsize to bigger on click
     * TODO: refractor with fontssmaller
     */
    that.bindFontSize = function(that) {
        
        // Bind bigger button
        Heartstring.select(that.config.selectors.controllerFontBigger).bind("click", function (evt) {
            // stripe px off and grab the font size, needs to be calculated everytime
            var originalFontSize = parseFloat(Heartstring.select(that.config.selectors.content).css('font-size'));
        
            //update it by +1
            var newFontSize = originalFontSize + 1;
            if (newFontSize > that.config.selectors.MAX_FONT_SIZE) {
                // out of bound
                return;
            }
            adjustFontSize(that, newFontSize);
        });
        
        // Bind smaller button
        Heartstring.select(that.config.selectors.controllerFontSmaller).bind("click", function (evt) {
            // stripe px off and grab the font size, needs to be calculated everytime
            var originalFontSize = parseFloat(Heartstring.select(that.config.selectors.content).css('font-size'));
            
            //update it by -1
            var newFontSize = originalFontSize - 1;
            if (newFontSize < that.config.selectors.MIN_FONT_SIZE) {
                // out of bound
                return;
            }
            adjustFontSize(that, newFontSize);
        });
    }
    
    /*
     * Bind contrast button
     */
    that.bindContrast = function(that) {
        var contrastState = 1; //1 for black text white background, 0 the opposite.
        Heartstring.select(that.config.selectors.controllerContrast).bind("click", function(evt) {
            if (contrastState === 0) {
                Heartstring.select(that.config.selectors.body).css('background-color', "#fff");
                Heartstring.select(that.config.selectors.body).css('color', "#000");
            } else {
                Heartstring.select(that.config.selectors.body).css('background-color', "#000");
                Heartstring.select(that.config.selectors.body).css('color', "#fff");
            }
            contrastState = Math.abs(contrastState - 1);
        });
    }
    
    //toggle state
    that.bindToggler = function(that) {
        Heartstring.select(that.config.selectors.controllerToggler).bind("click", function (evt) {
            Heartstring.select(that.config.selectors.controller).toggle();
        });
    }
    
    return that;
}

/**
 * Content init
 */
Heartstring.Fontbar.init = function(container, config) {    
    // create this component
    var that = Heartstring.Fontbar(container, config);
    Heartstring.Fontbar.bind(that);
};

Heartstring.Fontbar.bind = function(that) {
    that.bindRow(that);
    that.bindSlider(that);
    that.bindContrast(that);
    that.bindFontSize(that);
    that.bindToggler(that);
}

//default settings for this component
Heartstring.Fontbar.defaults = {
    container: ".hs-fontbar",
    config: {
        selectors: {
            MIN_FONT_SIZE: 10,
            MAX_FONT_SIZE: 30,
            DEFAULT_FONT_SIZE: 13,
            content: '.hs-content',
            body: 'body',
            controllerFontBigger: ".hs-controller-font-bigger",
            controllerFontSmaller: ".hs-controller-font-smaller",
            controllerContrast: ".hs-controller-contrast",
            controllerSlider: ".hs-controller-slider",
            controllerToggler: ".hs-controller-toggler", //The button that opens and close the panel.
            controller: ".hs-controller" //controller toolbar
        }
    }
};
