window.onload = function () {
    listarPagos();
};

function listarPagos() {
    objPago = {
        url: "Pago/listarPagos",
        cabeceras: ["ID", "Reserva ID", "Monto", "Método de Pago", "Fecha de Pago"],
        propiedades: ["id", "reservaId", "monto", "metodoPago", "fechaPago"],
        editar: true,
        eliminar: true,
        propiedadId: "id"
    };
    pintar(objPago);
}

function limpiar() {
    set("reservaId", "");
    set("monto", "");
    set("metodoPago", "");
    set("fechaPago", "");
}

function Editar(id) {
    var modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();

    fetchGet("Pago/recuperarPago/?id=" + id, "json", function (data) {
        if (data) {
            set("id", data.id);
            set("reservaId", data.reservaId);
            set("monto", data.monto);
            set("metodoPago", data.metodoPago);
            set("fechaPago", data.fechaPago);
        } else {
            console.error("No se encontraron datos para el pago con ID " + id);
        }
    });
}

function GuardarPago(event) {
    event.preventDefault();
    let frmGuardarPago = document.getElementById("frmGuardarPago");
    let frmData = new FormData(frmGuardarPago);
    if (get("id") === "") {
        Confirmacion2("Confirmación", "¿Desea guardar este pago?", function () {
            fetchPost("Pago/InsertarPago", "text", frmData, function (res) {
                console.log("Respuesta del servidor:", res);
                if (res == 0) {
                    Bien("Pago guardado exitosamente");
                    listarPagos();
                    limpiar();
                } else {
                    Errores("No se pudo guardar el pago");
                    listarPagos();
                }
            });
        });
    } else {
        Confirmacion("Confirmación", "¿Desea modificar este pago?", function () {
            fetchPost("Pago/GuardarCambiosPago", "text", frmData, function (res) {
                console.log("Respuesta del servidor:", res);
                if (res == 1) {
                    Bien("Pago modificado exitosamente");
                    listarPagos();
                    limpiar();
                } else {
                    Errores("No se pudo modificar el pago");
                    listarPagos();
                }
            });
        });
    }
}

function eliminarRegistro(id) {
    fetchGet("Pago/recuperarPago/?id=" + id, "json", function (data) {
        Eliminar("Confirmación", "¿Seguro que deseas eliminar el pago con ID: " + data.id + "?", function () {
            fetchGet("Pago/EliminarPago/?id=" + id, "json", function () {
                listarPagos();
            });
        });
    });
}

async function autoRellenarPago() {
    const pagoId = document.getElementById("validationCustom01").value;
    if (pagoId) {
        fetchGet("Pago/recuperarPago/?id=" + pagoId, "json", function (data) {
            if (data) {
                set("validationCustom02", data.reservaId);
                set("validationCustom03", data.monto);
                set("validationCustom04", data.metodoPago);
                set("validationCustom05", data.fechaPago);
            } else {
                limpiarPago();
            }
        });
    }
}
