window.onload = function () {
    listarEmpleados();
};

function listarEmpleados() {
    objEmpleado = {
<<<<<<< HEAD
        url: "Empleados/listarEmpleados",
        cabeceras: ["ID", "Nombre", "Apellido", "Cargo", "Teléfono", "Email"],
=======
        url: "Empleado/listarEmpleados",
        cabeceras: ["ID", "Nombre", "Apellido", "Cargo", "Telefono", "Email"],
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
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
<<<<<<< HEAD
    set("id", "");
}

function Editar(Id) {
    var modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();

    fetchGet("Empleados/recuperarEmpleado/?id=" + Id, "json", function (data) {
=======
}

function Editar(id) {
    var modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();

    fetchGet("Empleado/recuperarEmpleado/?id=" + id, "json", function (data) {
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
        if (data) {
            set("id", data.id);
            set("nombre", data.nombre);
            set("apellido", data.apellido);
            set("cargo", data.cargo);
            set("telefono", data.telefono);
            set("email", data.email);
        } else {
<<<<<<< HEAD
            console.error("No se encontraron datos para el empleado con ID " + Id);
=======
            console.error("No se encontraron datos para el empleado con ID " + id);
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
        }
    });
}

<<<<<<< HEAD
function GuardarEmpleado() {
    let frmGuardarEmpleado = document.getElementById("frmGuardarEmpleado");
    let frmData = new FormData(frmGuardarEmpleado);

    if (get("id") === "") {
        Confirmacion2("Confirmación", "¿Desea guardar este empleado?", function () {
            fetchPost("Empleados/InsertarEmpleado", "text", frmData, function (res) {
=======
function GuardarEmpleado(event) {
    event.preventDefault();
    let frmGuardarEmpleado = document.getElementById("frmGuardarEmpleado");
    let frmData = new FormData(frmGuardarEmpleado);
    if (get("id") === "") {
        Confirmacion2("Confirmación", "¿Desea guardar este empleado?", function () {
            fetchPost("Empleado/InsertarEmpleado", "text", frmData, function (res) {
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
                console.log("Respuesta del servidor:", res);
                if (res == 0) {
                    Bien("Empleado guardado exitosamente");
                    listarEmpleados();
                    limpiar();
<<<<<<< HEAD
                    cerrarModal();
=======
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
                } else {
                    Errores("No se pudo guardar el empleado");
                    listarEmpleados();
                }
            });
        });
    } else {
        Confirmacion("Confirmación", "¿Desea modificar este empleado?", function () {
<<<<<<< HEAD
            fetchPost("Empleados/GuardarCambiosEmpleado", "text", frmData, function (res) {
=======
            fetchPost("Empleado/GuardarCambiosEmpleado", "text", frmData, function (res) {
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
                console.log("Respuesta del servidor:", res);
                if (res == 1) {
                    Bien("Empleado modificado exitosamente");
                    listarEmpleados();
                    limpiar();
<<<<<<< HEAD
                    cerrarModal();
=======
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
                } else {
                    Errores("No se pudo modificar el empleado");
                    listarEmpleados();
                }
            });
        });
    }
}

<<<<<<< HEAD
function eliminarRegistro(Id) {
    fetchGet("Empleados/recuperarEmpleado/?id=" + Id, "json", function (data) {
        Eliminar("Confirmación", "¿Seguro que deseas eliminar al empleado: " + data.nombre + " " + data.apellido + "?", function () {
            fetchGet("Empleados/EliminarEmpleado/?id=" + Id, "json", function () {
=======
function eliminarRegistro(id) {
    fetchGet("Empleado/recuperarEmpleado/?id=" + id, "json", function (data) {
        Eliminar("Confirmación", "¿Seguro que deseas eliminar al empleado: " + data.nombre + " " + data.apellido + "?", function () {
            fetchGet("Empleado/EliminarEmpleado/?id=" + id, "json", function () {
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
                listarEmpleados();
            });
        });
    });
}

async function autoRellenarEmpleado() {
    const empleadoId = document.getElementById("validationCustom01").value;
    if (empleadoId) {
<<<<<<< HEAD
        fetchGet("Empleados/recuperarEmpleado/?id=" + empleadoId, "json", function (data) {
            if (data) {
                set("validationCustom02", data.nombre);
                set("validationCustom03", data.apellido);
=======
        fetchGet("Empleado/recuperarEmpleado/?id=" + empleadoId, "json", function (data) {
            if (data) {
                set("validationCustom02", data.nombre);
                set("validationCustom03", data.apellido);
                set("validationCustom04", data.cargo);
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
            } else {
                limpiarEmpleado();
            }
        });
    }
}
