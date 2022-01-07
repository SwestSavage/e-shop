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
        private IProductRepository _productRepository;

        public OrderController(IOrderRepository orderRepository, IUserRepository userRepository, 
            IProductRepository productRepository)
        {
            _orderRepository = orderRepository;
            _userRepository = userRepository;
            _productRepository = productRepository;
        }

        //[Authorize]
        [Route("add")]
        [HttpPost]
        public async Task<IActionResult> AddToCart(string userName, int productId)
        {
            int userId = _userRepository.GetUser(userName).UserId;
            
            try
            {
                await _orderRepository.AddOrderAsync(userId, productId);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);                
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
