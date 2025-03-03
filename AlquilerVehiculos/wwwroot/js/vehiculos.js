window.onload = function () {
    listarVehiculos();
};

function listarVehiculos() {
    objVehiculo = {
        url: "Vehiculos/ListarVehiculos",
        cabeceras: ["ID", "Marca", "Modelo", "Año", "Precio", "Estado"],
        propiedades: ["id", "marca", "modelo", "año", "precio", "estado"],
        editar: true,
        eliminar: true,
        propiedadId: "id"
    };
    pintar(objVehiculo);
}

function limpiarVehiculo() {
    set("id", "");
    set("marca", "");
    set("modelo", "");
    set("año", "");
    set("precio", "");
    set("estado", "");
}

function EditarVehiculo(id) {
    var modal = new bootstrap.Modal(document.getElementById('modalVehiculo'));
    modal.show();

    fetchGet("Vehiculos/RecuperarVehiculo/?id=" + id, "json", function (data) {
        if (data) {
            set("id", data.id);
            set("marca", data.marca);
            set("modelo", data.modelo);
            set("año", data.año);
            set("precio", data.precio);
            set("estado", data.estado);
        } else {
            console.error("No se encontraron datos para el vehículo con ID " + id);
        }
    });
}

function GuardarVehiculo(event) {
    event.preventDefault();
    let frmGuardarVehiculo = document.getElementById("frmGuardarVehiculo");
    let frmData = new FormData(frmGuardarVehiculo);

    if (get("id") === "") {
        Confirmacion2("Confirmación", "¿Desea guardar este vehículo?", function () {
            fetchPost("Vehiculos/InsertarVehiculo", "text", frmData, function (res) {
                console.log("Respuesta del servidor:", res);
                if (res == 1) {
                    Bien("Vehículo guardado exitosamente");
                    listarVehiculos();
                    limpiarVehiculo();
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
                    limpiarVehiculo();
                } else {
                    Errores("No se pudo modificar el vehículo");
                    listarVehiculos();
                }
            });
        });
    }
}

function eliminarRegistro(id) {
    fetchGet("Vehiculos/RecuperarVehiculo/?id=" + id, "json", function (data) {
        Eliminar("Confirmación", "¿Seguro que deseas eliminar el vehículo: " + data.marca + " " + data.modelo + "?", function () {
            fetchGet("Vehiculos/EliminarVehiculo/?id=" + id, "json", function () {
                listarVehiculos();
            });
        });
    });
}

async function autoRellenarVehiculo() {
    const vehiculoId = document.getElementById("validationCustom04").value;
    if (vehiculoId) {
        fetchGet("Vehiculos/RecuperarVehiculo/?id=" + vehiculoId, "json", function (data) {
            if (data) {
                set("validationCustom05", data.marca);
                set("validationCustom06", data.modelo);
            } else {
                limpiarVehiculo();
            }
        });
    }
}

