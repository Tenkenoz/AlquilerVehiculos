using CapaEntidad;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDatos
{
    public class ReservaDAL : ConexionSQL
    {
        public List<ReservaCLS> ListarReservas()
        {
            List<ReservaCLS> lista = new List<ReservaCLS>();

            using (SqlConnection cn = new SqlConnection(CadenaConexion))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("SELECT Id, ClienteId, VehiculoId, FechaInicio, FechaFin, Estado FROM Reservas", cn))
                    {
                        SqlDataReader reader = cmd.ExecuteReader();

                        while (reader.Read())
                        {
                            ReservaCLS reserva = new ReservaCLS
                            {
                                Id = reader.GetInt32(0),
                                ClienteId = reader.GetInt32(1),
                                VehiculoId = reader.GetInt32(2),
                                FechaInicio = reader.GetDateTime(3),
                                FechaFin = reader.GetDateTime(4),
                                Estado = reader.GetString(5)
                            };
                            lista.Add(reserva);
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error al listar reservas: " + ex.Message);
                    lista = null;
                }
            }

            return lista;
        }

        public int InsertarReserva(ReservaCLS reserva)
        {
            try
            {
                using (SqlConnection cn = new SqlConnection(CadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("INSERT INTO Reservas (ClienteId, VehiculoId, FechaInicio, FechaFin, Estado) VALUES (@ClienteId, @VehiculoId, @FechaInicio, @FechaFin, @Estado)", cn))
                    {
                        cmd.Parameters.AddWithValue("@ClienteId", reserva.ClienteId);
                        cmd.Parameters.AddWithValue("@VehiculoId", reserva.VehiculoId);
                        cmd.Parameters.AddWithValue("@FechaInicio", reserva.FechaInicio); // Asegúrate de que sea tipo Date
                        cmd.Parameters.AddWithValue("@FechaFin", reserva.FechaFin); // Asegúrate de que sea tipo Date
                        cmd.Parameters.AddWithValue("@Estado", reserva.Estado);

                        return cmd.ExecuteNonQuery(); // Retorna 1 si la inserción fue exitosa
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al insertar reserva: " + ex.Message);
                return 0; // Retorna 0 si hubo un error
            }
        }


        public ReservaCLS RecuperarReserva(int id)
        {
            ReservaCLS reserva = null;

            using (SqlConnection cn = new SqlConnection(CadenaConexion))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("SELECT Id, ClienteId, VehiculoId, FechaInicio, FechaFin, Estado FROM Reservas WHERE Id = @Id", cn))
                    {
                        cmd.Parameters.AddWithValue("@Id", id);

                        SqlDataReader reader = cmd.ExecuteReader();

                        if (reader.Read())
                        {
                            reserva = new ReservaCLS
                            {
                                Id = reader.GetInt32(0),
                                ClienteId = reader.GetInt32(1),
                                VehiculoId = reader.GetInt32(2),
                                FechaInicio = reader.GetDateTime(3),
                                FechaFin = reader.GetDateTime(4),
                                Estado = reader.GetString(5)
                            };
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error al recuperar reserva: " + ex.Message);
                }
            }

            return reserva;
        }

        public int ActualizarReserva(ReservaCLS reserva)
        {
            try
            {
                using (SqlConnection cn = new SqlConnection(CadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("UPDATE Reservas SET ClienteId = @ClienteId, VehiculoId = @VehiculoId, FechaInicio = @FechaInicio, FechaFin = @FechaFin, Estado = @Estado WHERE Id = @Id", cn))
                    {
                        cmd.Parameters.AddWithValue("@Id", reserva.Id);
                        cmd.Parameters.AddWithValue("@ClienteId", reserva.ClienteId);
                        cmd.Parameters.AddWithValue("@VehiculoId", reserva.VehiculoId);
                        cmd.Parameters.AddWithValue("@FechaInicio", reserva.FechaInicio);
                        cmd.Parameters.AddWithValue("@FechaFin", reserva.FechaFin);
                        cmd.Parameters.AddWithValue("@Estado", reserva.Estado);

                        return cmd.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al actualizar reserva: " + ex.Message);
                return 0;
            }
        }

        public int EliminarReserva(int id)
        {
            int filasAfectadas = 0;

            using (SqlConnection cn = new SqlConnection(CadenaConexion))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DELETE FROM Reservas WHERE Id = @Id", cn))
                    {
                        cmd.Parameters.AddWithValue("@Id", id);
                        filasAfectadas = cmd.ExecuteNonQuery();
                        Console.WriteLine("Filas afectadas: " + filasAfectadas);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error al eliminar reserva: " + ex.Message);
                    filasAfectadas = -1;
                }
            }

            return filasAfectadas;
        }

    }

}