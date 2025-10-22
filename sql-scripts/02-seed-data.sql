USE DoriDongGiay;
GO

-- Thêm dữ liệu Categories
INSERT INTO Categories (Name, Description, ImageUrl) VALUES
('Giày Thể Thao Nam', 'Giày thể thao dành cho nam giới, phù hợp cho tập luyện và hoạt động hàng ngày', '/images/categories/men-sneakers.jpg'),
('Giày Thể Thao Nữ', 'Giày thể thao dành cho nữ giới, thiết kế thời trang và thoải mái', '/images/categories/women-sneakers.jpg'),
('Giày Công Sở Nam', 'Giày công sở lịch lãm dành cho nam giới', '/images/categories/men-formal.jpg'),
('Giày Cao Gót Nữ', 'Giày cao gót thời trang dành cho nữ giới', '/images/categories/women-heels.jpg'),
('Dép & Sandal', 'Dép và sandal thoải mái cho mọi lứa tuổi', '/images/categories/sandals.jpg'),
('Giày Chạy Bộ', 'Giày chuyên dụng cho chạy bộ và thể thao', '/images/categories/running-shoes.jpg');
GO

-- Thêm dữ liệu Products
INSERT INTO Products (Name, Description, Price, OriginalPrice, ImageUrl, CategoryId, Brand, Size, Color, Material, StockQuantity, IsFeatured, IsOnSale) VALUES
-- Giày Thể Thao Nam
('Nike Air Max 270', 'Giày thể thao Nike Air Max 270 với công nghệ đệm khí tiên tiến, mang lại sự thoải mái tối đa', 2890000, 3200000, '/images/products/nike-air-max-270.jpg', 1, 'Nike', '39,40,41,42,43', 'Đen/Trắng', 'Mesh, Synthetic', 50, 1, 1),
('Adidas Ultraboost 22', 'Giày chạy bộ Adidas Ultraboost 22 với công nghệ Boost độc quyền', 4200000, 4500000, '/images/products/adidas-ultraboost-22.jpg', 1, 'Adidas', '39,40,41,42,43,44', 'Xanh Navy', 'Primeknit, Boost', 35, 1, 1),
('Converse Chuck Taylor All Star', 'Giày thể thao cổ điển Converse Chuck Taylor All Star', 1590000, 1790000, '/images/products/converse-chuck-taylor.jpg', 1, 'Converse', '36,37,38,39,40,41,42', 'Trắng', 'Canvas', 80, 0, 1),
('Vans Old Skool', 'Giày skateboard Vans Old Skool với thiết kế iconic', 1890000, 2100000, '/images/products/vans-old-skool.jpg', 1, 'Vans', '38,39,40,41,42,43', 'Đen/Trắng', 'Canvas, Suede', 60, 1, 1),

-- Giày Thể Thao Nữ
('Nike Air Force 1 Low', 'Giày thể thao nữ Nike Air Force 1 Low phiên bản cổ điển', 2690000, 2990000, '/images/products/nike-air-force-1-women.jpg', 2, 'Nike', '35,36,37,38,39,40', 'Trắng/Hồng', 'Leather, Synthetic', 45, 1, 1),
('Adidas Stan Smith', 'Giày tennis Adidas Stan Smith dành cho nữ', 2290000, 2590000, '/images/products/adidas-stan-smith-women.jpg', 2, 'Adidas', '35,36,37,38,39,40', 'Trắng/Xanh', 'Leather', 55, 0, 1),
('New Balance 327', 'Giày thể thao retro New Balance 327 cho nữ', 2790000, 3100000, '/images/products/new-balance-327-women.jpg', 2, 'New Balance', '35,36,37,38,39,40', 'Hồng/Xám', 'Suede, Nylon', 40, 1, 1),

-- Giày Công Sở Nam
('Clarks Desert Boot', 'Giày boot da lộn Clarks Desert Boot cổ điển', 3490000, 3890000, '/images/products/clarks-desert-boot.jpg', 3, 'Clarks', '39,40,41,42,43,44', 'Nâu', 'Suede Leather', 25, 1, 1),
('Cole Haan Oxford', 'Giày Oxford da thật Cole Haan cho doanh nhân', 4890000, 5490000, '/images/products/cole-haan-oxford.jpg', 3, 'Cole Haan', '39,40,41,42,43,44', 'Đen', 'Genuine Leather', 20, 1, 0),
('Loafer Da Thật Premium', 'Giày loafer da thật cao cấp, thiết kế sang trọng', 2890000, 3290000, '/images/products/premium-leather-loafer.jpg', 3, 'DoriDongGiay', '39,40,41,42,43', 'Nâu Đậm', 'Genuine Leather', 30, 0, 1),

