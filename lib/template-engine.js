var handlebars = require("handlebars");
var fileUtils = require("./file-utils.js");

var TEMPLATE_FILE_PATH = "./public/html/template.html";

var TEMPLATE_CONTENTS = fileUtils.getHtmlSource(TEMPLATE_FILE_PATH);

console.log(TEMPLATE_CONTENTS);
