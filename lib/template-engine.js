var handlebars = require("handlebars");
var fileUtils = require("./file-utils.js");

var TEMPLATE_FILE_PATH = "./public/html/template.html";

var TEMPLATE_CONTENTS = fileUtils.getHtmlSource(TEMPLATE_FILE_PATH);

function getRenderedTemplate(directory) {
    var handlebarsTemplate = handlebars.compile(TEMPLATE_CONTENTS);
    return handlebarsTemplate(directory);
}

module.exports = {
    getRenderedTemplate: function(directory) {
        return getRenderedTemplate(directory);
    }
}