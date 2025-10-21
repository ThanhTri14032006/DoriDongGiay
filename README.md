
# FashionShop - Ecommerce Project

Một website bán quần áo thời trang được xây dựng bằng ASP.NET Core MVC.

## Tính năng

### Frontend (Người dùng)
- Trang chủ với sản phẩm nổi bật
- Danh sách sản phẩm với bộ lọc
- Chi tiết sản phẩm
- Giỏ hàng và thanh toán
- Đăng ký/Đăng nhập người dùng

### Backend (Admin)
- Dashboard thống kê
- Quản lý sản phẩm
- Quản lý đơn hàng
- Quản lý khách hàng

## Công nghệ sử dụng

- ASP.NET Core 8.0
- Entity Framework Core
- Identity for Authentication
- Bootstrap 5
- SQL Server

## Cài đặt

1. Clone repository
2. Cập nhật connection string trong `appsettings.json`
3. Chạy migrations:
   ```bash
   dotnet ef database update