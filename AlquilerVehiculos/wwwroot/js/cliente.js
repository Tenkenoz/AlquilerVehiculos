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
        propiedadId: "Id"
    };
    pintar(objCliente);

}

