function getFullItemPath(item) {
    var pathName = window.location.pathname;
    var fullItemPath = "";

    fullItemPath += pathName;
    if(pathName[pathName.length-1] != "/") {
        fullItemPath += "/";
    }
    fullItemPath += item || "";

    return fullItemPath;
}

function openFolder(folderName) {
    window.location.href = getFullItemPath(folderName);
}

function getAllCheckedItemsAsDirectoryWithFullPath() {
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

function getAllCheckedItemsAndPath() {
    var itemsList = [];
    var itemsPath = getFullItemPath();

    $("input:checkbox:checked").each(
        function(index, checkbox) {
            itemsList.push(checkbox.value);
        }
    )

    var checkedItems = 
    {
        "checkedItems": itemsList,
        "checkedItemsPath": itemsPath
    }

    return checkedItems;
}

function deleteCheckedItems() {
    var checkedItemsData = getAllCheckedItemsAndPath();

    $.ajax({
        url: "/delete",
        method: "DELETE",
        data: checkedItemsData,
        success: function() {
            location.reload();
        }
    });
}

function addFolder(folderName) {
    var folderData = 
    {
        "uploadType": "folder",
        "folderPath": getFullItemPath(folderName)
    }
    $.ajax({
        url: "/",
        method: "POST",
        data: folderData,
        success: function() {
            location.reload();
        }
    });
}

function storeCheckedItems() {
    localStorage.setItem("storedItems", JSON.stringify(getAllCheckedItemsAndPath()));
}

function getStoredItems() {
    return JSON.parse(localStorage.getItem("storedItems"));
}

function pasteItems() {
    var pasteData = getStoredItems();
    pasteData.newLocation = getFullItemPath();
    pasteData.uploadType = "move";
    $.ajax({
        url: "/move",
        method: "POST",
        data: pasteData,
        success: function() {
            localStorage.removeItem("storedItems");
            location.reload();
        }
    });
}