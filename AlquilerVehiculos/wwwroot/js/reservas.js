window.onload = function () {
    listarReservas();
};

// Función para listar reservas
function listarReservas() {
    const objReserva = {
        url: "Reservas/listarReservas",
        cabeceras: ["ID", "Cliente ID", "Vehículo ID", "Fecha Inicio", "Fecha Fin", "Estado"],
<<<<<<< HEAD
        propiedades: ["id", "clienteId", "vehiculosId", "fechaInicio", "fechaFin", "estado"],
=======
        propiedades: ["id", "clienteId", "vehiculoId", "fechaInicio", "fechaFin", "estado"],
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
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
<<<<<<< HEAD
    set("nombre", "");
    set("apellido", "");
    set("marca", "");
    set("modelo", "");
=======
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
    document.getElementById("fechaInicio").value = "";
    document.getElementById("fechaFin").value = "";
}

// Función para editar una reserva
function Editar(id) {
    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();

<<<<<<< HEAD
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
=======
    fetchGet("Reservas/recuperarReserva/?id=" + id, "json", function (data) {
        if (data) {
            set("id", data.id);
            set("clienteid", data.clienteId);
            set("vehiculoid", data.vehiculoId);
            set("estado", data.estado);

            // Cargar fechas en los inputs de tipo "date"
            document.getElementById("fechaInicio").value = formatDateToInput(data.fechaInicio);
            document.getElementById("fechaFin").value = formatDateToInput(data.fechaFin);
        } else {
            console.error("No se encontraron datos para la reserva con ID " + id);
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
        }
    });
}

<<<<<<< HEAD
function formatDateToInput(date) {
    const d = new Date(date);
    return d.toISOString().split('T')[0];  // Formato YYYY-MM-DD
}

function GuardarReserva() {
    const startDate = document.getElementById("fechaInicio").value;
    const endDate = document.getElementById("fechaFin").value;

=======
// Función para formatear fecha para los inputs de tipo date
function formatDateToInput(date) {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Formato: "YYYY-MM-DD"
}

// Función para guardar una reserva
function GuardarReserva() {
    // Obtener fechas desde los inputs
    const startDate = document.getElementById("fechaInicio").value;
    const endDate = document.getElementById("fechaFin").value;

    // Verificar si las fechas son válidas
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
    if (!startDate || !endDate) {
        Errores("Debe seleccionar un rango de fechas.");
        return;
    }

<<<<<<< HEAD
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
=======
    const frmGuardarReserva = document.getElementById("frmGuardarReserva");
    const frmData = new FormData(frmGuardarReserva);

    // Añadir las fechas seleccionadas al FormData
    frmData.append("FechaInicio", startDate);
    frmData.append("FechaFin", endDate);

    // Verificar si es una inserción o actualización
    if (get("id") === "") {
        // Si es una nueva reserva
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
        Confirmacion2("Confirmación", "¿Desea guardar esta reserva?", function () {
            fetchPost("Reservas/InsertarReserva", "text", frmData, function (res) {
                console.log("Respuesta del servidor:", res);
                if (res == 0) {
<<<<<<< HEAD
                    Errores("No se pudo guardar la reserva. Verifique los datos.");
=======
                    Errores("No se pudo guardar la reserva");
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
                } else {
                    Bien("Reserva guardada exitosamente");
                    listarReservas();
                    limpiar();
                    cerrarModal();
                }
            });
        });
    } else {
<<<<<<< HEAD
        Confirmacion("Confirmación", "¿Desea modificar esta reserva?", function () {
            fetchPost("Reservas/ActualizarReserva", "text", frmData, function (res) {
                console.log("Respuesta del servidor:", res);
                if (res == 0) {
                    Errores("No se pudo modificar la reserva. Verifique los datos.");
                } else {
=======
        // Si es una modificación de una reserva existente
        Confirmacion("Confirmación", "¿Desea modificar esta reserva?", function () {
            fetchPost("Reservas/GuardarCambiosReserva", "text", frmData, function (res) {
                console.log("Respuesta del servidor:", res);
                if (res == 1) {
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
                    Bien("Reserva modificada exitosamente");
                    listarReservas();
                    limpiar();
                    cerrarModal();
<<<<<<< HEAD
=======
                } else {
                    Errores("No se pudo modificar la reserva");
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
                }
            });
        });
    }
}

<<<<<<< HEAD

// Función para auto-rellenar datos del cliente
async function autoRellenarCliente() {
    const clienteId = get("clienteid");
    if (clienteId) {
        fetchGet(`Cliente/recuperarCliente/?id=${clienteId}`, "json", function (data) {
=======
// Función para eliminar un registro
function eliminarRegistro(id) {
    fetchGet("Reservas/EliminarReserva/?id=" + id, "json", function (data) {
        Eliminar("Confirmación", "¿Seguro que deseas eliminar la reserva con ID: " + data.id + "?", function () {
            fetchGet("Reserva/EliminarReserva/?id=" + id, "text", function () {
                listarReservas();
            });
        });
    });
}

// Función para auto-rellenar datos del cliente
async function autoRellenarCliente() {
    const clienteId = document.getElementById("clienteid").value;
    if (clienteId) {
        fetchGet("Clientes/recuperarCliente/?id=" + clienteId, "json", function (data) {
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
            if (data) {
                set("nombre", data.nombre);
                set("apellido", data.apellido);
            } else {
                limpiarCliente();
            }
        });
    }
}

<<<<<<< HEAD
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
=======
// Función para auto-rellenar datos del vehículo
async function autoRellenarVehiculo() {
    const vehiculoId = document.getElementById("vehiculoid").value;
    if (vehiculoId) {
        fetchGet("Vehiculos/recuperarVehiculo/?id=" + vehiculoId, "json", function (data) {
            if (data) {
                set("marca", data.marca);
                set("modelo", data.modelo);
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
            } else {
                limpiarVehiculo();
            }
        });
    }
}

<<<<<<< HEAD
// Función para limpiar campos del vehículo
function limpiarVehiculo() {
    set("marca", "");
    set("modelo", "");
    set("estado", "");
}

=======
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
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

<<<<<<< HEAD
// Limpiar campos al abrir el modal
document.getElementById('myModal').addEventListener('shown.bs.modal', function () {
    limpiar();
=======
// Evento para reiniciar el modal al abrir
document.getElementById('myModal').addEventListener('shown.bs.modal', function () {
    limpiar(); // Limpiar campos al abrir el modal para evitar información vieja
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
});
