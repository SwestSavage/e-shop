using Microsoft.AspNetCore.Mvc;
using DBRepository;
using Models;

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
    }
}
