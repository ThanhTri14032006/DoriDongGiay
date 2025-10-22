// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

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
            credentials: 'include',
            ...options
        };

        try {
            const response = await fetch(url, config);
            const contentType = response.headers.get('content-type') || '';
            let payload;
            if (contentType.includes('application/json')) {
                payload = await response.json();
            } else {
                payload = await response.text();
            }

            if (!response.ok) {
                const message = (payload && payload.message) ? payload.message : (typeof payload === 'string' ? payload : 'API request failed');
                throw new Error(message);
            }
            return payload;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Auth API
    async login(email, password, rememberMe = false) {
        try {
            return await this.request('/authapi/login', {
                method: 'POST',
                body: JSON.stringify({ email, password, rememberMe })
            });
        } catch (e) {
            const user = {
                id: 'mock-1',
                email: email,
                fullName: 'Guest User',
                phone: ''
            };
            localStorage.setItem('currentUser', JSON.stringify(user));
            return { success: true, message: 'Đăng nhập (mock) thành công', user };
        }
    }

    async register(userData) {
        try {
            return await this.request('/authapi/register', {
                method: 'POST',
                body: JSON.stringify(userData)
            });
        } catch (e) {
            const user = {
                id: 'mock-2',
                email: userData.email,
                fullName: userData.fullName || 'Guest User',
                phone: userData.phone || ''
            };
            localStorage.setItem('currentUser', JSON.stringify(user));
            return { success: true, message: 'Đăng ký (mock) thành công', user };
        }
    }

    async logout() {
        try {
            return await this.request('/authapi/logout', {
                method: 'POST'
            });
        } catch (e) {
            localStorage.removeItem('currentUser');
            return { success: true, message: 'Đăng xuất (mock) thành công' };
        }
    }

    async getCurrentUser() {
        try {
            return await this.request('/authapi/user');
        } catch (e) {
            const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
            if (user) {
                return { success: true, user };
            }
            return { success: false };
        }
    }

    // Products API
    async getProducts() {
        try {
            return await this.request('/productsapi');
        } catch (e) {
            const res = await fetch('mock/products.json');
            const data = await res.json();
            return data;
        }
    }

    async getProduct(id) {
        try {
            return await this.request(`/productsapi/${id}`);
        } catch (e) {
            const res = await fetch('mock/products.json');
            const all = await res.json();
            return all.find(p => String(p.id) === String(id)) || null;
        }
    }

    // Cart API
    async getCart() {
        try {
            return await this.request('/cartapi');
        } catch (e) {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            return { success: true, cart };
        }
    }

    async addToCart(productId, quantity = 1) {
        try {
            return await this.request(`/cartapi/add?productId=${encodeURIComponent(productId)}&quantity=${encodeURIComponent(quantity)}`, {
                method: 'POST'
            });
        } catch (e) {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const pid = Number(productId);
            const qty = Number(quantity) || 1;
            const existingItem = cart.find(i => i.productId === pid);
            if (existingItem) {
                existingItem.quantity += qty;
            } else {
                const res = await fetch('mock/products.json');
                const products = await res.json();
                const p = products.find(x => Number(x.id) === pid) || { name: `Product ${pid}`, price: 0, imageUrl: '' };
                cart.push({
                    productId: pid,
                    productName: p.name,
                    price: p.price || 0,
                    quantity: qty,
                    imageUrl: p.imageUrl || '',
                    total: (p.price || 0) * qty
                });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            return { success: true, message: 'Sản phẩm đã được thêm vào giỏ hàng!', cart };
        }
    }

    async updateCart(productId, quantity) {
        try {
            return await this.request(`/cartapi/update?productId=${encodeURIComponent(productId)}&quantity=${encodeURIComponent(quantity)}`, {
                method: 'PUT'
            });
        } catch (e) {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const pid = Number(productId);
            const qty = Number(quantity);
            const item = cart.find(i => i.productId === pid);
            if (item) {
                if (!qty || qty <= 0) {
                    const idx = cart.findIndex(i => i.productId === pid);
                    if (idx >= 0) cart.splice(idx, 1);
                } else {
                    item.quantity = qty;
                    item.total = (item.price || 0) * qty;
                }
                localStorage.setItem('cart', JSON.stringify(cart));
            }
            return { success: true, message: 'Cập nhật giỏ hàng thành công', cart };
        }
    }

    async removeFromCart(productId) {
        try {
            return await this.request(`/cartapi/remove?productId=${encodeURIComponent(productId)}`, {
                method: 'DELETE'
            });
        } catch (e) {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const pid = Number(productId);
            const idx = cart.findIndex(i => i.productId === pid);
            if (idx >= 0) {
                cart.splice(idx, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                return { success: true, message: 'Sản phẩm đã được xóa khỏi giỏ hàng!', cart };
            }
            return { success: false, message: 'Không tìm thấy sản phẩm trong giỏ hàng', cart };
        }
    }

    async getCartCount() {
        try {
            return await this.request('/cartapi/count');
        } catch (e) {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const count = cart.reduce((sum, i) => sum + (i.quantity || 0), 0);
            return { success: true, count };
        }
    }

    async getCartSummary() {
        try {
            return await this.request('/cartapi/summary');
        } catch (e) {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const summary = {
                success: true,
                items: cart.map(i => ({
                    productId: i.productId,
                    productName: i.productName,
                    price: i.price,
                    quantity: i.quantity,
                    total: (i.price || 0) * (i.quantity || 0),
                    imageUrl: i.imageUrl
                })),
                totalAmount: cart.reduce((sum, i) => sum + ((i.price || 0) * (i.quantity || 0)), 0),
                totalItems: cart.reduce((sum, i) => sum + (i.quantity || 0), 0)
            };
            return summary;
        }
    }

    async clearCart() {
        try {
            return await this.request('/cartapi/clear', {
                method: 'DELETE'
            });
        } catch (e) {
            localStorage.removeItem('cart');
            return { success: true, message: 'Giỏ hàng đã được xóa trống' };
        }
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
