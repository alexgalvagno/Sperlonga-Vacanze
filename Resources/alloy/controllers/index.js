function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createTabGroup({
        id: "index"
    });
    $.__views.__alloyId4 = Alloy.createController("sperlonga", {
        id: "__alloyId4"
    });
    $.__views.sperlongaTab = Ti.UI.createTab({
        window: $.__views.__alloyId4.getViewEx({
            recurse: true
        }),
        id: "sperlongaTab",
        title: "SPERLONGA"
    });
    $.__views.index.addTab($.__views.sperlongaTab);
    $.__views.__alloyId5 = Alloy.createController("attivita", {
        id: "__alloyId5"
    });
    $.__views.attivitaTab = Ti.UI.createTab({
        window: $.__views.__alloyId5.getViewEx({
            recurse: true
        }),
        id: "attivitaTab",
        title: "ATTIVITÀ"
    });
    $.__views.index.addTab($.__views.attivitaTab);
    $.__views.__alloyId6 = Alloy.createController("eventi", {
        id: "__alloyId6"
    });
    $.__views.eventiTab = Ti.UI.createTab({
        window: $.__views.__alloyId6.getViewEx({
            recurse: true
        }),
        id: "eventiTab",
        title: "EVENTI"
    });
    $.__views.index.addTab($.__views.eventiTab);
    $.__views.__alloyId8 = Alloy.createController("mappa", {
        id: "__alloyId8"
    });
    $.__views.__alloyId7 = Ti.UI.createTab({
        window: $.__views.__alloyId8.getViewEx({
            recurse: true
        }),
        title: "MAPPA",
        id: "__alloyId7"
    });
    $.__views.index.addTab($.__views.__alloyId7);
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.tabGroup = $.index;
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;