using BusinessObjectLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Interface
{
    public interface IBidBL
    {
        Task<Bid> PlaceBid(Bid bid);
        Task UpdateBid(Bid bid);
        Task<IEnumerable<Bid>> GetBidsByProductId(int productId);
        Task<IEnumerable<Bid>> GetBidsByUserId(int userId);
        Task<IEnumerable<Bid>> GetAllBids();
        Task<Bid> GetBidById(int bidId);
        Task DeleteBid(Bid bid);
    }
}
