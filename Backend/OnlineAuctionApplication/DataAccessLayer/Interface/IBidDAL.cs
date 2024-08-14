using BusinessObjectLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interface
{
    public interface IBidDAL
    {
        Task<Bid> PlaceBid(Bid bid);
        Task UpdateAsync(Bid bid);
        Task<IEnumerable<Bid>> GetBidsByProductId(int productId);
        Task<IEnumerable<Bid>> GetByUserIdAsync(int userId);
        Task<IEnumerable<Bid>> GetAllBids();
        Task<Bid> GetBidById(int bidId);
        Task DeleteAsync(Bid bid);
    }
}
