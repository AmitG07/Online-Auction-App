using System.ComponentModel.DataAnnotations;

namespace BusinessObjectLayer
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public decimal StartingPrice { get; set; }

        public decimal ReservedPrice { get; set; }

        [Required]
        public DateTime AuctionEndTime { get; set; }

        [Required]
        public string Category { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public decimal CurrentHighestBid { get; set; } = 0;
        public int? CurrentHighestBidUserId { get; set; }

        public User? User { get; set; }   // Note that it's nullable

        public List<Bid> Bids { get; set; } = new();
    }
}
