using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
    public interface IOrderRepository
    {
        Task<List<Order>> GetOrdersOfUserAsync(User user);
        Task DeleteOrderByIdAsync(int orderId);
        Task AddOrderAsync(int userId, int productId);
    }
}
