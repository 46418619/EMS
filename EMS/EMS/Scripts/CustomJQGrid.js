(function ($) {

    $.fn.jqGrid = function (options) {
        var settings = $.extend({
            //These are the defaults.
            UserType: null,
            Search: null,
            UserName: null,
            GroupBy: null,
            GroupByCols: null,
            FilterByType: null,
            ExpandGroup: null,
            Pager: null,
            PageSize: 10,
            IGroupBy: null,
            IGroupByOrder: null,
            ISortBy: null,
            ISortByOrder: null,
            ColModel: null,
            ColNames: null,
            MultiSelect: false,
            URL: null,
            LoadComplete: null,
            GridComplete: null,
            OnSelectRow: null,
            JsonReader: null,
            OnCellSelect: null,
            OnSelectAll: null,
            UserPrefix: null,
        }, options);
        return this.each(function () {
            var customSettings = ["UserType", "Search", "UserName", "GroupBy", "GroupByCols", "FilterByType", "ExpandGroup", "Pager", "PageSize", "IGroupBy", "IGroupByOrder", "ISortBy", "ISortByOrder", "ColNames", "ColModel", "MultiSelect", "URL", "LoadComplete", "GridComplete", "OnSelectRow", "JsonReader", "OnCellSelect", "OnSelectAll"];
            var obj = $(this);

            var customSettingsObj = {};

            checkDataAttributes(obj);
            Initialize(-1, -1, customSettingsObj.ISortBy, customSettingsObj.ISortByOrder, customSettingsObj.PageSize);
            if (customSettingsObj.Search != undefined) {
                var searchButton = customSettingsObj.Search.closest('div').find('span')
                searchButton.click(function (e) {
                    e.preventDefault();
                    ReloadJQGrid();
                });
                customSettingsObj.Search.keypress(function (event) {
                    var keycode = (event.keyCode ? event.keyCode : event.which);
                    if (keycode == '13') {
                        event.preventDefault();
                        ReloadJQGrid();
                        return false;
                    }
                });
            }
            if (customSettingsObj.GroupBy != undefined) {
                customSettingsObj.GroupBy.change(function () {
                    groupByChange();
                });
            }
            if (customSettingsObj.UserPrefix != undefined) {

            }
            if (customSettingsObj.FilterByType != undefined) {
                customSettingsObj.FilterByType.on('pf-selecting', function (e, val) {
                    ReloadJQGrid();
                })
                //customSettingsObj.FilterByType.find('li a').click(function () {
                //    customSettingsObj.FilterByType.parent('div').find('button').attr('data-val', $(this).attr('data-val')).html("<span>" + $(this).html() + '</span><b class="caret"></b>');
                //    ReloadJQGrid();
                //});
            }
            if (customSettingsObj.ExpandGroup != undefined) {
                customSettingsObj.ExpandGroup.click(function (e) {
                    e.preventDefault();
                    $(this).attr('disabled', 'disabled')
                    var expandAll = false;
                    if ($(this).find("i").hasClass('fa-angle-double-down')) {
                        expandAll = false;
                        $(this).find("i").switchClass("fa-angle-double-down", "fa-angle-double-up", 1000, "easeInOutQuad");
                    } else {
                        expandAll = true;
                        $(this).find("i").switchClass("fa-angle-double-up", "fa-angle-double-down", 1000, "easeInOutQuad");
                    }
                    var $grid = obj;
                    var idPrefix = $grid[0].id + "ghead_0_",
                        trspans;
                    if ($grid[0].p.grouping) {
                        for (var index = 0; index < obj.find(">tbody>tr.jqgroup").length; index++) {
                            if (expandAll) {
                                trspans = $("#" + idPrefix + index + " span.tree-wrap-" + $grid[0].p.direction + "." + $grid[0].p.groupingView.plusicon);
                            } else {
                                trspans = $("#" + idPrefix + index + " span.tree-wrap-" + $grid[0].p.direction + "." + $grid[0].p.groupingView.minusicon);
                            }
                            if (trspans.length > 0) {
                                $grid.jqGrid('groupingToggle', idPrefix + index);
                            }
                        }
                    }
                    $(this).removeAttr('disabled')
                });
            }

            function Initialize(gB, gBO, oB, oBO, pS) {
                gB = gB == '-1' ? 'None' : gB;
                CreateGrid(gB, gBO, oB, oBO, pS);
                if (customSettingsObj.GroupBy != undefined) {
                    customSettingsObj.GroupBy.val(gB);
                    SetGroupBy(gB, gBO);
                }
            }

            function CreateGrid(GroupBy, GroupByOrder, SortBy, SortByOrder, PageSize, UserPrefix) {
                obj.jqGrid({
                    url: customSettingsObj.URL,
                    datatype: "local",
                    mtype: 'POST',
                    shrinkToFit: true,
                    autowidth: true,
                    multiselect: customSettingsObj.MultiSelect,
                    gridView: false,
                    multiselectWidth: 40,
                    serializeGridData: function (postData) {
                        postData.userType = customSettingsObj.UserType ? customSettingsObj.UserType : "";
                        postData.userName = customSettingsObj.UserName ? customSettingsObj.UserName : "";
                        if (customSettingsObj.UserPrefix != undefined) {
                            postData.userPrefix = $.trim($("[id$=userPrefix]").val())
                        }
                        postData.searchString = (customSettingsObj.Search.val()) ? customSettingsObj.Search.val().trim() : "";
                        if (customSettingsObj.FilterByType != undefined) {
                            //commenting  the code below as it is for bootstrap 3.0 or above dropdown list
                            postData.filterType = (customSettingsObj.FilterByType.val()) ? customSettingsObj.FilterByType.val() : "";

                            //this code is for customized dropdown
                            //var filter = customSettingsObj.FilterByType.parent('div').find('button').attr('data-val');
                            //postData.filterType = filter != undefined ? filter : "0";
                        }
                        return JSON.stringify(postData);
                    },
                    rowNum: 10000,
                    onPaging: function () {
                        obj.closest('.ui-jqgrid-bdiv').scrollTop(0);
                    },
                    jsonReader: {
                        root: function (json) {
                            if (json.d == "")
                                return "";
                            else {
                                var jsonRowData = JSON.parse(json.d).rows;;
                                if (customSettingsObj.JsonReader) {
                                    customSettingsObj.JsonReader.call(this, jsonRowData);
                                }
                                return jsonRowData;
                            }
                        },
                        page: function (json) {
                            return json.d == "" ? "1" : JSON.parse(json.d).page;
                        },
                        total: function (json) {
                            return json.d == "" ? "0" : JSON.parse(json.d).total;
                        },
                        records: function (json) {
                            return json.d == "" ? "25" : JSON.parse(json.d).records;
                        }
                    },
                    ajaxGridOptions: {
                        contentType: "application/json; charset=utf-8"
                    },
                    colNames: customSettingsObj.ColNames,
                    colModel: customSettingsObj.ColModel,
                    loadComplete:
                        function () {
                            if (customSettingsObj.LoadComplete) {
                                customSettingsObj.LoadComplete.call();
                            }

                            $('tbody :checkbox.cbox').change(function () {
                                if ($('thead :checkbox.cbox') != null) {
                                    if ($('tbody :checkbox.cbox').length == ($('tbody :checkbox.cbox:checked').length + $('tbody :checkbox.cbox:disabled').length)) {
                                        $('thead :checkbox.cbox').prop('checked', true);
                                    }
                                    else {
                                        $('thead :checkbox.cbox').prop('checked', false);
                                    }
                                }
                            });
                        },
                    onSelectRow: function (rowid, status) {
                        if (customSettingsObj.OnSelectRow) {
                            customSettingsObj.OnSelectRow.call(this, rowid, status);
                        }
                    },
                    onCellSelect: function (row, col, content, event) {
                        var cm = jQuery(obj).jqGrid("getGridParam", "colModel");
                        if (customSettingsObj.OnCellSelect) {
                            customSettingsObj.OnCellSelect.call(this, row, cm, col, event);
                        }
                    },
                    onSelectAll: function (aRowids, status) {
                        //if (customSettingsObj.OnSelectAll != null)
                        //    customSettingsObj.OnSelectAll.call(this, aRowids, status);
                    },
                    gridComplete: function () {
                        if (customSettingsObj.ExpandGroup != undefined) {
                            customSettingsObj.ExpandGroup.find("i").switchClass("fa-angle-double-up", "fa-angle-double-down", 1000, "easeInOutQuad");
                        }

                        if (obj.getGridParam('records') == 0) // are there any records?
                            DisplayEmptyText(true);
                        else
                            DisplayEmptyText(false);
                        resizeGrid();
                        if (customSettingsObj.GridComplete) {
                            customSettingsObj.GridComplete.call();
                        }
                    },
                    rowNum: PageSize,
                    rowList: [10, 25, 50, 100],
                    height: '400',
                    pager: customSettingsObj.Pager,
                    sortname: SortBy,
                    sortorder: SortByOrder,
                    viewrecords: true,
                    grouping: true,
                    emptyDataText: '<span class="notiEmptyText" style="font-size:14px"><center>No records to view !</center></span>'
                });
            }

            GetGrid();

            function groupByChange() {
                SetGroupBy(customSettingsObj.GroupBy.val());
            }

            function SetGroupBy(groupByField, groupByFieldOrder) {
                if (groupByField == "")
                    return;
                if (groupByField == 'None') {
                    obj.jqGrid('groupingRemove', true);
                    customSettingsObj.ExpandGroup.hide();
                    jQuery(obj).jqGrid('showCol', customSettingsObj.GroupByCols);
                } else {
                    jQuery(obj).jqGrid('showCol', [groupByField]);
                    obj.jqGrid('groupingGroupBy', groupByField, {
                        groupColumnShow: [false],
                        groupText: ['<b>{0} ({1})</b>'],
                        groupCollapse: false,
                        groupOrder: groupByFieldOrder = undefined ? ['asc'] : [groupByFieldOrder],
                        groupDataSorted: true
                    });
                    customSettingsObj.ExpandGroup.show();
                }
                $(window).resize();
            }

            function ReloadJQGrid() {
                if (customSettingsObj.ExpandGroup != undefined) {
                    customSettingsObj.ExpandGroup.find("i").switchClass("fa-angle-double-up", "fa-angle-double-down", 1000, "easeInOutQuad");
                }
                obj.trigger("reloadGrid", [{ page: 1 }]);
            }

            function GetGrid() {
                obj.jqGrid('setGridParam', { datatype: 'json' }).trigger("reloadGrid", [{ page: 1 }]);
                $(".ui-jqgrid-titlebar").hide();
            }

            $(window).resize(function () {
                resizeGrid();
            })

            obj.resize(function () {
                resizeGrid();
            })

            function resizeGrid() {
                var $grid = obj,
                    newWidth = $grid.closest(".ui-jqgrid").parent().width();
                $grid.jqGrid("setGridWidth", newWidth, true);
                customSettingsObj.Pager.width(customSettingsObj.Pager.width() - 2);
            }

            function DisplayEmptyText(display) {
                var grid = obj;
                var emptyText = grid.getGridParam('emptyDataText'); // get the empty text
                var container = grid.parents('.ui-jqgrid-view'); // find the grid's container
                if (display) {
                    $('.notiEmptyText').remove();
                    container.find('.ui-jqgrid-bdiv').before('' + emptyText + ''); // insert the empty data text
                }
                else {
                    $('.notiEmptyText').remove();
                }
            }
            /**
         * checks which data attributes are defined
         * @param obj
         */
            function checkDataAttributes(obj) {
                $.each(customSettings, function (index, attribute) {
                    if (obj.data(attribute) != undefined) {
                        customSettingsObj[attribute] = obj.data(attribute);
                    } else {
                        customSettingsObj[attribute] = $(settings).attr(attribute);
                    }
                });
            }

        });
    };
}(jQuery));