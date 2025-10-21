# DoriDongGiay - E-commerce Website

Dự án website bán giày với kiến trúc tách biệt Frontend và Backend.

## Cấu trúc dự án

```
DoriDongGiay/
├── DoriDongGiayBackend/          # Backend API (.NET 9)
│   ├── Controllers/
│   │   └── Api/                  # API Controllers
│   │       ├── ProductsApiController.cs
│   │       ├── AuthApiController.cs
│   │       └── CartApiController.cs
│   ├── Models/                   # Data Models
│   ├── Services/                 # Business Logic
│   ├── Data/                     # Database Context
│   └── Program.cs               # API Configuration
│
└── DoriDongGiayFrontend/         # Frontend (HTML/CSS/JS)
    ├── index.html               # Trang chủ
    ├── products.html            # Trang sản phẩm
    ├── cart.html               # Giỏ hàng
    ├── login.html              # Đăng nhập
    ├── css/
    │   └── style.css           # Custom CSS
    └── js/
        ├── api.js              # API Client
        ├── app.js              # Main App Logic
        ├── products.js         # Products Page
        └── cart.js             # Cart Page
```

## Cách chạy dự án

### 1. Chạy Backend API

```bash
cd DoriDongGiayBackend
dotnet restore
dotnet run
```

Backend sẽ chạy tại: `http://localhost:5000`

### 2. Chạy Frontend

Có 2 cách:

#### Cách 1: Mở trực tiếp file HTML
- Mở file `DoriDongGiayFrontend/index.html` trong trình duyệt
- Hoặc sử dụng Live Server extension trong VS Code

#### Cách 2: Sử dụng HTTP Server
```bash
cd DoriDongGiayFrontend
# Sử dụng Python
python -m http.server 3000

# Hoặc sử dụng Node.js
npx http-server -p 3000
```

Frontend sẽ chạy tại: `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/logout` - Đăng xuất
- `GET /api/auth/user` - Lấy thông tin user hiện tại

### Products
- `GET /api/products` - Lấy danh sách sản phẩm
- `GET /api/products/{id}` - Lấy chi tiết sản phẩm

### Cart
- `GET /api/cart` - Lấy giỏ hàng
- `POST /api/cart/add` - Thêm sản phẩm vào giỏ
- `PUT /api/cart/update` - Cập nhật số lượng
- `DELETE /api/cart/remove` - Xóa sản phẩm khỏi giỏ
- `GET /api/cart/count` - Lấy số lượng sản phẩm trong giỏ
- `GET /api/cart/summary` - Lấy tóm tắt giỏ hàng

## Tính năng

### Frontend
- ✅ Responsive design với Bootstrap 5
- ✅ Trang chủ với sản phẩm nổi bật
- ✅ Trang sản phẩm với tìm kiếm và lọc
- ✅ Giỏ hàng với cập nhật real-time
- ✅ Đăng nhập/Đăng ký
- ✅ API integration với JavaScript

### Backend
- ✅ RESTful API với .NET 9
- ✅ Entity Framework Core với SQLite
- ✅ Authentication với ASP.NET Identity
- ✅ CORS configuration cho frontend
- ✅ Session-based cart management

## Công nghệ sử dụng

### Backend
- .NET 9
- ASP.NET Core Web API
- Entity Framework Core
- SQLite Database
- ASP.NET Identity

### Frontend
- HTML5
- CSS3 (Custom + Bootstrap 5)
- JavaScript (Vanilla)
- Font Awesome Icons

## Lưu ý

1. Đảm bảo .NET 9 đã được cài đặt
2. Backend phải chạy trước khi sử dụng frontend
3. CORS đã được cấu hình để cho phép frontend kết nối
4. Database sẽ được tự động tạo và seed dữ liệu mẫu