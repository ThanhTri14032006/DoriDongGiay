using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using DoriDongGiay.Models;

namespace DoriDongGiay.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);
    
    // Cấu hình cho SQL Server (không phải SQLite)
    // Đảm bảo các string column có MaxLength
    modelBuilder.Entity<User>(entity =>
    {
        entity.Property(e => e.FullName).HasMaxLength(100);
    });
    
    modelBuilder.Entity<Product>(entity =>
    {
        entity.Property(e => e.Name).HasMaxLength(200);
        entity.Property(e => e.Description).HasMaxLength(1000);
        entity.Property(e => e.ImageUrl).HasMaxLength(500);
        entity.HasOne(d => d.Category)
              .WithMany(p => p.Products)
              .HasForeignKey(d => d.CategoryId);
    });
    
    modelBuilder.Entity<Category>(entity =>
    {
        entity.Property(e => e.Name).HasMaxLength(100);
        entity.Property(e => e.Description).HasMaxLength(500);
    });
  }
 }
}