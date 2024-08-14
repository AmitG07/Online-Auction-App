using BusinessObjectLayer;
using OnlineAuctionApplication.Models;

namespace OnlineAuctionApplication.Helper
{
    public class UserModelToUserHelper
    {
        public User UserModelToUserMapping(UserModel e)
        {
            User u = new User();
            u.Name = e.Name;
            u.EmailId = e.EmailId;
            u.Password = e.Password;
            return u;
        }
    }
}
