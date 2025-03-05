using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace CapaDatos
{
    public class ConexionSQL
    {
        public string CadenaConexion;

        public ConexionSQL()
        {
            CadenaConexion = ObtenerCadenaConexion();
        }

        public string ObtenerCadenaConexion()
        {
            // Crear el constructor de configuración
            IConfigurationBuilder builder = new ConfigurationBuilder();

            // Cargar el archivo appsettings.json desde el directorio actual
            builder.AddJsonFile(Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json"));

            // Construir el objeto de configuración
            var root = builder.Build();

            // Obtener la cadena de conexión desde el archivo appsettings.json
            return root.GetConnectionString("cn");
        }
    }
}
