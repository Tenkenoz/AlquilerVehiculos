﻿window.onload = function () {
    listarReservas();
};

// Función para listar reservas
function listarReservas() {
    const objReserva = {
        url: "Reservas/listarReservas",
        cabeceras: ["ID", "Cliente ID", "Vehículo ID", "Fecha Inicio", "Fecha Fin", "Estado"],
        propiedades: ["id", "clienteId", "vehiculoId", "fechaInicio", "fechaFin", "estado"],
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
    document.getElementById("fechaInicio").value = "";
    document.getElementById("fechaFin").value = "";
}

// Función para editar una reserva
function Editar(id) {
    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();

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
        }
    });
}

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
    if (!startDate || !endDate) {
        Errores("Debe seleccionar un rango de fechas.");
        return;
    }

    const frmGuardarReserva = document.getElementById("frmGuardarReserva");
    const frmData = new FormData(frmGuardarReserva);

    // Añadir las fechas seleccionadas al FormData
    frmData.append("FechaInicio", startDate);
    frmData.append("FechaFin", endDate);

    // Verificar si es una inserción o actualización
    if (get("id") === "") {
        // Si es una nueva reserva
        Confirmacion2("Confirmación", "¿Desea guardar esta reserva?", function () {
            fetchPost("Reservas/InsertarReserva", "text", frmData, function (res) {
                console.log("Respuesta del servidor:", res);
                if (res == 0) {
                    Errores("No se pudo guardar la reserva");
                } else {
                    Bien("Reserva guardada exitosamente");
                    listarReservas();
                    limpiar();
                    cerrarModal();
                }
            });
        });
    } else {
        // Si es una modificación de una reserva existente
        Confirmacion("Confirmación", "¿Desea modificar esta reserva?", function () {
            fetchPost("Reservas/GuardarCambiosReserva", "text", frmData, function (res) {
                console.log("Respuesta del servidor:", res);
                if (res == 1) {
                    Bien("Reserva modificada exitosamente");
                    listarReservas();
                    limpiar();
                    cerrarModal();
                } else {
                    Errores("No se pudo modificar la reserva");
                }
            });
        });
    }
}

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
            if (data) {
                set("nombre", data.nombre);
                set("apellido", data.apellido);
            } else {
                limpiarCliente();
            }
        });
    }
}

// Función para auto-rellenar datos del vehículo
async function autoRellenarVehiculo() {
    const vehiculoId = document.getElementById("vehiculoid").value;
    if (vehiculoId) {
        fetchGet("Vehiculos/recuperarVehiculo/?id=" + vehiculoId, "json", function (data) {
            if (data) {
                set("marca", data.marca);
                set("modelo", data.modelo);
            } else {
                limpiarVehiculo();
            }
        });
    }
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

// Evento para reiniciar el modal al abrir
document.getElementById('myModal').addEventListener('shown.bs.modal', function () {
    limpiar(); // Limpiar campos al abrir el modal para evitar información vieja
});
