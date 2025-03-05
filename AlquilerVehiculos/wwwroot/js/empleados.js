window.onload = function () {
    listarEmpleados();
};

function listarEmpleados() {
    objEmpleado = {
        url: "Empleados/listarEmpleados",
        cabeceras: ["ID", "Nombre", "Apellido", "Cargo", "Teléfono", "Email"],
        propiedades: ["id", "nombre", "apellido", "cargo", "telefono", "email"],
        editar: true,
        eliminar: true,
        propiedadId: "id"
    };
    pintar(objEmpleado);
}

function limpiar() {
    set("nombre", "");
    set("apellido", "");
    set("cargo", "");
    set("telefono", "");
    set("email", "");
    set("id", "");
}

function Editar(Id) {
    var modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();

    fetchGet("Empleados/recuperarEmpleado/?id=" + Id, "json", function (data) {
        if (data) {
            set("id", data.id);
            set("nombre", data.nombre);
            set("apellido", data.apellido);
            set("cargo", data.cargo);
            set("telefono", data.telefono);
            set("email", data.email);
        } else {
            console.error("No se encontraron datos para el empleado con ID " + Id);
        }
    });
}

function GuardarEmpleado() {
    let frmGuardarEmpleado = document.getElementById("frmGuardarEmpleado");
    let frmData = new FormData(frmGuardarEmpleado);

    if (get("id") === "") {
        Confirmacion2("Confirmación", "¿Desea guardar este empleado?", function () {
            fetchPost("Empleados/InsertarEmpleado", "text", frmData, function (res) {
                console.log("Respuesta del servidor:", res);
                if (res != 0) {
                    Bien("Empleado guardado exitosamente");
                    listarEmpleados();
                    limpiar();
                    cerrarModal();
                } else {
                    Errores("No se pudo guardar el empleado");
                    listarEmpleados();
                }
            });
        });
    } else {
        Confirmacion("Confirmación", "¿Desea modificar este empleado?", function () {
            fetchPost("Empleados/GuardarCambiosEmpleado", "text", frmData, function (res) {
                console.log("Respuesta del servidor:", res);
                if (res == 1) {
                    Bien("Empleado modificado exitosamente");
                    listarEmpleados();
                    limpiar();
                    cerrarModal();
                } else {
                    Errores("No se pudo modificar el empleado");
                    listarEmpleados();
                }
            });
        });
    }
}

function eliminarRegistro(Id) {
    fetchGet("Empleados/recuperarEmpleado/?id=" + Id, "json", function (data) {
        Eliminar("Confirmación", "¿Seguro que deseas eliminar al empleado: " + data.nombre + " " + data.apellido + "?", function () {
            fetchGet("Empleados/EliminarEmpleado/?id=" + Id, "json", function () {
                listarEmpleados();
            });
        });
    });
}

async function autoRellenarEmpleado() {
    const empleadoId = document.getElementById("validationCustom01").value;
    if (empleadoId) {
        fetchGet("Empleados/recuperarEmpleado/?id=" + empleadoId, "json", function (data) {
            if (data) {
                set("validationCustom02", data.nombre);
                set("validationCustom03", data.apellido);
                set("validationCustom04", data.cargo);
            } else {
                limpiarEmpleado();
            }
        });
    }
}
