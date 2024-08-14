using BusinessObjectLayer;
using DataAccessLayer.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class BidDAL : IBidDAL
    {
        private readonly ApplicationDbContext _context;

        public BidDAL(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Bid> PlaceBid(Bid bid)
        {
            _context.Bids.Add(bid);
            await _context.SaveChangesAsync();
            return bid;
        }

        public async Task UpdateAsync(Bid bid)
        {
            _context.Bids.Update(bid);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Bid>> GetBidsByProductId(int productId)
        {
            return await _context.Bids.Where(b => b.ProductId == productId).ToListAsync();
        }

        public async Task<IEnumerable<Bid>> GetByUserIdAsync(int userId)
        {
            return await _context.Bids.Where(b => b.UserId == userId).ToListAsync();
        }

        public async Task<IEnumerable<Bid>> GetAllBids()
        {
            return await _context.Bids.ToListAsync();
        }

        public async Task<Bid> GetBidById(int bidId)
        {
            return await _context.Bids.FindAsync(bidId);
        }

        public async Task DeleteAsync(Bid bid)
        {
            _context.Bids.Remove(bid);
            await _context.SaveChangesAsync();
        }
    }
}
