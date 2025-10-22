# Hướng dẫn kết nối Azure SQL Database cho DoriDongGiay

## Bước 1: Tạo Azure SQL Database

### 1.1. Đăng nhập Azure Portal
- Truy cập: https://portal.azure.com
- Đăng nhập với tài khoản Azure của bạn

### 1.2. Tạo SQL Database
1. Tìm kiếm "SQL databases" trong thanh tìm kiếm
2. Click "Create" → "SQL Database"
3. Điền thông tin:
   - **Subscription**: Chọn subscription của bạn
   - **Resource Group**: Tạo mới hoặc chọn existing (ví dụ: `rg-doridonggiay`)
   - **Database name**: `DoriDongGiay`
   - **Server**: Tạo mới server

### 1.3. Tạo SQL Server
1. Click "Create new" cho Server
2. Điền thông tin:
   - **Server name**: `doridonggiay-sql-server` (phải unique)
   - **Location**: Chọn region gần nhất (ví dụ: Southeast Asia)
   - **Authentication method**: SQL authentication
   - **Server admin login**: `sqladmin`
   - **Password**: Tạo password mạnh (ví dụ: `DoriAdmin2024!`)

### 1.4. Cấu hình Database
1. **Compute + storage**: 
   - Chọn "Basic" hoặc "Standard" cho development
   - Basic: 5 DTU, 2GB storage (~$5/month)
2. **Backup storage redundancy**: Locally-redundant
3. Click "Review + create" → "Create"

## Bước 2: Cấu hình Firewall

### 2.1. Cho phép Azure services
1. Vào SQL server vừa tạo
2. Chọn "Networking" trong menu bên trái
3. Bật "Allow Azure services and resources to access this server"

### 2.2. Thêm IP hiện tại
1. Trong "Firewall rules", click "Add your client IPv4 address"
2. Hoặc thêm rule mới:
   - **Rule name**: `AllowMyIP`
   - **Start IP**: IP hiện tại của bạn
   - **End IP**: IP hiện tại của bạn

## Bước 3: Lấy Connection String

### 3.1. Từ Azure Portal
1. Vào SQL Database "DoriDongGiay"
2. Chọn "Connection strings" trong menu bên trái
3. Copy "ADO.NET" connection string
4. Thay thế `{your_password}` bằng password thật

### 3.2. Format Connection String
```
Server=tcp:doridonggiay-sql-server.database.windows.net,1433;Initial Catalog=DoriDongGiay;Persist Security Info=False;User ID=sqladmin;Password=DoriAdmin2024!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
```

## Bước 4: Cập nhật Code

### 4.1. Cập nhật appsettings.json
Thay thế `{your-server-name}`, `{your-username}`, `{your-password}` trong file appsettings.json:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=tcp:doridonggiay-sql-server.database.windows.net,1433;Initial Catalog=DoriDongGiay;Persist Security Info=False;User ID=sqladmin;Password=DoriAdmin2024!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
  }
}
```

### 4.2. Cập nhật Program.cs hoặc Startup.cs
Đảm bảo sử dụng connection string mới:

```csharp
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
```

## Bước 5: Migration và Seed Data

### 5.1. Chạy Migration
```bash
cd DoriDongGiayBackend
dotnet ef database update
```

### 5.2. Seed Data (nếu cần)
```bash
dotnet run --seed-data
```

## Bước 6: Test Connection

### 6.1. Test từ Visual Studio/VS Code
1. Chạy project backend
2. Kiểm tra logs để đảm bảo kết nối thành công

### 6.2. Test từ Azure Portal
1. Vào SQL Database
2. Chọn "Query editor"
3. Đăng nhập và chạy query test:
```sql
SELECT COUNT(*) FROM Products;
```

## Chi phí ước tính

### Basic Tier
- **Database**: ~$5/month (5 DTU, 2GB)
- **Total**: ~$5-10/month

### Standard Tier  
- **Database**: ~$15/month (S0: 10 DTU, 250GB)
- **Total**: ~$15-20/month

## Lưu ý bảo mật

1. **Không commit connection string** có password vào Git
2. Sử dụng **Azure Key Vault** cho production
3. Cấu hình **firewall rules** chặt chẽ
4. Bật **Advanced Threat Protection** nếu cần

## Troubleshooting

### Lỗi kết nối
1. Kiểm tra firewall rules
2. Kiểm tra connection string
3. Kiểm tra username/password

### Lỗi migration
1. Đảm bảo database đã tạo
2. Kiểm tra permissions của user
3. Chạy lại migration với verbose: `dotnet ef database update --verbose`