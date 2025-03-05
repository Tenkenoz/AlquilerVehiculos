using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;
using Microsoft.Data.SqlClient;

namespace CapaDatos
{
    public class SeguroDAL : ConexionSQL
    {
        public List<SeguroCLS> ListarSeguros()
        {
            List<SeguroCLS> lista = new List<SeguroCLS>();

            using (SqlConnection cn = new SqlConnection(CadenaConexion))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("SELECT Id, ReservaId, TipoSeguro, Costo FROM Seguros", cn))
                    {
                        SqlDataReader reader = cmd.ExecuteReader();

                        while (reader.Read())
                        {
                            SeguroCLS seguro = new SeguroCLS
                            {
                                Id = reader.GetInt32(0),
                                ReservaId = reader.GetInt32(1),
                                TipoSeguro = reader.GetString(2),
                                Costo = reader.GetDecimal(3)
                            };
                            lista.Add(seguro);
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error al listar seguros: " + ex.Message);
                    lista = null;
                }
            }

            return lista;
        }

        public int InsertarSeguro(SeguroCLS seguro)
        {
            try
            {
                using (SqlConnection cn = new SqlConnection(CadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("INSERT INTO Seguros (ReservaId, TipoSeguro, Costo) VALUES (@ReservaId, @TipoSeguro, @Costo)", cn))
                    {
                        cmd.Parameters.AddWithValue("@ReservaId", seguro.ReservaId);
                        cmd.Parameters.AddWithValue("@TipoSeguro", seguro.TipoSeguro);
                        cmd.Parameters.AddWithValue("@Costo", seguro.Costo);

                        int resultado = cmd.ExecuteNonQuery();
                        return resultado;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al insertar seguro: " + ex.Message);
                return 0;
            }
        }


        public SeguroCLS RecuperarSeguro(int id)
        {
            SeguroCLS seguro = null;

            using (SqlConnection cn = new SqlConnection(CadenaConexion))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("SELECT Id, ReservaId, TipoSeguro, Costo FROM Seguros WHERE Id = @Id", cn))
                    {
                        cmd.Parameters.AddWithValue("@Id", id);

                        SqlDataReader reader = cmd.ExecuteReader();

                        if (reader.Read())
                        {
                            seguro = new SeguroCLS
                            {
                                Id = reader.GetInt32(0),
                                ReservaId = reader.GetInt32(1),
                                TipoSeguro = reader.GetString(2),
                                Costo = reader.GetDecimal(3)
                            };
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error al recuperar seguro: " + ex.Message);
                }
            }

            return seguro;
        }

        public int ActualizarSeguro(SeguroCLS seguro)
        {
            try
            {
                using (SqlConnection cn = new SqlConnection(CadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("UPDATE Seguros SET ReservaId = @ReservaId, TipoSeguro = @TipoSeguro, Costo = @Costo WHERE Id = @Id", cn))
                    {
                        cmd.Parameters.AddWithValue("@Id", seguro.Id);
                        cmd.Parameters.AddWithValue("@ReservaId", seguro.ReservaId);
                        cmd.Parameters.AddWithValue("@TipoSeguro", seguro.TipoSeguro);
                        cmd.Parameters.AddWithValue("@Costo", seguro.Costo);

                        return cmd.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al actualizar seguro: " + ex.Message);
                return 0;
            }
        }

        public int EliminarSeguro(int id)
        {
            int filasAfectadas = 0;

            using (SqlConnection cn = new SqlConnection(CadenaConexion))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DELETE FROM Seguros WHERE Id = @Id", cn))
                    {
                        cmd.Parameters.AddWithValue("@Id", id);
                        filasAfectadas = cmd.ExecuteNonQuery();
                        Console.WriteLine("Filas afectadas: " + filasAfectadas);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error al eliminar seguro: " + ex.Message);
                    filasAfectadas = -1;
                }
            }

            return filasAfectadas;
        }
    }
}
