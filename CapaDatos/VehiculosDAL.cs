using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;
using Microsoft.Data.SqlClient;

namespace CapaDatos
{
    public class VehiculosDAL : ConexionSQL
    {
        public List<VehiculosCLS> ListarVehiculos()
        {
            List<VehiculosCLS> lista = new List<VehiculosCLS>();

            using (SqlConnection cn = new SqlConnection(CadenaConexion))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("SELECT Id, Marca, Modelo, Año, Precio, Estado FROM Vehiculos", cn))
                    {
                        SqlDataReader reader = cmd.ExecuteReader();

                        while (reader.Read())
                        {
                            VehiculosCLS vehiculo = new VehiculosCLS
                            {
                                Id = reader.GetInt32(0),
                                Marca = reader.GetString(1),
                                Modelo = reader.GetString(2),
                                Año = reader.GetInt32(3),
                                Precio = reader.GetDecimal(4),
                                Estado = reader.GetString(5)
                            };
                            lista.Add(vehiculo);
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error al listar vehículos: " + ex.Message);
                    lista = null;
                }
            }

            return lista;
        }

        public int InsertarVehiculo(VehiculosCLS vehiculo)
        {
            try
            {
                using (SqlConnection cn = new SqlConnection(CadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("INSERT INTO Vehiculos (Marca, Modelo, Año, Precio, Estado) VALUES (@Marca, @Modelo, @Año, @Precio, @Estado)", cn))
                    {
                        cmd.Parameters.AddWithValue("@Marca", vehiculo.Marca);
                        cmd.Parameters.AddWithValue("@Modelo", vehiculo.Modelo);
                        cmd.Parameters.AddWithValue("@Año", vehiculo.Año);
                        cmd.Parameters.AddWithValue("@Precio", vehiculo.Precio);
                        cmd.Parameters.AddWithValue("@Estado", vehiculo.Estado);

                        return cmd.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al insertar vehículo: " + ex.Message);
                return 0;
            }
        }

        public VehiculosCLS RecuperarVehiculo(int id)
        {
            VehiculosCLS vehiculo = null;

            using (SqlConnection cn = new SqlConnection(CadenaConexion))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("SELECT Id, Marca, Modelo, Año, Precio, Estado FROM Vehiculos WHERE Id = @Id", cn))
                    {
                        cmd.Parameters.AddWithValue("@Id", id);

                        SqlDataReader reader = cmd.ExecuteReader();

                        if (reader.Read())
                        {
                            vehiculo = new VehiculosCLS
                            {
                                Id = reader.GetInt32(0),
                                Marca = reader.GetString(1),
                                Modelo = reader.GetString(2),
                                Año = reader.GetInt32(3),
                                Precio = reader.GetDecimal(4),
                                Estado = reader.GetString(5)
                            };
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error al recuperar vehículo: " + ex.Message);
                }
            }

            return vehiculo;
        }

        public int ActualizarVehiculo(VehiculosCLS vehiculo)
        {
            try
            {
                using (SqlConnection cn = new SqlConnection(CadenaConexion))
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("UPDATE Vehiculos SET Marca = @Marca, Modelo = @Modelo, Año = @Año, Precio = @Precio, Estado = @Estado WHERE Id = @Id", cn))
                    {
                        cmd.Parameters.AddWithValue("@Id", vehiculo.Id);
                        cmd.Parameters.AddWithValue("@Marca", vehiculo.Marca);
                        cmd.Parameters.AddWithValue("@Modelo", vehiculo.Modelo);
                        cmd.Parameters.AddWithValue("@Año", vehiculo.Año);
                        cmd.Parameters.AddWithValue("@Precio", vehiculo.Precio);
                        cmd.Parameters.AddWithValue("@Estado", vehiculo.Estado);

                        return cmd.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al actualizar vehículo: " + ex.Message);
                return 0;
            }
        }

        public int EliminarVehiculo(int id)
        {
            int filasAfectadas = 0;

            using (SqlConnection cn = new SqlConnection(CadenaConexion))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("DELETE FROM Vehiculos WHERE Id = @Id", cn))
                    {
                        cmd.Parameters.AddWithValue("@Id", id);
                        filasAfectadas = cmd.ExecuteNonQuery();
                        Console.WriteLine("Filas afectadas: " + filasAfectadas);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error al eliminar vehículo: " + ex.Message);
                    filasAfectadas = -1;
                }
            }

            return filasAfectadas;
        }
    }
}
