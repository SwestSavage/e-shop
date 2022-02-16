using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;
using e_shop.Controllers;
using DBRepository.Interfaces;
using Xunit;
using Moq;

namespace e_shop.Tests.Controllers.Tests
{
    public class ProductControllerTests
    {
        [Fact]
        public void Get_Products_Should_Return_List_Of_Products()
        {
            Mock<IProductRepository> mock = new Mock<IProductRepository>();
            mock.Setup(repo => repo.GetProductsAsync()).Returns(GetProducts());

            ProductController productController = new ProductController(mock.Object);

            var result = productController.GetProducts();

            Assert.IsType<Task<List<Product>>>(result);
        }

        private async Task<List<Product>> GetProducts()
        {
            return new List<Product>
            {
                new Product
                {
                    ProductId = 1,
                    Title = "Test",
                    Price = 1000m,
                    Description = "Test",
                    ImageSrc = "Test",
                    Orders = null
                }
            };
        }
    }
}
