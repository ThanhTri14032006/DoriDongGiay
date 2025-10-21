// Admin API Configuration
const API_BASE_URL = 'http://localhost:5239/api';

// API Helper Functions
window.api = {
    products: {
        async getProducts() {
            return [
                { id: 1, name: "Giày Nike Air Max", category: "Giày Thể Thao", price: 2500000, stock: 12, imageUrl: "../img/products/product-1.jpg", sku: "SP001" },
                { id: 2, name: "Giày Adidas Ultraboost", category: "Giày Thể Thao", price: 3200000, stock: 8, imageUrl: "../img/products/product-2.jpg", sku: "SP002" },
                { id: 3, name: "Giày Converse Classic", category: "Giày Casual", price: 1500000, stock: 15, imageUrl: "../img/products/product-3.jpg", sku: "SP003" },
                { id: 4, name: "Giày Vans Old Skool", category: "Giày Casual", price: 1800000, stock: 10, imageUrl: "../img/products/product-4.jpg", sku: "SP004" },
                { id: 5, name: "Giày Nike Mercurial", category: "Giày Đá Bóng", price: 2800000, stock: 0, imageUrl: "../img/products/product-5.jpg", sku: "SP005" }
            ];
        },
        async getProduct(id) {
            const products = await this.getProducts();
            return products.find(p => p.id == id) || null;
        },
        async createProduct(product) {
            console.log("Tạo sản phẩm mới:", product);
            return { ...product, id: Math.floor(Math.random() * 1000) + 6 };
        },
        async updateProduct(id, product) {
            console.log("Cập nhật sản phẩm:", id, product);
            return { ...product, id };
        },
        async deleteProduct(id) {
            console.log("Xóa sản phẩm:", id);
            return true;
        },
        async getCategories() {
            return ["Giày Thể Thao", "Giày Casual", "Giày Đá Bóng", "Giày Chạy Bộ", "Giày Thời Trang"];
        }
    }
};

// Lớp API Client (không sử dụng)
class AdminApiClient {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        
        try {
            const response = await fetch(url, options);
            
            // Handle non-JSON responses (like FormData)
            const contentType = response.headers.get('content-type');
            let data;
            
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text();
                try {
                    // Try to parse as JSON anyway
                    data = JSON.parse(data);
                } catch (e) {
                    // Keep as text if not JSON
                }
            }
            
            if (!response.ok) {
                throw new Error(data.message || 'API request failed');
            }
            
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Products API
    async getProducts() {
        return this.request('/productsapi');
    }

    async getProduct(id) {
        return this.request(`/productsapi/${id}`);
    }

    async createProduct(formData) {
        return this.request('/productsapi', {
            method: 'POST',
            body: formData
            // Don't set Content-Type header when sending FormData
        });
    }

    async updateProduct(id, formData) {
        return this.request(`/productsapi/${id}`, {
            method: 'PUT',
            body: formData
            // Don't set Content-Type header when sending FormData
        });
    }

    async deleteProduct(id) {
        return this.request(`/productsapi/${id}`, {
            method: 'DELETE'
        });
    }

    async getCategories() {
        return this.request('/productsapi/categories');
    }

    // Orders API
    async getOrders() {
        return this.request('/ordersapi');
    }

    async getOrder(id) {
        return this.request(`/ordersapi/${id}`);
    }

    async updateOrderStatus(id, status) {
        return this.request(`/ordersapi/${id}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });
    }

    // Users API
    async getUsers() {
        return this.request('/usersapi');
    }

    async getUser(id) {
        return this.request(`/usersapi/${id}`);
    }

    // Dashboard API
    async getDashboardStats() {
        return this.request('/dashboardapi/stats');
    }
}

// Create global API client instance
const api = new AdminApiClient();

// Export for use in other files
window.api = api;