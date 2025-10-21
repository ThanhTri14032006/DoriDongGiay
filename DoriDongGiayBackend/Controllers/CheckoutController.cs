using DoriDongGiay.Models;
using DoriDongGiay.Data;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace DoriDongGiay.Controllers  
{
    public class CheckoutController : Controller
    {
        private const string CartSessionKey = "Cart";
        private readonly ApplicationDbContext _context;

        public CheckoutController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var cart = GetCart();
            if (!cart.Any())
            {
                TempData["ErrorMessage"] = "Giỏ hàng của bạn đang trống!";
                return RedirectToAction("Index", "Cart");
            }

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> PlaceOrder(Order order)
        {
            var cart = GetCart();
            if (!cart.Any())
            {
                TempData["ErrorMessage"] = "Giỏ hàng của bạn đang trống!";
                return RedirectToAction("Index", "Cart");
            }

            // Calculate total amount
            order.TotalAmount = cart.Sum(item => item.Total);
            order.OrderDate = DateTime.Now;
            order.Status = "Pending";

            // Add order to database
            _context.Orders.Add(order);

            // Add order details
            foreach (var item in cart)
            {
                var orderDetail = new OrderDetail
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    UnitPrice = item.Price
                };
                order.OrderDetails.Add(orderDetail);
            }

            await _context.SaveChangesAsync();

            // Clear cart
            ClearCart();

            TempData["SuccessMessage"] = "Đặt hàng thành công! Cảm ơn bạn đã mua sắm.";
            return RedirectToAction("Index", "Home");
        }

        private List<CartItem> GetCart()
        {
            var cartJson = HttpContext.Session.GetString(CartSessionKey);
            return cartJson == null ? new List<CartItem>() : 
                JsonSerializer.Deserialize<List<CartItem>>(cartJson);
        }

        private void ClearCart()
        {
            HttpContext.Session.Remove(CartSessionKey);
        }
    }
}