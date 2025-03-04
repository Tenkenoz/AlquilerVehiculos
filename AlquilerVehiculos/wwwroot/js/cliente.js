window.onload = function () {
    listarClientes();
};

function listarClientes() {
    objCliente = {
        url: "Cliente/listarClientes",
        cabeceras: ["ID","Nombre","Apellido","Telefono","Email"],
        propiedades: ["id", "nombre", "apellido", "telefono", "email"],
        editar: true,
        eliminar: true,
        propiedadId: "id"
    };
    pintar(objCliente);

}

function limpiar() {
    set("nombre", "");
    set("apellido", "");
    set("telefono", "");
    set("email", "");
}

function Editar(id) {
    var modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();

 
    fetchGet("Cliente/recuperarCliente/?id=" + id, "json", function (data) {
        if (data) {
            set("id", data.id); 
            set("nombre", data.nombre);
            set("apellido", data.apellido);
            set("telefono", data.telefono);
            set("email", data.email);
        } else {
            console.error("No se encontraron datos para el cliente con ID " + id);
        }
    });
}



function GuardarCliente(event) {
    event.preventDefault(); // ✅ Esto evita el envío automático del formulario
    let frmGuardarCliente = document.getElementById("frmGuardarCliente");
    let frmData = new FormData(frmGuardarCliente);
    if (get("id") === "") {
        Confirmacion2("Confirmación", "¿Desea guardar este cliente?", function () {
            fetchPost("Empleados/InsertarEmpleado", "text", frmData, function (res) {
                console.log("Respuesta del servidor:", res);
                if (res == "1") { // Ajusta según lo que realmente devuelva tu backend
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
        Confirmacion("Confirmación", "¿Desea modificar este cliente?", function () {
            fetchPost("Cliente/GuardarCambiosCliente", "text", frmData, function (res) {
                console.log("Respuesta del servidor:", res);
                if (res == 1) {
                    Bien("Cliente modificado exitosamente");
                    listarClientes();
                    limpiar();
                } else {
                    Errores("No se pudo modificar el cliente");
                    listarClientes();
                }
            });
        });
    }
}

function eliminarRegistro(id) {
    // Recuperamos la información del cliente
    fetchGet("Cliente/recuperarCliente/?id=" + id, "json", function (data) {
        // Mostramos la confirmación para eliminar
        Eliminar("Confirmación", "¿Seguro que deseas eliminar al cliente: " + data.nombre + " " + data.apellido + "?", function () {
            // Realizamos la llamada para eliminar el cliente
            fetchGet("Cliente/EliminarCliente/?id=" + id, "json", function () {
                listarClientes(); // Actualiza la lista de clientes después de eliminar
            });
        });
    });
}


