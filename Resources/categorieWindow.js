function CategorieWindow(Categorie) {
    var win = Ti.UI.createWindow({
        modal: true,
        backgroundColor: "#ffffff",
        title: "Seleziona una cetegoria"
    });
    var categoriePicker = Ti.UI.createPicker({
        selectionIndicator: true,
        font: {
            fontSize: "12dp"
        },
        top: 0,
        type: Titanium.UI.PICKER_TYPE_PLAIN
    });
    categoriePicker.add(Categorie);
    win.add(categoriePicker);
    var closeWinBtn = Ti.UI.createButton({
        title: "Seleziona",
        top: "230dp",
        width: "120dp",
        height: "30dp"
    });
    win.add(closeWinBtn);
    closeWinBtn.addEventListener("click", function() {
        Ti.App.fireEvent("changeCategoria", {
            cat: categoriePicker.getSelectedRow(0).title,
            index: categoriePicker.getSelectedRow(0).id
        });
        win.close();
    });
    return win;
}

module.exports = CategorieWindow;