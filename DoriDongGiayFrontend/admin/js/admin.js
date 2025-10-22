// Admin JS Functions - Enhanced Version

// Hàm format giá tiền
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

// Hàm lấy tham số từ URL
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Enhanced Sidebar Functions
function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const sidebarToggle = document.getElementById('sidebarCollapse');
    
    // Sidebar toggle functionality
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            content.classList.toggle('active');
            
            // Save sidebar state
            localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('active'));
        });
    }
    
    // Restore sidebar state
    const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (sidebarCollapsed) {
        sidebar.classList.add('active');
        content.classList.add('active');
    }
    
    // Submenu toggle functionality
    const menuItems = document.querySelectorAll('#sidebar ul.components a[data-toggle="collapse"]');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const arrow = this.querySelector('.menu-arrow i');
            
            if (target) {
                target.classList.toggle('show');
                if (arrow) {
                    arrow.style.transform = target.classList.contains('show') ? 'rotate(90deg)' : 'rotate(0deg)';
                }
            }
        });
    });
}

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-container input');
    const searchSuggestions = document.querySelector('.search-suggestions');
    
    if (searchInput && searchSuggestions) {
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            if (query.length > 2) {
                // Simulate search suggestions
                const suggestions = [
                    'Khách hàng',
                    'Sản phẩm',
                    'Đơn hàng',
                    'Báo cáo',
                    'Cài đặt'
                ].filter(item => item.toLowerCase().includes(query.toLowerCase()));
                
                if (suggestions.length > 0) {
                    searchSuggestions.innerHTML = suggestions.map(suggestion => 
                        `<div class="dropdown-item">${suggestion}</div>`
                    ).join('');
                    searchSuggestions.style.display = 'block';
                } else {
                    searchSuggestions.style.display = 'none';
                }
            } else {
                searchSuggestions.style.display = 'none';
            }
        });
        
        // Hide suggestions when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
                searchSuggestions.style.display = 'none';
            }
        });
    }
}

// Notification functions
function initializeNotifications() {
    // Mark notification as read
    const notificationItems = document.querySelectorAll('.notification-item');
    notificationItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.remove('unread');
        });
    });
    
    // Update notification count
    updateNotificationCount();
}

function updateNotificationCount() {
    const unreadNotifications = document.querySelectorAll('.notification-item.unread').length;
    const notificationBadge = document.querySelector('.notification-badge');
    
    if (notificationBadge) {
        if (unreadNotifications > 0) {
            notificationBadge.textContent = unreadNotifications;
            notificationBadge.style.display = 'block';
        } else {
            notificationBadge.style.display = 'none';
        }
    }
}

// Message functions
function initializeMessages() {
    const messageItems = document.querySelectorAll('.message-item');
    messageItems.forEach(item => {
        item.addEventListener('click', function() {
            // Handle message click
            console.log('Message clicked');
        });
    });
    
    updateMessageCount();
}

function updateMessageCount() {
    const unreadMessages = document.querySelectorAll('.message-item.unread').length;
    const messageBadge = document.querySelector('.message-badge');
    
    if (messageBadge) {
        if (unreadMessages > 0) {
            messageBadge.textContent = unreadMessages;
            messageBadge.style.display = 'block';
        } else {
            messageBadge.style.display = 'none';
        }
    }
}

// Stats animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number, .stats-number');
    
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.textContent.replace(/[^\d]/g, ''));
        let currentValue = 0;
        const increment = finalValue / 50;
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }
            
            // Format number based on original format
            if (stat.textContent.includes('₫')) {
                stat.textContent = formatPrice(currentValue);
            } else if (stat.textContent.includes('%')) {
                stat.textContent = Math.round(currentValue) + '%';
            } else {
                stat.textContent = Math.round(currentValue).toLocaleString('vi-VN');
            }
        }, 20);
    });
}

// Initialize tooltips
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Initialize popovers
function initializePopovers() {
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}

// Theme functions
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    
    if (isDark) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Hàm tải các phần include
document.addEventListener('DOMContentLoaded', function() {
    // Tải header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        fetch('includes/header.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                
                // Initialize all components after header is loaded
                setTimeout(() => {
                    initializeSidebar();
                    initializeSearch();
                    initializeNotifications();
                    initializeMessages();
                    initializeTooltips();
                    initializePopovers();
                    initializeTheme();
                    
                    // Animate stats if present
                    if (document.querySelector('.stat-number, .stats-number')) {
                        setTimeout(animateStats, 500);
                    }
                }, 100);
                
                // Highlight menu item hiện tại
                const currentPage = window.location.pathname.split('/').pop();
                const menuItems = document.querySelectorAll('#sidebar ul.components a');
                
                menuItems.forEach(item => {
                    const href = item.getAttribute('href');
                    if (href === currentPage) {
                        item.closest('li').classList.add('active');
                    }
                });
            })
            .catch(error => {
                console.error('Error loading header:', error);
            });
    }
    
    // Initialize components that don't require header
    initializeTheme();
});

// Utility functions
function showToast(message, type = 'success') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    // Add to toast container or create one
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
    toastContainer.appendChild(toast);
    
    // Show toast
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    // Remove toast after it's hidden
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

function showLoading(element) {
    const originalContent = element.innerHTML;
    element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
    element.disabled = true;
    
    return function hideLoading() {
        element.innerHTML = originalContent;
        element.disabled = false;
    };
}

// Export functions for global use
window.adminJS = {
    formatPrice,
    getUrlParameter,
    showToast,
    showLoading,
    toggleTheme,
    updateNotificationCount,
    updateMessageCount,
    animateStats
};