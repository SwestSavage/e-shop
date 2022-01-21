using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DBRepository
{
    public class OrderRepository : BaseRepository,   IOrderRepository
    {
        public OrderRepository(string connectionString, IRepositoryContextFactory repositoryContextFactory) 
            : base(connectionString, repositoryContextFactory)
        {
        }

        public async Task AddOrderAsync(int userId, int productId)
        {
            using (var context = RepositoryContextFactory.CreateDbContext(ConnectionString))
            {
                var user = context.Users.Where(u => u.UserId == userId).Single();
                var product = context.Products.Where(p => p.ProductId == productId).Single();
                await context.Orders.AddAsync(new Order
                {
                    User = user,
                    Product = product,//product,
                    Date = DateTime.Now
                });

                await context.SaveChangesAsync();
            }
        }

        public async Task DeleteOrderByIdAsync(int orderId)
        {
            using (var context = RepositoryContextFactory.CreateDbContext(ConnectionString))
            {
                if (context.Orders.Find(orderId) != null)
                {
                    context.Orders.Remove(context.Orders.Find(orderId));
                }

                await context.SaveChangesAsync();
            }
        }

        public async Task<List<Order>> GetOrdersOfUserAsync(User user)
        {
            var result = new List<Order>();

            using (var context = RepositoryContextFactory.CreateDbContext(ConnectionString))
            {
                if (context.Orders.Any())
                {
                    var tmp = await context.Orders.Where(o => o.UserId == user.UserId).AsQueryable().ToListAsync();

                    result = tmp;
                }
            }

            return result;
        }

        public async Task DeleteOrderWithProductId(int productId)
        {
            throw new NotImplementedException();
        }

        public async void DeleteOrderById(int orderId)
        {
            using(var context = RepositoryContextFactory.CreateDbContext(ConnectionString))
            {
                context.Orders.Remove(context.Orders.Where(o => o.OrderId == orderId).Single());

                await context.SaveChangesAsync();
            }
        }
    }
}
