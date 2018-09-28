/**
*@Author: Vipul Kumar   
**/

/*
*Global object to hold the functions fo Enquiry admission dashboard.
*/
var enquiry = {};

/*
*function to put pointer curse style on column
*/
enquiry.pointercursor = function (cellvalue, options, rowObject) {
    var new_formatted_cellvalue = '<span class="pointer">' + cellvalue + '</span>';
    return new_formatted_cellvalue;
}

/*
*funtion to fomrat status column
*/
enquiry.formatstatus = function (cellvalue, options, rowObject) {
    if (rowObject.StudentNumber != null && rowObject.StudentNumber != undefined && rowObject.StudentNumber.trim() != '' && rowObject.StudentNumber.trim() != "0") {
        return cellvalue + ' - ' + rowObject.StudentNumber.trim();
    }
    else
        return cellvalue;
}

/*
*Get Enquiry user leads
*/
enquiry.getLeadsGrid = function () {
    $('#leadsEnquiry').pfjqGrid({
        Search: $('#txtSearchLeads'),
        FilterByType: $('#ddlFilterByType'),
        UserName: pfuser,
        Pager: $('#pleadsEnquiry'),
        MultiSelect: false,
        ISortBy: 'LastStatusOn',
        ISortByOrder: 'desc',
        URL: '/Clients/Compassion/Admissions.aspx/Getleads',
        PageSize: 10,
        LoadComplete: function () {
            $("#leadsEnquiry").find('tbody > tr').click(function (e) {
                e.stopPropagation();
            })
        },
        GridComplete: enquiry.gridComplete,
        ColNames: ['#', '', 'Name', 'Mobile', 'Email', 'Status', 'ResolvedTime', 'Dated', 'Action'],
        ColModel: [
            {
                name: 'SN',
                index: 'SN',
                width: 20,
                sortable: false
            },
            {
                name: 'ID',
                index: 'ID',
                width: 20,
                sortable: false,
                hidden: true
            },
            {
                name: 'Name',
                index: 'Name',
                width: 120,
                sortable: true
            },
            {
                name: 'Mobile',
                index: 'Mobile',
                width: 120,
                sortable: true
            },
            {
                name: 'Email',
                index: 'Email',
                width: 120,
                sortable: true
            },
            {
                name: 'Status',
                index: 'Status',
                width: 120,
                align: "center",
                sortable: false,
                formatter: enquiry.formatstatus
            },
            {
                name: 'ResolveTime',
                index: 'ResolveTime',
                width: 70,
                align: "center",
                sortable: true,
            }, {
                name: 'Dated',
                index: 'Dated',
                width: 70,
                align: "center",
                sorttype: 'date',
                sortable: true,
            }, {
                name: 'ID',
                index: 'ID',
                sortable: false,
                align: 'center',
                width: 120,
                formatter: enquiry.pointercursor,
            }],
    });
}

/*
*GRID complete of GRID
*contains events for view button click,html content for arrow movement for GRID
*/
enquiry.gridComplete = function () {

}

/*
*Reload Enquiry leads GRID grid
*/
enquiry.ReloadJQGrid = function () {
    $('#leadsEnquiry').trigger("reloadGrid", [{ page: 1 }]);
}
