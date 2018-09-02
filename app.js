var express = require("express");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var path = require("path");

var fileUtils = require("./lib/file-utils.js");

var PORT = 8080;

var CONFIG = fileUtils.readFileToJson("config.json");

var BASE_DIR = CONFIG.fileSystemDirectory;
var SERVER_NAME = CONFIG.serverName || "R-Pi File Server";

var app = express();

app.engine(".html", expressHandlebars({extname: ".html"}));
app.set("view engine", ".html");
app.set("views", path.join(__dirname, "/public/html/"));

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/*", function(req, res) {
    res.setHeader("Cache-Control", "no-cache, no-store");
    var directoryName = BASE_DIR + req.url;
    fileUtils.readDirectoryToObject(directoryName).then(
        function(directory) {
            directory.serverName = SERVER_NAME;
            directory.url = req.url;
            res.render("template", directory);
        },
        function(err) {
            console.log("ERROR: " + err);
            res.status(404);
            res.send("Could not find any items in directory: " + directoryName);
        }
    )
});

app.post("/*", function(req, res) {
    var type = req.body.uploadType;
    
    if(type == "folder") {
        var fullFolderPath = path.join(BASE_DIR, req.body.folderPath);
        fileUtils.createFolder(fullFolderPath);
        res.sendStatus(200);
    } else if(type == "move") {
        var checkedItemsList = req.body.checkedItems;
        var checkedItemsPath = req.body.checkedItemsPath;
        var newLocation = req.body.newLocation;
        
        fileUtils.moveItems(BASE_DIR, checkedItemsPath, checkedItemsList, newLocation).then(
            function() {
                res.sendStatus(200);
            },
            function(err) {
                console.log("Error moving items: " + err);
                res.sendStatus(400);
            }
        )
    } else {
        var directoryName = BASE_DIR + req.url;
        fileUtils.handleIncomingFile(req, directoryName).then(
            function() {
                res.redirect("back");
            }
        )
    }


});

app.delete("/delete", function(req, res) {
    var checkedItemsList = req.body.checkedItems;
    var checkedItemsPath = req.body.checkedItemsPath;

    var fullPath = path.join(BASE_DIR, checkedItemsPath);

    fileUtils.deleteCheckedItems(fullPath, checkedItemsList).then(
        function() {
            res.sendStatus(200);
        },
        function(err) {
            console.log("Error deleting items: " + err);
            res.sendStatus(400);
        }
    )
    
});

console.log("Server listening on port " + PORT);
app.listen(PORT);