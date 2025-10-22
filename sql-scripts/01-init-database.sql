-- Tạo database DoriDongGiay nếu chưa tồn tại
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'DoriDongGiay')
BEGIN
    CREATE DATABASE DoriDongGiay;
END
GO

USE DoriDongGiay;
GO

-- Tạo bảng Categories
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Categories' AND xtype='U')
BEGIN
    CREATE TABLE Categories (
        Id int IDENTITY(1,1) PRIMARY KEY,
        Name nvarchar(100) NOT NULL,
        Description nvarchar(500),
        ImageUrl nvarchar(255),
        IsActive bit DEFAULT 1,
        CreatedAt datetime2 DEFAULT GETDATE(),
        UpdatedAt datetime2 DEFAULT GETDATE()
    );
END
GO

-- Tạo bảng Products
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Products' AND xtype='U')
BEGIN
    CREATE TABLE Products (
        Id int IDENTITY(1,1) PRIMARY KEY,
        Name nvarchar(200) NOT NULL,
        Description nvarchar(max),
        Price decimal(18,2) NOT NULL,
        OriginalPrice decimal(18,2),
        ImageUrl nvarchar(255),
        CategoryId int,
        Brand nvarchar(100),
        Size nvarchar(50),
        Color nvarchar(50),
        Material nvarchar(100),
        StockQuantity int DEFAULT 0,
        IsActive bit DEFAULT 1,
        IsFeatured bit DEFAULT 0,
        IsOnSale bit DEFAULT 0,
        CreatedAt datetime2 DEFAULT GETDATE(),
        UpdatedAt datetime2 DEFAULT GETDATE(),
        FOREIGN KEY (CategoryId) REFERENCES Categories(Id)
    );
END
GO

-- Tạo bảng Users
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Users' AND xtype='U')
BEGIN
    CREATE TABLE Users (
        Id int IDENTITY(1,1) PRIMARY KEY,
        Username nvarchar(50) UNIQUE NOT NULL,
        Email nvarchar(100) UNIQUE NOT NULL,
        PasswordHash nvarchar(255) NOT NULL,
        FirstName nvarchar(50),
        LastName nvarchar(50),
        PhoneNumber nvarchar(20),
        Address nvarchar(500),
        City nvarchar(50),
        Country nvarchar(50),
        PostalCode nvarchar(20),
        IsActive bit DEFAULT 1,
        CreatedAt datetime2 DEFAULT GETDATE(),
        UpdatedAt datetime2 DEFAULT GETDATE()
    );
END
GO

-- Tạo bảng Orders
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Orders' AND xtype='U')
BEGIN
    CREATE TABLE Orders (
        Id int IDENTITY(1,1) PRIMARY KEY,
        UserId int,
        OrderNumber nvarchar(50) UNIQUE NOT NULL,
        TotalAmount decimal(18,2) NOT NULL,
        Status nvarchar(50) DEFAULT 'Pending',
        PaymentMethod nvarchar(50),
        PaymentStatus nvarchar(50) DEFAULT 'Pending',
        ShippingAddress nvarchar(500),
        ShippingCity nvarchar(50),
        ShippingCountry nvarchar(50),
        ShippingPostalCode nvarchar(20),
        OrderDate datetime2 DEFAULT GETDATE(),
        ShippedDate datetime2,
        DeliveredDate datetime2,
        FOREIGN KEY (UserId) REFERENCES Users(Id)
    );
END
GO

-- Tạo bảng OrderDetails
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='OrderDetails' AND xtype='U')
BEGIN
    CREATE TABLE OrderDetails (
        Id int IDENTITY(1,1) PRIMARY KEY,
        OrderId int,
        ProductId int,
        Quantity int NOT NULL,
        UnitPrice decimal(18,2) NOT NULL,
        TotalPrice decimal(18,2) NOT NULL,
        FOREIGN KEY (OrderId) REFERENCES Orders(Id),
        FOREIGN KEY (ProductId) REFERENCES Products(Id)
    );
END
GO

-- Tạo bảng CartItems
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='CartItems' AND xtype='U')
BEGIN
    CREATE TABLE CartItems (
        Id int IDENTITY(1,1) PRIMARY KEY,
        UserId int,
        ProductId int,
        Quantity int NOT NULL DEFAULT 1,
        CreatedAt datetime2 DEFAULT GETDATE(),
        FOREIGN KEY (UserId) REFERENCES Users(Id),
        FOREIGN KEY (ProductId) REFERENCES Products(Id)
    );
END
GO