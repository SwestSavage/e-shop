using Models;

namespace e_shop.Services.Interfaces
{
    public interface IIdentityService
    {
        Task<User> GetUser(string userName);
        void AddUserAsync(User user);
    }
}
