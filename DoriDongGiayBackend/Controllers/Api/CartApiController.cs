using DoriDongGiay.Models;
using DoriDongGiay.Data;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace DoriDongGiay.Controllers.Api
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartApiController : ControllerBase
    {
        private const string CartSessionKey = "Cart";
        private readonly ApplicationDbContext _context;

        public CartApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetCart()
        {
            var cart = GetCartFromSession();
            return Ok(new { success = true, cart = cart });
        }

        [HttpPost("add")]
        public async Task<ActionResult<object>> AddToCart(int productId, int quantity = 1)
        {
            var product = await _context.Products.FindAsync(productId);
            if (product == null || !product.IsActive)
            {
                return NotFound(new { success = false, message = "Sản phẩm không tồn tại" });
            }

            var cart = GetCartFromSession();
            var existingItem = cart.FirstOrDefault(item => item.ProductId == productId);

            if (existingItem != null)
            {
                existingItem.Quantity += quantity;
            }
            else
            {
                cart.Add(new CartItem
                {
                    ProductId = productId,
                    ProductName = product.Name,
                    Price = product.Price,
                    Quantity = quantity,
                    ImageUrl = product.ImageUrl
                });
            }

            SaveCartToSession(cart);
            return Ok(new { 
                success = true, 
                message = "Sản phẩm đã được thêm vào giỏ hàng!",
                cart = cart
            });
        }

        [HttpPut("update")]
        public IActionResult UpdateCart(int productId, int quantity)
        {
            var cart = GetCartFromSession();
            var item = cart.FirstOrDefault(item => item.ProductId == productId);

            if (item != null)
            {
                if (quantity <= 0)
                {
                    cart.Remove(item);
                }
                else
                {
                    item.Quantity = quantity;
                }
                SaveCartToSession(cart);
            }

            return Ok(new { 
                success = true, 
                message = "Cập nhật giỏ hàng thành công",
                cart = cart
            });
        }

        [HttpDelete("remove")]
        public IActionResult RemoveFromCart(int productId)
        {
            var cart = GetCartFromSession();
            var item = cart.FirstOrDefault(item => item.ProductId == productId);

            if (item != null)
            {
                cart.Remove(item);
                SaveCartToSession(cart);
                return Ok(new { 
                    success = true, 
                    message = "Sản phẩm đã được xóa khỏi giỏ hàng!",
                    cart = cart
                });
            }

            return NotFound(new { success = false, message = "Không tìm thấy sản phẩm trong giỏ hàng" });
        }

        [HttpGet("count")]
        public IActionResult GetCartCount()
        {
            var cart = GetCartFromSession();
            return Ok(new { 
                success = true, 
                count = cart.Sum(item => item.Quantity) 
            });
        }

        [HttpGet("summary")]
        public IActionResult GetCartSummary()
        {
            var cart = GetCartFromSession();
            var summary = new
            {
                success = true,
                items = cart.Select(item => new
                {
                    productId = item.ProductId,
                    productName = item.ProductName,
                    price = item.Price,
                    quantity = item.Quantity,
                    total = item.Total,
                    imageUrl = item.ImageUrl
                }),
                totalAmount = cart.Sum(item => item.Total),
                totalItems = cart.Sum(item => item.Quantity)
            };
            return Ok(summary);
        }

        [HttpDelete("clear")]
        public IActionResult ClearCart()
        {
            HttpContext.Session.Remove(CartSessionKey);
            return Ok(new { 
                success = true, 
                message = "Giỏ hàng đã được xóa trống" 
            });
        }

        private List<CartItem> GetCartFromSession()
        {
            var cartJson = HttpContext.Session.GetString(CartSessionKey);
            return cartJson == null ? new List<CartItem>() : 
                JsonSerializer.Deserialize<List<CartItem>>(cartJson);
        }

        private void SaveCartToSession(List<CartItem> cart)
        {
            var cartJson = JsonSerializer.Serialize(cart);
            HttpContext.Session.SetString(CartSessionKey, cartJson);
        }
    }
}
