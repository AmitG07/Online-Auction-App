using BusinessObjectLayer;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataAccessLayer.Interface
{
    public interface IUserDAL
    {
        Task<User> GetUserByEmailAndPasswordAsync(string email, string password);
        Task<User> GetUserByEmailAndPasswordAsyncAdmin(string email, string password);
        Task<User> GetUserByIdAsync(int userId);
        Task<IEnumerable<User>> GetAllUsersAsync();
    }
}
