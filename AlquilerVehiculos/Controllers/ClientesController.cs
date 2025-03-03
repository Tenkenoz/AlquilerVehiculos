using CapaEntidad;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CapaNegocio;

namespace AlquilerVehiculos.Controllers
{
    public class ClientesController : Controller
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
        public int InsertarCliente(ClienteCLS oClienteCLS)
        {
            ClienteBL clienteBL = new ClienteBL();
            return clienteBL.InsertarCliente(oClienteCLS);
        }
        public ClienteCLS recuperarCliente(int id)
        {
            ClienteBL clienteBL = new ClienteBL();
            return clienteBL.recuperarCliente(id);
        }

        public int GuardarCambiosCliente(ClienteCLS obj)
        {
            ClienteBL clienteBL = new ClienteBL();
            return clienteBL.GuardarCambiosCliente(obj);
        }
        public int EliminarCliente(int id)
        {
            ClienteBL clienteBL = new ClienteBL();
            return clienteBL.EliminarCliente(id);
        }
      }
}
