// Products page specific JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initProductsPage();
});

let allProducts = [];

async function initProductsPage() {
    const grid = document.getElementById('products-grid');
    const loading = document.getElementById('loading-spinner');
    const empty = document.getElementById('no-products');

    loading.style.display = 'block';
    empty.style.display = 'none';
    grid.innerHTML = '';

    try {
        const products = await api.getProducts();
        allProducts = Array.isArray(products) ? products : (products?.data || []);
        if (!allProducts || allProducts.length === 0) {
            empty.style.display = 'block';
            return;
        }
        renderProducts(allProducts);
    } catch (err) {
        console.error('Load products failed:', err);
        showAlert('Không tải được danh sách sản phẩm', 'danger');
        empty.style.display = 'block';
    } finally {
        loading.style.display = 'none';
    }
}

function renderProducts(products) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = products.map(p => productCardHTML(p)).join('');
}

function productCardHTML(p) {
    const price = typeof p.price === 'number' ? p.price : p.Price || 0;
    const name = p.name || p.Name || 'Sản phẩm';
    const id = p.id || p.Id;
    const image = p.imageUrl || p.ImageUrl || 'https://via.placeholder.com/300x200?text=No+Image';
    const stock = p.stockQuantity ?? p.StockQuantity;
    const discount = p.discountPercentage ?? p.DiscountPercentage;

    const priceHTML = discount && discount > 0
        ? `<div>
             <span class="text-danger fw-bold">${formatPrice(price * (1 - discount / 100))}</span>
             <small class="text-muted text-decoration-line-through ms-2">${formatPrice(price)}</small>
             <span class="badge bg-danger ms-2">-${discount}%</span>
           </div>`
        : `<div class="fw-bold">${formatPrice(price)}</div>`;

    const addBtn = stock && stock > 0
        ? `<button class="btn btn-primary w-100" onclick="handleAddToCart(${id})">
               <i class="fas fa-cart-plus me-1"></i> Thêm vào giỏ
           </button>`
        : `<button class="btn btn-secondary w-100" disabled>Hết hàng</button>`;

    return `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <div class="card h-100 shadow-sm">
          <img src="${image}" class="card-img-top" alt="${name}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${name}</h5>
            ${priceHTML}
            <div class="mt-auto">
              <a href="product-detail.html?id=${id}" class="btn btn-outline-secondary w-100 mb-2">
                <i class="fas fa-eye me-1"></i> Xem chi tiết
              </a>
              ${addBtn}
            </div>
          </div>
        </div>
      </div>
    `;
}

async function handleAddToCart(productId) {
    try {
        await api.addToCart(productId, 1);
        showAlert('Đã thêm sản phẩm vào giỏ hàng!', 'success');
        if (typeof updateCartCount === 'function') {
            updateCartCount();
        }
    } catch (err) {
        console.error('Add to cart failed:', err);
        showAlert('Thêm vào giỏ hàng thất bại', 'danger');
    }
}

function searchProducts() {
    const q = (document.getElementById('search-input').value || '').toLowerCase().trim();
    if (!q) { renderProducts(allProducts); return; }
    const filtered = allProducts.filter(p => (p.name || p.Name || '').toLowerCase().includes(q));
    renderProducts(filtered);
}

function filterProducts() {
    // Hiện chưa có API categories; giữ nguyên toàn bộ
    renderProducts(allProducts);
}
