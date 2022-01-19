using Models;

namespace DBRepository.Interfaces
{
    public interface IProductRepository
    {
        Task<List<Product>> GetProductsAsync();
        Product GetProductById(int id);
        Task AddProduct(Product product);
        Task UpdateProductAsync(int id, string title, byte[] img, string desc, decimal price);
        Task DeleteProduct(int id);
    }
}
