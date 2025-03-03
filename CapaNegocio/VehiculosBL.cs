using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;
using CapaDatos;

namespace CapaNegocio
{
    public class VehiculosBL
    {
        public List<VehiculosCLS> ListarVehiculos()
        {
            VehiculosDAL vehiculosDAL = new VehiculosDAL();
            return vehiculosDAL.ListarVehiculos();
        }
        public int InsertarVehiculo(VehiculosCLS vehiculo)
        {
            VehiculosDAL vehiculosDAL = new VehiculosDAL();
            return vehiculosDAL.InsertarVehiculo(vehiculo);
        }
        public VehiculosCLS RecuperarVehiculo(int id)
        {
            VehiculosDAL vehiculosDAL = new VehiculosDAL();
            return vehiculosDAL.RecuperarVehiculo(id);
        }
        public int ActualizarVehiculo(VehiculosCLS vehiculo)
        {
            VehiculosDAL vehiculosDAL = new VehiculosDAL();
            return vehiculosDAL.ActualizarVehiculo(vehiculo);
        }
        public int EliminarVehiculo(int id)
        {
            VehiculosDAL vehiculosDAL = new VehiculosDAL();
            return vehiculosDAL.EliminarVehiculo(id);
        }
        }
}
