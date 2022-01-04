using DBRepository.Interfaces;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DBRepository
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(string connectionString, IRepositoryContextFactory repositoryContextFactory)
            : base(connectionString, repositoryContextFactory)
        {

        }

        public User GetUser(string username)
        {
            User user = null;

            using (var context = RepositoryContextFactory.CreateDbContext(ConnectionString))
            {
                if (context.Users.Any())
                {
                    var users = context.Users.AsQueryable();

                    user = users.Where(u => u.Login == username).Single();
                }
            }

            return user;
        }

        public async Task AddUserAsync(User user)
        {
            if (user != null)
            {
                using (var context = RepositoryContextFactory.CreateDbContext(ConnectionString))
                {
                    await context.Users.AddAsync(user);

                    await context.SaveChangesAsync();
                }
            }
            else
            {
                throw new NullReferenceException();
            }
        }
    }
}
