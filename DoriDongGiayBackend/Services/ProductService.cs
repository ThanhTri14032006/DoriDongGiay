using DoriDongGiay.Data;
using DoriDongGiay.Models;
using DoriDongGiay.Models.ViewModels;
using DoriDongGiay.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DoriDongGiay.Services
{
    public class ProductService : IProductService
    {
        private readonly ApplicationDbContext _context;

        public ProductService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Product>> GetAllProductsAsync()
        {
            return await _context.Products
                .Include(p => p.Category)
                .Where(p => p.IsActive)
                .OrderByDescending(p => p.CreatedDate)
                .ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Products
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == id && p.IsActive);
        }

        public async Task CreateProductAsync(ProductViewModel model, string webRootPath)
        {
            string imageUrl = await SaveImage(model.ImageFile, webRootPath);

            var product = new Product
            {
                Name = model.Name,
                Description = model.Description,
                Price = model.Price,
                OldPrice = model.OldPrice,
                StockQuantity = model.StockQuantity,
                CategoryId = model.CategoryId,
                ImageUrl = imageUrl,
                CreatedDate = DateTime.Now
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProductAsync(ProductViewModel model, string webRootPath)
        {
            var product = await _context.Products.FindAsync(model.Id);
            if (product != null)
            {
                product.Name = model.Name;
                product.Description = model.Description;
                product.Price = model.Price;
                product.OldPrice = model.OldPrice;
                product.StockQuantity = model.StockQuantity;
                product.CategoryId = model.CategoryId;
                product.UpdatedDate = DateTime.Now;

                if (model.ImageFile != null)
                {
                    product.ImageUrl = await SaveImage(model.ImageFile, webRootPath);
                }

                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteProductAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product != null)
            {
                product.IsActive = false;
                product.UpdatedDate = DateTime.Now;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<Category>> GetAllCategoriesAsync()
        {
            return await _context.Categories
                .Where(c => c.IsActive)
                .ToListAsync();
        }

        private async Task<string> SaveImage(IFormFile imageFile, string webRootPath)
        {
            if (imageFile == null) return "/images/products/default.jpg";

            var uploadsFolder = Path.Combine(webRootPath, "images", "products");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var uniqueFileName = Guid.NewGuid().ToString() + "_" + imageFile.FileName;
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }

            return $"/images/products/{uniqueFileName}";
        }
    }
}