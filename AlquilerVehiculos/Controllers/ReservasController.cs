using CapaDatos;
using CapaEntidad;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AlquilerVehiculos.Controllers
{
    public class ReservasController : Controller
    {

        public ActionResult Index()
        {
            return View();
        }
        public List<ReservaCLS> ListarReservas()
        {
            ReservaDAL reservasDAL = new ReservaDAL();
            return reservasDAL.ListarReservas();
        }

        public int InsertarReserva(ReservaCLS reserva)
        {
            ReservaDAL reservasDAL = new ReservaDAL();
            return reservasDAL.InsertarReserva(reserva);
        }

        public ReservaCLS RecuperarReserva(int id)
        {
            ReservaDAL reservasDAL = new ReservaDAL();
            return reservasDAL.RecuperarReserva(id);
        }

        public int ActualizarReserva(ReservaCLS reserva)
        {
            ReservaDAL reservasDAL = new ReservaDAL();
            return reservasDAL.ActualizarReserva(reserva);
        }

        public int EliminarReserva(int id)
        {
            ReservaDAL reservasDAL = new ReservaDAL();
            return reservasDAL.EliminarReserva(id);
        }

    }
}
