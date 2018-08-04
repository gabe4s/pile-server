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

$(document).on("mouseup", function (e){
    var container = $(".dropdown");
    if (!container.is(e.target) && container.has(e.target).length === 0){
        container.hide();
    }
}); 

$(document).on("click", "#addBtn", function() {
    $("#addDropdown").show();
});
$(document).on("click", "#changeBtn", function() {
    $("#changeDropdown").show();
});

$(document).on("click", "#uploadBtn", function() {
    $("#addDropdown").hide();
    $("#fileUploadInput").trigger("click");
});
$(document).on("click", "#newFolderBtn", function() {
    $("#addDropdown").hide();
    $("#newFolderPopup").show();
});
$(document).on("click", "#deleteBtn", function() {
    deleteCheckedItems();
});
$(document).on("click", "#newFolderAdd", function() {
    addFolder($("#newFolderInput").val());
    $("#newFolderPopup").hide();
    $("#newFolderInput").val("");

});
$(document).on("click", "#newFolderCancel", function() {
    $("#newFolderPopup").hide();
    $("#newFolderInput").val("");
});