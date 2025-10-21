// API Configuration
const API_BASE_URL = 'http://localhost:5239/api';

// API Helper Functions
class ApiClient {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'API request failed');
            }
            
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Auth API
    async login(email, password, rememberMe = false) {
        return this.request('/authapi/login', {
            method: 'POST',
            body: JSON.stringify({ email, password, rememberMe })
        });
    }

    async register(userData) {
        return this.request('/authapi/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }

    async logout() {
        return this.request('/authapi/logout', {
            method: 'POST'
        });
    }

    async getCurrentUser() {
        return this.request('/authapi/user');
    }

    // Products API
    async getProducts() {
        // Sử dụng dữ liệu mẫu tạm thời
        return Promise.resolve([
            { id: 1, name: "Giày thể thao nam", price: 1200000, imageUrl: "https://example.com/shoe1.jpg", description: "Giày thể thao nam cao cấp" },
            { id: 2, name: "Giày chạy bộ nữ", price: 950000, imageUrl: "https://example.com/shoe2.jpg", description: "Giày chạy bộ nữ nhẹ và thoáng khí" },
            { id: 3, name: "Giày đá bóng", price: 1500000, imageUrl: "https://example.com/shoe3.jpg", description: "Giày đá bóng chuyên nghiệp" },
            { id: 4, name: "Giày tây nam", price: 1800000, imageUrl: "https://example.com/shoe4.jpg", description: "Giày tây nam công sở" },
            { id: 5, name: "Giày cao gót nữ", price: 1350000, imageUrl: "https://example.com/shoe5.jpg", description: "Giày cao gót nữ dự tiệc" },
            { id: 6, name: "Giày sandal nữ", price: 750000, imageUrl: "https://example.com/shoe6.jpg", description: "Giày sandal nữ mùa hè" }
        ]);
    }

    async getProduct(id) {
        // Sử dụng dữ liệu mẫu tạm thời
        const products = [
            { id: 1, name: "Giày thể thao nam", price: 1200000, imageUrl: "https://example.com/shoe1.jpg", description: "Giày thể thao nam cao cấp" },
            { id: 2, name: "Giày chạy bộ nữ", price: 950000, imageUrl: "https://example.com/shoe2.jpg", description: "Giày chạy bộ nữ nhẹ và thoáng khí" },
            { id: 3, name: "Giày đá bóng", price: 1500000, imageUrl: "https://example.com/shoe3.jpg", description: "Giày đá bóng chuyên nghiệp" },
            { id: 4, name: "Giày tây nam", price: 1800000, imageUrl: "https://example.com/shoe4.jpg", description: "Giày tây nam công sở" },
            { id: 5, name: "Giày cao gót nữ", price: 1350000, imageUrl: "https://example.com/shoe5.jpg", description: "Giày cao gót nữ dự tiệc" },
            { id: 6, name: "Giày sandal nữ", price: 750000, imageUrl: "https://example.com/shoe6.jpg", description: "Giày sandal nữ mùa hè" }
        ];
        const product = products.find(p => p.id === parseInt(id));
        return Promise.resolve(product || null);
    }

    // Cart API
    async getCart() {
        return this.request('/cartapi');
    }

    async addToCart(productId, quantity = 1) {
        return this.request('/cartapi/add', {
            method: 'POST',
            body: JSON.stringify({ productId, quantity })
        });
    }

    async updateCart(productId, quantity) {
        return this.request('/cartapi/update', {
            method: 'PUT',
            body: JSON.stringify({ productId, quantity })
        });
    }

    async removeFromCart(productId) {
        return this.request('/cartapi/remove', {
            method: 'DELETE',
            body: JSON.stringify({ productId })
        });
    }

    async getCartCount() {
        return this.request('/cartapi/count');
    }

    async getCartSummary() {
        return this.request('/cartapi/summary');
    }

    async clearCart() {
        return this.request('/cart/clear', {
            method: 'DELETE'
        });
    }
}

// Create global API client instance
const api = new ApiClient();

// Utility functions
function showAlert(message, type = 'info') {
    const alertContainer = document.getElementById('alert-container') || createAlertContainer();
    const alertId = 'alert-' + Date.now();
    
    const alertHTML = `
        <div id="${alertId}" class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    alertContainer.insertAdjacentHTML('beforeend', alertHTML);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        const alertElement = document.getElementById(alertId);
        if (alertElement) {
            alertElement.remove();
        }
    }, 5000);
}

function createAlertContainer() {
    const container = document.createElement('div');
    container.id = 'alert-container';
    container.className = 'position-fixed top-0 end-0 p-3';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    return container;
}

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('vi-VN');
}

// Export for use in other files
window.api = api;
window.showAlert = showAlert;
window.formatPrice = formatPrice;
window.formatDate = formatDate;
