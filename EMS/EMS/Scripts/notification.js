var message = {}

message.ShowErrorNotification = function (title, message) {
    if (message == null)
        return
    $('body').prepend("<div class='alert alert-danger alert-dismissible'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>" + title + "!</strong> " + message + ".</div>")
}

message.ShowSuccessNotification = function (title, message) {
    if (message == null)
        return
    $('body').prepend("<div class='alert alert-success alert-dismissible'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>" + title + "!</strong> " + message + ".</div>")
}

message.ShowInfoNotification = function (title, message) {
    if (message == null)
        return
    $('body').prepend("<div class='alert alert-info alert-dismissible'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>" + title + "!</strong> " + message + ".</div>")
}
message.ShowInformationNotificationShowInfoNotification = function (title, message) {
    if (message == null)
        return
    $('body').prepend("<div class='alert alert-info alert-dismissible'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>" + title + "!</strong> " + message + ".</div>")
}


//DEFAULT OVERLAY SETTING
(function () {

    $.fn.StartOverlay = function (text) {
        $('.overlay').remove();
        $(this).append('<div class="overlay"><div class="loading"><div class="overlay-container"><i class="fa fa-spinner fa-pulse"></i><p>' + (text || "") + '</p>');
    };

}(jQuery));

function ShowSpinner() {
    $('body').StartOverlay("We are processing your request. Please note that this can take a couple of minutes. Please do not refresh your screen or click the back button.");
}

function HideSpinner() {
    $('.overlay').remove();
}