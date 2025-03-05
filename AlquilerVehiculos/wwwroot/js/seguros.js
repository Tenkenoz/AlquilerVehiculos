function formatDateToInput(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ("0" + (d.getMonth() + 1)).slice(-2); // Asegura dos dígitos
    const day = ("0" + d.getDate()).slice(-2); // Asegura dos dígitos
    return `${year}-${month}-${day}`; // Devuelve la fecha en formato "YYYY-MM-DD"
}

function autoRellenarReserva() {
    const reservaId = get("reservaId");
    if (reservaId) {
        fetchGet(`Reservas/recuperarReserva/?id=${reservaId}`, "json", function (data) {
            if (!data) {
                console.error("La respuesta del servidor está vacía o mal formada.");
            } else {
                set("fechaInicio", formatDateToInput(data.fechaInicio));
                set("fechaFin", formatDateToInput(data.fechaFin));
                set("estado", data.estado);
            }
        });
    }
}

document.getElementById("reservaId").addEventListener("input", autoRellenarReserva);

window.onload = function () {
    listarSeguros();
};

function listarSeguros() {
    const objSeguro = {
        url: "Seguros/ListarSeguros",
        cabeceras: ["ID", "Tipo de Seguro", "Costo", "Reserva ID"],
        propiedades: ["id", "tipoSeguro", "costo", "reservaId"],
        editar: true,
        eliminar: true,
        propiedadId: "id"
    };
    pintar(objSeguro);
}

function limpiar() {
    set("id", "");
    set("reservaId", "");
    set("tipoSeguro", "");
    set("costo", "");
}

// Función para editar un seguro
function Editar(id) {
    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();

    // Realizar la solicitud para obtener los datos del seguro
    fetchGet("Seguros/recuperarSeguro/?id=" + id, "json", function (data) {
        if (data && data.id) {
            // Llenar los campos del formulario con los datos obtenidos
            set("id", data.id);
            set("tipoSeguro", data.tipoSeguro);
            set("costo", data.costo);

            // Los campos de reserva
            set("reservaId", data.reservaId);
            if (data.fechaInicio) {
                document.getElementById("fechaInicio").value = formatDateToInput(data.fechaInicio);
            } else {
                console.warn("Fecha de inicio no disponible");
            }

            if (data.fechaFin) {
                document.getElementById("fechaFin").value = formatDateToInput(data.fechaFin);
            } else {
                console.warn("Fecha de fin no disponible");
            }

            set("estado", data.estado);
        } else {
            console.error("No se encontraron datos para el seguro con ID " + id);
            Errores("No se pudo cargar el seguro. Verifique el ID.");
        }
    });
}


function obtenerDatosFormulario() {
    return {
        ReservaId: parseInt(get("reservaId"), 10), // Convertir a entero
        TipoSeguro: get("tipoSeguro"),
        Costo: parseInt(get("costo"), 10) // Convertir a entero
    };
}
// Función para eliminar un seguro
function eliminarRegistro(id) {
    Eliminar("Confirmación", "¿Seguro que deseas eliminar el seguro con ID: " + id + "?", function () {
        fetchGet("Seguros/EliminarSeguro/?id=" + id, "text", function (res) {
            if (res == "1") {
                Bien("Seguro eliminado exitosamente");
                listarSeguros();  // Actualizar la lista de seguros
            } else {
                Errores("No se pudo eliminar el seguro");
            }
        });
    });
}



function GuardarSeguro() {
    const reservaId = get("reservaId");
    const tipoSeguro = get("tipoSeguro");
    const costo = get("costo");
    const id = get("id");

    if (!reservaId || !tipoSeguro || !costo) {
        Errores("Todos los campos son obligatorios.");
        return;
    }

    const datosSeguro = obtenerDatosFormulario();

    console.log(datosSeguro);

    if (id === "") {
        Confirmacion2("Confirmación", "¿Desea guardar este seguro?", function () {
            fetchPost("Seguros/InsertarSeguro", "json", datosSeguro, function (res) {
                if (res == 0) {
                    Errores("No se pudo guardar el seguro. Verifique los datos.");
                } else {
                    Bien("Seguro guardado exitosamente");
                    listarSeguros();
                    limpiar();
                    cerrarModal();
                }
            });
        });
    } else {
        Confirmacion("Confirmación", "¿Desea modificar este seguro?", function () {
            fetchPost("Seguros/ActualizarSeguro", "json", datosSeguro, function (res) {
                if (res == 0) {
                    Errores("No se pudo modificar el seguro. Verifique los datos.");
                } else {
                    Bien("Seguro modificado exitosamente");
                    listarSeguros();
                    limpiar();
                    cerrarModal();
                }
            });
        });
    }
}

function cerrarModal() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('myModal'));
    if (modal) {
        modal.hide();
    }
}

function set(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.value = value;
    } else {
        console.error(`Elemento con ID "${id}" no encontrado. Verifique que el campo exista en el formulario.`);
    }
}

function get(id) {
    const element = document.getElementById(id);
    if (element) {
        return element.value;
    } else {
        console.error(`Elemento con ID "${id}" no encontrado. Verifique que el campo exista en el formulario.`);
        return null;
    }
}

document.getElementById('myModal').addEventListener('shown.bs.modal', function () {
    limpiar();
});
