'use strict';

var context = SP.ClientContext.get_current();
var user = context.get_web().get_currentUser();
var lista;
var datillos;

function init() {
   lista = context.get_web().get_lists().getByTitle("Datos");


}


function crearDatos() {

    var ici = SP.ListItemCreationInformation();
    var item = lista.addItem(ici);
    item.set_item("Nombre", $("#txNombre").val());
    item.set_item("Edad", $("#txEdad").val());

    item.update();
    context.load(item);
    context.executeQueryAsync(function () {
        alert("Datos creados con exito");
        listadoDatos();
    },
        function (sender, args) {

            alert(args.get_message());
        }
    );

}


function listadoDatos() {

    datillos = lista.getItems(new SP.CamlQuery());
    context.load(datillos);
    context.executeQueryAsync(function () {
        var html = "<ul>";

        var enumeracion = datillos.getEnumerator();
        while (enumeracion.moveNext()) {
            var item = enumeracion.get_current();
            html += "<li><a href='#' onclick='cargar(" + item.get_item("ID") + ")'>" +
                item.get_item("Nombre") +
                "</a> </li>";
        }

        html += "</ul>";

        $("#listado").html(html);


    }, function (sender, args) {
        alert(args.get_message());
    });


}

function cargar(id) {


    var enumeracion = datillos.getEnumerator();
    while (enumeracion.moveNext()) {

        var item = enumeracion.get_current();
        if (item.get_item("ID") == id) {

            $("#Nombre").html(item.get_item("Nombre"));
            $("#Edad").html(item.get_item("Edad"));
            break;


        }
    }

}



$(document).ready(function () {

    $("#btnAddDatos").click(function () {
        crearDatos();

    });
    init();
    listadoDatos();

});
