using CapaDatos;
using CapaEntidad;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AlquilerVehiculos.Controllers
{
    public class VehiculosController : Controller
    {

        public ActionResult Index()
        {
            return View();
        }

        public List<VehiculosCLS> ListarVehiculos()
        {
            VehiculosDAL vehiculosDAL = new VehiculosDAL();
            return vehiculosDAL.ListarVehiculos();
        }
        public int InsertarVehiculo(VehiculosCLS vehiculo)
        {
            VehiculosDAL vehiculosDAL = new VehiculosDAL();
            return vehiculosDAL.InsertarVehiculo(vehiculo);
        }
        public VehiculosCLS RecuperarVehiculo(int id)
        {
            VehiculosDAL vehiculosDAL = new VehiculosDAL();
            return vehiculosDAL.RecuperarVehiculo(id);
        }
        public int ActualizarVehiculo(VehiculosCLS vehiculo)
        {
            VehiculosDAL vehiculosDAL = new VehiculosDAL();
            return vehiculosDAL.ActualizarVehiculo(vehiculo);
        }
        public int EliminarVehiculo(int id)
        {
            VehiculosDAL vehiculosDAL = new VehiculosDAL();
            return vehiculosDAL.EliminarVehiculo(id);
        }


    }
}
