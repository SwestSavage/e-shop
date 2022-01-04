using Models;

namespace e_shop.Services.Interfaces
{
    public interface IIdentityService
    {
        User GetUser(string userName);
        void AddUserAsync(User user);
    }
}
