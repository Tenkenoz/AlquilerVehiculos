using CapaEntidad;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDatos
{
    public class PagoDAL : ConexionSQL
    {
        public List<PagoCLS> ListarPagos()
        {
            List<PagoCLS> lista = new List<PagoCLS>();

            using (SqlConnection cn = new SqlConnection(CadenaConexion))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("SELECT Id, ReservaId, Monto, MetodoPago, FechaPago FROM Pagos", cn))
                    {
                        SqlDataReader reader = cmd.ExecuteReader();

                        while (reader.Read())
                        {
                            PagoCLS pago = new PagoCLS
                            {
                                Id = reader.GetInt32(0),
                                ReservaId = reader.GetInt32(1),
                                Monto = reader.GetDecimal(2),
                                MetodoPago = reader.GetString(3),
                                FechaPago = reader.GetDateTime(4)
                            };
                            lista.Add(pago);
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error al listar pagos: " + ex.Message);
                    lista = null;
                }
            }

            return lista;
        }

        // Insertar un nuevo pago
        public int InsertarPago(PagoCLS pago)
        {
            try
            {
                using (SqlConnection cn = new SqlConnection(CadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("INSERT INTO Pagos (ReservaId, Monto, MetodoPago, FechaPago) VALUES (@ReservaId, @Monto, @MetodoPago, @FechaPago)", cn))
                    {
                        cmd.Parameters.AddWithValue("@ReservaId", pago.ReservaId);
                        cmd.Parameters.AddWithValue("@Monto", pago.Monto);
                        cmd.Parameters.AddWithValue("@MetodoPago", pago.MetodoPago);
                        cmd.Parameters.AddWithValue("@FechaPago", pago.FechaPago);

                        return cmd.ExecuteNonQuery(); // Retorna 1 si la inserción fue exitosa
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al insertar pago: " + ex.Message);
                return 0; // Retorna 0 si hubo un error
            }
        }

        // Recuperar pago por Id
        public PagoCLS RecuperarPago(int id)
        {
            PagoCLS pago = null;

            using (SqlConnection cn = new SqlConnection(CadenaConexion))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("SELECT Id, ReservaId, Monto, MetodoPago, FechaPago FROM Pagos WHERE Id = @Id", cn))
                    {
                        cmd.Parameters.AddWithValue("@Id", id);

                        SqlDataReader reader = cmd.ExecuteReader();

                        if (reader.Read())
                        {
                            pago = new PagoCLS
                            {
                                Id = reader.GetInt32(0),
                                ReservaId = reader.GetInt32(1),
                                Monto = reader.GetDecimal(2),
                                MetodoPago = reader.GetString(3),
                                FechaPago = reader.GetDateTime(4)
                            };
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error al recuperar pago: " + ex.Message);
                }
            }

            return pago;
        }

        // Actualizar pago existente
        public int ActualizarPago(PagoCLS pago)
        {
            try
            {
                using (SqlConnection cn = new SqlConnection(CadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("UPDATE Pagos SET ReservaId = @ReservaId, Monto = @Monto, MetodoPago = @MetodoPago, FechaPago = @FechaPago WHERE Id = @Id", cn))
                    {
                        cmd.Parameters.AddWithValue("@Id", pago.Id);
                        cmd.Parameters.AddWithValue("@ReservaId", pago.ReservaId);
                        cmd.Parameters.AddWithValue("@Monto", pago.Monto);
                        cmd.Parameters.AddWithValue("@MetodoPago", pago.MetodoPago);
                        cmd.Parameters.AddWithValue("@FechaPago", pago.FechaPago);

                        return cmd.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al actualizar pago: " + ex.Message);
                return 0;
            }
        }

        // Eliminar un pago
        public int EliminarPago(int id)
        {
            int filasAfectadas = 0;

            using (SqlConnection cn = new SqlConnection(CadenaConexion))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DELETE FROM Pagos WHERE Id = @Id", cn))
                    {
                        cmd.Parameters.AddWithValue("@Id", id);
                        filasAfectadas = cmd.ExecuteNonQuery();
                        Console.WriteLine("Filas afectadas: " + filasAfectadas);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error al eliminar pago: " + ex.Message);
                    filasAfectadas = -1;
                }
            }

            return filasAfectadas;
        }
    }
}
