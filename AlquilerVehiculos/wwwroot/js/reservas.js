window.onload = function () {
    listarReservas();
};

// Función para listar reservas
function listarReservas() {
    const objReserva = {
        url: "Reservas/listarReservas",
        cabeceras: ["ID", "Cliente ID", "Vehículo ID", "Fecha Inicio", "Fecha Fin", "Estado"],
        propiedades: ["id", "clienteId", "vehiculosId", "fechaInicio", "fechaFin", "estado"],
        editar: true,
        eliminar: true,
        propiedadId: "id"
    };
    pintar(objReserva);
}

// Función para limpiar el formulario
function limpiar() {
    set("id", "");
    set("clienteid", "");
    set("vehiculoid", "");
    set("estado", "");
    set("nombre", "");
    set("apellido", "");
    set("marca", "");
    set("modelo", "");
    document.getElementById("fechaInicio").value = "";
    document.getElementById("fechaFin").value = "";
}

// Función para editar una reserva
function Editar(id) {
    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();

    fetchGet(`Reservas/recuperarReserva/?id=${id}`, "json", function (data) {
        if (!data) {
            console.error("La respuesta del servidor está vacía o mal formada.");
        } else {
            set("id", data.id);
            set("clienteid", data.clienteId);
            set("vehiculoid", data.vehiculosId);
            set("estado", data.estado);
            document.getElementById("fechaInicio").value = formatDateToInput(data.fechaInicio);
            document.getElementById("fechaFin").value = formatDateToInput(data.fechaFin);
        }
    });
}

function formatDateToInput(date) {
    const d = new Date(date);
    return d.toISOString().split('T')[0];  // Formato YYYY-MM-DD
}

function GuardarReserva() {
    const startDate = document.getElementById("fechaInicio").value;
    const endDate = document.getElementById("fechaFin").value;

    if (!startDate || !endDate) {
        Errores("Debe seleccionar un rango de fechas.");
        return;
    }

    // Formatear las fechas antes de enviar
    const formattedStartDate = formatDateToInput(startDate);
    const formattedEndDate = formatDateToInput(endDate);

    // Asignar las fechas formateadas a los inputs
    document.getElementById("fechaInicio").value = formattedStartDate;
    document.getElementById("fechaFin").value = formattedEndDate;

    const frmGuardarReserva = document.getElementById("frmGuardarReserva");
    const frmData = new FormData(frmGuardarReserva);

    // Imprimir los datos del formulario para depuración
    for (let pair of frmData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
    }

    // Verificar si el ID de la reserva está vacío (inserción) o no (actualización)
    if (get("id") === "") {
        Confirmacion2("Confirmación", "¿Desea guardar esta reserva?", function () {
            fetchPost("Reservas/InsertarReserva", "text", frmData, function (res) {
                console.log("Respuesta del servidor:", res);
                if (res == 0) {
                    Errores("No se pudo guardar la reserva. Verifique los datos.");
                } else {
                    Bien("Reserva guardada exitosamente");
                    listarReservas();
                    limpiar();
                    cerrarModal();
                }
            });
        });
    } else {
        Confirmacion("Confirmación", "¿Desea modificar esta reserva?", function () {
            fetchPost("Reservas/ActualizarReserva", "text", frmData, function (res) {
                console.log("Respuesta del servidor:", res);
                if (res == 0) {
                    Errores("No se pudo modificar la reserva. Verifique los datos.");
                } else {
                    Bien("Reserva modificada exitosamente");
                    listarReservas();
                    limpiar();
                    cerrarModal();
                }
            });
        });
    }
}


// Función para auto-rellenar datos del cliente
async function autoRellenarCliente() {
    const clienteId = get("clienteid");
    if (clienteId) {
        fetchGet(`Cliente/recuperarCliente/?id=${clienteId}`, "json", function (data) {
            if (data) {
                set("nombre", data.nombre);
                set("apellido", data.apellido);
            } else {
                limpiarCliente();
            }
        });
    }
}

// Función para limpiar campos del cliente
function limpiarCliente() {
    set("nombre", "");
    set("apellido", "");
}

// Función para auto-rellenar datos del vehículo
async function autoRellenarVehiculo() {
    const vehiculoId = get("vehiculoid");
    if (vehiculoId) {
        fetchGet(`Vehiculos/recuperarVehiculo/?id=${vehiculoId}`, "json", function (data) {
            if (data) {
                set("marca", data.marca);
                set("modelo", data.modelo);
                set("estado", data.estado);
            } else {
                limpiarVehiculo();
            }
        });
    }
}

// Función para limpiar campos del vehículo
function limpiarVehiculo() {
    set("marca", "");
    set("modelo", "");
    set("estado", "");
}

// Función para establecer valores en los campos
function set(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.value = value;
    } else {
        console.error(`Elemento con ID "${id}" no encontrado.`);
    }
}

// Función para obtener valores de los campos
function get(id) {
    const element = document.getElementById(id);
    if (element) {
        return element.value;
    } else {
        console.error(`Elemento con ID "${id}" no encontrado.`);
        return null;
    }
}

// Función para cerrar el modal
function cerrarModal() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('myModal'));
    modal.hide();
}

// Limpiar campos al abrir el modal
document.getElementById('myModal').addEventListener('shown.bs.modal', function () {
    limpiar();
});
