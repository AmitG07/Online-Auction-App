using BusinessObjectLayer;
using DataAccessLayer.Interface;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class UserDAL : IUserDAL
    {
        private readonly ApplicationDbContext _context;

        public UserDAL(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserByEmailAndPasswordAsync(string email, string password)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.EmailId == email && u.Password == password && u.IsAdmin == false);
        }

        public async Task<User> GetUserByEmailAndPasswordAsyncAdmin(string email, string password)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.EmailId == email && u.Password == password && u.IsAdmin == true);
        }

        public async Task<User> GetUserByIdAsync(int userId)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.UserId == userId);
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }
    }
}
