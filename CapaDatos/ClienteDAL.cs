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





        public int InsertarCliente(ClienteCLS oClienteCLS)
        {
            try
            {
                using (SqlConnection cn = new SqlConnection(CadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("spInsertarCliente", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@Nombre", oClienteCLS.Nombre);
                        cmd.Parameters.AddWithValue("@Apellido", oClienteCLS.Apellido);
                        cmd.Parameters.AddWithValue("@Telefono", oClienteCLS.Telefono);
                        cmd.Parameters.AddWithValue("@Email", oClienteCLS.Email);

                        // Ejecutamos la consulta y verificamos si se insertaron filas
                        return cmd.ExecuteNonQuery() > 0 ? 1 : 0;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al insertar cliente: " + ex.Message);
                return 0; // Error al insertar
            }
        }

        public ClienteCLS recuperarCliente(int id)
        {
            ClienteCLS oClienteCLS = new ClienteCLS();
            using (SqlConnection cn = new SqlConnection(CadenaConexion))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("spRecuperarCliente", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Id", id);

                        SqlDataReader dr = cmd.ExecuteReader();
                        if (dr.Read())
                        {
                            oClienteCLS.Id = dr.GetInt32(dr.GetOrdinal("Id"));
                            oClienteCLS.Nombre = dr.GetString(dr.GetOrdinal("Nombre"));
                            oClienteCLS.Apellido = dr.GetString(dr.GetOrdinal("Apellido"));
                            oClienteCLS.Telefono = dr.GetString(dr.GetOrdinal("Telefono"));
                            oClienteCLS.Email = dr.GetString(dr.GetOrdinal("Email"));
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error al recuperar cliente: " + ex.Message);
                }
            }
            return oClienteCLS;
        }



        public int GuardarCambiosCliente(ClienteCLS obj)
        {
            int rpta = 0;

            using (SqlConnection cn = new SqlConnection(CadenaConexion))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("ActualizarCliente10", cn))
                    {
                        cmd.Parameters.Clear(); // Limpia parámetros previos
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        // Agregar los parámetros al comando
                        cmd.Parameters.AddWithValue("@id", obj.Id); // Cambiar a @id
                        cmd.Parameters.AddWithValue("@nombre", obj.Nombre);
                        cmd.Parameters.AddWithValue("@apellido", obj.Apellido);
                        cmd.Parameters.AddWithValue("@telefono", obj.Telefono);
                        cmd.Parameters.AddWithValue("@email", obj.Email);

                        // Ejecutar el procedimiento almacenado
                        rpta = cmd.ExecuteNonQuery();
                    }
                }
                catch (Exception)
                {
                    rpta = 0;
                    throw;
                }
            }
            return rpta;
        }




        public int EliminarCliente(int id)
        {
            Console.WriteLine("ID recibido para eliminar: " + id); // <--- Aquí lo registras
            int filasAfectadas = 0;
          

            using (SqlConnection cn = new SqlConnection(CadenaConexion))
            {
                try
                {
                    cn.Open();

                    using (SqlCommand cmdEliminar = new SqlCommand("DELETE FROM Clientes WHERE Id = @id", cn))
                    {
                        cmdEliminar.Parameters.AddWithValue("@id", id);
                        filasAfectadas = cmdEliminar.ExecuteNonQuery();
                        Console.WriteLine("Filas afectadas: " + filasAfectadas);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error: " + ex.Message);
                    filasAfectadas = -1;
                }
            }

            return filasAfectadas;
        }











    }
}
