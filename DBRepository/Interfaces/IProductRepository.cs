using Models;

namespace DBRepository.Interfaces
{
    public interface IProductRepository
    {
        Task<List<Product>> GetProducts();
        Product GetProductById(int id);
    }
}
