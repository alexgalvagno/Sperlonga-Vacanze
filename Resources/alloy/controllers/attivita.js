function Controller() {
    function openAttivita(e) {
        var tabViewAttivita = Alloy.createController("elencoAttivita", {
            id: e.row.id,
            title: e.row.title
        });
        Alloy.Globals.tabGroup.activeTab.open(tabViewAttivita.getView());
    }
    function refreshCategorie() {
        cat.loadElenco({
            success: function(data) {
                var rows = [];
                _.each(data, function(item) {
                    rows.push(Alloy.createController("row", {
                        id: item.id,
                        title: item.title,
                        rate: item.rate
                    }).getView());
                });
                $.table.setData(rows);
                $.activityIndicator.hide();
                $.attivita.remove($.activityIndicator);
            }
        }, CAT_URL, 0);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.attivita = Ti.UI.createWindow({
        top: "0dp",
        left: "0dp",
        backgroundImage: "images/background.jpg",
        layout: "vertical",
        zIndex: 0,
        orientationModes: [ Ti.UI.PORTRAIT ],
        id: "attivita",
        title: "ATTIVITA'"
    });
    $.__views.attivita && $.addTopLevelView($.__views.attivita);
    $.__views.__alloyId0 = Ti.UI.createImageView({
        image: "/images/loghi.png",
        id: "__alloyId0"
    });
    $.__views.attivita.add($.__views.__alloyId0);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        id: "activityIndicator",
        message: "Loading ..."
    });
    $.__views.attivita.add($.__views.activityIndicator);
    $.__views.table = Ti.UI.createTableView({
        id: "table"
    });
    $.__views.attivita.add($.__views.table);
    openAttivita ? $.__views.table.addEventListener("click", openAttivita) : __defers["$.__views.table!click!openAttivita"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var CAT_URL = "http://www.sperlongavacanze.it/app/getCategorie.php";
    var cat = require("getElenco");
    $.activityIndicator.show();
    refreshCategorie();
    __defers["$.__views.table!click!openAttivita"] && $.__views.table.addEventListener("click", openAttivita);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;