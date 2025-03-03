using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AlquilerVehiculos.Controllers
{
    public class SegurosController : Controller
    {
        // GET: SegurosController
        public ActionResult Index()
        {
            return View();
        }

        // GET: SegurosController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: SegurosController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: SegurosController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: SegurosController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: SegurosController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: SegurosController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: SegurosController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
