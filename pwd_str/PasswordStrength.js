var PasswordStrength = PasswordStrength || {};
(function () {
    var PwdStr = {};
    //defaults
    PwdStr.defaults = {
	    "template_views": {
		    "strength": {
			    "weak": {
				    "title": "Weak",
				    "strength_class": "red"
			    },
			    "normal": {
				    "title": "Normal",
				    "strength_class": "yellow"
			    },
			    "good": {
				    "title": "Good",
				    "strength_class": "green"
			    }
		    } 
	    },
	    "template_holder": "#pwd_strength_template_holder",
	    "container": "#pwd_strength_container",
	    "pwd_input": "#pwd_strength_input"
    }
    /**
     * Check the strength of the input 
     * score: low 1, med 2, high 3
     */
    PwdStr.checkStrength = function(pwd) {
	    var len = pwd.length;
	    var score = 0;
	    // check length
	    if (len >= 10) {
		    score += 1;
		    console.log('>10');
	    } 
	    if (len >= 8) {
		    score += 2;
		    console.log('>8');
	    }
	
	    //check if there is any symbols (non-alphnumeric)
	    var regex = new RegExp('[^a-zA-Z]', 'g');
	    if (regex.test(pwd)) {
		    var numberOfNonAlpha = pwd.match(regex).length;
		    if (numberOfNonAlpha > 1) {
			    score += 1;
			    console.log('non alpha >1');
		    }
		    if (numberOfNonAlpha > 0) {
			    score += 1;
			    console.log('non alpha > 0 ');
		    }
	    }
	
	    //check score
	    if (score >= 4) {
		    return 'good';
	    } else if (score >= 3) {
		    return 'normal';
	    }
	    return 'weak';
    }

    /*
     * Initialize with config, and bind input
    */ 
    PwdStr.init = function (config) {
	    //TODO: merge config
	    config = config || PasswordStrength.defaults;
	    var template = $(config.template_holder).html();
	    $(config.pwd_input).bind('keyup', function(e) {
		    var result = PasswordStrength.checkStrength($(config.pwd_input).val());
		    var output = Mustache.render(template, config.template_views.strength[result]);
		    $(config.container).html(output);
		    console.log(output);
	    });
    }
    PasswordStrength = PwdStr;
}) (PasswordStrength)
