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
