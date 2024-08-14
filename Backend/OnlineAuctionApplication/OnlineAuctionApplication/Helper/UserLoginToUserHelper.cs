using BusinessObjectLayer;
using OnlineAuctionApplication.Models;

namespace OnlineAuctionApplication.Helper
{
    public class UserLoginToUserHelper
    {
        public User UserLoginToUserMapping(UserLogin login)
        {
            return new User
            {
                EmailId = login.Email,
                Password = login.Password
            };
        }
    }
}
