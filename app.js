var express = require("express");
var bodyParser = require('body-parser');
var path = require("path");

var fileUtils = require("./lib/file-utils.js");
var templateEngine = require("./lib/template-engine.js");

var PORT = 8080;

var BASE_DIR = "file_directory";

var app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/*', function(req, res) {
    var directoryName = BASE_DIR + req.url;
    fileUtils.readDirectory(directoryName).then(
        function(directory) {
            console.log(directory);
            res.status(200);
            res.send(directory);
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