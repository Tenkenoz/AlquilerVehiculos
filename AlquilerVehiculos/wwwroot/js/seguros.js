<<<<<<< HEAD
﻿


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
=======
﻿window.onload = function () {
    listarSeguros();
};

function listarSeguros() {
    objSeguro = {
        url: "Seguro/listarSeguros",
        cabeceras: ["ID", "Reserva ID", "Tipo de Seguro", "Costo"],
        propiedades: ["id", "reservaId", "tipoSeguro", "costo"],
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
        editar: true,
        eliminar: true,
        propiedadId: "id"
    };
<<<<<<< HEAD
    pintar(objSeguro); // Llamada para pintar la tabla con los datos
}

// Función para limpiar el formulario
function limpiar() {
    set("id", "");
=======
    pintar(objSeguro);
}

function limpiar() {
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
    set("reservaId", "");
    set("tipoSeguro", "");
    set("costo", "");
}

<<<<<<< HEAD
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
=======
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
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
        }
    });
}

<<<<<<< HEAD
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
=======
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
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
                }
            });
        });
    }
}

<<<<<<< HEAD

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
=======
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
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
