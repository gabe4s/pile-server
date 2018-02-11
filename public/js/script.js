function openFolder(folderName) {
    var pathName = window.location.pathname;
    var folderUrl = "";

    folderUrl += pathName;
    if(pathName[pathName.length-1] != "/") {
        folderUrl += "/";
    }
    folderUrl += folderName;
    
    window.location.href = folderUrl;
}

