using Microsoft.AspNetCore.Mvc;
using DBRepository;
using Models;
using DBRepository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using e_shop.ViewModels;
using System.Text;

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
            return await _productRepository.GetProductsAsync();
        }

        [Route("update")]
        [HttpPost]
        public async Task<IActionResult> UpdateProduct([FromBody]ProductViewModel product)
        {
            var title = product.Title;
            var t = product;
            await _productRepository.UpdateProductAsync(product.ProductId,
                product.Title, Encoding.UTF8.GetBytes(product.Image), product.Description, Convert.ToDecimal(product.Price));

            return Ok(product);
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
