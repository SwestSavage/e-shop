namespace DBRepository.Interfaces
{
    public interface IRepositoryContextFactory
    {
        public RepositoryContext CreateDbContext(string connectionString);
    }
}
