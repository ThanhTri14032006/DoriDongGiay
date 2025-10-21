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