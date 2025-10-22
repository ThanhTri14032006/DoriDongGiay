-- Azure SQL Database Migration Script for DoriDongGiay
-- Chạy script này sau khi đã tạo Azure SQL Database

-- Kiểm tra và tạo bảng Categories
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Categories')
BEGIN
    CREATE TABLE [dbo].[Categories] (
        [Id] int IDENTITY(1,1) NOT NULL PRIMARY KEY,
        [Name] nvarchar(100) NOT NULL,
        [Description] nvarchar(500) NULL,
        [ImageUrl] nvarchar(255) NULL,
        [IsActive] bit NOT NULL DEFAULT 1,
        [CreatedAt] datetime2(7) NOT NULL DEFAULT GETDATE(),
        [UpdatedAt] datetime2(7) NOT NULL DEFAULT GETDATE()
    );
    PRINT 'Bảng Categories đã được tạo';
END
ELSE
BEGIN
    PRINT 'Bảng Categories đã tồn tại';
END

-- Kiểm tra và tạo bảng Products
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Products')
BEGIN
    CREATE TABLE [dbo].[Products] (
        [Id] int IDENTITY(1,1) NOT NULL PRIMARY KEY,
        [Name] nvarchar(200) NOT NULL,
        [Description] nvarchar(max) NULL,
        [Price] decimal(18,2) NOT NULL,
        [OriginalPrice] decimal(18,2) NULL,
        [ImageUrl] nvarchar(255) NULL,
        [CategoryId] int NULL,
        [Brand] nvarchar(100) NULL,
        [Size] nvarchar(50) NULL,
        [Color] nvarchar(50) NULL,
        [Material] nvarchar(100) NULL,
        [StockQuantity] int NOT NULL DEFAULT 0,
        [IsActive] bit NOT NULL DEFAULT 1,
        [IsFeatured] bit NOT NULL DEFAULT 0,
        [IsOnSale] bit NOT NULL DEFAULT 0,
        [CreatedAt] datetime2(7) NOT NULL DEFAULT GETDATE(),
        [UpdatedAt] datetime2(7) NOT NULL DEFAULT GETDATE(),
        CONSTRAINT [FK_Products_Categories] FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[Categories]([Id])
    );
    PRINT 'Bảng Products đã được tạo';
END
ELSE
BEGIN
    PRINT 'Bảng Products đã tồn tại';
END

-- Kiểm tra và tạo bảng AspNetUsers (Identity)
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'AspNetUsers')
BEGIN
    -- Tạo các bảng Identity cơ bản
    CREATE TABLE [dbo].[AspNetRoles] (
        [Id] nvarchar(450) NOT NULL PRIMARY KEY,
        [Name] nvarchar(256) NULL,
        [NormalizedName] nvarchar(256) NULL,
        [ConcurrencyStamp] nvarchar(max) NULL
    );

    CREATE TABLE [dbo].[AspNetUsers] (
        [Id] nvarchar(450) NOT NULL PRIMARY KEY,
        [UserName] nvarchar(256) NULL,
        [NormalizedUserName] nvarchar(256) NULL,
        [Email] nvarchar(256) NULL,
        [NormalizedEmail] nvarchar(256) NULL,
        [EmailConfirmed] bit NOT NULL,
        [PasswordHash] nvarchar(max) NULL,
        [SecurityStamp] nvarchar(max) NULL,
        [ConcurrencyStamp] nvarchar(max) NULL,
        [PhoneNumber] nvarchar(max) NULL,
        [PhoneNumberConfirmed] bit NOT NULL,
        [TwoFactorEnabled] bit NOT NULL,
        [LockoutEnd] datetimeoffset(7) NULL,
        [LockoutEnabled] bit NOT NULL,
        [AccessFailedCount] int NOT NULL,
        [FirstName] nvarchar(50) NULL,
        [LastName] nvarchar(50) NULL,
        [Address] nvarchar(500) NULL,
        [City] nvarchar(50) NULL,
        [Country] nvarchar(50) NULL,
        [PostalCode] nvarchar(20) NULL,
        [IsActive] bit NOT NULL DEFAULT 1,
        [CreatedAt] datetime2(7) NOT NULL DEFAULT GETDATE(),
        [UpdatedAt] datetime2(7) NOT NULL DEFAULT GETDATE()
    );
    PRINT 'Bảng AspNetUsers đã được tạo';
