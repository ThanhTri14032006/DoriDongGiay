using DoriDongGiay.Models;
using DoriDongGiay.Models.ViewModels;

namespace DoriDongGiay.Services.Interfaces
{
    public interface IProductService
    {
        Task<List<Product>> GetAllProductsAsync();
        Task<Product> GetProductByIdAsync(int id);
        Task CreateProductAsync(ProductViewModel model, string webRootPath);
        Task UpdateProductAsync(ProductViewModel model, string webRootPath);
        Task DeleteProductAsync(int id);
        Task<List<Category>> GetAllCategoriesAsync();
    }
}