using CapaEntidad;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static CapaNegocio.EmpleadoBL;

namespace AlquilerVehiculos.Controllers
{
    public class EmpleadosController : Controller
    {
        
        public ActionResult Index()
        {
            return View();
        }


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


    }
}
