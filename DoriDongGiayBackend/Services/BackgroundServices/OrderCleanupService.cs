using DoriDongGiay.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace DoriDongGiay.Services.BackgroundServices
{
    public class OrderCleanupService : BackgroundService
    {
        private readonly ILogger<OrderCleanupService> _logger;
        private readonly IServiceProvider _serviceProvider;

        public OrderCleanupService(ILogger<OrderCleanupService> logger, IServiceProvider serviceProvider)
        {
            _logger = logger;
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    using (var scope = _serviceProvider.CreateScope())
                    {
                        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                        
                        // Xóa các đơn hàng pending cũ hơn 30 ngày
                        var oldPendingOrders = await context.Orders
                            .Where(o => o.Status == "Pending" && 
                                       o.OrderDate < DateTime.Now.AddDays(-30))
                            .ToListAsync();

                        if (oldPendingOrders.Any())
                        {
                            context.Orders.RemoveRange(oldPendingOrders);
                            await context.SaveChangesAsync();
                            _logger.LogInformation($"Đã xóa {oldPendingOrders.Count} đơn hàng pending cũ");
                        }
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Lỗi khi dọn dẹp đơn hàng");
                }

                // Chạy mỗi ngày
                await Task.Delay(TimeSpan.FromDays(1), stoppingToken);
            }
        }
    }
}