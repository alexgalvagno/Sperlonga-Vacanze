var args = arguments[0] || {};
var isAndroid = (Ti.Platform.osname === "android") ? true : false;

var ATTIVITA_URL = "http://www.sperlongavacanze.it/app/getAttivita.php";

var attivita = require('getElenco');

if(isAndroid) $.title.text = args.title;
else $.elencoAttivita.title = args.title;

function openPage(e) {
	var tabViewPage = Alloy.createController('page', {
								id: e.row.id,
								title: e.row.title,
								type: 'attivita'
							});
	
	Alloy.Globals.tabGroup.activeTab.open(
    	tabViewPage.getView()
	);
}

function refreshAttivita() {
	attivita.loadElenco({
		success: function(data) {
			var rows = [];
			_.each(data, function(item) {
				rows.push(Alloy.createController('row', {
					id: item.id,
					title: item.title,
					rate: item.rate,
					plus: item.plus
				}).getView());
			});
			$.table.setData(rows);
			$.activityIndicator.hide();
			$.elencoAttivita.remove($.activityIndicator);
		}
	}, ATTIVITA_URL, args.id);
}

$.activityIndicator.show();
refreshAttivita();

function closePage () {
	$.elencoAttivita.close();
}