using CapaDatos;
using CapaEntidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaNegocio
{
    class PagoBL
    {
        // Listar todos los pagos
        public List<PagoCLS> ListarPagos()
        {
            PagoDAL pagosDAL = new PagoDAL();
            return pagosDAL.ListarPagos();
        }

        // Insertar un nuevo pago
        public int InsertarPago(PagoCLS pago)
        {
            PagoDAL pagosDAL = new PagoDAL();
            return pagosDAL.InsertarPago(pago);
        }

        // Recuperar un pago por ID
        public PagoCLS RecuperarPago(int id)
        {
            PagoDAL pagosDAL = new PagoDAL();
            return pagosDAL.RecuperarPago(id);
        }

        // Actualizar un pago existente
        public int ActualizarPago(PagoCLS pago)
        {
            PagoDAL pagosDAL = new PagoDAL();
            return pagosDAL.ActualizarPago(pago);
        }

        // Eliminar un pago por ID
        public int EliminarPago(int id)
        {
            PagoDAL pagosDAL = new PagoDAL();
            return pagosDAL.EliminarPago(id);
        }
    }
}
