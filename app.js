var express = require("express");
var bodyParser = require('body-parser');
var path = require("path");
var fs = require("fs");

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
    readDirectory(directoryName).then(
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

function readDirectory(directoryName) {
    return new Promise(
        function(resolve, reject) {
            fs.readdir(directoryName, function(err, items) {
                if(!err && items) {
                    var directory = {};
                    directory.files = [];
                    directory.dirs = [];
        
                    items.forEach(function(itemName) {
                        var fullPathName = getFullPath(directoryName, itemName);
                        if(isFile(fullPathName)) {
                            directory.files.push(fullPathName);
                        }
                        if(isDirectory(fullPathName)) {
                            directory.dirs.push(fullPathName);
                        }
                    });

                    resolve(directory);
                } else if (err) {
                    reject(err);
                } else {
                    reject("Could not get files in path: " + directoryName);
                }
            });
        }
    );
}

function getFullPath(directoryName, itemName) {
    var fullPath = directoryName;
    if(directoryName[directoryName.length-1] != "/") {
        fullPath += "/";
    }
    fullPath += itemName;
    return fullPath;
}

function isFile(itemName) {
    var isFile = false;

    if(fs.lstatSync(itemName).isFile()) {
        isFile = true;
    }

    return isFile;
}

function isDirectory(itemName) {
    var isDirectory = false;

    if(fs.lstatSync(itemName).isDirectory()) {
        isDirectory = true;
    }

    return isDirectory;
}

console.log("Server listening on port " + PORT);
app.listen(PORT);