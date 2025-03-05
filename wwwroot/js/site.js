// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


jQuery('.menu-toggle').click(function () {
    jQuery('.contenedor').toggleClass('ancho-min');
    if (window.matchMedia('(min-width: 1017px)').matches) {
        /* Changes when we reach the min-width  */


    } else {
        /* Reset for CSS changes – Still need a better way to do this! */
        if (!$('.contenedor').hasClass("ancho-min")) {
            // $('.main').css('margin-left', '250px');
        }
        else {
            // $('.main').css('margin-left', '70px');
        }
    }

});

jQuery('.menu-boton').click(function () {
    jQuery('.menu-nav-seg').toggleClass('open-menu-nav-seg');
    jQuery('.menu-boton i').toggleClass('fa-caret-right');
    jQuery('.menu-boton i').toggleClass('fa-caret-down');
});

(function ($) {

    /*
    * We need to turn it into a function.
    * To apply the changes both on document ready and when we resize the browser.
    */

    function mediaSize() {
        /* Set the matchMedia  992 + 250*/
        if (window.matchMedia('(min-width: 1017px)').matches) {
            /* Changes when we reach the min-width  */
            jQuery('.contenedor').removeClass('ancho-min');
            // $('.sidebar').css('position', 'static');
            // $('.main').css('margin-left', '0');

        } else {
            /* Reset for CSS changes – Still need a better way to do this! */
            jQuery('.contenedor').addClass('ancho-min');
            // $('.sidebar').css('position', 'absolute');
            // $('.main').css('margin-left', '70px');
        }
    };

    /* Call the function */
    mediaSize();
    /* Attach the function to the resize event listener */
    window.addEventListener('resize', mediaSize, false);

})(jQuery);

async function fetchAndCountData(url, tipoRespuesta, frm, callback) {
    try {
        let urlCompleta = `${window.location.protocol}//${window.location.host}/${url}`;
        let res = await fetch(urlCompleta, {
            method: "POST",
            body: frm
        });

        if (tipoRespuesta === "json") {
            res = await res.json();
        } else if (tipoRespuesta === "text") {
            res = await res.text();
        }

        callback(res);
    } catch (e) {
        console.error("Error en POST:", e.message);
        alert("Ocurrió un problema en POST");
    }
}

async function updateCounters() {
    const frm = new FormData(); // Si necesitas enviar datos adicionales, agrégalo aquí.

    // Llamadas para obtener los datos de cada cuadro
    await fetchAndCountData("Clientes/listarClientes", "json", frm, (res) => {
        document.getElementById("clientesCount").innerText = res.length;
    });

    await fetchAndCountData("Reservas/listarReservas", "json", frm, (res) => {
        document.getElementById("reservasCount").innerText = res.length;
    });

    await fetchAndCountData("Pagos/ListarPagos", "json", frm, (res) => {
        document.getElementById("pagosCount").innerText = res.length;
    });

    await fetchAndCountData("Vehiculos/listarVehiculos", "json", frm, (res) => {
        document.getElementById("vehiculosCount").innerText = res.length;
    });

    await fetchAndCountData("Seguros/listarSeguros", "json", frm, (res) => {
        document.getElementById("seguroCount").innerText = res.length;
    });

    await fetchAndCountData("Empleados/listarEmpleados", "json", frm, (res) => {
        document.getElementById("empleadosCount").innerText = res.length;
    });
}


// Llamar a la función para actualizar los contadores al cargar la página
updateCounters();
