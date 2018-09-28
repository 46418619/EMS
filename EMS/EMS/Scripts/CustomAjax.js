
PFNAjax = function (url, dataLoad, callBack) {
    $.support.cors = true;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: url,
        data: dataLoad,
        success: function (msg) {
            return callBack(msg.d);
        },
        error: function (msg) {
            return callBack("err: no data");
        }
    });
};