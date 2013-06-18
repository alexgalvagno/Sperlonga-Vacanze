var EV_URL = "http://www.sperlongavacanze.it/app/getEventi.php";

var ev = require('getElenco');

function openEvento(e) {
	if(e.row.id != 0){
		var tabViewPage = Alloy.createController('page', {
									id: e.row.id,
									title: e.row.title
								});
		
		Alloy.Globals.tabGroup.activeTab.open(
	    	tabViewPage.getView()
		);
	}
}

function refreshEventi() {
	ev.loadElenco({
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
			$.eventi.remove($.activityIndicator);
		}
	}, EV_URL, 0);	
}

$.activityIndicator.show();
refreshEventi();