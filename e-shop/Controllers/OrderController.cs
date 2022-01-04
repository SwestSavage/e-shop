using DBRepository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace e_shop.Controllers
{
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        private IOrderRepository _orderRepository;
        private IUserRepository _userRepository;

        public OrderController(IOrderRepository orderRepository, IUserRepository userRepository)
        {
            _orderRepository = orderRepository;
            _userRepository = userRepository;
        }

        [Authorize]
        [Route("add")]
        [HttpPost]
        public async Task<IActionResult> AddToCart(Product product, string userName)
        {
            var user = _userRepository.GetUser(userName);

            try
            {
                await _orderRepository.AddOrderAsync(user, product);
            }
            catch (Exception)
            {
                return BadRequest();
            }

            return Ok();
        }

        [Route("get")]
        [HttpGet]
        public async Task<List<Order>> GetOrders(string userName)
        {
            var user = _userRepository.GetUser(userName);

            return await _orderRepository.GetOrdersOfUserAsync(user);
        }
    }
}
