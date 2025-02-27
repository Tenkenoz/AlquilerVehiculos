using Microsoft.SqlServer.Server;
using CapaEntidad;
using Microsoft.Data.SqlClient;
namespace CapaDatos
{
    public class ClienteDAL : ConexionSQL
    {
        public List<ClienteCLS> listarClientes()
        {

            List<ClienteCLS> lista = null;

            using (SqlConnection cn = new SqlConnection(CadenaConexion))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspListarClientes", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        SqlDataReader reader = cmd.ExecuteReader();

                        if (reader != null)
                        {
                            ClienteCLS objCliente;
                            lista = new List<ClienteCLS>();
                            while (reader.Read())
                            {
                                objCliente = new ClienteCLS();
                                objCliente.Id = reader.IsDBNull(0) ? 0 : reader.GetInt32(0);
                                objCliente.Nombre = reader.IsDBNull(1) ? "" : reader.GetString(1);
                                objCliente.Apellido = reader.IsDBNull(2) ? "" : reader.GetString(2);
                                objCliente.Telefono = reader.IsDBNull(3) ? "" : reader.GetString(3);
                                objCliente.Email = reader.IsDBNull(4) ? "" : reader.GetString(4);
                                lista.Add(objCliente);
                            }
                        }

                    }


                }
                catch (Exception ex)
                {
                    cn.Close();
                    lista = null;
                    Console.WriteLine(ex.Message);
                }

            }

            return lista;
        }


    }
}
