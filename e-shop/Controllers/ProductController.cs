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
                product.Title, product.Image, product.Description, Convert.ToDecimal(product.Price));

            return Ok(product);
        }

        [Route("add")]
        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody]ProductViewModel product)
        {
            var newProduct = new Product()
            {
                Title = product.Title,
                ImageSrc = product.Image,
                Description = product.Description,
                Price = Convert.ToDecimal(product.Price)
            };

            await _productRepository.AddProductAsync(newProduct);

            return Ok();
        }

        [Route("delete")]
        [HttpPost]
        public async Task<IActionResult> DeleteProduct(int productId)
        {
            await _productRepository.DeleteProductAsync(productId);

            return Ok();
        }

        [Route("image")]
        [HttpGet]
        public IActionResult GetImage(string path)
        {
            try
            {
                if (!string.IsNullOrEmpty(path))
                {
                    var image = System.IO.File.OpenRead(path);

                    return File(image, "image/jpeg");
                }
            }
            catch (Exception)
            {
                return null;    
            }

            return null;
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
