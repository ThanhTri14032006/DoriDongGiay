// Homepage JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeHomepage();
});

// Khởi tạo homepage
function initializeHomepage() {
    setupNavigation();
    setupColorSelector();
    setupModals();
    setupProductCards();
    setupScrollEffects();
    setupCartFunctionality();
    addPageLoadAnimations();
}

// Setup navigation functionality
function setupNavigation() {
    const searchBtn = document.querySelector('.search-btn');
    const userBtn = document.querySelector('.user-btn');
    const cartBtn = document.querySelector('.cart-btn');
    
    // Search button
    searchBtn.addEventListener('click', function() {
        openSearchModal();
    });
    
    // User button
    userBtn.addEventListener('click', function() {
        openUserModal();
    });
    
    // Cart button
    cartBtn.addEventListener('click', function() {
        // Simulate cart functionality
        showNotification('Cart functionality coming soon!', 'info');
    });
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                showNotification('Page coming soon!', 'info');
            }
        });
    });
}

// Setup color selector
function setupColorSelector() {
    const colorDots = document.querySelectorAll('.color-dot');
    
    colorDots.forEach(dot => {
        dot.addEventListener('click', function() {
            // Remove active class from all dots
            colorDots.forEach(d => d.classList.remove('active'));
            
            // Add active class to clicked dot
            this.classList.add('active');
            
            // Get selected color
            const selectedColor = this.getAttribute('data-color');
            
            // Apply theme based on color
            applyColorTheme(selectedColor);
            
            // Show notification
            showNotification(`Theme changed to ${selectedColor}`, 'success');
        });
    });
}

// Apply color theme
function applyColorTheme(color) {
    const root = document.documentElement;
    
    switch(color) {
        case 'black':
            root.style.setProperty('--primary-color', '#1a1a1a');
            root.style.setProperty('--text-color', '#1a1a1a');
            break;
        case 'gray':
            root.style.setProperty('--primary-color', '#888888');
            root.style.setProperty('--text-color', '#666666');
            break;
        case 'white':
            root.style.setProperty('--primary-color', '#ffffff');
            root.style.setProperty('--text-color', '#333333');
            break;
        case 'beige':
            root.style.setProperty('--primary-color', '#f5f5dc');
            root.style.setProperty('--text-color', '#8b7355');
            break;
    }
    
    // Save theme preference
    localStorage.setItem('selectedTheme', color);
}

// Setup modals
function setupModals() {
    setupSearchModal();
    setupUserModal();
}

// Setup search modal
function setupSearchModal() {
    const searchModal = document.getElementById('searchModal');
    const searchInput = document.querySelector('.search-input');
    const closeSearchBtn = document.querySelector('.close-search-btn');
    const searchResults = document.querySelector('.search-results');
    
    // Close search modal
    closeSearchBtn.addEventListener('click', closeSearchModal);
    
    // Close modal when clicking outside
    searchModal.addEventListener('click', function(e) {
        if (e.target === searchModal) {
            closeSearchModal();
        }
    });
    
    // Search input functionality
    searchInput.addEventListener('input', debounce(function() {
        const query = this.value.trim();
        if (query.length > 0) {
            performSearch(query);
        } else {
            searchResults.innerHTML = '<p class="search-placeholder">Start typing to search...</p>';
        }
    }, 300));
    
    // Enter key to search
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query.length > 0) {
                performSearch(query);
            }
        }
    });
}

// Setup user modal
function setupUserModal() {
    const userModal = document.getElementById('userModal');
    const closeUserBtn = document.querySelector('.close-user-btn');
    
    // Close user modal
    closeUserBtn.addEventListener('click', closeUserModal);
    
    // Close modal when clicking outside
    userModal.addEventListener('click', function(e) {
        if (e.target === userModal) {
            closeUserModal();
        }
    });
    
    // User menu items
    const userMenuItems = document.querySelectorAll('.user-menu-item');
    userMenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                showNotification('Feature coming soon!', 'info');
            }
        });
    });
}

// Open search modal
function openSearchModal() {
    const searchModal = document.getElementById('searchModal');
    const searchInput = document.querySelector('.search-input');
    
    searchModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus on input after animation
    setTimeout(() => {
        searchInput.focus();
    }, 300);
}

