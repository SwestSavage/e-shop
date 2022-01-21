using DBRepository.Interfaces;
using e_shop.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using System.Linq;

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

        public string UserName { get; private set; }

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
        public async Task<OrdersViewModel> GetOrders(string userName)
        {
            UserName = userName;
            return await GetOrdersOfUser(userName);
        }

        [Route("delete")]
        [HttpPost]
        public async Task<IActionResult> DeleteOrder([FromBody] int orderId)
        {
            int test = orderId;

            _orderRepository.DeleteOrderById(orderId);

            return Ok();
        }

        private async Task<OrdersViewModel> GetOrdersOfUser(string userName)
        {
            var user = _userRepository.GetUser(userName);
            List<Order> orders;
            OrdersViewModel newOrder;

            try
            {
                orders = await _orderRepository.GetOrdersOfUserAsync(user);
                orders = orders.Where(o => o.Date.Day == DateTime.Today.Day).ToList();

                List<ProductOrderId> products = new();

                foreach (var o in orders)
                {

                    products.Add(new ProductOrderId()
                    {
                        OrderId = o.OrderId,
                        Product = _productRepository.GetProductById(o.ProductId)
                    });
                }

                newOrder = new()
                {
                    User = user,
                    ProductsWithOrderId = products,
                    Date = orders[0].Date
                };
            }
            catch (Exception)
            {
                return null;
            }

            

            return newOrder;
        }
    }
}
