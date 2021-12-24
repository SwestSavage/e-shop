using DBRepository.Interfaces;
using e_shop.Services.Interfaces;
using Models;

namespace e_shop.Services.Implementations
{
    public class IdentityService : IIdentityService
    {
        private IUserRepository _repository;

        public IdentityService(IUserRepository repository)
        {
            _repository = repository;
        }

        public Task<User> GetUser(string userName)
        {
            return _repository.GetUser(userName);
        }

        public async void AddUserAsync(User user)
        {
            await _repository.AddUserAsync(user);
        }
    }
}
