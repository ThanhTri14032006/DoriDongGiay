// Collections Page JavaScript
class CollectionsPage {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.currentPage = 1;
        this.productsPerPage = 12;
        this.filters = {
            category: 'all',
            search: '',
            size: [],
            color: [],
            priceRange: 200,
            sort: 'featured'
        };
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadProducts();
        this.updateCartCount();
        this.initializeTheme();
        this.setupKeyboardShortcuts();
        this.addPageLoadAnimation();
    }

    setupEventListeners() {
        // Navigation
        document.querySelector('.menu-toggle')?.addEventListener('click', this.toggleMobileMenu.bind(this));
        
        // Theme selector
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.changeTheme(e.target.dataset.theme));
        });

        // Modal triggers
        document.querySelector('.search-btn')?.addEventListener('click', () => this.openModal('search-modal'));
        document.querySelector('.cart-btn')?.addEventListener('click', () => this.openModal('cart-modal'));
        document.querySelector('.user-btn')?.addEventListener('click', () => this.openModal('user-modal'));

        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', this.closeModals.bind(this));
        });

        // Close modals on backdrop click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeModals();
            });
        });

        // Search functionality
        document.querySelector('.search-input')?.addEventListener('input', 
            this.debounce(this.handleSearch.bind(this), 300));
        document.querySelector('.search-submit')?.addEventListener('click', this.handleSearch.bind(this));
        document.querySelector('.modal-search-input')?.addEventListener('input', 
            this.debounce(this.handleSearch.bind(this), 300));

        // Filter tabs
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.handleCategoryFilter(e.target.dataset.category));
        });

        // Sort dropdown
        document.querySelector('.sort-select')?.addEventListener('change', (e) => {
            this.filters.sort = e.target.value;
            this.applyFilters();
        });

        // Filter sidebar
        document.querySelector('.filter-toggle')?.addEventListener('click', this.toggleFilterSidebar.bind(this));
        document.querySelector('.close-filters')?.addEventListener('click', this.toggleFilterSidebar.bind(this));

        // Size filters
        document.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.toggleSizeFilter(e.target.dataset.size));
        });

        // Color filters
        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.toggleColorFilter(e.target.dataset.color));
        });

        // Price range
        document.querySelector('.price-slider')?.addEventListener('input', (e) => {
            this.filters.priceRange = parseInt(e.target.value);
            document.getElementById('price-value').textContent = `$${e.target.value}`;
        });

        // Filter actions
        document.querySelector('.clear-filters')?.addEventListener('click', this.clearFilters.bind(this));
        document.querySelector('.apply-filters')?.addEventListener('click', () => {
            this.applyFilters();
            this.toggleFilterSidebar();
        });

        // Load more
        document.querySelector('.load-more-btn')?.addEventListener('click', this.loadMoreProducts.bind(this));

        // Search suggestions
        document.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.filters.search = e.target.textContent;
                this.applyFilters();
                this.closeModals();
            });
        });

        // Continue shopping
        document.querySelector('.continue-shopping')?.addEventListener('click', this.closeModals.bind(this));

        // Notification close
        document.querySelector('.notification-close')?.addEventListener('click', this.hideNotification.bind(this));
    }

    async loadProducts() {
        this.showLoading();
        
        try {
            // Simulate API call with mock data
            await this.delay(1000);
            
            this.products = this.generateMockProducts();
            this.filteredProducts = [...this.products];
            this.renderProducts();
            this.hideLoading();
        } catch (error) {
            console.error('Error loading products:', error);
            this.showNotification('Error loading products. Please try again.', 'error');
            this.hideLoading();
        }
    }

    generateMockProducts() {
        const categories = ['shirts', 'polo', 'shorts', 'suits', 'coats'];
        const colors = ['black', 'white', 'gray', 'blue', 'green', 'red'];
        const sizes = ['xs', 's', 'm', 'l', 'xl', '2xl'];
        const products = [];

        for (let i = 1; i <= 50; i++) {
            const category = categories[Math.floor(Math.random() * categories.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const price = Math.floor(Math.random() * 150) + 50;
            const originalPrice = Math.random() > 0.7 ? price + Math.floor(Math.random() * 50) : null;
            
            products.push({
                id: i,
                title: `${category.charAt(0).toUpperCase() + category.slice(1)} ${i}`,
                category: category,
                price: price,
                originalPrice: originalPrice,
                color: color,
                sizes: sizes.slice(0, Math.floor(Math.random() * 4) + 2),
                image: `https://picsum.photos/400/400?random=${i}`,
                badge: Math.random() > 0.8 ? 'New' : null,
                rating: Math.floor(Math.random() * 2) + 4,
                reviews: Math.floor(Math.random() * 100) + 10
            });
        }

        return products;
    }

    renderProducts() {
        const grid = document.getElementById('products-grid');
        if (!grid) return;

        const startIndex = (this.currentPage - 1) * this.productsPerPage;
        const endIndex = startIndex + this.productsPerPage;
        const productsToShow = this.filteredProducts.slice(0, endIndex);

        if (this.currentPage === 1) {
            grid.innerHTML = '';
        }

        const newProducts = this.filteredProducts.slice(startIndex, endIndex);
        
        newProducts.forEach((product, index) => {
            const productCard = this.createProductCard(product);
            productCard.style.animationDelay = `${index * 0.1}s`;
            grid.appendChild(productCard);
        });

        // Update load more button
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = endIndex >= this.filteredProducts.length ? 'none' : 'block';
        }

        // Add scroll animation
        this.addScrollAnimation();
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card fade-in';
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                <div class="product-actions">
                    <button class="action-btn wishlist-btn" data-id="${product.id}" aria-label="Add to wishlist">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                    <button class="action-btn quick-view-btn" data-id="${product.id}" aria-label="Quick view">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                <div class="product-price">
                    <span class="current-price">$${product.price}</span>
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                </div>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;

        // Add event listeners
        card.querySelector('.add-to-cart').addEventListener('click', (e) => {
            e.stopPropagation();
            this.addToCart(product);
        });

        card.querySelector('.wishlist-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleWishlist(product);
        });

        card.querySelector('.quick-view-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.quickView(product);
        });

        card.addEventListener('click', () => {
            this.viewProduct(product);
        });

        return card;
    }

    handleSearch(e) {
        const query = e.target.value.toLowerCase();
        this.filters.search = query;
        this.applyFilters();
    }

    handleCategoryFilter(category) {
        // Update active tab
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.category === category);
        });

        this.filters.category = category;
        this.applyFilters();
    }

    toggleSizeFilter(size) {
        const btn = document.querySelector(`[data-size="${size}"]`);
        const index = this.filters.size.indexOf(size);
        
        if (index > -1) {
            this.filters.size.splice(index, 1);
            btn.classList.remove('active');
        } else {
            this.filters.size.push(size);
            btn.classList.add('active');
        }
    }

    toggleColorFilter(color) {
        const btn = document.querySelector(`[data-color="${color}"]`);
        const index = this.filters.color.indexOf(color);
        
        if (index > -1) {
            this.filters.color.splice(index, 1);
            btn.classList.remove('active');
        } else {
            this.filters.color.push(color);
            btn.classList.add('active');
        }
    }

    applyFilters() {
        this.currentPage = 1;
        
        this.filteredProducts = this.products.filter(product => {
            // Category filter
            if (this.filters.category !== 'all' && product.category !== this.filters.category) {
                return false;
            }

            // Search filter
            if (this.filters.search && !product.title.toLowerCase().includes(this.filters.search)) {
                return false;
            }

            // Size filter
            if (this.filters.size.length > 0 && !this.filters.size.some(size => product.sizes.includes(size))) {
                return false;
            }

            // Color filter
            if (this.filters.color.length > 0 && !this.filters.color.includes(product.color)) {
                return false;
            }

            // Price filter
            if (product.price > this.filters.priceRange) {
                return false;
            }

            return true;
        });

        // Apply sorting
        this.sortProducts();
        this.renderProducts();
    }

    sortProducts() {
        switch (this.filters.sort) {
            case 'price-low':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                this.filteredProducts.sort((a, b) => b.id - a.id);
                break;
            case 'popular':
                this.filteredProducts.sort((a, b) => b.reviews - a.reviews);
                break;
            default:
                // Featured - keep original order
                break;
        }
    }

    clearFilters() {
        this.filters = {
            category: 'all',
            search: '',
            size: [],
            color: [],
            priceRange: 200,
            sort: 'featured'
        };

        // Reset UI
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.category === 'all');
        });
        
        document.querySelectorAll('.size-btn, .color-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        document.querySelector('.price-slider').value = 200;
        document.getElementById('price-value').textContent = '$200';
        document.querySelector('.search-input').value = '';
        document.querySelector('.sort-select').value = 'featured';

        this.applyFilters();
    }

    loadMoreProducts() {
        this.currentPage++;
        this.renderProducts();
    }

    addToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1,
                selectedSize: product.sizes[0] // Default to first available size
            });
        }

        this.saveCart();
        this.updateCartCount();
        this.showNotification(`${product.title} added to cart!`, 'success');
        this.addButtonClickEffect(event.target);
    }

    toggleWishlist(product) {
        const index = this.wishlist.findIndex(item => item.id === product.id);
        
        if (index > -1) {
            this.wishlist.splice(index, 1);
            this.showNotification(`${product.title} removed from wishlist`, 'info');
        } else {
            this.wishlist.push(product);
            this.showNotification(`${product.title} added to wishlist!`, 'success');
        }

        this.saveWishlist();
        this.addButtonClickEffect(event.target);
    }

    quickView(product) {
        // Implement quick view modal
        console.log('Quick view:', product);
        this.showNotification('Quick view feature coming soon!', 'info');
    }

    viewProduct(product) {
        // Navigate to product detail page
        window.location.href = `product-detail.html?id=${product.id}`;
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    saveWishlist() {
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    }

    updateCartCount() {
        const count = this.cart.reduce((total, item) => total + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(element => {
            element.textContent = count;
            element.style.display = count > 0 ? 'block' : 'none';
        });
    }

    // Theme Management
    initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.changeTheme(savedTheme);
    }

    changeTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update active theme button
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === theme);
        });

        this.addThemeTransition();
    }

    addThemeTransition() {
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    // Modal Management
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Focus first input if exists
            const firstInput = modal.querySelector('input');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        }
    }

    closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }

    toggleMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.toggle('active');
    }

    toggleFilterSidebar() {
        const sidebar = document.getElementById('filter-sidebar');
        sidebar.classList.toggle('active');
    }

    // Utility Functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    showLoading() {
        const spinner = document.getElementById('loading-spinner');
        if (spinner) {
            spinner.style.display = 'flex';
        }
    }

    hideLoading() {
        const spinner = document.getElementById('loading-spinner');
        if (spinner) {
            spinner.style.display = 'none';
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        const messageElement = notification.querySelector('.notification-message');
        
        messageElement.textContent = message;
        notification.className = `notification show ${type}`;
        
        setTimeout(() => {
            this.hideNotification();
        }, 3000);
    }

    hideNotification() {
        const notification = document.getElementById('notification');
        notification.classList.remove('show');
    }

    addButtonClickEffect(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }

    addPageLoadAnimation() {
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            document.body.style.opacity = '1';
            document.body.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                document.body.style.transition = '';
            }, 500);
        }, 100);
    }

    addScrollAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('slide-up');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.product-card').forEach(card => {
            observer.observe(card);
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // ESC to close modals
            if (e.key === 'Escape') {
                this.closeModals();
                const sidebar = document.getElementById('filter-sidebar');
                if (sidebar.classList.contains('active')) {
                    this.toggleFilterSidebar();
                }
            }

            // Ctrl/Cmd + K to open search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openModal('search-modal');
            }

            // Ctrl/Cmd + B to open cart
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault();
                this.openModal('cart-modal');
            }
        });
    }
}

// Initialize the collections page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CollectionsPage();
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CollectionsPage;
}