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
        public int InsertarCliente(ClienteCLS oClienteCLS)
        {
            ClienteDAL clienteDAL = new ClienteDAL();
            return clienteDAL.InsertarCliente(oClienteCLS);
         }

        public ClienteCLS recuperarCliente(int id)
        {
            ClienteDAL clienteDAL = new ClienteDAL();
            return clienteDAL.recuperarCliente(id);
        }
        public int GuardarCambiosCliente(ClienteCLS obj)
        {
            ClienteDAL clienteDAL = new ClienteDAL();
            return clienteDAL.GuardarCambiosCliente(obj);
        }

        public int EliminarCliente(int idCliente)
        {
            ClienteDAL clienteDAL = new ClienteDAL();
            return clienteDAL.EliminarCliente(idCliente);
        }

     }
}
