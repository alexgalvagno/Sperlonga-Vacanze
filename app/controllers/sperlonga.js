var PUNTI_URL = "http://www.sperlongavacanze.it/app/getPunti.php";

var punti = require('getElenco');

function openPage(e) {
	var tabViewPage = Alloy.createController('page', {
								id: e.row.id,
								title: e.row.title,
								type: 'punto'
							});

	Alloy.Globals.tabGroup.activeTab.open(
    	tabViewPage.getView()
	);
}

function refreshPunti() {
	punti.loadElenco({
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
			$.sperlonga.remove($.activityIndicator);
		}
	}, PUNTI_URL, 0);
}

$.activityIndicator.show();
refreshPunti();