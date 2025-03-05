using System;
using System.Collections.Generic;
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
            IConfigurationBuilder builder = new ConfigurationBuilder();
            builder.AddJsonFile(Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json"));
            var root = builder.Build();
            return root.GetConnectionString("cn");
        }



    }
}
