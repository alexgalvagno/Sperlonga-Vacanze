function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        height: "50dp",
        className: "itemRow",
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.__alloyId10 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId10"
    });
    $.__views.row.add($.__views.__alloyId10);
    $.__views.title = Ti.UI.createLabel({
        height: Titanium.UI.FILL,
        font: {
            fontSize: "14dp"
        },
        color: "#000000",
        left: "10dp",
        top: "0",
        touchEnabled: false,
        id: "title"
    });
    $.__views.__alloyId10.add($.__views.title);
    $.__views.rate = Ti.UI.createView({
        height: Titanium.UI.FILL,
        right: 0,
        layout: "horizontal",
        top: 15,
        id: "rate"
    });
    $.__views.__alloyId10.add($.__views.rate);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.row.id = args.id;
    "android" === Ti.Platform.osname && ($.row.title = args.title);
    $.title.text = args.title;
    0 != args.id && ($.row.hasChild = true);
    if (null != args.rate) {
        $.title.width = "65%";
        $.rate.width = "30%";
        if (0 != args.rate) {
            var star = Ti.UI.createImageView({
                height: "15dp",
                right: 0
            });
            switch (parseInt(args.rate)) {
              case 1:
                star.image = "/images/star1.png";
                break;

              case 2:
                star.image = "/images/star2.png";
                break;

              case 3:
                star.image = "/images/star3.png";
                break;

              case 4:
                star.image = "/images/star4.png";
                break;

              case 5:
                star.image = "/images/star5.png";
            }
            $.rate.add(star);
        }
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;