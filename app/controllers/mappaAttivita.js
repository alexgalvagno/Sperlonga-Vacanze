var isAndroid = (Ti.Platform.osname === "android") ? true : false;
var args = arguments[0] || {};

var xhr = Titanium.Network.createHTTPClient();	

if(isAndroid){
	var MapModule = require('ti.map');
	
	var mountainView = MapModule.createAnnotation({
	    latitude: args.lat,
	    longitude: args.lon,
	    title: args.title,
	    subtitle: args.indirizzo,
	    pincolor:MapModule.ANNOTATION_BLUE,
	    myid:1 // Custom property to uniquely identify this annotation.
	});
	
	mapview = MapModule.createView({
	    mapType: MapModule.NORMAL_TYPE,
	    region: {latitude:41.263485, longitude:13.427253,
	            latitudeDelta:0.04, longitudeDelta:0.04},
	    animate:true,
	    regionFit:true,
	    userLocation:true,
	    annotations:[mountainView]
	});
	
	$.win.add(mapview);
}else{
	var mountainView = Titanium.Map.createAnnotation({
	    latitude: args.lat,
	    longitude: args.lon,
	    title: args.title,
	    subtitle: args.indirizzo,
	    pincolor:Titanium.Map.ANNOTATION_PURPLE,
	    myid:1 // Custom property to uniquely identify this annotation.
	});
	
	mapview = Titanium.Map.createView({
	  	mapType: Titanium.Map.NORMAL_TYPE,
	    region: {latitude:41.263485, longitude:13.427253,
	            latitudeDelta:0.04, longitudeDelta:0.04},
	    animate:true,
	    regionFit:true,
	    userLocation:true,
	    annotations:[mountainView]
	});
	
	$.win.add(mapview);
}

/*var url = 'http://maps.googleapis.com/maps/api/directions/json?origin=41.2624931,13.4306450&destination=41.2605820,13.4268770&sensor=true&mode=walking';
 	
xhr.onload = function(e){
	polyline = JSON.parse(xhr.responseText).routes[0].overview_polyline.points;
 
	polyPoints = decodeLine(polyline);
		 
	/*polyLineOverlayDef = {
	    name: "Directions",
	    points : polyPoints,
	    color : "red",
	    width: 4,
	};
	 
	mapView.addRoute(polyLineOverlayDef); 
		
	var route = {
	    bubbleParent : false,
	    points : polyPoints,
	    color : "red",
	    width: 4,
	};
		
	mapview.createRoute(route);
};
    
xhr.onerror = function(e) {
	var dialog = Ti.UI.createAlertDialog({
		message: 'Problemi di connessione!' + e.error,
   		ok: 'OK',
   		title: 'Error'
	});
					
	dialog.show();
};
 
xhr.open('GET',url);
xhr.send();

function decodeLine (encoded) {
    var len = encoded.length;
    var index = 0;
    var array = [];
    var lat = 0;
    var lng = 0;
 
    while (index < len) {
        var b;
        var shift = 0;
        var result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        var dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lat += dlat;
 
        shift = 0;
        result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        var dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lng += dlng;
 
        array.push({longitude:lng * 1e-5, latitude:lat * 1e-5});
    }
 
    return array;
} */

function closePage () {
	$.win.close();
}