-- Giày Cao Gót Nữ
('Jimmy Choo Pumps', 'Giày cao gót Jimmy Choo sang trọng', 8900000, 9900000, '/images/products/jimmy-choo-pumps.jpg', 4, 'Jimmy Choo', '35,36,37,38,39,40', 'Đen', 'Patent Leather', 15, 1, 1),
('Christian Louboutin So Kate', 'Giày cao gót Christian Louboutin So Kate 12cm', 15900000, 17900000, '/images/products/louboutin-so-kate.jpg', 4, 'Christian Louboutin', '35,36,37,38,39,40', 'Đỏ', 'Patent Leather', 8, 1, 1),
('Cao Gót Công Sở 7cm', 'Giày cao gót công sở 7cm thoải mái', 1290000, 1590000, '/images/products/office-heels-7cm.jpg', 4, 'DoriDongGiay', '35,36,37,38,39,40', 'Nude', 'Synthetic Leather', 50, 0, 1),

-- Dép & Sandal
('Birkenstock Arizona', 'Dép Birkenstock Arizona với đế cork tự nhiên', 2490000, 2790000, '/images/products/birkenstock-arizona.jpg', 5, 'Birkenstock', '36,37,38,39,40,41,42,43', 'Nâu', 'Birko-Flor, Cork', 40, 1, 1),
('Havaianas Brasil', 'Dép xỏ ngón Havaianas Brasil chính hãng', 590000, 690000, '/images/products/havaianas-brasil.jpg', 5, 'Havaianas', '35,36,37,38,39,40,41,42', 'Xanh/Vàng', 'Rubber', 100, 0, 1),
('Sandal Da Nam Cao Cấp', 'Sandal da thật dành cho nam giới', 1890000, 2190000, '/images/products/premium-men-sandal.jpg', 5, 'DoriDongGiay', '39,40,41,42,43,44', 'Đen', 'Genuine Leather', 35, 1, 1),

-- Giày Chạy Bộ
('Nike ZoomX Vaporfly', 'Giày chạy marathon Nike ZoomX Vaporfly NEXT%', 6900000, 7500000, '/images/products/nike-vaporfly.jpg', 6, 'Nike', '39,40,41,42,43,44', 'Xanh/Cam', 'ZoomX Foam, Carbon Fiber', 20, 1, 1),
('Asics Gel-Kayano 29', 'Giày chạy bộ Asics Gel-Kayano 29 cho runner', 4290000, 4790000, '/images/products/asics-gel-kayano-29.jpg', 6, 'Asics', '39,40,41,42,43,44', 'Xám/Xanh', 'FlyteFoam, Gel', 30, 1, 1),
('Mizuno Wave Rider 26', 'Giày chạy bộ Mizuno Wave Rider 26', 3590000, 3990000, '/images/products/mizuno-wave-rider-26.jpg', 6, 'Mizuno', '39,40,41,42,43,44', 'Đen/Bạc', 'Enerzy Foam, Wave Plate', 25, 0, 1);
GO

-- Thêm dữ liệu Users mẫu
INSERT INTO Users (Username, Email, PasswordHash, FirstName, LastName, PhoneNumber, Address, City, Country, PostalCode) VALUES
('admin', 'admin@doridonggiay.com', 'AQAAAAEAACcQAAAAEJ5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q==', 'Admin', 'System', '0123456789', '123 Đường ABC', 'Hồ Chí Minh', 'Việt Nam', '70000'),
('thanhtri', 'thanhtri@gmail.com', 'AQAAAAEAACcQAAAAEJ5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q==', 'Thành', 'Trí', '0987654321', '456 Đường XYZ', 'Hồ Chí Minh', 'Việt Nam', '70000'),
('customer1', 'customer1@gmail.com', 'AQAAAAEAACcQAAAAEJ5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q==', 'Nguyễn', 'Văn A', '0912345678', '789 Đường DEF', 'Hà Nội', 'Việt Nam', '10000');
GO

-- Thêm dữ liệu Orders mẫu
INSERT INTO Orders (UserId, OrderNumber, TotalAmount, Status, PaymentMethod, PaymentStatus, ShippingAddress, ShippingCity, ShippingCountry, ShippingPostalCode, OrderDate) VALUES
(2, 'ORD-2024-001', 5780000, 'Delivered', 'Credit Card', 'Paid', '456 Đường XYZ', 'Hồ Chí Minh', 'Việt Nam', '70000', '2024-01-15'),
(3, 'ORD-2024-002', 2890000, 'Shipped', 'COD', 'Pending', '789 Đường DEF', 'Hà Nội', 'Việt Nam', '10000', '2024-01-20'),
(2, 'ORD-2024-003', 4200000, 'Processing', 'Bank Transfer', 'Paid', '456 Đường XYZ', 'Hồ Chí Minh', 'Việt Nam', '70000', '2024-01-25');
GO

-- Thêm dữ liệu OrderDetails mẫu
INSERT INTO OrderDetails (OrderId, ProductId, Quantity, UnitPrice, TotalPrice) VALUES
(1, 1, 2, 2890000, 5780000),
(2, 1, 1, 2890000, 2890000),
(3, 2, 1, 4200000, 4200000);
GO

PRINT 'Database và dữ liệu mẫu đã được tạo thành công!';