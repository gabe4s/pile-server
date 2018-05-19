var fs = require("fs");
var formidable = require('formidable');

function readDirectoryToObject(directoryName) {
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
                            directory.files.push({file: itemName});
                        }
                        if(isDirectory(fullPathName)) {
                            directory.dirs.push({dir: itemName});
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

function getHtmlSource(pathToFile) {
    return fs.readFileSync(pathToFile, "utf8");
}

function readFileToJson(fileName) {
    return jsonObject = JSON.parse(fs.readFileSync(fileName, "utf8"));
}

function handleIncomingFile(req, directoryName) {
    return new Promise(function(resolve, reject)) {
        // Followed skeleton of https://www.w3schools.com/nodejs/nodejs_uploadfiles.asp
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            if (err) {
                reject(err);
            } else {
                var oldpath = files.filetoupload.path;
                var newpath = directoryName + '/' + files.filetoupload.name;
                fs.rename(oldpath, newpath, function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve("File uploaded to " + newpath);
                    }
                });
            }
        });
    }
}

module.exports = {
    handleIncomingFile: function(req, directoryName) {
        return handleIncomingFile(req, directoryName);
    },
    readDirectoryToObject: function(directoryName) {
        return readDirectoryToObject(directoryName);
    },
    getHtmlSource: function(pathToFile) {
        return getHtmlSource(pathToFile);
    },
    readFileToJson: function(fileName) {
        return readFileToJson(fileName);
    }
}
