function Controller() {
    function closePage() {
        $.pagina.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.pagina = Ti.UI.createWindow({
        top: "0dp",
        left: "0dp",
        backgroundImage: "images/background.jpg",
        layout: "vertical",
        zIndex: 0,
        orientationModes: [ Ti.UI.PORTRAIT ],
        id: "pagina"
    });
    $.__views.pagina && $.addTopLevelView($.__views.pagina);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        id: "activityIndicator",
        message: "Loading ..."
    });
    $.__views.pagina.add($.__views.activityIndicator);
    $.__views.scrollView = Ti.UI.createScrollView({
        layout: "vertical",
        top: 0,
        id: "scrollView",
        showVerticalScrollIndicator: "true",
        showHorizontalScrollIndicator: "false"
    });
    $.__views.pagina.add($.__views.scrollView);
    $.__views.image = Ti.UI.createImageView({
        height: "25%",
        id: "image"
    });
    $.__views.scrollView.add($.__views.image);
    $.__views.__alloyId9 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        id: "__alloyId9"
    });
    $.__views.scrollView.add($.__views.__alloyId9);
    $.__views.contact_sx = Ti.UI.createView({
        width: "50%",
        height: Titanium.UI.SIZE,
        layout: "horizontal",
        top: "10dp",
        left: 0,
        id: "contact_sx"
    });
    $.__views.__alloyId9.add($.__views.contact_sx);
    $.__views.contact_dx = Ti.UI.createView({
        width: "50%",
        height: Titanium.UI.SIZE,
        top: "10dp",
        right: 0,
        id: "contact_dx"
    });
    $.__views.__alloyId9.add($.__views.contact_dx);
    $.__views.testo = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            font: {
                fontSize: "12dp"
            },
            color: "#000000",
            left: "10dp",
            right: "10dp",
            top: "10dp",
            touchEnabled: false
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "22dp"
            }
        });
        _.extend(o, {
            id: "testo"
        });
        return o;
    }());
    $.__views.scrollView.add($.__views.testo);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("/lib/picturegallery.js");
    var isAndroid = "android" === Ti.Platform.osname ? true : false;
    var args = arguments[0] || {};
    if ("punto" === args.type) var URL = "http://www.sperlongavacanze.it/app/getPunto.php"; else if ("attivita" === args.type) var URL = "http://www.sperlongavacanze.it/app/getInfoAttivita.php"; else var URL = "http://www.sperlongavacanze.it/app/getEvento.php";
    $.pagina.addEventListener("android:back", function() {
        $.pagina.close();
    });
    isAndroid ? $.title.text = args.title : $.pagina.title = args.title;
    var xhr = Titanium.Network.createHTTPClient();
    xhr.open("POST", URL);
    var parms = {
        id: args.id
    };
    xhr.onload = function() {
        $.activityIndicator.show();
        if (200 == xhr.status) {
            var punto = eval("(" + this.responseText + ")");
            $.image.image = punto.piImg;
            if (0 != punto.n_gallery) {
                var gallery = Ti.UI.createImageView({
                    image: "/images/gallery.png",
                    left: "5dp"
                });
                $.contact_sx.add(gallery);
                gallery.addEventListener("click", function() {
                    var images = [];
                    for (var i = 0; punto.n_gallery > i; i++) images.push({
                        path: punto.gallery[i].img,
                        thumbPath: punto.gallery[i].img,
                        caption: ""
                    });
                    var pictureGallery = PictureGallery.createWindow({
                        images: images,
                        title: "Gallery",
                        thumbGallery: {
                            numberOfColumnPortrait: 4,
                            numberOfColumnLandscape: 5,
                            thumbSize: Ti.Platform.displayCaps.platformWidth / 4,
                            thumbBorderColor: "#555",
                            thumbBorderWidth: 1,
                            thumbBackgroundColor: "#FFF",
                            backgroundColor: "#DDD"
                        },
                        scrollableGallery: {
                            labelColor: 4,
                            labelFont: {
                                fontSize: 18,
                                fontWeight: "bold"
                            },
                            barColor: "#000",
                            displayArrows: false,
                            displayCaption: false
                        },
                        windowGroup: Alloy.Globals.tabGroup.activeTab
                    });
                    Alloy.Globals.tabGroup.activeTab.open(pictureGallery);
                });
            }
            if (0 != punto.piLat) {
                var mappa = Ti.UI.createImageView({
                    image: "/images/mappa.png",
                    left: "5dp"
                });
                $.contact_sx.add(mappa);
                mappa.addEventListener("click", function() {
                    var tabViewPage = Alloy.createController("mappaAttivita", {
                        lat: punto.piLat,
                        lon: punto.piLon,
                        title: args.title,
                        indirizzo: punto.indirizzo
                    });
                    Alloy.Globals.tabGroup.activeTab.open(tabViewPage.getView());
                });
            }
            if ("" != punto.skype) {
                var skype = Ti.UI.createImageView({
                    image: "/images/skype.png",
                    right: "5dp"
                });
                $.contact_dx.add(skype);
                skype.addEventListener("click", function() {
                    var url = "skype://" + punto.skype;
                    Ti.Platform.openURL(url) || alert("Please install skype");
                });
            }
            $.testo.text = "null" === punto.indirizzo ? punto.piTesto : punto.indirizzo + " " + punto.comune + " (" + punto.pv + ")" + "\n" + "email: " + punto.mail + "\n" + "fax" + punto.fax + "\n\n" + punto.piTesto;
        } else {
            var dialog = Ti.UI.createAlertDialog({
                message: "Problemi di connessione!" + xhr.status,
                ok: "OK",
                title: "Error"
            });
            dialog.show();
        }
        $.activityIndicator.hide();
        $.pagina.remove($.activityIndicator);
    };
    xhr.onerror = function() {
        var dialog = Ti.UI.createAlertDialog({
            message: "Problemi di connessione!",
            ok: "OK",
            title: "Error"
        });
        dialog.show();
    };
    xhr.send(parms);
    __defers["$.__views.header!click!closePage"] && $.__views.header.addEventListener("click", closePage);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;