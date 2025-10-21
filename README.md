DoriDongGiay/
│
├── DoriDongGiay.sln
│
├── DoriDongGiayBackend/
│   ├── Areas/                             # 🔹 KHU VỰC ADMIN
│   │   └── Admin/
│   │       ├── Controllers/
│   │       │   ├── DashboardController.cs
│   │       │   ├── ProductsController.cs
│   │       │   ├── OrdersController.cs
│   │       │   ├── CustomersController.cs
│   │       │   └── AccountsController.cs
│   │       │
│   │       ├── Views/
│   │       │   ├── Shared/
│   │       │   │   ├── _AdminLayout.cshtml
│   │       │   │   └── _Sidebar.cshtml
│   │       │   ├── Dashboard/
│   │       │   │   └── Index.cshtml
│   │       │   ├── Products/
│   │       │   │   ├── Index.cshtml
│   │       │   │   ├── Create.cshtml
│   │       │   │   └── Edit.cshtml
│   │       │   ├── Orders/
│   │       │   │   └── Index.cshtml
│   │       │   ├── Customers/
│   │       │   │   └── Index.cshtml
│   │       │   └── Accounts/
│   │       │       ├── Login.cshtml
│   │       │       └── Register.cshtml
│   │       │
│   │       └── Admin.csproj (nếu tách riêng project)
│   │
│   ├── Controllers/                        # 🔹 FRONTEND cho người dùng
│   │   ├── HomeController.cs
│   │   ├── ProductsController.cs
│   │   ├── CartController.cs
│   │   ├── CheckoutController.cs
│   │   └── AccountController.cs
│   │
│   ├── Models/
│   │   ├── Product.cs
│   │   ├── Category.cs
│   │   ├── User.cs
│   │   ├── Order.cs
│   │   ├── OrderDetail.cs
│   │   ├── CartItem.cs
│   │   └── ViewModels/
│   │       ├── DashboardViewModel.cs
│   │       └── ProductViewModel.cs
│   │
│   ├── Data/
│   │   ├── ApplicationDbContext.cs
│   │   └── SeedData.cs
│   │
│   ├── Views/
│   │   ├── Shared/
│   │   │   ├── _Layout.cshtml
│   │   │   ├── _Navbar.cshtml
│   │   │   └── _Footer.cshtml
│   │   ├── Home/
│   │   │   └── Index.cshtml
│   │   ├── Products/
│   │   │   ├── Index.cshtml
│   │   │   └── Detail.cshtml
│   │   ├── Cart/
│   │   │   └── Index.cshtml
│   │   ├── Checkout/
│   │   │   └── Index.cshtml
│   │   └── Account/
│   │       ├── Login.cshtml
│   │       └── Register.cshtml
│   │
│   ├── Services/
│   │   ├── ProductService.cs
│   │   ├── OrderService.cs
│   │   ├── AuthService.cs
│   │   └── Interfaces/
│   │       ├── IProductService.cs
│   │       ├── IOrderService.cs
│   │       └── IAuthService.cs
│   │
│   ├── wwwroot/
│   │   ├── css/
│   │   │   ├── site.css
│   │   │   └── admin.css
│   │   ├── js/
│   │   │   ├── site.js
│   │   │   └── admin.js
│   │   ├── images/
│   │   └── uploads/
│   │
│   ├── appsettings.json
│   ├── Program.cs
│   ├── Startup.cs
│   └── DoriDongGiay.csproj
├── DoriDongGiayFrontend
|   |
|
|
└── README.m
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