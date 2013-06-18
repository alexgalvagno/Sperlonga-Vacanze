function Controller() {
    function openEvento(e) {
        if (0 != e.row.id) {
            var tabViewPage = Alloy.createController("page", {
                id: e.row.id,
                title: e.row.title
            });
            Alloy.Globals.tabGroup.activeTab.open(tabViewPage.getView());
        }
    }
    function refreshEventi() {
        ev.loadElenco({
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
                $.eventi.remove($.activityIndicator);
            }
        }, EV_URL, 0);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.eventi = Ti.UI.createWindow({
        top: "0dp",
        left: "0dp",
        backgroundImage: "images/background.jpg",
        layout: "vertical",
        zIndex: 0,
        orientationModes: [ Ti.UI.PORTRAIT ],
        id: "eventi",
        title: "EVENTI'"
    });
    $.__views.eventi && $.addTopLevelView($.__views.eventi);
    $.__views.__alloyId2 = Ti.UI.createImageView({
        image: "/images/loghi.png",
        id: "__alloyId2"
    });
    $.__views.eventi.add($.__views.__alloyId2);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        id: "activityIndicator",
        message: "Loading ..."
    });
    $.__views.eventi.add($.__views.activityIndicator);
    $.__views.table = Ti.UI.createTableView({
        id: "table"
    });
    $.__views.eventi.add($.__views.table);
    openEvento ? $.__views.table.addEventListener("click", openEvento) : __defers["$.__views.table!click!openEvento"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var EV_URL = "http://www.sperlongavacanze.it/app/getEventi.php";
    var ev = require("getElenco");
    $.activityIndicator.show();
    refreshEventi();
    __defers["$.__views.table!click!openEvento"] && $.__views.table.addEventListener("click", openEvento);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;