// Products page specific JavaScript

let allProducts = [];
let filteredProducts = [];

// Initialize products page
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('products.html')) {
        initializeProductsPage();
    }
});

async function initializeProductsPage() {
    try {
        showLoading(true);
        await loadAllProducts();
        displayProducts(filteredProducts);
        showLoading(false);
    } catch (error) {
        console.error('Products page initialization error:', error);
        showLoading(false);
        showAlert('Không thể tải sản phẩm!', 'danger');
    }
}

async function loadAllProducts() {
    try {
        const response = await api.getProducts();
        // API trả về trực tiếp mảng sản phẩm
        allProducts = response;
        filteredProducts = [...allProducts];
    } catch (error) {
        console.error('Load products error:', error);
        allProducts = [];
        filteredProducts = [];
    }
}

function displayProducts(products) {
    const container = document.getElementById('products-grid');
    const noProducts = document.getElementById('no-products');
    
    if (!container) return;
    
    if (products.length === 0) {
        container.innerHTML = '';
        noProducts.style.display = 'block';
        return;
    }
    
    noProducts.style.display = 'none';
    
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
                        <div class="d-flex gap-2">
                            <button class="btn btn-outline-primary flex-fill" 
                                    onclick="viewProduct(${product.id})">
                                <i class="fas fa-eye me-2"></i>Xem chi tiết
                            </button>
                            <button class="btn btn-primary" 
                                    onclick="addToCart(${product.id})">
                                <i class="fas fa-cart-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function searchProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    if (searchTerm === '') {
        filteredProducts = [...allProducts];
    } else {
        filteredProducts = allProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            (product.description && product.description.toLowerCase().includes(searchTerm))
        );
    }
    
    displayProducts(filteredProducts);
}

function filterProducts() {
    const categoryId = document.getElementById('category-filter').value;
    
    if (categoryId === '') {
        filteredProducts = [...allProducts];
    } else {
        filteredProducts = allProducts.filter(product => 
            product.categoryId == categoryId
        );
    }
    
    displayProducts(filteredProducts);
}

function viewProduct(productId) {
    // For now, just show an alert. In a real app, you'd navigate to a product detail page
    const product = allProducts.find(p => p.id === productId);
    if (product) {
        showAlert(`Xem chi tiết sản phẩm: ${product.name}`, 'info');
    }
}

function showLoading(show) {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.style.display = show ? 'block' : 'none';
    }
}

// Add search on Enter key
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });
    }
});

// Export functions for global use
window.searchProducts = searchProducts;
window.filterProducts = filterProducts;
window.viewProduct = viewProduct;
