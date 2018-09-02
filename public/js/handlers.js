$(document).ready(function() {
    $("input:checkbox").prop("checked", false);

    $("#fileUploadInput").change(function() {
        $("#fileUploadForm").submit();
    });
});

$(document).on("click", "input:checkbox", function() {
    if($("input:checkbox:checked").length > 0) {
        $(addBtn).hide();
        $(changeBtn).show();
    } else {
        $(addBtn).show();
        $(changeBtn).hide(); 
    }
});

$(document).on("mouseup", function (event){
    var container = $(".dropdown");
    if (!container.is(event.target) && container.has(event.target).length === 0 && !event.target.classList.contains("actionBtn")) {
        container.hide();
    }
}); 

$(document).on("click", "#addBtn", function() {
    if($("#addDropdown").is(":hidden")) {
        $("#addDropdown").show();
    } else {
        $("#addDropdown").hide();
    }
});
$(document).on("click", "#changeBtn", function() {
    if($("#changeDropdown").is(":hidden")) {
        $("#changeDropdown").show();
    } else {
        $("#changeDropdown").hide();
    }
});

$(document).on("click", "#uploadBtn", function() {
    $("#addDropdown").hide();
    $("#fileUploadInput").trigger("click");
});
$(document).on("click", "#newFolderBtn", function() {
    $("#addDropdown").hide();
    $("#newFolderPopup").show();
    $("#newFolderInput").focus();
});
$(document).on("click", "#pasteBtn", function() {
    $("#addDropdown").hide();
    pasteItems();
});
$(document).on("click", "#cutBtn", function() {
    $("#changeDropdown").hide();
    storeCheckedItems();
});
$(document).on("click", "#deleteBtn", function() {
    deleteCheckedItems();
});
$(document).on("click", "#newFolderAdd", function() {
    var newFolderName = $("#newFolderInput").val();
    if(newFolderName.length > 0) {
        addFolder(newFolderName);
        $("#newFolderPopup").hide();
        $("#newFolderInput").val("");
    } else {
        $("#newFolderInput").addClass("error");
    }
});

$(document).on("click", "#newFolderCancel", function() {
    $("#newFolderPopup").hide();
    $("#newFolderInput").val("");
});
$(document).on("keypress", "#newFolderInput", function(event) {
    if(event.which == 13) {
        $("#newFolderAdd").click();
    }
});
$(document).on("input", "#newFolderInput", function() {
    $("#newFolderInput").removeClass("error");
});