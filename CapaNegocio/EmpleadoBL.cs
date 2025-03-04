using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;
using static CapaNegocio.EmpleadoBL;
namespace CapaNegocio
{
    public class EmpleadoBL
    {
        public class EmpleadosBL
        {
            public List<EmpleadoCLS> ListarEmpleados()
            {
                EmpleadosDAL empleadosDAL = new EmpleadosDAL();
                return empleadosDAL.ListarEmpleados();
            }

            public int InsertarEmpleado(EmpleadoCLS empleado)
            {
                EmpleadosDAL empleadosDAL = new EmpleadosDAL();
                return empleadosDAL.InsertarEmpleado(empleado);
            }

            public EmpleadoCLS RecuperarEmpleado(int id)
            {
                EmpleadosDAL empleadosDAL = new EmpleadosDAL();
                return empleadosDAL.RecuperarEmpleado(id);
            }

            public int ActualizarEmpleado(EmpleadoCLS empleado)
            {
                EmpleadosDAL empleadosDAL = new EmpleadosDAL();
                return empleadosDAL.ActualizarEmpleado(empleado);
            }

            public int EliminarEmpleado(int id)
            {
                EmpleadosDAL empleadosDAL = new EmpleadosDAL();
                return empleadosDAL.EliminarEmpleado(id);
            }
        }

    }
}
