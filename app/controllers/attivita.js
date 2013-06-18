var CAT_URL = "http://www.sperlongavacanze.it/app/getCategorie.php";

var cat = require('getElenco');

function openAttivita(e) {
	var tabViewAttivita = Alloy.createController('elencoAttivita', {
		id: e.row.id,
		title: e.row.title
	});
	
	Alloy.Globals.tabGroup.activeTab.open(
    	tabViewAttivita.getView()
	);
}

function refreshCategorie() {
	cat.loadElenco({
		success: function(data) {
			var rows = [];
			_.each(data, function(item) {
				rows.push(Alloy.createController('row', {
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

$.activityIndicator.show();
refreshCategorie();