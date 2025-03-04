<<<<<<< HEAD
﻿using CapaEntidad;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static CapaNegocio.EmpleadoBL;
=======
﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5

namespace AlquilerVehiculos.Controllers
{
    public class EmpleadosController : Controller
    {
<<<<<<< HEAD
        
=======
        // GET: Empleados
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
        public ActionResult Index()
        {
            return View();
        }

<<<<<<< HEAD

        public List<EmpleadoCLS> ListarEmpleados()
        {
            EmpleadosBL empleadosBL = new EmpleadosBL();
            return empleadosBL.ListarEmpleados();
        }

        public int InsertarEmpleado(EmpleadoCLS oEmpleadoCLS)
        {
            EmpleadosBL empleadosBL = new EmpleadosBL();
            return empleadosBL.InsertarEmpleado(oEmpleadoCLS);
        }

        public EmpleadoCLS RecuperarEmpleado(int id)
        {
            EmpleadosBL empleadosBL = new EmpleadosBL();
            return empleadosBL.RecuperarEmpleado(id);
        }

        public int GuardarCambiosEmpleado(EmpleadoCLS obj)
        {
            EmpleadosBL empleadosBL = new EmpleadosBL();
            return empleadosBL.ActualizarEmpleado(obj);
        }

        public int EliminarEmpleado(int id)
        {
            EmpleadosBL empleadosBL = new EmpleadosBL();
            return empleadosBL.EliminarEmpleado(id);
        }


=======
        // GET: Empleados/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Empleados/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Empleados/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Empleados/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Empleados/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Empleados/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Empleados/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
    }
}
