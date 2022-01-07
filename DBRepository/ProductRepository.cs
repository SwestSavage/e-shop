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

        public Product GetProductById(int id)
        {
            Product result = null;

            using (var context = RepositoryContextFactory.CreateDbContext(ConnectionString))
            {
                result = context.Products.Where(i => i.ProductId == id).Single();
            }

            return result;
        }

        public async Task<List<Product>> GetProducts()
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
    }
}
