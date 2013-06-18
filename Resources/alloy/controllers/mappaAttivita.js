function Controller() {
    function closePage() {
        $.win.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        top: "0dp",
        left: "0dp",
        backgroundImage: "images/background.jpg",
        layout: "vertical",
        zIndex: 0,
        orientationModes: [ Ti.UI.PORTRAIT ],
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var isAndroid = "android" === Ti.Platform.osname ? true : false;
    var args = arguments[0] || {};
    Titanium.Network.createHTTPClient();
    if (isAndroid) {
        var MapModule = require("ti.map");
        var mountainView = MapModule.createAnnotation({
            latitude: args.lat,
            longitude: args.lon,
            title: args.title,
            subtitle: args.indirizzo,
            pincolor: MapModule.ANNOTATION_BLUE,
            myid: 1
        });
        mapview = MapModule.createView({
            mapType: MapModule.NORMAL_TYPE,
            region: {
                latitude: 41.263485,
                longitude: 13.427253,
                latitudeDelta: .04,
                longitudeDelta: .04
            },
            animate: true,
            regionFit: true,
            userLocation: true,
            annotations: [ mountainView ]
        });
        $.win.add(mapview);
    } else {
        var mountainView = Titanium.Map.createAnnotation({
            latitude: args.lat,
            longitude: args.lon,
            title: args.title,
            subtitle: args.indirizzo,
            pincolor: Titanium.Map.ANNOTATION_PURPLE,
            myid: 1
        });
        mapview = Titanium.Map.createView({
            mapType: Titanium.Map.NORMAL_TYPE,
            region: {
                latitude: 41.263485,
                longitude: 13.427253,
                latitudeDelta: .04,
                longitudeDelta: .04
            },
            animate: true,
            regionFit: true,
            userLocation: true,
            annotations: [ mountainView ]
        });
        $.win.add(mapview);
    }
    __defers["$.__views.header!click!closePage"] && $.__views.header.addEventListener("click", closePage);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;