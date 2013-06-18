function Controller() {
    function openPage(e) {
        var tabViewPage = Alloy.createController("page", {
            id: e.row.id,
            title: e.row.title,
            type: "punto"
        });
        Alloy.Globals.tabGroup.activeTab.open(tabViewPage.getView());
    }
    function refreshPunti() {
        punti.loadElenco({
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
                $.sperlonga.remove($.activityIndicator);
            }
        }, PUNTI_URL, 0);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.sperlonga = Ti.UI.createWindow({
        top: "0dp",
        left: "0dp",
        backgroundImage: "images/background.jpg",
        layout: "vertical",
        zIndex: 0,
        orientationModes: [ Ti.UI.PORTRAIT ],
        id: "sperlonga",
        title: "SPERLONGA"
    });
    $.__views.sperlonga && $.addTopLevelView($.__views.sperlonga);
    $.__views.__alloyId11 = Ti.UI.createImageView({
        image: "/images/loghi.png",
        id: "__alloyId11"
    });
    $.__views.sperlonga.add($.__views.__alloyId11);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        id: "activityIndicator",
        message: "Loading ..."
    });
    $.__views.sperlonga.add($.__views.activityIndicator);
    $.__views.table = Ti.UI.createTableView({
        id: "table"
    });
    $.__views.sperlonga.add($.__views.table);
    openPage ? $.__views.table.addEventListener("click", openPage) : __defers["$.__views.table!click!openPage"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var PUNTI_URL = "http://www.sperlongavacanze.it/app/getPunti.php";
    var punti = require("getElenco");
    $.activityIndicator.show();
    refreshPunti();
    __defers["$.__views.table!click!openPage"] && $.__views.table.addEventListener("click", openPage);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;