var fs = require("fs");

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

module.exports = {
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