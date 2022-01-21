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

        public async Task AddProductAsync(Product product)
        {
            using (var context = RepositoryContextFactory.CreateDbContext(ConnectionString))
            {
                if (product != null)
                {
                    await context.Products.AddAsync(product);

                    await context.SaveChangesAsync();
                }
            }

        }

        public async Task DeleteProductAsync(int id)
        {
            using (var context = RepositoryContextFactory.CreateDbContext(ConnectionString))
            {
                if (context.Products.Find(id) != null)
                {
                    context.Products.Remove(context.Products.Find(id));
                }

                await context.SaveChangesAsync();
            }
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
            string title = "", string imgSrc = null, string desc = "", decimal price = 0)
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

                    if (imgSrc != null)
                    {
                        result.ImageSrc = imgSrc;
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
