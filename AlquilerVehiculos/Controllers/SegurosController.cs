using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CapaNegocio;
using CapaEntidad;
using CapaDatos;

namespace AlquilerVehiculos.Controllers
{
    public class SegurosController : Controller
    {
       
        public ActionResult Index()
        {
            return View();
        }

        public List<SeguroCLS> ListarSeguros()
        {
            SeguroBL seguroBL = new SeguroBL();
            return seguroBL.ListarSeguros();

        }

        [HttpPost]
        public int InsertarSeguro([FromBody] SeguroCLS seguro)
        {
            SeguroBL seguroBL = new SeguroBL();
            return seguroBL.InsertarSeguro(seguro);  // Verifica que el valor retornado por este método no sea 0
        }


        public SeguroCLS RecuperarSeguro(int id)
        {
            SeguroBL seguroBL = new SeguroBL();
            return seguroBL.RecuperarSeguro(id);
        }

        public int ActualizarSeguro(SeguroCLS seguro)
        {
            SeguroBL seguroBL = new SeguroBL();
            return seguroBL.ActualizarSeguro(seguro);
        }

        public int EliminarSeguro(int id)
        {
            SeguroBL seguroBL = new SeguroBL();
            return seguroBL.EliminarSeguro(id);
        }





    }
}
