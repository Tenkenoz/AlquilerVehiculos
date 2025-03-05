window.onload = function () {
    listarVehiculos();
};

function listarVehiculos() {
    objVehiculo = {
        url: "Vehiculos/listarVehiculos",
        cabeceras: ["ID", "Marca", "Modelo", "Año", "Precio","Estado"],
        propiedades: ["id", "marca", "modelo", "año", "precio","estado"],
        editar: true,
        eliminar: true,
        propiedadId: "id"
    };
    pintar(objVehiculo);
}

function limpiar() {
    set("marca", "");
    set("modelo", "");
    set("año", "");
    set("id", "");
    set("estado", "");
    set("precio", "");
}

function Editar(Id) {
    var modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();

    fetchGet("Vehiculos/recuperarVehiculo/?id=" + Id, "json", function (data) {
        if (data) {
            set("id", data.id);
            set("marca", data.marca);
            set("modelo", data.modelo);
            set("año", data.año);
            set("estado", data.estado);
            set("precio", data.precio);
        } else {
            console.error("No se encontraron datos para el vehículo con ID " + Id)
        }
});
}

function GuardarVehiculo() {
    let frmGuardarVehiculo = document.getElementById("frmGuardarVehiculo");
    let frmData = new FormData(frmGuardarVehiculo);
    if (get("id") === "") {
        Confirmacion2("Confirmación", "¿Desea guardar este vehículo?", function () {
            fetchPost("Vehiculos/InsertarVehiculo", "text", frmData, function (res) {
                console.log("Respuesta del servidor:", res);
                if (res != 0) {
                    Bien("Vehículo guardado exitosamente");
                    listarVehiculos();
                    limpiar();
                    cerrarModal();
                } else {
                    Errores("No se pudo guardar el vehículo");
                    listarVehiculos();
                }
            });
        });
    } else {
        Confirmacion("Confirmación", "¿Desea modificar este vehículo?", function () {
            fetchPost("Vehiculos/ActualizarVehiculo", "text", frmData, function (res) {
                console.log("Respuesta del servidor:", res);
                if (res == 1) {
                    Bien("Vehículo modificado exitosamente");
                    listarVehiculos();
                    limpiar();
                    cerrarModal();
                } else {
                    Errores("No se pudo modificar el vehículo");
                    listarVehiculos();
                }
            });
        });
    }
}

function eliminarRegistro(Id) {
    fetchGet("Vehiculos/recuperarVehiculo/?id=" + Id, "json", function (data) {
        Eliminar("Confirmación", "¿Seguro que deseas eliminar el vehículo: " + data.Marca + " " + data.Modelo + "?", function () {
            console.log(data);
            fetchGet("Vehiculos/EliminarVehiculo/?id=" + Id, "json", function () {
                listarVehiculos();
            });
        });
    });
}

async function autoRellenarVehiculo() {
    const vehiculoId = document.getElementById("validationCustom01").value;
    if (vehiculoId) {
        fetchGet("Vehiculos/recuperarVehiculo/?id=" + vehiculoId, "json", function (data) {
            if (data) {
                set("validationCustom02", data.Marca);
                set("validationCustom03", data.Modelo);
            } else {
                limpiarVehiculo();
            }
        });
    }
}
