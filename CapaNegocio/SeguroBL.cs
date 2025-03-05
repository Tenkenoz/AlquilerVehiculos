using System;
using System.Collections.Generic;
using CapaEntidad;
using CapaDatos; // Importa correctamente la capa de datos

namespace CapaNegocio
{
    public class SeguroBL
    {
        public List<SeguroCLS> ListarSeguros()
        {
            SeguroDAL seguroDAL = new SeguroDAL();
            return seguroDAL.ListarSeguros();
        }

        public int InsertarSeguro(SeguroCLS seguro)
        {
            SeguroDAL seguroDAL = new SeguroDAL();
            return seguroDAL.InsertarSeguro(seguro);
        }

        public SeguroCLS RecuperarSeguro(int id)
        {
            SeguroDAL seguroDAL = new SeguroDAL();
            return seguroDAL.RecuperarSeguro(id);
        }

        public int ActualizarSeguro(SeguroCLS seguro)
        {
            SeguroDAL seguroDAL = new SeguroDAL();
            return seguroDAL.ActualizarSeguro(seguro);
        }

        public int EliminarSeguro(int id)
        {
            SeguroDAL seguroDAL = new SeguroDAL();
            return seguroDAL.EliminarSeguro(id);
        }
    }
}
