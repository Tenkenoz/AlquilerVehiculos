using CapaDatos;
using CapaEntidad;
namespace CapaNegocio
{
    public class ClienteBL
    {
        public List<ClienteCLS> listarClientes()
        {
            ClienteDAL clienteDAL = new ClienteDAL();
            return clienteDAL.listarClientes();
        }

     }
}
