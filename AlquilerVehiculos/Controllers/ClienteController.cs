using CapaEntidad;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CapaNegocio;

namespace AlquilerVehiculos.Controllers
{
    public class ClienteController : Controller
    {
        
        public ActionResult Index()
        {
            return View();
        }

        public List<ClienteCLS> listarClientes()
        {
            ClienteBL clienteBL = new ClienteBL();
            return clienteBL.listarClientes();
        }
      }
}
