using Microsoft.EntityFrameworkCore;

namespace DBRepository
{
    public class RepositoryContextFactory : IRepositoryContextFactory
    {
        public RepositoryContext CreateDbContext(string conntectionString)
        {
            var optionsBuilder = new DbContextOptionsBuilder<RepositoryContext>();
            optionsBuilder.UseSqlServer(conntectionString);

            return new RepositoryContext(optionsBuilder.Options);
        }
    }
}
