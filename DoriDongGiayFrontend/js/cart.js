// Cart page specific JavaScript

// Initialize cart page
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('cart.html')) {
        initializeCartPage();
    }
});

async function initializeCartPage() {
    try {
        await loadCart();
        displayCartItems();
        updateCartSummary();
    } catch (error) {
        console.error('Cart page initialization error:', error);
        showAlert('Không thể tải giỏ hàng!', 'danger');
    }
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const cartSummary = document.getElementById('cart-summary');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        emptyCart.style.display = 'block';
        cartSummary.style.display = 'none';
        return;
    }
    
    emptyCart.style.display = 'none';
    cartSummary.style.display = 'block';
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="card mb-3 cart-item">
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-md-2">
                        <img src="${item.imageUrl || 'images/placeholder.jpg'}" 
                             class="img-fluid rounded" 
                             alt="${item.productName}"
                             onerror="this.src='images/placeholder.jpg'">
                    </div>
                    <div class="col-md-4">
                        <h5 class="card-title mb-1">${item.productName}</h5>
                        <p class="text-muted mb-0">${formatPrice(item.price)}</p>
                    </div>
                    <div class="col-md-3">
                        <div class="input-group">
                            <button class="btn btn-outline-secondary" type="button" 
                                    onclick="updateQuantity(${item.productId}, ${item.quantity - 1})">
                                <i class="fas fa-minus"></i>
                            </button>
                            <input type="number" class="form-control text-center" 
                                   value="${item.quantity}" 
                                   min="1" 
                                   onchange="updateQuantity(${item.productId}, parseInt(this.value))">
                            <button class="btn btn-outline-secondary" type="button" 
                                    onclick="updateQuantity(${item.productId}, ${item.quantity + 1})">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <h5 class="text-primary mb-0">${formatPrice(item.total)}</h5>
                    </div>
                    <div class="col-md-1">
                        <button class="btn btn-outline-danger" 
                                onclick="removeItem(${item.productId})"
                                title="Xóa sản phẩm">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeItem(productId);
        return;
    }
    
    updateCartItem(productId, newQuantity).then(() => {
        displayCartItems();
        updateCartSummary();
    });
}

function removeItem(productId) {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?')) {
        removeFromCart(productId).then(() => {
            displayCartItems();
            updateCartSummary();
        });
    }
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
    const shipping = 30000; // Fixed shipping cost
    const total = subtotal + shipping;
    
    document.getElementById('subtotal').textContent = formatPrice(subtotal);
    document.getElementById('shipping').textContent = formatPrice(shipping);
    document.getElementById('total').textContent = formatPrice(total);
}

function proceedToCheckout() {
    if (cart.length === 0) {
        showAlert('Giỏ hàng trống!', 'warning');
        return;
    }
    
    const form = document.getElementById('checkout-form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const formData = new FormData(form);
    const orderData = {
        fullName: formData.get('fullName'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        notes: formData.get('notes'),
        items: cart.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
        }))
    };
    
    // For now, just show a success message
    // In a real app, you'd send this to the backend
    showAlert('Đơn hàng đã được đặt thành công! Cảm ơn bạn đã mua sắm.', 'success');
    
    // Clear cart after successful order
    setTimeout(() => {
        clearCart();
        window.location.href = 'index.html';
    }, 2000);
}

async function clearCart() {
    try {
        await api.clearCart();
        cart = [];
        updateCartCount();
        displayCartItems();
        updateCartSummary();
    } catch (error) {
        console.error('Clear cart error:', error);
    }
}

// Export functions for global use
window.updateQuantity = updateQuantity;
window.removeItem = removeItem;
window.proceedToCheckout = proceedToCheckout;
