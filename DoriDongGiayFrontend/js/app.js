// Main Application JavaScript

// Global state
let currentUser = null;
let cart = [];

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    try {
        // Check if user is logged in
        await checkAuthStatus();
        
        // Load cart
        await loadCart();
        
        // Update UI
        updateUserMenu();
        updateCartCount();
        
        // Load featured products if on home page
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            await loadFeaturedProducts();
        }
        
    } catch (error) {
        console.error('App initialization error:', error);
    }
}

// Authentication functions
async function checkAuthStatus() {
    try {
        const response = await api.getCurrentUser();
        if (response.success) {
            currentUser = response.user;
            return true;
        }
    } catch (error) {
        currentUser = null;
        return false;
    }
}

async function login(email, password, rememberMe = false) {
    try {
        const response = await api.login(email, password, rememberMe);
        if (response.success) {
            currentUser = response.user;
            updateUserMenu();
            showAlert('Đăng nhập thành công!', 'success');
            return true;
        }
    } catch (error) {
        showAlert(error.message || 'Đăng nhập thất bại!', 'danger');
        return false;
    }
}

async function register(userData) {
    try {
        const response = await api.register(userData);
        if (response.success) {
            currentUser = response.user;
            updateUserMenu();
            showAlert('Đăng ký thành công!', 'success');
            return true;
        }
    } catch (error) {
        showAlert(error.message || 'Đăng ký thất bại!', 'danger');
        return false;
    }
}

async function logout() {
    try {
        await api.logout();
        currentUser = null;
        updateUserMenu();
        showAlert('Đăng xuất thành công!', 'info');
        
        // Redirect to home page
        if (!window.location.pathname.includes('index.html') && window.location.pathname !== '/') {
            window.location.href = 'index.html';
        }
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// Cart functions
async function loadCart() {
    try {
        const response = await api.getCart();
        if (response.success) {
            cart = response.cart || [];
        }
    } catch (error) {
        console.error('Load cart error:', error);
        cart = [];
    }
}

async function addToCart(productId, quantity = 1) {
    try {
        const response = await api.addToCart(productId, quantity);
        if (response.success) {
            cart = response.cart;
            updateCartCount();
            showAlert('Đã thêm vào giỏ hàng!', 'success');
            return true;
        }
    } catch (error) {
        showAlert(error.message || 'Không thể thêm vào giỏ hàng!', 'danger');
        return false;
    }
}

async function updateCartItem(productId, quantity) {
    try {
        const response = await api.updateCart(productId, quantity);
        if (response.success) {
            cart = response.cart;
            updateCartCount();
            return true;
        }
    } catch (error) {
        showAlert(error.message || 'Không thể cập nhật giỏ hàng!', 'danger');
        return false;
    }
}

async function removeFromCart(productId) {
    try {
        const response = await api.removeFromCart(productId);
        if (response.success) {
            cart = response.cart;
            updateCartCount();
            showAlert('Đã xóa khỏi giỏ hàng!', 'info');
            return true;
        }
    } catch (error) {
        showAlert(error.message || 'Không thể xóa khỏi giỏ hàng!', 'danger');
        return false;
    }
}

// UI Update functions
function updateUserMenu() {
    const userMenu = document.getElementById('user-menu');
    const loginMenu = document.getElementById('login-menu');
    const userName = document.getElementById('user-name');
    
    if (currentUser) {
        if (userMenu) userMenu.style.display = 'block';
        if (loginMenu) loginMenu.style.display = 'none';
        if (userName) userName.textContent = currentUser.fullName;
    } else {
        if (userMenu) userMenu.style.display = 'none';
        if (loginMenu) loginMenu.style.display = 'block';
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'inline' : 'none';
    }
}

// Product functions
async function loadFeaturedProducts() {
    try {
        const response = await api.getProducts();
        if (response.success) {
            const products = response.slice(0, 6); // Show first 6 products
            displayProducts(products, 'featured-products');
        }
    } catch (error) {
        console.error('Load products error:', error);
        showAlert('Không thể tải sản phẩm!', 'danger');
    }
}

function displayProducts(products, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = products.map(product => `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card product-card h-100">
                <img src="${product.imageUrl || 'images/placeholder.jpg'}" 
                     class="card-img-top" 
                     alt="${product.name}"
                     onerror="this.src='images/placeholder.jpg'">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text text-muted">${product.description || ''}</p>
                    <div class="mt-auto">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <span class="product-price">${formatPrice(product.price)}</span>
                            ${product.oldPrice ? `<span class="product-old-price">${formatPrice(product.oldPrice)}</span>` : ''}
                        </div>
                        <button class="btn btn-primary w-100" 
                                onclick="addToCart(${product.id})">
                            <i class="fas fa-cart-plus me-2"></i>Thêm vào giỏ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Form handling
function handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const rememberMe = formData.get('rememberMe') === 'on';
    
    login(email, password, rememberMe).then(success => {
        if (success) {
            window.location.href = 'index.html';
        }
    });
}

function handleRegister(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword')
    };
    
    if (userData.password !== userData.confirmPassword) {
        showAlert('Mật khẩu xác nhận không khớp!', 'danger');
        return;
    }
    
    register(userData).then(success => {
        if (success) {
            window.location.href = 'index.html';
        }
    });
}

// Export functions for global use
window.login = login;
window.logout = logout;
window.addToCart = addToCart;
window.updateCartItem = updateCartItem;
window.removeFromCart = removeFromCart;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
