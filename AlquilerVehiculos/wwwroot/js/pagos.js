window.onload = function () {
    listarPagos();
};

// Función para listar los pagos
function listarPagos() {
    const objPago = {
        url: "Pagos/ListarPagos",
        cabeceras: ["ID", "Reserva ID", "Monto", "Método de Pago", "Fecha de Pago"],
        propiedades: ["id", "reservaId", "monto", "metodoPago", "fechaPago"],
        editar: true,
        eliminar: true,
        propiedadId: "id"
    };
    pintar(objPago);
}
// Función para limpiar el formulario
function limpiar() {
    set("reservaId", "");
    set("monto", "");
    set("metodoPago", "");
    set("fechaPago", "");
}

// Función para editar un pago
function Editar(id) {
    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();

    // Recuperar datos del pago
    fetchGet("Pagos/RecuperarPago/?id=" + id, "json", function (data) {
        if (data) {
            set("id", data.id);
            set("reservaId", data.reservaId);
            set("monto", data.monto);
            set("metodoPago", data.metodoPago);
            document.getElementById("fechaPago").value = formatDateToInput(data.fechaPago);
            document.getElementById("fechaFin").value = formatDateToInput(data.fechaFin);

            // Recuperar datos de la reserva asociada
            recuperarReserva(data.reservaId);
        } else {
            console.error("No se encontraron datos para el pago con ID " + id);
        }
    });
}

// Función para recuperar los datos de la reserva (FechaInicio, FechaFin, Estado)
function recuperarReserva() {
    const id = document.getElementById("reservaId").value;
    fetchGet("Reservas/recuperarReserva/?id=" + id, "json", function (data) {
        if (data) {
            set("estado", data.estado);
            document.getElementById("fechaInicio").value = formatDateToInput(data.fechaInicio);
            document.getElementById("fechaFin").value = formatDateToInput(data.fechaFin);
        } else {
            console.error("No se encontraron datos para la reserva con ID " + id);
        }
    });
}


// Función para formatear la fecha para los inputs tipo "date"
function formatDateToInput(date) {
    if (!date) return ""; // Retorna una cadena vacía si la fecha es nula o indefinida

    const d = new Date(date);

    if (isNaN(d.getTime())) {
        console.error("Fecha inválida:", date);
        return ""; // Evita errores en la interfaz
    }

    return d.toISOString().split('T')[0]; // Formato: "YYYY-MM-DD"
}


// Función para guardar un pago
function GuardarPago(event) {
    event.preventDefault(); // Evita el envío automático del formulario

    // Obtener los valores desde los inputs
    const id = document.getElementById("id").value;
    const reservaId = document.getElementById("reservaId").value;
    const monto = document.getElementById("monto").value;
    const metodoPago = document.getElementById("metodoPago").value;
    const fechaPago = document.getElementById("fechaPago").value;

    // Verificar si los campos son válidos
    if (!reservaId || !monto || !metodoPago || !fechaPago) {
        Errores("Todos los campos son obligatorios.");
        return;
    }

    const frmGuardarPago = document.getElementById("frmGuardarPago");
    const frmData = new FormData(frmGuardarPago);

    // Añadir los datos al FormData
    frmData.append("ReservaId", reservaId);
    frmData.append("Monto", monto);
    frmData.append("MetodoPago", metodoPago);
    frmData.append("FechaPago", fechaPago);

    // Verificar si es una inserción o actualización
    if (id === "") {
        // Si es un nuevo pago
        Confirmacion2("Confirmación", "¿Desea registrar este pago?", function () {
            fetchPost("Pagos/InsertarPago", "text", frmData, function (res) {
                console.log("Respuesta del servidor:", res);
                if (res == 0) {
                    Errores("No se pudo registrar el pago");
                } else {
                    Bien("Pago registrado exitosamente");
                    listarPagos();
                    limpiarFormularioPago();
                    cerrarModal();
                }
            });
        });
    } else {
        // Si es una modificación de un pago existente
        Confirmacion("Confirmación", "¿Desea modificar este pago?", function () {
            fetchPost("Pagos/ActualizarPago", "text", frmData, function (res) {
                console.log("Respuesta del servidor:", res);
                if (res == 1) {
                    Bien("Pago modificado exitosamente");
                    listarPagos();
                    limpiarFormularioPago();
                    cerrarModal();
                } else {
                    Errores("No se pudo modificar el pago");
                }
            });
        });
    }
}

document.getElementById("frmGuardarPago").addEventListener("submit", GuardarPago);

function limpiarFormularioPago() {
    document.getElementById("id").value = "";
    document.getElementById("reservaId").value = "";
    document.getElementById("monto").value = "";
    document.getElementById("metodoPago").value = "";
    document.getElementById("fechaPago").value = "";
    document.getElementById("fechaInicio").value = "";
    document.getElementById("fechaFin").value = "";
    document.getElementById("estado").value = "";
}


// Función para eliminar un pago
function eliminarRegistro(id) {
    fetchGet("Pagos/RecuperarPago/?id=" + id, "json", function (data) {
        Eliminar("Confirmación", "¿Seguro que deseas eliminar el pago con ID: " + data.id + "?", function () {
            fetchGet("Pagos/EliminarPago/?id=" + id, "text", function () {
                listarPagos();
            });
        });
    });
}







