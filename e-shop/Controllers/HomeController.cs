using Microsoft.AspNetCore.Mvc;

namespace e_shop.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            ViewData["Title"] = "Test";

            return View();
        }
    }
}
