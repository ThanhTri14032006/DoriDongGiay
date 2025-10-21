// Hàm để nhúng header và footer vào trang admin
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
                
                // Khởi tạo sự kiện toggle sidebar
                initSidebar();
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
    const navLinks = document.querySelectorAll('#sidebar a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === filename || (filename === '' && href === 'dashboard.html')) {
            link.classList.add('active');
            
            // Nếu là submenu, mở rộng parent menu
            const parentCollapse = link.closest('.collapse');
            if (parentCollapse) {
                parentCollapse.classList.add('show');
                const parentToggle = document.querySelector(`[data-bs-target="#${parentCollapse.id}"]`);
                if (parentToggle) {
                    parentToggle.classList.remove('collapsed');
                    parentToggle.setAttribute('aria-expanded', 'true');
                }
            }
        }
    });
}

// Khởi tạo sự kiện toggle sidebar
function initSidebar() {
    const sidebarCollapse = document.getElementById('sidebarCollapse');
    if (sidebarCollapse) {
        sidebarCollapse.addEventListener('click', function() {
            document.getElementById('sidebar').classList.toggle('active');
        });
    }
}