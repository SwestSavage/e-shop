using Microsoft.AspNetCore.Mvc;
using DBRepository;
using Models;
using DBRepository.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace e_shop.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private IProductRepository _productRepository;

        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [Route("products")]
        [HttpGet]
        public async Task<List<Product>> GetProducts()
        {
            return await _productRepository.GetProducts();
        }

        [Authorize]
        [Route("tocart")]
        [HttpPost]
        public async Task<Product> AddToCart(Product product)
        {
            throw new NotImplementedException();
        }
    }
}
