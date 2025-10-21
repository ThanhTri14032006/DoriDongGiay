// Admin JS Functions

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

// Hàm tải các phần include
document.addEventListener('DOMContentLoaded', function() {
    // Tải header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        fetch('includes/sidebar.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                
                // Highlight menu item hiện tại
                const currentPage = window.location.pathname.split('/').pop();
                const menuItems = document.querySelectorAll('#sidebar ul.components a');
                
                menuItems.forEach(item => {
                    const href = item.getAttribute('href');
                    if (href === currentPage) {
                        item.classList.add('active');
                    }
                });
            });
    }
});