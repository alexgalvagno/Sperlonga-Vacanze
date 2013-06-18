function Controller() {
    function openPage(e) {
        var tabViewPage = Alloy.createController("page", {
            id: e.row.id,
            title: e.row.title,
            type: "attivita"
        });
        Alloy.Globals.tabGroup.activeTab.open(tabViewPage.getView());
    }
    function refreshAttivita() {
        attivita.loadElenco({
            success: function(data) {
                var rows = [];
                _.each(data, function(item) {
                    rows.push(Alloy.createController("row", {
                        id: item.id,
                        title: item.title,
                        rate: item.rate,
                        plus: item.plus
                    }).getView());
                });
                $.table.setData(rows);
                $.activityIndicator.hide();
                $.elencoAttivita.remove($.activityIndicator);
            }
        }, ATTIVITA_URL, args.id);
    }
    function closePage() {
        $.elencoAttivita.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.elencoAttivita = Ti.UI.createWindow({
        top: "0dp",
        left: "0dp",
        backgroundImage: "images/background.jpg",
        layout: "vertical",
        zIndex: 0,
        orientationModes: [ Ti.UI.PORTRAIT ],
        id: "elencoAttivita"
    });
    $.__views.elencoAttivita && $.addTopLevelView($.__views.elencoAttivita);
    $.__views.__alloyId1 = Ti.UI.createImageView({
        image: "/images/loghi.png",
        id: "__alloyId1"
    });
    $.__views.elencoAttivita.add($.__views.__alloyId1);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        id: "activityIndicator",
        message: "Loading ..."
    });
    $.__views.elencoAttivita.add($.__views.activityIndicator);
    $.__views.table = Ti.UI.createTableView({
        id: "table"
    });
    $.__views.elencoAttivita.add($.__views.table);
    openPage ? $.__views.table.addEventListener("click", openPage) : __defers["$.__views.table!click!openPage"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var isAndroid = "android" === Ti.Platform.osname ? true : false;
    var ATTIVITA_URL = "http://www.sperlongavacanze.it/app/getAttivita.php";
    var attivita = require("getElenco");
    isAndroid ? $.title.text = args.title : $.elencoAttivita.title = args.title;
    $.activityIndicator.show();
    refreshAttivita();
    __defers["$.__views.header!click!closePage"] && $.__views.header.addEventListener("click", closePage);
    __defers["$.__views.table!click!openPage"] && $.__views.table.addEventListener("click", openPage);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;