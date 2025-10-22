// Hàm để nhúng header và footer vào trang
document.addEventListener('DOMContentLoaded', function() {
    // Nhúng header
    const headerPlaceholder = document.querySelector('#header-placeholder');
    if (headerPlaceholder) {
        fetch('includes/header.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                
                // Đánh dấu menu hiện tại là active
                markActiveMenu();
            })
            .catch(error => console.error('Error loading header:', error));
    }
    
    // Nhúng footer
    const footerPlaceholder = document.querySelector('#footer-placeholder');
    if (footerPlaceholder) {
        fetch('includes/footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => console.error('Error loading footer:', error));
    }
});

// Hàm đánh dấu menu hiện tại là active
function markActiveMenu() {
    // Lấy đường dẫn hiện tại
    const currentPath = window.location.pathname;
    const filename = currentPath.split('/').pop();
    
    // Tìm và đánh dấu menu tương ứng
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === filename || (filename === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}