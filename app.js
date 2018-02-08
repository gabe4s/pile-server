var express = require("express");
var expressHandlebars = require("express-handlebars");
var bodyParser = require('body-parser');
var path = require("path");

var fileUtils = require("./lib/file-utils.js");

var PORT = 8080;

var BASE_DIR = "file_directory";

var app = express();

app.engine(".html", expressHandlebars({extname: ".html"}));
app.set("view engine", ".html");
app.set('views', path.join(__dirname, "/public/html/"));

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/*', function(req, res) {
    var directoryName = BASE_DIR + req.url;
    fileUtils.readDirectoryToObject(directoryName).then(
        function(directory) {
            res.render("template", directory);
        }
    ).catch(
        function(err) {
            console.log("ERROR: " + err);
            res.status(404);
            res.send("Could not find any items in directory: " + directoryName);
        }
    )
});

console.log("Server listening on port " + PORT);
app.listen(PORT);