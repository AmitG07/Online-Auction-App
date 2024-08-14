using BusinessLayer.Interface;
using BusinessObjectLayer;
using DataAccessLayer.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class BidBL : IBidBL
    {
        private readonly IBidDAL _bidDAL;

        public BidBL(IBidDAL bidDAL)
        {
            _bidDAL = bidDAL;
        }

        public async Task<Bid> PlaceBid(Bid bid)
        {
            return await _bidDAL.PlaceBid(bid);
        }

        public async Task UpdateBid(Bid bid)
        {
            await _bidDAL.UpdateAsync(bid);
        }

        public async Task<IEnumerable<Bid>> GetBidsByProductId(int productId)
        {
            return await _bidDAL.GetBidsByProductId(productId);
        }

        public async Task<IEnumerable<Bid>> GetBidsByUserId(int userId)
        {
            return await _bidDAL.GetByUserIdAsync(userId);
        }

        public async Task<IEnumerable<Bid>> GetAllBids()
        {
            return await _bidDAL.GetAllBids();
        }

        public async Task<Bid> GetBidById(int bidId)
        {
            return await _bidDAL.GetBidById(bidId);
        }

        public async Task DeleteBid(Bid bid)
        {
            await _bidDAL.DeleteAsync(bid);
        }
    }
}
