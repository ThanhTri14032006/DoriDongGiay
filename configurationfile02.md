DoriDongGiay/
│
├── DoriDongGiay.sln
│
├── DoriDongGiayBackend/                 # 🔹 BACKEND (ASP.NET Core)
│   ├── Areas/
│   │   └── Admin/
│   │       ├── Controllers/
│   │       ├── Views/
│   │       └── Services/
│   │
│   ├── Controllers/
│   ├── Models/
│   │   ├── Entities/
│   │   │   ├── Product.cs
│   │   │   ├── Category.cs
│   │   │   ├── User.cs
│   │   │   ├── Order.cs
│   │   │   ├── OrderDetail.cs
│   │   │   ├── Cart.cs
│   │   │   ├── Brand.cs
│   │   │   └── Review.cs
│   │   │
│   │   ├── ViewModels/
│   │   │   ├── ProductVM.cs
│   │   │   ├── OrderVM.cs
│   │   │   ├── LoginVM.cs
│   │   │   └── RegisterVM.cs
│   │   │
│   │   └── DTOs/
│   │       ├── ProductDTO.cs
│   │       ├── OrderDTO.cs
│   │       └── UserDTO.cs
│   │
│   ├── Data/
│   │   ├── ApplicationDbContext.cs
│   │   ├── Configurations/
│   │   ├── Migrations/
│   │   └── SeedData/
│   │
│   ├── Services/
│   │   ├── Interfaces/
│   │   │   ├── IProductService.cs
│   │   │   ├── IOrderService.cs
│   │   │   ├── IAuthService.cs
│   │   │   └── IFileService.cs
│   │   │
│   │   ├── Implementations/
│   │   │   ├── ProductService.cs
│   │   │   ├── OrderService.cs
│   │   │   ├── AuthService.cs
│   │   │   └── FileService.cs
│   │   │
│   │   └── Repositories/
│   │       ├── GenericRepository.cs
│   │       ├── ProductRepository.cs
│   │       └── OrderRepository.cs
│   │
│   ├── Middleware/
│   │   ├── JwtMiddleware.cs
│   │   └── ErrorHandlingMiddleware.cs
│   │
│   ├── Utilities/
│   │   ├── Constants.cs
│   │   ├── Helpers.cs
│   │   └── Extensions/
│   │
│   ├── wwwroot/
│   ├── appsettings.json
│   ├── Program.cs
│   └── DoriDongGiay.Backend.csproj
│
├── DoriDongGiayFrontend/                # 🔹 FRONTEND (React.js)
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── manifest.json
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Header/
│   │   │   │   ├── Footer/
│   │   │   │   ├── Navbar/
│   │   │   │   ├── Loading/
│   │   │   │   └── Modal/
│   │   │   │
│   │   │   ├── home/
│   │   │   │   ├── HeroBanner/
│   │   │   │   ├── FeaturedProducts/
│   │   │   │   └── Categories/
│   │   │   │
│   │   │   ├── products/
│   │   │   │   ├── ProductCard/
│   │   │   │   ├── ProductList/
│   │   │   │   ├── ProductFilter/
│   │   │   │   └── ProductDetail/
│   │   │   │
│   │   │   ├── cart/
│   │   │   │   ├── CartItem/
│   │   │   │   └── CartSummary/
│   │   │   │
│   │   │   ├── checkout/
│   │   │   │   ├── CheckoutForm/
│   │   │   │   └── OrderSummary/
│   │   │   │
│   │   │   └── auth/
│   │   │       ├── LoginForm/
│   │   │       └── RegisterForm/
│   │   │
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   ├── Products/
│   │   │   ├── ProductDetail/
│   │   │   ├── Cart/
│   │   │   ├── Checkout/
│   │   │   ├── Login/
│   │   │   ├── Register/
│   │   │   ├── Profile/
│   │   │   └── OrderHistory/
│   │   │
│   │   ├── services/
│   │   │   ├── api/
│   │   │   │   ├── productAPI.js
│   │   │   │   ├── orderAPI.js
│   │   │   │   ├── authAPI.js
│   │   │   │   └── cartAPI.js
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   └── authService.js
│   │   │   │
│   │   │   └── storage/
│   │   │       └── localStorage.js
│   │   │
│   │   ├── contexts/
│   │   │   ├── AuthContext.js
│   │   │   ├── CartContext.js
│   │   │   └── AppContext.js
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useCart.js
│   │   │   └── useProducts.js
│   │   │
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   ├── helpers.js
│   │   │   └── formatters.js
│   │   │
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   │   ├── components/
│   │   │   └── pages/
│   │   │
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── routes.js
│   │
│   ├── package.json
│   └── vite.config.js (hoặc webpack.config.js)
│
├── DoriDongGiayAdmin/                   # 🔹 ADMIN PANEL (React.js)
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Sidebar/
│   │   │   │   ├── Header/
│   │   │   │   └── DashboardLayout/
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── StatsCard/
│   │   │   │   ├── Charts/
│   │   │   │   └── RecentOrders/
│   │   │   │
│   │   │   ├── products/
│   │   │   │   ├── ProductTable/
│   │   │   │   ├── ProductForm/
│   │   │   │   └── ImageUpload/
│   │   │   │
│   │   │   ├── orders/
│   │   │   │   └── OrderTable/
│   │   │   │
│   │   │   └── users/
│   │   │       └── UserTable/
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard/
│   │   │   ├── Products/
│   │   │   ├── Orders/
│   │   │   ├── Users/
│   │   │   └── Login/
│   │   │
│   │   ├── services/
│   │   │   └── adminAPI.js
│   │   │
│   │   └── styles/
│   │
│   └── package.json
│
├── Database/                            # 🔹 DATABASE
│   ├── Scripts/
│   │   ├── 001_Create_Database.sql
│   │   ├── 002_Create_Tables.sql
│   │   ├── 003_Insert_Seed_Data.sql
│   │   └── 004_Stored_Procedures.sql
│   │
│   └── Diagrams/
│       └── ERD_DoriDongGiay.pgerd
│
└── Documentation/
    ├── API_Documentation.md
    ├── Database_Schema.md
    └── Deployment_Guide.md