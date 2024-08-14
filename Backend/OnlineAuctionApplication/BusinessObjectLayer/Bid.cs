using System;
using System.ComponentModel.DataAnnotations;

namespace BusinessObjectLayer
{
    public class Bid
    {
        [Key]
        public int BidId { get; set; }

        [Required]
        public int ProductId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public decimal BidAmount { get; set; }

        [Required]
        public DateTime BidingDate { get; set; } = DateTime.UtcNow; // Default to current time

        [Required]
        public string BidStatus { get; set; } = "Pending"; // Default to "Pending"
        public Product? Product { get; set; }

        public User? User { get; set; }
    }
}
