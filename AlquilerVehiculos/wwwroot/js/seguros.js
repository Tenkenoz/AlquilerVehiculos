


function formatDateToInput(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ("0" + (d.getMonth() + 1)).slice(-2); // Asegura que el mes tenga dos dígitos
    const day = ("0" + d.getDate()).slice(-2); // Asegura que el día tenga dos dígitos
    return `${year}-${month}-${day}`; // Devuelve la fecha en formato "YYYY-MM-DD"
}
function autoRellenarReserva() {
    const reservaId = get("reservaId");

    if (reservaId) {
        fetchGet(`Reservas/recuperarReserva/?id=${reservaId}`, "json", function (data) {
            if (!data) {
                console.error("La respuesta del servidor está vacía o mal formada.");
            } else {
                // Autocompletar los campos si se encuentra la reserva
                set("fechaInicio", formatDateToInput(data.fechaInicio));
                set("fechaFin", formatDateToInput(data.fechaFin));
                set("estado", data.estado);
            }
        });
    }
}

// Agregar el evento de entrada para autocompletar
document.getElementById("reservaId").addEventListener("input", autoRellenarReserva);

window.onload = function () {
    listarSeguros();
};

// Función para listar los seguros
function listarSeguros() {
    const objSeguro = {
        url: "Seguros/ListarSeguros",
        cabeceras: ["ID", "Tipo de Seguro", "Costo", "Reserva ID"], // Cabeceras que se mostrarán
        propiedades: ["id", "tipoSeguro", "costo", "reservaId"],   // Propiedades que mapean a las cabeceras
        editar: true,
        eliminar: true,
        propiedadId: "id"
    };
    pintar(objSeguro); // Llamada para pintar la tabla con los datos
}

// Función para limpiar el formulario
function limpiar() {
    set("id", "");
    set("reservaId", "");
    set("tipoSeguro", "");
    set("costo", "");
}

// Función para editar un seguro
function Editar(id) {
    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();

    fetchGet(`Seguros/recuperarSeguro/?id=${id}`, "json", function (data) {
        if (!data) {
            console.error("La respuesta del servidor está vacía o mal formada.");
        } else {
            set("id", data.id);
            set("reservaId", data.reservaId);  // Asignamos correctamente ReservaId
            set("tipoSeguro", data.tipoSeguro);
            set("costo", data.costo);
        }
    });
}

// Función para guardar un seguro
function GuardarSeguro() {
    const frmGuardarSeguro = document.getElementById("frmGuardarSeguro"); // Usar el ID correcto
    const frmData = new FormData(frmGuardarSeguro);

    if (get("id") === "") {  // Inserción
        Confirmacion2("Confirmación", "¿Desea guardar este seguro?", function () {
            fetchPost("Seguros/InsertarSeguro", "text", frmData, function (res) {
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
    } else {  // Actualización
        Confirmacion("Confirmación", "¿Desea modificar este seguro?", function () {
            fetchPost("Seguros/ActualizarSeguro", "text", frmData, function (res) {
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


// Función para cerrar el modal
function cerrarModal() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('myModal'));
    modal.hide();
}

// Funciones para establecer y obtener valores de los campos
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

// Limpiar campos al abrir el modal
document.getElementById('myModal').addEventListener('shown.bs.modal', function () {
    limpiar();
});
