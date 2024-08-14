using BusinessObjectLayer;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLayer.Interface
{
    public interface IUserBL
    {
        Task<User> AuthenticateAsync(string email, string password);
        Task<User> GetUserByIdAsync(int userId);
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User> IsAdminAsync(string email, string password);
    }
}

