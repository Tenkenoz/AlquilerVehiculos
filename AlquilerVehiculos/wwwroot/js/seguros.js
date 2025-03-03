window.onload = function () {
    listarSeguros();
};

function listarSeguros() {
    objSeguro = {
        url: "Seguro/listarSeguros",
        cabeceras: ["ID", "Reserva ID", "Tipo de Seguro", "Costo"],
        propiedades: ["id", "reservaId", "tipoSeguro", "costo"],
        editar: true,
        eliminar: true,
        propiedadId: "id"
    };
    pintar(objSeguro);
}

function limpiar() {
    set("reservaId", "");
    set("tipoSeguro", "");
    set("costo", "");
}

function Editar(id) {
    var modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();

    fetchGet("Seguro/recuperarSeguro/?id=" + id, "json", function (data) {
        if (data) {
            set("id", data.id);
            set("reservaId", data.reservaId);
            set("tipoSeguro", data.tipoSeguro);
            set("costo", data.costo);
        } else {
            console.error("No se encontraron datos para el seguro con ID " + id);
        }
    });
}

function GuardarSeguro(event) {
    event.preventDefault();
    let frmGuardarSeguro = document.getElementById("frmGuardarSeguro");
    let frmData = new FormData(frmGuardarSeguro);
    if (get("id") === "") {
        Confirmacion2("Confirmación", "¿Desea guardar este seguro?", function () {
            fetchPost("Seguro/InsertarSeguro", "text", frmData, function (res) {
                console.log("Respuesta del servidor:", res);
                if (res == 0) {
                    Bien("Seguro guardado exitosamente");
                    listarSeguros();
                    limpiar();
                } else {
                    Errores("No se pudo guardar el seguro");
                    listarSeguros();
                }
            });
        });
    } else {
        Confirmacion("Confirmación", "¿Desea modificar este seguro?", function () {
            fetchPost("Seguro/GuardarCambiosSeguro", "text", frmData, function (res) {
                console.log("Respuesta del servidor:", res);
                if (res == 1) {
                    Bien("Seguro modificado exitosamente");
                    listarSeguros();
                    limpiar();
                } else {
                    Errores("No se pudo modificar el seguro");
                    listarSeguros();
                }
            });
        });
    }
}

function eliminarRegistro(id) {
    fetchGet("Seguro/recuperarSeguro/?id=" + id, "json", function (data) {
        Eliminar("Confirmación", "¿Seguro que deseas eliminar el seguro con ID: " + data.id + "?", function () {
            fetchGet("Seguro/EliminarSeguro/?id=" + id, "json", function () {
                listarSeguros();
            });
        });
    });
}

async function autoRellenarSeguro() {
    const seguroId = document.getElementById("validationCustom01").value;
    if (seguroId) {
        fetchGet("Seguro/recuperarSeguro/?id=" + seguroId, "json", function (data) {
            if (data) {
                set("validationCustom02", data.reservaId);
                set("validationCustom03", data.tipoSeguro);
                set("validationCustom04", data.costo);
            } else {
                limpiarSeguro();
            }
        });
    }
}