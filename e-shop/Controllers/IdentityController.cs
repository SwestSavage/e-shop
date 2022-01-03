using Microsoft.AspNetCore.Mvc;
using DBRepository;
using DBRepository.Interfaces;
using e_shop.Services.Interfaces;
using e_shop.ViewModels;
using e_shop.Helpers;
using System.IdentityModel.Tokens.Jwt;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.Security.Cryptography;
using System.Text;

namespace e_shop.Controllers
{
    public class IdentityController : Controller
    {
        private IIdentityService _service;

        public IdentityController(IIdentityService service)
        {
            _service = service;
        }

        [Route("token")]
        [HttpPost]
        public async Task<IActionResult> Token(string userName, string password)
        {
            var identity = await GetIdentity(userName, password);
            if (identity == null)
            {
                return Unauthorized();
            }

            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return Ok(encodedJwt);
        }

        private async Task<IReadOnlyCollection<Claim>> GetIdentity(string userName, string password)
        {
            List<Claim> claims = null;

            var user = await _service.GetUser(userName);

            if (user != null)
            {
                var sha256 = new SHA256Managed();
                var passwordHash = Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(password)));

                if (passwordHash == user.Password)
                {
                    claims = new List<Claim>
                    {
                        new Claim(ClaimsIdentity.DefaultNameClaimType, user.Login),
                    };
                }
            }

            return claims;
        }
    }
}
