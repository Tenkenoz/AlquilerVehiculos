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
<<<<<<< HEAD
                    using (SqlCommand cmd = new SqlCommand("SELECT Id, ClienteId, VehiculosId, FechaInicio, FechaFin, Estado FROM Reservas", cn))
=======
                    using (SqlCommand cmd = new SqlCommand("SELECT Id, ClienteId, VehiculoId, FechaInicio, FechaFin, Estado FROM Reservas", cn))
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
                    {
                        SqlDataReader reader = cmd.ExecuteReader();

                        while (reader.Read())
                        {
                            ReservaCLS reserva = new ReservaCLS
                            {
                                Id = reader.GetInt32(0),
                                ClienteId = reader.GetInt32(1),
<<<<<<< HEAD
                                VehiculosId = reader.GetInt32(2),
=======
                                VehiculoId = reader.GetInt32(2),
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
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
<<<<<<< HEAD
                    using (SqlCommand cmd = new SqlCommand("INSERT INTO Reservas (ClienteId, VehiculosId, FechaInicio, FechaFin, Estado) VALUES (@ClienteId, @VehiculosId, @FechaInicio, @FechaFin, @Estado)", cn))
                    {
                        cmd.Parameters.AddWithValue("@ClienteId", reserva.ClienteId);
                        cmd.Parameters.AddWithValue("@VehiculosId", reserva.VehiculosId);
                        cmd.Parameters.AddWithValue("@FechaInicio", reserva.FechaInicio);
                        cmd.Parameters.AddWithValue("@FechaFin", reserva.FechaFin);
                        cmd.Parameters.AddWithValue("@Estado", reserva.Estado);

                        // Depuración
                        Console.WriteLine($"Insertando reserva con ClienteId: {reserva.ClienteId}, VehiculosId: {reserva.VehiculosId}, FechaInicio: {reserva.FechaInicio}, FechaFin: {reserva.FechaFin}, Estado: {reserva.Estado}");

                        int resultado = cmd.ExecuteNonQuery();
                        return resultado;
=======
                    using (SqlCommand cmd = new SqlCommand("INSERT INTO Reservas (ClienteId, VehiculoId, FechaInicio, FechaFin, Estado) VALUES (@ClienteId, @VehiculoId, @FechaInicio, @FechaFin, @Estado)", cn))
                    {
                        cmd.Parameters.AddWithValue("@ClienteId", reserva.ClienteId);
                        cmd.Parameters.AddWithValue("@VehiculoId", reserva.VehiculoId);
                        cmd.Parameters.AddWithValue("@FechaInicio", reserva.FechaInicio); // Asegúrate de que sea tipo Date
                        cmd.Parameters.AddWithValue("@FechaFin", reserva.FechaFin); // Asegúrate de que sea tipo Date
                        cmd.Parameters.AddWithValue("@Estado", reserva.Estado);

                        return cmd.ExecuteNonQuery(); // Retorna 1 si la inserción fue exitosa
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al insertar reserva: " + ex.Message);
<<<<<<< HEAD
                return 0;
=======
                return 0; // Retorna 0 si hubo un error
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
            }
        }


<<<<<<< HEAD

=======
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
        public ReservaCLS RecuperarReserva(int id)
        {
            ReservaCLS reserva = null;

            using (SqlConnection cn = new SqlConnection(CadenaConexion))
            {
                try
                {
                    cn.Open();
<<<<<<< HEAD
                    using (SqlCommand cmd = new SqlCommand("SELECT Id, ClienteId, VehiculosId, FechaInicio, FechaFin, Estado FROM Reservas WHERE Id = @Id", cn))
=======
                    using (SqlCommand cmd = new SqlCommand("SELECT Id, ClienteId, VehiculoId, FechaInicio, FechaFin, Estado FROM Reservas WHERE Id = @Id", cn))
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
                    {
                        cmd.Parameters.AddWithValue("@Id", id);

                        SqlDataReader reader = cmd.ExecuteReader();

                        if (reader.Read())
                        {
                            reserva = new ReservaCLS
                            {
                                Id = reader.GetInt32(0),
                                ClienteId = reader.GetInt32(1),
<<<<<<< HEAD
                                VehiculosId = reader.GetInt32(2),
=======
                                VehiculoId = reader.GetInt32(2),
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
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
<<<<<<< HEAD
                    using (SqlCommand cmd = new SqlCommand("UPDATE Reservas SET ClienteId = @ClienteId, VehiculosId = @VehiculosId, FechaInicio = @FechaInicio, FechaFin = @FechaFin, Estado = @Estado WHERE Id = @Id", cn))
                    {
                        cmd.Parameters.AddWithValue("@Id", reserva.Id);
                        cmd.Parameters.AddWithValue("@ClienteId", reserva.ClienteId);
                        cmd.Parameters.AddWithValue("@VehiculosId", reserva.VehiculosId);
=======
                    using (SqlCommand cmd = new SqlCommand("UPDATE Reservas SET ClienteId = @ClienteId, VehiculoId = @VehiculoId, FechaInicio = @FechaInicio, FechaFin = @FechaFin, Estado = @Estado WHERE Id = @Id", cn))
                    {
                        cmd.Parameters.AddWithValue("@Id", reserva.Id);
                        cmd.Parameters.AddWithValue("@ClienteId", reserva.ClienteId);
                        cmd.Parameters.AddWithValue("@VehiculoId", reserva.VehiculoId);
>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
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
<<<<<<< HEAD
=======

>>>>>>> 5ddcd363148b29cb360c355f3d7e237cf15f24b5
}
