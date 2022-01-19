using Microsoft.EntityFrameworkCore;
using Models;
using DBRepository.Interfaces;

namespace DBRepository
{
    public class ProductRepository : BaseRepository, IProductRepository
    {
        public ProductRepository(string connectionString, IRepositoryContextFactory repositoryContextFactory) 
            : base(connectionString, repositoryContextFactory)    
        {

        }

        public Task AddProduct(Product product)
        {
            throw new NotImplementedException();
        }

        public Task DeleteProduct(int id)
        {
            throw new NotImplementedException();
        }

        public Product GetProductById(int id)
        {
            Product result = null;

            using (var context = RepositoryContextFactory.CreateDbContext(ConnectionString))
            {
                result = context.Products.Where(i => i.ProductId == id).Single();
            }

            return result;
        }

        public async Task<List<Product>> GetProductsAsync()
        {
            var result = new List<Product>();

            using (var context = RepositoryContextFactory.CreateDbContext(ConnectionString))
            {
                if (context.Products.Any())
                {
                    result = await context.Products.AsQueryable().ToListAsync();
                }
            }

            return result;
        }

        public async Task UpdateProductAsync(int id,
            string title = "", byte[] img = null, string desc = "", decimal price = 0)
        {
            using (var context = RepositoryContextFactory.CreateDbContext(ConnectionString))
            {
                var result = context.Products.Where(p => p.ProductId == id).Single();

                if (result != null)
                {
                    if (!string.IsNullOrEmpty(title))
                    {
                        result.Title = title;
                    }

                    if (img != null)
                    {
                        result.Image = img;
                    }

                    if (!string.IsNullOrEmpty(desc))
                    {
                        result.Description = desc;
                    }

                    if (price != 0)
                    {
                        result.Price = price;
                    }

                    await context.SaveChangesAsync();
                }
            }
        }
    }
}
