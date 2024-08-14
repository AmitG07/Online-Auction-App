using System.ComponentModel.DataAnnotations;

namespace OnlineAuctionApplication.Models
{
    public class UserModel
    {
        [Key]
        public int UserId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string EmailId { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public bool Isadmin { get; set; }
    }
}