// Close search modal
function closeSearchModal() {
    const searchModal = document.getElementById('searchModal');
    const searchInput = document.querySelector('.search-input');
    
    searchModal.classList.remove('active');
    document.body.style.overflow = '';
    searchInput.value = '';
    
    // Reset search results
    const searchResults = document.querySelector('.search-results');
    searchResults.innerHTML = '<p class="search-placeholder">Start typing to search...</p>';
}

// Open user modal
function openUserModal() {
    const userModal = document.getElementById('userModal');
    userModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close user modal
function closeUserModal() {
    const userModal = document.getElementById('userModal');
    userModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Perform search
function performSearch(query) {
    const searchResults = document.querySelector('.search-results');
    
    // Show loading
    searchResults.innerHTML = '<p class="search-placeholder">Searching...</p>';
    
    // Simulate API call
    setTimeout(() => {
        const mockResults = [
            { name: 'Classic T-Shirt', price: '$29.99', category: 'Shirts' },
            { name: 'Premium Hoodie', price: '$59.99', category: 'Hoodies' },
            { name: 'Casual Jacket', price: '$89.99', category: 'Jackets' },
            { name: 'Designer Pants', price: '$79.99', category: 'Pants' }
        ];
        
        // Filter results based on query
        const filteredResults = mockResults.filter(item => 
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        );
        
        if (filteredResults.length > 0) {
            let resultsHTML = '<div class="search-results-list">';
            filteredResults.forEach(item => {
                resultsHTML += `
                    <div class="search-result-item">
                        <div class="result-info">
                            <h4>${item.name}</h4>
                            <p>${item.category} • ${item.price}</p>
                        </div>
                    </div>
                `;
            });
            resultsHTML += '</div>';
            searchResults.innerHTML = resultsHTML;
        } else {
            searchResults.innerHTML = '<p class="search-placeholder">No results found for "' + query + '"</p>';
        }
    }, 500);
}

// Setup product cards
function setupProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    const quickAddBtns = document.querySelectorAll('.quick-add-btn');
    
    // Product card click
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if quick add button was clicked
            if (!e.target.classList.contains('quick-add-btn')) {
                const productName = this.querySelector('.product-name').textContent;
                showNotification(`Viewing ${productName}`, 'info');
            }
        });
    });
    
    // Quick add buttons
    quickAddBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            
            // Add to cart
            addToCart(productName, productPrice);
            
            // Visual feedback
            this.innerHTML = '<i class="fas fa-check"></i> Added';
            this.style.background = '#28a745';
            
            setTimeout(() => {
                this.innerHTML = 'Quick Add';
                this.style.background = '#1a1a1a';
            }, 2000);
        });
    });
    
    // View all button
    const viewAllBtn = document.querySelector('.view-all-btn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            window.location.href = 'products-list.html';
        });
    }
}

// Setup scroll effects
function setupScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header hide/show on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Parallax effect for hero images
        const heroImages = document.querySelector('.hero-images');
        if (heroImages) {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroImages.style.transform = `translateY(${parallax}px)`;
        }
    });
}

// Setup cart functionality
function setupCartFunctionality() {
    // Initialize cart from localStorage
    updateCartCount();
}

// Add to cart
function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already exists
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1,
            id: Date.now()
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show notification
    showNotification(`${productName} added to cart!`, 'success');
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = totalItems;
        
        if (totalItems > 0) {
            cartCount.style.display = 'block';
        } else {
            cartCount.style.display = 'none';
        }
    }
}

// Add page load animations
function addPageLoadAnimations() {
    // Animate navigation
    const navbar = document.querySelector('.navbar');
    navbar.style.opacity = '0';
    navbar.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        navbar.style.transition = 'all 0.6s ease';
        navbar.style.opacity = '1';
        navbar.style.transform = 'translateY(0)';
    }, 100);
    
    // Animate product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 3000);
}

// Utility functions
function debounce(func, wait) {
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

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to open search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearchModal();
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        closeSearchModal();
        closeUserModal();
    }
});

// Load saved theme on page load
window.addEventListener('load', function() {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        const colorDot = document.querySelector(`[data-color="${savedTheme}"]`);
        if (colorDot) {
            colorDot.click();
        }
    }
});

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden - pause animations
        console.log('Page hidden');
    } else {
        // Page is visible - resume animations
        console.log('Page visible');
    }
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addToCart,
        updateCartCount,
        performSearch,
        showNotification
    };
}