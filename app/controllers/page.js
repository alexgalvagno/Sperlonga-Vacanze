Ti.include('/lib/picturegallery.js');

var isAndroid = (Ti.Platform.osname === "android") ? true : false;
var args = arguments[0] || {};

if(args.type === 'punto') var URL = "http://www.sperlongavacanze.it/app/getPunto.php";
else if(args.type === 'attivita') var URL = "http://www.sperlongavacanze.it/app/getInfoAttivita.php";
else var URL = "http://www.sperlongavacanze.it/app/getEvento.php";

$.pagina.addEventListener('android:back',function(){    
    $.pagina.close();		
});

if(isAndroid) $.title.text = args.title;
else $.pagina.title = args.title;

var xhr = Titanium.Network.createHTTPClient();	
xhr.open("POST", URL);

var parms = {
   	id: args.id
};
	
xhr.onload = function() {	
	$.activityIndicator.show();
		
	if(xhr.status == 200 ) { 
		var punto = eval('('+this.responseText+')');
		
		$.image.image = punto.piImg;
		
		if(punto.n_gallery != 0){
			var gallery = Ti.UI.createImageView({
				image: '/images/gallery.png',
				left: '5dp'
			});
			
			$.contact_sx.add(gallery);
			
			gallery.addEventListener('click', function(e){
				var images = [];
				
				for(var i = 0; i < punto.n_gallery ; i++){
					images.push({
						path: punto.gallery[i].img,
						thumbPath: punto.gallery[i].img,
						caption: ''
					})
				}
				
			  	var pictureGallery = PictureGallery.createWindow({
				  	images: images,
				  	title: 'Gallery',
				  	thumbGallery: {
					    numberOfColumnPortrait: 4,
					    numberOfColumnLandscape: 5,
					    thumbSize: (Ti.Platform.displayCaps.platformWidth / 4),
					    thumbBorderColor: '#555',
					    thumbBorderWidth: 1,
					    thumbBackgroundColor: '#FFF',
					    backgroundColor: '#DDD'
					},
					scrollableGallery: {
					    labelColor: 4,
					    labelFont: {fontSize : 18, fontWeight : 'bold'},
					    barColor: '#000',
					    displayArrows: false,
					    displayCaption: false
					},
				  	windowGroup: Alloy.Globals.tabGroup.activeTab
				});
				
				Alloy.Globals.tabGroup.activeTab.open(pictureGallery);
			});
		}
		
		if(punto.piLat != 0){
			var mappa = Ti.UI.createImageView({
				image: '/images/mappa.png',
				left: '5dp'
			});
			
			$.contact_sx.add(mappa);
			
			mappa.addEventListener('click', function (e) {
				var tabViewPage = Alloy.createController('mappaAttivita', {
											lat: punto.piLat,
											lon: punto.piLon,
											title: args.title,
											indirizzo: punto.indirizzo
										});
				
				Alloy.Globals.tabGroup.activeTab.open(
			    	tabViewPage.getView()
				);
			});
		}
		
		if(punto.skype != ''){
			var skype = Ti.UI.createImageView({
				image: '/images/skype.png',
				right: '5dp'
			});
			
			$.contact_dx.add(skype);
			
			skype.addEventListener('click', function (e) {
				var url = "skype://" + punto.skype;
				
				if(Ti.Platform.openURL(url)){
				    //skype call
				} else {
				    alert("Please install skype");
				}  
			});
		}
		
		if(punto.indirizzo === 'null') $.testo.text = punto.piTesto; 
		else $.testo.text = punto.indirizzo + " " + punto.comune + " (" + punto.pv + ")" + "\n" + "email: " + punto.mail + "\n" + "fax" + punto.fax + "\n\n" + punto.piTesto; 
	}else{
		var dialog = Ti.UI.createAlertDialog({
		    message: 'Problemi di connessione!' + xhr.status,
   			ok: 'OK',
   			title: 'Error'
		});
			
		dialog.show();
    }
    
    $.activityIndicator.hide();
    $.pagina.remove($.activityIndicator);
};
	
xhr.onerror = function(e) {
	var dialog = Ti.UI.createAlertDialog({
		message: 'Problemi di connessione!',
   		ok: 'OK',
   		title: 'Error'
	});
			
	dialog.show();
};

xhr.send(parms);

function closePage () {
	$.pagina.close();
}