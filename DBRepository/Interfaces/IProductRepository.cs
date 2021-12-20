using Models;

namespace DBRepository.Interfaces
{
    public interface IProductRepository
    {
        public Task<List<Product>> GetProducts();
    }
}
