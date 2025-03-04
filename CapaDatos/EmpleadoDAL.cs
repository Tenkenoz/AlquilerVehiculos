using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;
using Microsoft.Data.SqlClient;


namespace CapaDatos
    {
        public class EmpleadosDAL : ConexionSQL
        {
            public List<EmpleadoCLS> ListarEmpleados()
            {
                List<EmpleadoCLS> lista = new List<EmpleadoCLS>();

                using (SqlConnection cn = new SqlConnection(CadenaConexion))
                {
                    try
                    {
                        cn.Open();
                        using (SqlCommand cmd = new SqlCommand("SELECT Id, Nombre, Apellido, Cargo, Telefono, Email FROM Empleados", cn))
                        {
                            SqlDataReader reader = cmd.ExecuteReader();

                            while (reader.Read())
                            {
                                EmpleadoCLS empleado = new EmpleadoCLS
                                {
                                    Id = reader.GetInt32(0),
                                    Nombre = reader.GetString(1),
                                    Apellido = reader.GetString(2),
                                    Cargo = reader.GetString(3),
                                    Telefono = reader.GetString(4),
                                    Email = reader.GetString(5)
                                };
                                lista.Add(empleado);
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("Error al listar empleados: " + ex.Message);
                        lista = null;
                    }
                }

                return lista;
            }

            public int InsertarEmpleado(EmpleadoCLS empleado)
            {
                try
                {
                    using (SqlConnection cn = new SqlConnection(CadenaConexion))
                    {
                        cn.Open();
                        using (SqlCommand cmd = new SqlCommand("INSERT INTO Empleados (Nombre, Apellido, Cargo, Telefono, Email) VALUES (@Nombre, @Apellido, @Cargo, @Telefono, @Email)", cn))
                        {
                            cmd.Parameters.AddWithValue("@Nombre", empleado.Nombre);
                            cmd.Parameters.AddWithValue("@Apellido", empleado.Apellido);
                            cmd.Parameters.AddWithValue("@Cargo", empleado.Cargo);
                            cmd.Parameters.AddWithValue("@Telefono", empleado.Telefono);
                            cmd.Parameters.AddWithValue("@Email", empleado.Email);

                            return cmd.ExecuteNonQuery();
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error al insertar empleado: " + ex.Message);
                    return 0;
                }
            }

            public EmpleadoCLS RecuperarEmpleado(int id)
            {
                EmpleadoCLS empleado = null;

                using (SqlConnection cn = new SqlConnection(CadenaConexion))
                {
                    try
                    {
                        cn.Open();
                        using (SqlCommand cmd = new SqlCommand("SELECT Id, Nombre, Apellido, Cargo, Telefono, Email FROM Empleados WHERE Id = @Id", cn))
                        {
                            cmd.Parameters.AddWithValue("@Id", id);

                            SqlDataReader reader = cmd.ExecuteReader();

                            if (reader.Read())
                            {
                                empleado = new EmpleadoCLS
                                {
                                    Id = reader.GetInt32(0),
                                    Nombre = reader.GetString(1),
                                    Apellido = reader.GetString(2),
                                    Cargo = reader.GetString(3),
                                    Telefono = reader.GetString(4),
                                    Email = reader.GetString(5)
                                };
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("Error al recuperar empleado: " + ex.Message);
                    }
                }

                return empleado;
            }

            public int ActualizarEmpleado(EmpleadoCLS empleado)
            {
                try
                {
                    using (SqlConnection cn = new SqlConnection(CadenaConexion))
                    {
                        cn.Open();
                        using (SqlCommand cmd = new SqlCommand("UPDATE Empleados SET Nombre = @Nombre, Apellido = @Apellido, Cargo = @Cargo, Telefono = @Telefono, Email = @Email WHERE Id = @Id", cn))
                        {
                            cmd.Parameters.AddWithValue("@Id", empleado.Id);
                            cmd.Parameters.AddWithValue("@Nombre", empleado.Nombre);
                            cmd.Parameters.AddWithValue("@Apellido", empleado.Apellido);
                            cmd.Parameters.AddWithValue("@Cargo", empleado.Cargo);
                            cmd.Parameters.AddWithValue("@Telefono", empleado.Telefono);
                            cmd.Parameters.AddWithValue("@Email", empleado.Email);

                            return cmd.ExecuteNonQuery();
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error al actualizar empleado: " + ex.Message);
                    return 0;
                }
            }

            public int EliminarEmpleado(int id)
            {
                int filasAfectadas = 0;

                using (SqlConnection cn = new SqlConnection(CadenaConexion))
                {
                    try
                    {
                        cn.Open();
                        using (SqlCommand cmd = new SqlCommand("DELETE FROM Empleados WHERE Id = @Id", cn))
                        {
                            cmd.Parameters.AddWithValue("@Id", id);
                            filasAfectadas = cmd.ExecuteNonQuery();
                            Console.WriteLine("Filas afectadas: " + filasAfectadas);
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("Error al eliminar empleado: " + ex.Message);
                        filasAfectadas = -1;
                    }
                }

                return filasAfectadas;
            }
        }
    }