END

-- Kiểm tra và tạo bảng Orders
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Orders')
BEGIN
    CREATE TABLE [dbo].[Orders] (
        [Id] int IDENTITY(1,1) NOT NULL PRIMARY KEY,
        [UserId] nvarchar(450) NULL,
        [OrderNumber] nvarchar(50) NOT NULL UNIQUE,
        [TotalAmount] decimal(18,2) NOT NULL,
        [Status] nvarchar(50) NOT NULL DEFAULT 'Pending',
        [PaymentMethod] nvarchar(50) NULL,
        [PaymentStatus] nvarchar(50) NOT NULL DEFAULT 'Pending',
        [ShippingAddress] nvarchar(500) NULL,
        [ShippingCity] nvarchar(50) NULL,
        [ShippingCountry] nvarchar(50) NULL,
        [ShippingPostalCode] nvarchar(20) NULL,
        [OrderDate] datetime2(7) NOT NULL DEFAULT GETDATE(),
        [ShippedDate] datetime2(7) NULL,
        [DeliveredDate] datetime2(7) NULL,
        CONSTRAINT [FK_Orders_AspNetUsers] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers]([Id])
    );
    PRINT 'Bảng Orders đã được tạo';
END

-- Kiểm tra và tạo bảng OrderDetails
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'OrderDetails')
BEGIN
    CREATE TABLE [dbo].[OrderDetails] (
        [Id] int IDENTITY(1,1) NOT NULL PRIMARY KEY,
        [OrderId] int NOT NULL,
        [ProductId] int NOT NULL,
        [Quantity] int NOT NULL,
        [UnitPrice] decimal(18,2) NOT NULL,
        [TotalPrice] decimal(18,2) NOT NULL,
        CONSTRAINT [FK_OrderDetails_Orders] FOREIGN KEY ([OrderId]) REFERENCES [dbo].[Orders]([Id]),
        CONSTRAINT [FK_OrderDetails_Products] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Products]([Id])
    );
    PRINT 'Bảng OrderDetails đã được tạo';
END

-- Kiểm tra và tạo bảng CartItems
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'CartItems')
BEGIN
    CREATE TABLE [dbo].[CartItems] (
        [Id] int IDENTITY(1,1) NOT NULL PRIMARY KEY,
        [UserId] nvarchar(450) NOT NULL,
        [ProductId] int NOT NULL,
        [Quantity] int NOT NULL DEFAULT 1,
        [CreatedAt] datetime2(7) NOT NULL DEFAULT GETDATE(),
        CONSTRAINT [FK_CartItems_AspNetUsers] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers]([Id]),
        CONSTRAINT [FK_CartItems_Products] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Products]([Id])
    );
    PRINT 'Bảng CartItems đã được tạo';
END

-- Thêm dữ liệu Categories nếu chưa có
IF NOT EXISTS (SELECT * FROM Categories)
BEGIN
    INSERT INTO [dbo].[Categories] ([Name], [Description], [ImageUrl]) VALUES
    (N'Giày Thể Thao Nam', N'Giày thể thao dành cho nam giới, phù hợp cho tập luyện và hoạt động hàng ngày', N'/images/categories/men-sneakers.jpg'),
    (N'Giày Thể Thao Nữ', N'Giày thể thao dành cho nữ giới, thiết kế thời trang và thoải mái', N'/images/categories/women-sneakers.jpg'),
    (N'Giày Công Sở Nam', N'Giày công sở lịch lãm dành cho nam giới', N'/images/categories/men-formal.jpg'),
    (N'Giày Cao Gót Nữ', N'Giày cao gót thời trang dành cho nữ giới', N'/images/categories/women-heels.jpg'),
    (N'Dép & Sandal', N'Dép và sandal thoải mái cho mọi lứa tuổi', N'/images/categories/sandals.jpg'),
    (N'Giày Chạy Bộ', N'Giày chuyên dụng cho chạy bộ và thể thao', N'/images/categories/running-shoes.jpg');
    PRINT 'Đã thêm dữ liệu Categories';
