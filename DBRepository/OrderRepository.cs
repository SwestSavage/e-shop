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

        public async Task AddOrderAsync(User user, Product product)
        {
            using (var context = RepositoryContextFactory.CreateDbContext(ConnectionString))
            {
                await context.Orders.AddAsync(new Order
                {
                    User = user,
                    Product = product,
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
                    result = await context.Orders.AsQueryable().ToListAsync();
                }
            }

            return result;
        }
    }
}
