var count = 0;

$(document).ready(function () {
    var enquiry = $.connection.enquiryHub;
    enquiry.client.updateEnquiry = function (Id, Name, EntryTime) {
        if ($('#EnquiryPage').val() == 1) {
            $('#tblPendingEnquiry tbody tr:last').after('<tr><td style="width:30px;" data-id=' + Id + '>' + (parseInt($('#tblPendingEnquiry tbody tr:last td:first').html()) + 1) + '</td><td style="width:150px;text-align:left;">' + Name + '</td><td style="width:80px;">' + ((new Date()).toTimeString()).slice(0, 5) + '</td><td style="width:120px;"><span style="color:#F16D28"><b><i class="fa fa-clock-o"></i> &nbsp;Pending</b></span></td><td><a class="btn btnPending" style="background-color:green !important;line-height: 7px;border-radius: 3px;background: #13a6dd;color: white !important;"><b><i class="fa fa-check"></i> Resolve</b></a></td></tr>')
            message.ShowInfoNotification("New Alert", Name + " is added as a new pending enquiry.")
            changeTitleCount();
            resolveEnquiry();
        }
    };
    enquiry.client.updateResolvePanel = function (Id, Name, EntryTime) {
        if ($('#EnquiryPage').val() == 1) {
            $('#tblResolvedEnquiry tbody tr:first').before('<tr><td style="width:30px;" data-id=' + Id + '>1</td><td style="width:150px;text-align:left;">' + Name + '</td><td style="width:120px;">' + ((new Date()).toTimeString()).slice(0, 5) + '</td><td><span style="color:green"><b><i class="fa fa-check"></i> &nbsp;Resolved</b></span></td></tr>')
            message.ShowInfoNotification("New Alert", "Enquiry for student <b>" + Name + "</b> is resolved.")
            changeTitleCount();
            $('#tblResolvedEnquiry tbody tr').find('td:first').each(function (i, v) {
                $(v).text(i + 1);
            });
        }
    };
    $(window).focus(function () {
        document.title = "Enquiry Dashboard"
    });
    $.connection.hub.start().done(function () {
        $('#btnSubmit').click(function () {
            if (!$('#frmEnquiry').valid() || $('#ddlStream option:selected').val() == "" || $('#ddlClass option:selected').val() == "")
                return
            var ob = new Object();
            ob.FirstName = $('#txtFirstName').val();
            ob.LastName = $('#txtLastName').val();
            ob.DOB = $('#txtDOB').val();
            ob.Mobile = $('#txtMobile').val();
            ob.Class = $('#ddlClass option:selected').val();
            ob.Address = ""; //$('#txtAddress').val();
            ob.Course = $('#ddlStream option:selected').val() == "";
            ob.Email = $('#txtEmail').val();
            $.ajax({
                type: "POST",
                url: "/Enquiry/Create",
                data: JSON.stringify(ob),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                beforeSend: function () {
                    ShowSpinner();
                },
                success: function (response) {
                    if (response.Result == "success") {
                        enquiry.server.updateEnquiryPanel(response.Id, response.Name, new Date());
                        message.ShowSuccessNotification("Success", "Enquiry resolved successfully.")
                        console.log(response.Message);
                    }
                    else
                        message.ShowErrorNotification("Error", "Error Occured.Please contact Administrator.")
                },
                error: function () {
                    message.ShowErrorNotification("Error", "Error Occured.Please contact Administrator.")
                },
                complete: function () {
                    HideSpinner();
                }
            });
        });
    });
    function resolveEnquiry() {
        $('.btnPending').unbind().bind().on('click', function () {
            $('#myModal').modal('show');
            $('#myModal .modal-title').html('<b>Enter details to resolve enquiry</b>');
            $('#myModal .modal-body').html('<div class="form-group">' +
                '<label for="comment">Comment:</label>' +
                '<textarea class="form-control" rows="5" id="comment"></textarea>' +
                '</div>' +
                '<button type="button" class="btn btn-success" data-id="' + $('td:first', $(this).closest('tr')).data('id') + '" id="btnResolve">Success</button>');

            $('#btnResolve').click(function () {
                var ob = new Object();
                ob.id = parseInt($(this).data('id'));
                ob.comment = $('#comment').val();
                $.ajax({
                    type: "POST",
                    url: "/Enquiry/ResolveEnquiry",
                    data: JSON.stringify(ob),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    beforeSend: function () {
                        ShowSpinner();
                    },
                    success: function (response) {
                        if (response.Result == "success") {
                            $('#myModal').modal('hide');
                            enquiry.server.updateResolveEnquiryPanel(response.Id, response.Name, new Date());
                            console.log(response.Message);
                        }
                        else
                            message.ShowErrorNotification("Error", "Error Occured in Resolving Enquiry.Please contact Administrator.")
                    },
                    error: function () {
                        message.ShowErrorNotification("Error", "Error Occured in Resolving Enquiry.Please contact Administrator.")
                    },
                    complete: function () {
                        HideSpinner();
                    }
                });
            });
        })
    }
    resolveEnquiry();
});

function changeTitleCount() {
    count++;
    var newTitle = '(' + count + ') ' + "Enquiry Dashboard";
    document.title = newTitle;
}