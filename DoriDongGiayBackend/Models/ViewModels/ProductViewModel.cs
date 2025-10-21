using System.ComponentModel.DataAnnotations;

namespace DoriDongGiay.Models.ViewModels
{
    public class ProductViewModel
    {
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Name { get; set; }

        [StringLength(1000)]
        public string Description { get; set; }

        [Required]
        [Range(0.01, 10000)]
        public decimal Price { get; set; }

        [Range(0.01, 10000)]
        public decimal? OldPrice { get; set; }

        public IFormFile ImageFile { get; set; }
        public string ImageUrl { get; set; }

        [Required]
        [Range(0, 1000)]
        public int StockQuantity { get; set; }

        [Required]
        public int CategoryId { get; set; }
        public List<Category> Categories { get; set; }
    }
}