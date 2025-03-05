function get(idControl) {
    return document.getElementById(idControl).value;
}

function set(idControl, valor) {
    document.getElementById(idControl).value = valor;
}

function setN(namecontrol, valor) {
    document.getElementsByName(namecontrol)[0].value = valor;
}

function LimpiarDatos(idFormulario) {
    let elementosName = document.querySelectorAll('#' + idFormulario + " [name]");
    let elementoActual;
    let elementoName;
    for (let i = 0; i < elementosName.length; i++) {
        elementoActual = elementosName[i];
        elementoName = elementoActual.name;
        setN(elementoName, "");
    }
}

async function fetchGet(url, tipoRespuesta, callback) {
    try {
        let urlCompleta = `${window.location.protocol}//${window.location.host}/${url}`;
        console.log(urlCompleta);

        let res = await fetch(urlCompleta);
        if (!res.ok) {
            throw new Error('La respuesta del servidor no fue satisfactoria.');
        }

        // Verificar si la respuesta tiene contenido antes de intentar convertirla
        const resText = await res.text(); // Obtener el texto de la respuesta
        let data;
        if (resText) {
            data = tipoRespuesta === "json" ? JSON.parse(resText) : resText;
        } else {
            throw new Error('La respuesta del servidor está vacía.');
        }

        callback(data);
    } catch (e) {
        alert("Ocurrió un problema: " + e.message);
    }
}


async function fetchPost(url, tipoRespuesta, frm, callback) {
    const urlCompleta = `${window.location.protocol}//${window.location.host}/${url}`;
    console.log("URL completa:", urlCompleta);  // Depuración

    try {
        const res = await fetch(urlCompleta, {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Asegura que se envíen datos en formato JSON
            },
            body: JSON.stringify(frm)  // Convierte los datos del formulario a JSON
        });

        if (!res.ok) {
            throw new Error('La respuesta del servidor no fue satisfactoria.');
        }

        const resText = await res.text();  // Obtener el texto de la respuesta
        let data;
        if (resText) {
            data = tipoRespuesta === "json" ? JSON.parse(resText) : resText;
        } else {
            throw new Error('La respuesta del servidor está vacía.');
        }

        console.log("Respuesta del servidor:", data);  // Depuración
        callback(data);  // Llamar al callback con la respuesta
    } catch (e) {
        console.error("Error en POST:", e.message);  // Añadido para depuración
        console.log(e)
        alert("Ocurrió un problema en POST");
        callback(null);  // Llamar al callback con null en caso de error
    }
}



let objConfiguracionGlobal;

//{url: "", cebeceras[], propiedades: []}
function pintar(objConfiguracion) {
    objConfiguracionGlobal = objConfiguracion;
    if (objConfiguracionGlobal.divContenedorTabla == undefined) {
        objConfiguracionGlobal.divContenedorTabla = "divContenedorTabla"
    }

    if (objConfiguracionGlobal.editar == undefined) {
        objConfiguracionGlobal.editar = false;
    }

    if (objConfiguracionGlobal.eliminar == undefined) {
        objConfiguracionGlobal.eliminar = false;
    }

    if (objConfiguracionGlobal.propiedadId == undefined) {
        objConfiguracionGlobal.propiedadId = "";
    }

    fetchGet(objConfiguracion.url, "json", function (res) {
        let contenido = "";

        contenido = "<div id='divContenedorTabla'>"
        contenido += generarTabla(res);
        contenido += "</div>"
        document.getElementById("divTable").innerHTML = contenido;
        let table = document.getElementById("myTable");
        if (table) {
            new DataTable("#myTable", { responsive: true });
        }
    })
}
function generarTabla(res) {
    let contenido = "";
    let cabeceras = objConfiguracionGlobal.cabeceras;
    let propiedades = objConfiguracionGlobal.propiedades;
    contenido += "<div id='tabla-container'>";
    contenido += "<table class='table' id='myTable'>";
    contenido += "<thead>";
    contenido += "<tr>";

    for (let i = 0; i < cabeceras.length; i++) {
        contenido += "<th>" + cabeceras[i] + "</th>"
    }


    if (objConfiguracionGlobal.editar == true || objConfiguracionGlobal.eliminar == true) {
        contenido += "<th>Operaciones</th>";
    }

    //contenido += "<th>Id Tipo Medicamento</th>";
    //contenido += "<th>Nombre</th>";
    //contenido += "<th>Descripción</th>";
    contenido += "</tr>";
    contenido += "</thead>";

    let numRegistros = res.length;
    let obj;
    let propiedadActual;
    contenido += "<tbody>";

    for (let i = 0; i < numRegistros; i++) {
        obj = res[i];
        contenido += "<tr>";
        for (let j = 0; j < propiedades.length; j++) {
            propiedadActual = propiedades[j];
            contenido += "<td>" + obj[propiedadActual] + "</td>";
        }

        if (objConfiguracionGlobal.editar == true || objConfiguracionGlobal.eliminar == true) {

            let propiedadID = objConfiguracionGlobal.propiedadId;



            contenido += "<td>";
            if (objConfiguracionGlobal.editar == true) {
                contenido += `<i onclick="Editar(${obj[propiedadID]})" class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
    </svg> </i>`
            }



            if (objConfiguracionGlobal.eliminar == true) {
                contenido += `<i onclick="eliminarRegistro(${obj[propiedadID]})" class="btn btn-danger"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
        </svg> </i>`
            }
            contenido += "</td>";
        }

        contenido += "</tr>";
    }

    contenido += "</tbody>";
    contenido += "</table>";
    contenido += "</div>";
    return contenido;
}



function Confirmacion(titulo = "Confirmacion", text = "Desea guardar los cambios", callaback) {
    Swal.fire({
        title: titulo,
        text: "Seguro quieres modificar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, quiero modificar"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Moddificado",
                text: "El medicamento se ha modificado.",
                icon: "success"
            });
            callaback();
        }
    });
}
function Confirmacion2(titulo = "Confirmación", text = "¿Desea guardar el cliente?", callback) {
    Swal.fire({
        title: titulo,
        text: text,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, guardar"
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    });
}
function Eliminar(titulo = "Confirmacion", text = "Desea Eliminar ", callaback) {
    Swal.fire({
        title: titulo,
        text: "Seguro quieres eliminar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, quiero eliminar"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Eliminado",
                text: "El medicamento se ha eliminado.",
                icon: "success"
            });
            callaback();
        }
    });
}

function Errores(text = "No se pudo") {
    Swal.fire({
        position: "top-end",
        icon: "error",
        title: text,
        showConfirmButton: false,
        timer: 1500
    });
}

function Bien(text = "Si se pudo") {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: text,
        showConfirmButton: false,
        timer: 1500
    });
}





document.addEventListener("DOMContentLoaded", function () {
    let table = document.getElementById("myTable");
    new DataTable("#myTable", { responsive: true });

});

function cerrarModal() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('myModal'));
    modal.hide();
}
