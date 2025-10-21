using DoriDongGiay.Models.ViewModels;
using DoriDongGiay.Services.Interfaces;
using DoriDongGiay.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DoriDongGiay.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Authorize(Roles = "Admin")]
    public class DashboardController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IOrderService _orderService;

        public DashboardController(ApplicationDbContext context, IOrderService orderService)
        {
            _context = context;
            _orderService = orderService;
        }

        public async Task<IActionResult> Index()
        {
            var model = new DashboardViewModel
            {
                TotalProducts = await _context.Products.CountAsync(p => p.IsActive),
                TotalOrders = await _orderService.GetTotalOrdersCountAsync(),
                TotalCustomers = await _context.Users.CountAsync(),
                TotalRevenue = await _orderService.GetTotalRevenueAsync(),
                RecentOrders = await _context.Orders
                    .Include(o => o.User)
                    .OrderByDescending(o => o.OrderDate)
                    .Take(10)
                    .ToListAsync(),
                LowStockProducts = await _context.Products
                    .Where(p => p.StockQuantity < 10 && p.IsActive)
                    .Take(5)
                    .ToListAsync()
            };

            return View(model);
        }
    }
}