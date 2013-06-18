function Controller() {
    function getAttivita(caId) {
        xhr.open("POST", "http://www.sperlongavacanze.it/app/getCoordinateAttivita.php");
        xhr.onload = function(e) {
            var coordinate = eval("(" + this.responseText + ")");
            if (0 != coordinate[0].title) {
                for (i = coo.length - 1; i >= 0; i--) mapview.removeAnnotation(coo[i]);
                coo = [];
                if (isAndroid) for (var i = 0, z = coordinate.length; z > i; i++) coo.push(MapModule.createAnnotation({
                    latitude: coordinate[i].lat,
                    longitude: coordinate[i].lon,
                    title: coordinate[i].title,
                    subtitle: coordinate[i].indirizzo,
                    pincolor: MapModule.ANNOTATION_GREEN,
                    myid: coordinate[i].id
                })); else for (var i = 0, z = coordinate.length; z > i; i++) coo.push(Titanium.Map.createAnnotation({
                    latitude: coordinate[i].lat,
                    longitude: coordinate[i].lon,
                    title: coordinate[i].title,
                    subtitle: coordinate[i].indirizzo,
                    pincolor: Titanium.Map.ANNOTATION_GREEN,
                    myid: coordinate[i].id
                }));
                mapview.addAnnotations(coo);
            }
        };
        xhr.onerror = function() {
            var dialog = Ti.UI.createAlertDialog({
                message: "Problemi di connessione!",
                ok: "OK",
                title: "Error"
            });
            dialog.show();
        };
        var parms = {
            at_id: caId
        };
        xhr.send(parms);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
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
    $.__views.categorie = Ti.UI.createView({
        id: "categorie",
        layout: "horizontal",
        height: Ti.UI.SIZE,
        backgroundColor: "#ffffff",
        top: "0",
        left: "0"
    });
    $.__views.win.add($.__views.categorie);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var isAndroid = "android" === Ti.Platform.osname ? true : false;
    var mapview = null;
    var xhr = Titanium.Network.createHTTPClient();
    xhr.open("POST", "http://www.sperlongavacanze.it/app/getCategorie.php");
    var categorieColumn = [];
    var coo = [];
    xhr.onload = function(e) {
        var categorieList = Titanium.UI.createPicker({
            selectionIndicator: true,
            font: {
                fontSize: "12dp"
            },
            left: 0,
            right: "10dp",
            type: Titanium.UI.PICKER_TYPE_PLAIN
        });
        var categorie = eval("(" + this.responseText + ")");
        categorieColumn.push(Ti.UI.createPickerRow({
            title: "Seleziona una Categoria",
            id: 0
        }));
        for (var i = 0, z = categorie.length; z > i; i++) categorieColumn.push(Ti.UI.createPickerRow({
            title: categorie[i].title,
            id: categorie[i].id
        }));
        categorieList.add(categorieColumn);
        categorieList.addEventListener("change", function() {
            alert(caId);
            if (isAndroid && 0 == categorieList.getSelectedRow(0).id) {
                alert("Selezionare una categoria!");
                return;
            }
            if (!isAndroid && "" === categoriaCombo.value) {
                alert("Selezionare una categoria!");
                categoriaCombo.focus();
                return;
            }
            var caId = categorieList.getSelectedRow(0).id;
            getAttivita(caId);
        });
        if (isAndroid) $.categorie.add(categorieList); else {
            var tr = Titanium.UI.create2DMatrix();
            tr = tr.rotate(90);
            var dropButtonCat = Titanium.UI.createButton({
                style: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
                transform: tr
            });
            var categoriaCombo = Titanium.UI.createTextField({
                enabled: false,
                height: 40,
                width: 300,
                borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
                rightButton: dropButtonCat,
                rightButtonMode: Titanium.UI.INPUT_BUTTONMODE_ALWAYS
            });
            $.categorie.add(categoriaCombo);
            var CategorieWindow = require("categorieWindow");
            var categorieWin = new CategorieWindow(categorieColumn);
            categoriaCombo.addEventListener("click", function() {
                categorieWin.open();
            });
            Ti.App.addEventListener("changeCategoria", function(e) {
                categoriaCombo.value = e.cat;
                0 != e.index && "" != e.index && getAttivita(e.index);
            });
        }
    };
    xhr.onerror = function() {
        var dialog = Ti.UI.createAlertDialog({
            message: "Problemi di connessione!",
            ok: "OK",
            title: "Error"
        });
        dialog.show();
    };
    xhr.send();
    if (isAndroid) {
        var MapModule = require("ti.map");
        var mountainView = MapModule.createAnnotation({
            latitude: 41.257219,
            longitude: 13.436095,
            title: "Comune di Sperlonga",
            subtitle: "Sperlonga, LT",
            pincolor: MapModule.ANNOTATION_RED,
            leftButton: "images/stemma.png",
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
        mapview.addEventListener("click", function(evt) {
            if (("title" == evt.clicksource || "subtitle" == evt.clicksource) && "" != evt.annotation.myid && 0 != evt.annotation.myid && 1 != evt.annotation.myid) {
                var tabViewPage = Alloy.createController("page", {
                    id: evt.annotation.myid,
                    title: evt.title,
                    type: "attivita"
                });
                Alloy.Globals.tabGroup.activeTab.open(tabViewPage.getView());
            }
        });
    } else {
        var mountainView = Titanium.Map.createAnnotation({
            latitude: 41.257219,
            longitude: 13.436095,
            title: "Comune di Sperlonga",
            subtitle: "Sperlonga, LT",
            pincolor: Titanium.Map.ANNOTATION_RED,
            leftButton: "images/stemma.png",
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
        mapview.addEventListener("click", function(evt) {
            if (("title" == evt.clicksource || "subtitle" == evt.clicksource) && "" != evt.annotation.myid && 0 != evt.annotation.myid && 1 != evt.annotation.myid) {
                var tabViewPage = Alloy.createController("page", {
                    id: evt.annotation.myid,
                    title: evt.title,
                    type: "attivita"
                });
                Alloy.Globals.tabGroup.activeTab.open(tabViewPage.getView());
            }
        });
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;