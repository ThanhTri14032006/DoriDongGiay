using DoriDongGiay.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DoriDongGiay.Data
{
    public static class SeedData
    {
        public static async Task Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new ApplicationDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<ApplicationDbContext>>()))
            {
                // Seed categories
                if (!context.Categories.Any())
                {
                    context.Categories.AddRange(
                        new Category { Name = "Áo Thun", Description = "Áo thun thời trang" },
                        new Category { Name = "Quần Jeans", Description = "Quần jeans chất lượng cao" },
                        new Category { Name = "Áo Sơ Mi", Description = "Áo sơ mi công sở" },
                        new Category { Name = "Váy", Description = "Váy đầm thời trang" }
                    );
                    await context.SaveChangesAsync();
                }

                // Seed products
                if (!context.Products.Any())
                {
                    var categories = context.Categories.ToList();
                    
                    context.Products.AddRange(
                        new Product 
                        { 
                            Name = "Áo Thun Basic Trắng", 
                            Description = "Áo thun basic chất cotton mềm mại", 
                            Price = 199000, 
                            OldPrice = 250000, 
                            StockQuantity = 50, 
                            CategoryId = categories[0].Id,
                            ImageUrl = "/images/products/tshirt-white.jpg"
                        },
                        new Product 
                        { 
                            Name = "Quần Jeans Slim Đen", 
                            Description = "Quần jeans slim fit màu đen", 
                            Price = 450000, 
                            StockQuantity = 30, 
                            CategoryId = categories[1].Id,
                            ImageUrl = "/images/products/jeans-black.jpg"
                        },
                        new Product 
                        { 
                            Name = "Áo Sơ Mi Trắng", 
                            Description = "Áo sơ mi trắng công sở", 
                            Price = 350000, 
                            OldPrice = 400000, 
                            StockQuantity = 25, 
                            CategoryId = categories[2].Id,
                            ImageUrl = "/images/products/shirt-white.jpg"
                        }
                    );
                    await context.SaveChangesAsync();
                }

                // Create admin user
                var userManager = serviceProvider.GetRequiredService<UserManager<User>>();
                var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

                // Create admin role
                if (!await roleManager.RoleExistsAsync("Admin"))
                {
                    await roleManager.CreateAsync(new IdentityRole("Admin"));
                }

                // Create admin user
                var adminUser = await userManager.FindByEmailAsync("admin@eshop.com");
                if (adminUser == null)
                {
                    adminUser = new User
                    {
                        UserName = "admin@eshop.com",
                        Email = "admin@eshop.com",
                        FullName = "Administrator",
                        Address = "123 Admin Street",
                        Phone = "0123456789",
                        EmailConfirmed = true
                    };

                    var result = await userManager.CreateAsync(adminUser, "Admin123!");
                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(adminUser, "Admin");
                    }
                }
            }
        }
    }
}