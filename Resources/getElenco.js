exports.loadElenco = function(o, url, id) {
    var xhr = Titanium.Network.createHTTPClient();
    xhr.open("POST", url);
    var params = {
        atId: id
    };
    var data = [];
    xhr.onload = function(e) {
        var attivita = eval("(" + this.responseText + ")");
        if (null != attivita && 0 != attivita.title) for (var i = 0, j = attivita.length; j > i; i++) data.push({
            id: attivita[i].id,
            title: attivita[i].title,
            rate: attivita[i].rate,
            plus: attivita[i].plus
        }); else data.push({
            id: 0,
            title: "Nessun elemento presente",
            rate: null
        });
        o.success && o.success(data);
    };
    xhr.onerror = function() {
        var dialog = Ti.UI.createAlertDialog({
            message: "Problemi di connessione!",
            ok: "OK",
            title: "Error"
        });
        dialog.show();
        o.error && o.error();
    };
    o.start && o.start();
    xhr.send(params);
};