function getFullItemPath(item) {
    var pathName = window.location.pathname;
    var fullItemPath = "";

    fullItemPath += pathName;
    if(pathName[pathName.length-1] != "/") {
        fullItemPath += "/";
    }
    fullItemPath += item;

    return fullItemPath;
}

function openFolder(folderName) {
    window.location.href = getFullItemPath(folderName);
}

function getAllCheckedItemsWithFullPath() {
    var directory = {};
    directory.files = [];
    directory.dirs = [];
    
    var dirCheckboxes = document.querySelectorAll(".dirCheckbox");
    dirCheckboxes.forEach(
        function(dirCheckbox) {
            if(dirCheckbox.checked) {
                directory.dirs.push(getFullItemPath(dirCheckbox.value));
            }
        }
    );

    var fileCheckboxes = document.querySelectorAll(".fileCheckbox");
    fileCheckboxes.forEach(
        function(fileCheckbox) {
            if(fileCheckbox.checked) {
                directory.files.push(getFullItemPath(fileCheckbox.value));
            }
        }
    );

    return directory;
}