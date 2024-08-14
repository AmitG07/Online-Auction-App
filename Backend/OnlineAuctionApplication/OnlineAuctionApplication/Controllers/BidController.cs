using BusinessLayer;
using BusinessLayer.Interface;
using BusinessObjectLayer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OnlineAuctionApplication.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineAuctionApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BidController : ControllerBase
    {
        private readonly IBidBL _bidBL;
        private readonly IProductBL _productBL;
        private readonly ILogger<BidController> _logger;

        public BidController(IBidBL bidBL, IProductBL productBL, ILogger<BidController> logger)
        {
            _bidBL = bidBL;
            _productBL = productBL;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> PlaceBid([FromBody] Bid bid)
        {
            if (bid == null)
            {
                return BadRequest(new { message = "Bid data is required." });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var product = await _productBL.GetProductById(bid.ProductId);
            if (product == null)
            {
                return NotFound(new { message = "Product not found." });
            }

            if (product.AuctionEndTime <= DateTime.UtcNow)
            {
                return BadRequest(new { message = "Auction for this product has ended." });
            }

            var currentHighestBid = (await _bidBL.GetBidsByProductId(bid.ProductId))
                .OrderByDescending(b => b.BidAmount)
                .FirstOrDefault();

            if (currentHighestBid != null && bid.BidAmount <= currentHighestBid.BidAmount)
            {
                return BadRequest(new { message = "Bid amount must be higher than the current highest bid." });
            }

            if (bid.BidAmount <= product.StartingPrice)
            {
                return BadRequest(new { message = "Bid amount must be higher than the starting price." });
            }

            product.CurrentHighestBid = bid.BidAmount;
            product.CurrentHighestBidUserId = bid.UserId;

            try
            {
                bid.BidingDate = DateTime.UtcNow;
                var createdBid = await _bidBL.PlaceBid(bid);

                await _productBL.UpdateProduct(product);

                return CreatedAtAction(nameof(GetBidsByProductId), new { productId = createdBid.ProductId }, createdBid);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred while placing the bid.");
                return StatusCode(500, new { message = "An unexpected error occurred while placing the bid.", detail = ex.Message });
            }
        }

        [HttpGet("GetBidByUserId/{userId}")]
        public async Task<IActionResult> GetBidByUserId(int userId)
        {
            try
            {
                var bids = await _bidBL.GetBidsByUserId(userId);
                if (bids == null || !bids.Any())
                {
                    return NotFound(new { message = "No bids found for this user." });
                }

                // Transform bids to remove any nested product details
                var result = bids.Select(bid => new
                {
                    bid.BidId,
                    bid.ProductId,
                    bid.UserId,
                    bid.BidAmount,
                    bid.BidingDate,
                    bid.BidStatus
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred while fetching bids for user with id {userId}", userId);
                return StatusCode(500, new { message = "An unexpected error occurred.", detail = ex.Message });
            }
        }

        [HttpGet("GetBidsByProductId/{productId}")]
        public async Task<IActionResult> GetBidsByProductId(int productId)
        {
            try
            {
                var bids = await _bidBL.GetBidsByProductId(productId);
                if (bids == null || !bids.Any())
                {
                    return NotFound(new { message = "No bids found for this product." });
                }

                // Optionally update bid statuses if necessary
                var product = await _productBL.GetProductById(productId);
                if (product != null && product.AuctionEndTime <= DateTime.UtcNow)
                {
                    foreach (var bid in bids)
                    {
                        if (bid.BidAmount >= product.ReservedPrice)
                        {
                            bid.BidStatus = bid.BidAmount == product.CurrentHighestBid ? "Approved" : "Declined";
                        }
                        else
                        {
                            bid.BidStatus = "Declined";
                        }
                        await _bidBL.UpdateBid(bid);
                    }
                }

                // Transform bids to remove any nested product details
                var result = bids.Select(bid => new
                {
                    bid.BidId,
                    bid.ProductId,
                    bid.UserId,
                    bid.BidAmount,
                    bid.BidingDate,
                    bid.BidStatus
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred while fetching bids for product with id {productId}", productId);
                return StatusCode(500, new { message = "An unexpected error occurred.", detail = ex.Message });
            }
        }

        [HttpGet("GetAllBids")]
        public async Task<IActionResult> GetAllBids()
        {
            try
            {
                var bids = await _bidBL.GetAllBids();
                if (bids == null || !bids.Any())
                {
                    return NotFound(new { message = "No bids found." });
                }

                foreach (var bid in bids)
                {
                    var product = await _productBL.GetProductById(bid.ProductId);

                    if (product != null && product.AuctionEndTime <= DateTime.UtcNow)
                    {
                        // Update the bid status based on the auction end time and reserved price
                        if (bid.BidAmount >= product.ReservedPrice)
                        {
                            bid.BidStatus = bid.BidAmount == product.CurrentHighestBid ? "Approved" : "Declined";
                        }
                        else
                        {
                            bid.BidStatus = "Declined";
                        }
                        await _bidBL.UpdateBid(bid); // Save the updated bid status
                    }
                }

                // Optionally, transform bids to remove any nested product details
                var result = bids.Select(bid => new
                {
                    bid.BidId,
                    bid.ProductId,
                    bid.UserId,
                    bid.BidAmount,
                    bid.BidingDate,
                    bid.BidStatus
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred while fetching all bids.");
                return StatusCode(500, new { message = "An unexpected error occurred.", detail = ex.Message });
            }
        }

        [HttpDelete("{bidId}")]
        public async Task<IActionResult> DeleteBid(int bidId)
        {
            try
            {
                var bid = await _bidBL.GetBidById(bidId);
                if (bid == null)
                {
                    return NotFound(new { message = "Bid not found." });
                }

                var product = await _productBL.GetProductById(bid.ProductId);
                if (product == null)
                {
                    return NotFound(new { message = "Product not found." });
                }

                await _bidBL.DeleteBid(bid);

                var highestBid = (await _bidBL.GetBidsByProductId(bid.ProductId))
                    .OrderByDescending(b => b.BidAmount)
                    .FirstOrDefault();

                if (highestBid == null)
                {
                    product.CurrentHighestBid = 0;
                    product.CurrentHighestBidUserId = null;
                }
                else
                {
                    product.CurrentHighestBid = highestBid.BidAmount;
                    product.CurrentHighestBidUserId = highestBid.UserId;
                }

                await _productBL.UpdateProduct(product);

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred while deleting the bid with id {bidId}", bidId);
                return StatusCode(500, new { message = "An unexpected error occurred.", detail = ex.Message });
            }
        }
    }
}
