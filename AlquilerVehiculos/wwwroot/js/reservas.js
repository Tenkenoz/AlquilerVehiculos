window.onload = function () {
    listarReservas();
};

function listarReservas() {
    objReserva = {
        url: "Reserva/listarReservas",
        cabeceras: ["ID", "Cliente ID", "Vehículo ID", "Fecha Inicio", "Fecha Fin", "Estado"],
        propiedades: ["id", "clienteId", "vehiculoId", "fechaInicio", "fechaFin", "estado"],
        editar: true,
        eliminar: true,
        propiedadId: "id"
    };
    pintar(objReserva);
}

function limpiar() {
    set("clienteId", "");
    set("vehiculoId", "");
    set("fechaInicio", "");
    set("fechaFin", "");
    set("estado", "");
}

function Editar(id) {
    var modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();

    fetchGet("Reserva/recuperarReserva/?id=" + id, "json", function (data) {
        if (data) {
            set("id", data.id);
            set("clienteId", data.clienteId);
            set("vehiculoId", data.vehiculoId);
            set("fechaInicio", data.fechaInicio);
            set("fechaFin", data.fechaFin);
            set("estado", data.estado);
        } else {
            console.error("No se encontraron datos para la reserva con ID " + id);
        }
    });
}

function GuardarReserva(event) {
    event.preventDefault();
    let frmGuardarReserva = document.getElementById("frmGuardarReserva");
    let frmData = new FormData(frmGuardarReserva);
    if (get("id") === "") {
        Confirmacion2("Confirmación", "¿Desea guardar esta reserva?", function () {
            fetchPost("Reserva/InsertarReserva", "text", frmData, function (res) {
                console.log("Respuesta del servidor:", res);
                if (res == 0) {
                    Bien("Reserva guardada exitosamente");
                    listarReservas();
                    limpiar();
                } else {
                    Errores("No se pudo guardar la reserva");
                    listarReservas();
                }
            });
        });
    } else {
        Confirmacion("Confirmación", "¿Desea modificar esta reserva?", function () {
            fetchPost("Reserva/GuardarCambiosReserva", "text", frmData, function (res) {
                console.log("Respuesta del servidor:", res);
                if (res == 1) {
                    Bien("Reserva modificada exitosamente");
                    listarReservas();
                    limpiar();
                } else {
                    Errores("No se pudo modificar la reserva");
                    listarReservas();
                }
            });
        });
    }
}

function eliminarRegistro(id) {
    fetchGet("Reserva/recuperarReserva/?id=" + id, "json", function (data) {
        Eliminar("Confirmación", "¿Seguro que deseas eliminar la reserva con ID: " + data.id + "?", function () {
            fetchGet("Reserva/EliminarReserva/?id=" + id, "json", function () {
                listarReservas();
            });
        });
    });
}

async function autoRellenarReserva() {
    const reservaId = document.getElementById("validationCustom01").value;
    if (reservaId) {
        fetchGet("Reserva/recuperarReserva/?id=" + reservaId, "json", function (data) {
            if (data) {
                set("validationCustom02", data.clienteId);
                set("validationCustom03", data.vehiculoId);
                set("validationCustom04", data.fechaInicio);
                set("validationCustom05", data.fechaFin);
                set("validationCustom06", data.estado);
            } else {
                limpiarReserva();
            }
        });
    }
}