END

-- Thêm dữ liệu Products nếu chưa có
IF NOT EXISTS (SELECT * FROM Products)
BEGIN
    INSERT INTO [dbo].[Products] ([Name], [Description], [Price], [OriginalPrice], [ImageUrl], [CategoryId], [Brand], [Size], [Color], [Material], [StockQuantity], [IsFeatured], [IsOnSale]) VALUES
    -- Giày Thể Thao Nam
    (N'Nike Air Max 270', N'Giày thể thao Nike Air Max 270 với công nghệ đệm khí tiên tiến, mang lại sự thoải mái tối đa', 2890000, 3200000, N'/images/products/nike-air-max-270.jpg', 1, N'Nike', N'39,40,41,42,43', N'Đen/Trắng', N'Mesh, Synthetic', 50, 1, 1),
    (N'Adidas Ultraboost 22', N'Giày chạy bộ Adidas Ultraboost 22 với công nghệ Boost độc quyền', 4200000, 4500000, N'/images/products/adidas-ultraboost-22.jpg', 1, N'Adidas', N'39,40,41,42,43,44', N'Xanh Navy', N'Primeknit, Boost', 35, 1, 1),
    (N'Converse Chuck Taylor All Star', N'Giày thể thao cổ điển Converse Chuck Taylor All Star', 1590000, 1790000, N'/images/products/converse-chuck-taylor.jpg', 1, N'Converse', N'36,37,38,39,40,41,42', N'Trắng', N'Canvas', 80, 0, 1),
    (N'Vans Old Skool', N'Giày skateboard Vans Old Skool với thiết kế iconic', 1890000, 2100000, N'/images/products/vans-old-skool.jpg', 1, N'Vans', N'38,39,40,41,42,43', N'Đen/Trắng', N'Canvas, Suede', 60, 1, 1),
    
    -- Giày Thể Thao Nữ
    (N'Nike Air Force 1 Low', N'Giày thể thao nữ Nike Air Force 1 Low phiên bản cổ điển', 2690000, 2990000, N'/images/products/nike-air-force-1-women.jpg', 2, N'Nike', N'35,36,37,38,39,40', N'Trắng/Hồng', N'Leather, Synthetic', 45, 1, 1),
    (N'Adidas Stan Smith', N'Giày tennis Adidas Stan Smith dành cho nữ', 2290000, 2590000, N'/images/products/adidas-stan-smith-women.jpg', 2, N'Adidas', N'35,36,37,38,39,40', N'Trắng/Xanh', N'Leather', 55, 0, 1),
    (N'New Balance 327', N'Giày thể thao retro New Balance 327 cho nữ', 2790000, 3100000, N'/images/products/new-balance-327-women.jpg', 2, N'New Balance', N'35,36,37,38,39,40', N'Hồng/Xám', N'Suede, Nylon', 40, 1, 1),
    
    -- Giày Công Sở Nam
    (N'Clarks Desert Boot', N'Giày boot da lộn Clarks Desert Boot cổ điển', 3490000, 3890000, N'/images/products/clarks-desert-boot.jpg', 3, N'Clarks', N'39,40,41,42,43,44', N'Nâu', N'Suede Leather', 25, 1, 1),
    (N'Cole Haan Oxford', N'Giày Oxford da thật Cole Haan cho doanh nhân', 4890000, 5490000, N'/images/products/cole-haan-oxford.jpg', 3, N'Cole Haan', N'39,40,41,42,43,44', N'Đen', N'Genuine Leather', 20, 1, 0),
    (N'Loafer Da Thật Premium', N'Giày loafer da thật cao cấp, thiết kế sang trọng', 2890000, 3290000, N'/images/products/premium-leather-loafer.jpg', 3, N'DoriDongGiay', N'39,40,41,42,43', N'Nâu Đậm', N'Genuine Leather', 30, 0, 1),
    
    -- Giày Cao Gót Nữ
    (N'Jimmy Choo Pumps', N'Giày cao gót Jimmy Choo sang trọng', 8900000, 9900000, N'/images/products/jimmy-choo-pumps.jpg', 4, N'Jimmy Choo', N'35,36,37,38,39,40', N'Đen', N'Patent Leather', 15, 1, 1),
    (N'Christian Louboutin So Kate', N'Giày cao gót Christian Louboutin So Kate 12cm', 15900000, 17900000, N'/images/products/louboutin-so-kate.jpg', 4, N'Christian Louboutin', N'35,36,37,38,39,40', N'Đỏ', N'Patent Leather', 8, 1, 1),
    (N'Cao Gót Công Sở 7cm', N'Giày cao gót công sở 7cm thoải mái', 1290000, 1590000, N'/images/products/office-heels-7cm.jpg', 4, N'DoriDongGiay', N'35,36,37,38,39,40', N'Nude', N'Synthetic Leather', 50, 0, 1),
    
    -- Dép & Sandal
    (N'Birkenstock Arizona', N'Dép Birkenstock Arizona với đế cork tự nhiên', 2490000, 2790000, N'/images/products/birkenstock-arizona.jpg', 5, N'Birkenstock', N'36,37,38,39,40,41,42,43', N'Nâu', N'Birko-Flor, Cork', 40, 1, 1),
    (N'Havaianas Brasil', N'Dép xỏ ngón Havaianas Brasil chính hãng', 590000, 690000, N'/images/products/havaianas-brasil.jpg', 5, N'Havaianas', N'35,36,37,38,39,40,41,42', N'Xanh/Vàng', N'Rubber', 100, 0, 1),
    (N'Sandal Da Nam Cao Cấp', N'Sandal da thật dành cho nam giới', 1890000, 2190000, N'/images/products/premium-men-sandal.jpg', 5, N'DoriDongGiay', N'39,40,41,42,43,44', N'Đen', N'Genuine Leather', 35, 1, 1),
    
    -- Giày Chạy Bộ
    (N'Nike ZoomX Vaporfly', N'Giày chạy marathon Nike ZoomX Vaporfly NEXT%', 6900000, 7500000, N'/images/products/nike-vaporfly.jpg', 6, N'Nike', N'39,40,41,42,43,44', N'Xanh/Cam', N'ZoomX Foam, Carbon Fiber', 20, 1, 1),
    (N'Asics Gel-Kayano 29', N'Giày chạy bộ Asics Gel-Kayano 29 cho runner', 4290000, 4790000, N'/images/products/asics-gel-kayano-29.jpg', 6, N'Asics', N'39,40,41,42,43,44', N'Xám/Xanh', N'FlyteFoam, Gel', 30, 1, 1),
    (N'Mizuno Wave Rider 26', N'Giày chạy bộ Mizuno Wave Rider 26', 3590000, 3990000, N'/images/products/mizuno-wave-rider-26.jpg', 6, N'Mizuno', N'39,40,41,42,43,44', N'Đen/Bạc', N'Enerzy Foam, Wave Plate', 25, 0, 1);
    
    PRINT 'Đã thêm dữ liệu Products';
END

PRINT 'Migration hoàn tất! Database Azure SQL đã sẵn sàng.';