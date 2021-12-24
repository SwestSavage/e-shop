using e_shop.Services.Interfaces;
using Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace e_shop.Controllers
{
    public class SignupController : Controller
    {
        private IIdentityService _service;

        public SignupController(IIdentityService service)
        {
            _service = service;
        }

        [Route("api/signup")]
        [HttpPost]
        public async Task<IActionResult> Signup(string firstName, string lastName, string userName, string password, string email)
        {
            var sha256 = new SHA256Managed();
            var passwordHash = Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(password)));

            User newUser = new User { FirstName = firstName, LastName = lastName, IsAdmin = false, Login = userName, Password = passwordHash, Email = email };

            try
            {
                _service.AddUserAsync(newUser);
            }
            catch (Exception)
            {
                return BadRequest("Incorrect user data.");
            }

            return Ok(newUser);
        }
    }
}
