using Models;

namespace DBRepository
{
    public interface IProductRepository
    {
        public Task<List<Product>> GetProducts();
    }
}
