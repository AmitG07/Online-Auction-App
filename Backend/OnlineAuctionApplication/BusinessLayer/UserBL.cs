using BusinessLayer.Interface;
using BusinessObjectLayer;
using DataAccessLayer.Interface;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class UserBL : IUserBL
    {
        private readonly IUserDAL _userDAL;

        public UserBL(IUserDAL userDAL)
        {
            _userDAL = userDAL;
        }

        public async Task<User> AuthenticateAsync(string email, string password)
        {
            return await _userDAL.GetUserByEmailAndPasswordAsync(email, password);
        }

        public async Task<User> GetUserByIdAsync(int userId)
        {
            return await _userDAL.GetUserByIdAsync(userId);
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _userDAL.GetAllUsersAsync();
        }

        public async Task<User> IsAdminAsync(string email, string password)
        {
            return await _userDAL.GetUserByEmailAndPasswordAsyncAdmin(email, password);
        }
    }
}
