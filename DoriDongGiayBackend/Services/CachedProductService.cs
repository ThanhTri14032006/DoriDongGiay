using DoriDongGiay.Models;
using DoriDongGiay.Models.ViewModels;
using DoriDongGiay.Services.Interfaces;
using Microsoft.Extensions.Caching.Memory;

namespace DoriDongGiay.Services
{
    public class CachedProductService : IProductService
    {
        private readonly IProductService _productService;
        private readonly IMemoryCache _cache;
        private readonly TimeSpan _cacheDuration = TimeSpan.FromMinutes(5);

        public CachedProductService(IProductService productService, IMemoryCache cache)
        {
            _productService = productService;
            _cache = cache;
        }

        public async Task<List<Product>> GetAllProductsAsync()
        {
            var cacheKey = "AllProducts";
            
            if (!_cache.TryGetValue(cacheKey, out List<Product> products))
            {
                products = await _productService.GetAllProductsAsync();
                _cache.Set(cacheKey, products, _cacheDuration);
            }

            return products;
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            var cacheKey = $"Product_{id}";
            
            if (!_cache.TryGetValue(cacheKey, out Product product))
            {
                product = await _productService.GetProductByIdAsync(id);
                if (product != null)
                {
                    _cache.Set(cacheKey, product, _cacheDuration);
                }
            }

            return product;
        }

        public async Task CreateProductAsync(ProductViewModel model, string webRootPath)
        {
            await _productService.CreateProductAsync(model, webRootPath);
            // Clear cache after creating new product
            _cache.Remove("AllProducts");
        }

        public async Task UpdateProductAsync(ProductViewModel model, string webRootPath)
        {
            await _productService.UpdateProductAsync(model, webRootPath);
            // Clear relevant caches
            _cache.Remove("AllProducts");
            _cache.Remove($"Product_{model.Id}");
        }

        public async Task DeleteProductAsync(int id)
        {
            await _productService.DeleteProductAsync(id);
            // Clear relevant caches
            _cache.Remove("AllProducts");
            _cache.Remove($"Product_{id}");
        }

        public async Task<List<Category>> GetAllCategoriesAsync()
        {
            var cacheKey = "AllCategories";
            
            if (!_cache.TryGetValue(cacheKey, out List<Category> categories))
            {
                categories = await _productService.GetAllCategoriesAsync();
                _cache.Set(cacheKey, categories, _cacheDuration);
            }

            return categories;
        }
    }
}