// replaceAll function
var replaceAll = function (searchFor, replacedWith, searchIn) {
    return searchIn.replace(new RegExp(searchFor, 'g'), replacedWith);
};

// simple stripe jquery obj function
var stripeHtmlTags = function (input) {
    return input.html(input.text());
};

//mark
var markText = function (that, input) {
    var wrapper = $("<div></div>");
    var marked = $("<mark></mark>");
    marked.attr("class", "markable");
    marked.text(input);
    wrapper.append(marked);
    that.html(replaceAll(input, wrapper.html(), stripeHtmlTags(that).text()));
};

//Grab selected text
var getSelectedText = function () {
    if(window.getSelection){
        return window.getSelection().toString();
    }
    else if(document.getSelection){
        return document.getSelection();
    }
    else if(document.selection){
        return document.selection.createRange().text;
    }
}
