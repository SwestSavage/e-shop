using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
    public interface IUserRepository
    {
        public Task<User> GetUser(string username);
    }
}
