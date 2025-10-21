using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace DoriDongGiay.Models
{
    public class User : IdentityUser
    {
        [StringLength(100)]
        public string FullName { get; set; }

        [StringLength(200)]
        public string Address { get; set; }

        [StringLength(20)]
        public string Phone { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public bool IsActive { get; set; } = true;
    }
}