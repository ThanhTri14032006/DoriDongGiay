// Admin panel JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeAdminPanel();
    initializeDataTables();
    initializeCharts();
    initializeAdminForms();
});

// Admin panel initialization
function initializeAdminPanel() {
    // Sidebar toggle functionality
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            document.querySelector('.sidebar').classList.toggle('collapse');
            document.querySelector('main').classList.toggle('col-md-9');
        });
    }
    
    // Active link highlighting
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
    
    // Auto-hide admin alerts
    const alerts = document.querySelectorAll('.alert-admin');
    alerts.forEach(alert => {
        setTimeout(() => {
            if (alert.classList.contains('alert-dismissible')) {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            }
        }, 5000);
    });
}

// Data tables initialization
function initializeDataTables() {
    const tables = document.querySelectorAll('.data-table');
    tables.forEach(table => {
        // Simple sorting functionality
        const headers = table.querySelectorAll('th[data-sort]');
        headers.forEach(header => {
            header.style.cursor = 'pointer';
            header.addEventListener('click', function() {
                const sortKey = this.dataset.sort;
                const isAscending = !this.classList.contains('asc');
                
                // Reset other headers
                headers.forEach(h => h.classList.remove('asc', 'desc'));
                
                // Set current header state
                this.classList.toggle('asc', isAscending);
                this.classList.toggle('desc', !isAscending);
                
                sortTable(table, sortKey, isAscending);
            });
        });
    });
}

function sortTable(table, sortKey, ascending) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    rows.sort((a, b) => {
        const aValue = a.querySelector(`td[data-${sortKey}]`).dataset[sortKey];
        const bValue = b.querySelector(`td[data-${sortKey}]`).dataset[sortKey];
        
        if (ascending) {
            return aValue.localeCompare(bValue);
        } else {
            return bValue.localeCompare(aValue);
        }
    });
    
    // Clear and re-append sorted rows
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
    
    rows.forEach(row => tbody.appendChild(row));
}

// Chart initialization (using Chart.js - you'll need to include it)
function initializeCharts() {
    const revenueChart = document.getElementById('revenueChart');
    if (revenueChart) {
        // This is a placeholder for chart initialization
        // You would typically fetch data and initialize charts here
        console.log('Revenue chart element found');
    }
}

// Admin form enhancements
function initializeAdminForms() {
    // Image preview for file inputs
    const imageInputs = document.querySelectorAll('input[type="file"][accept^="image/"]');
    imageInputs.forEach(input => {
        input.addEventListener('change', function() {
            const preview = document.getElementById(this.dataset.preview) || createImagePreview(this);
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    preview.src = e.target.result;
                    preview.style.display = 'block';
                };
                reader.readAsDataURL(this.files[0]);
            }
        });
    });
    
    // Confirmation for delete actions
    const deleteButtons = document.querySelectorAll('.btn-delete, form[action*="Delete"]');
    deleteButtons.forEach(button => {
        if (button.tagName === 'FORM') {
            button.addEventListener('submit', function(e) {
                if (!confirm('Bạn có chắc chắn muốn xóa mục này?')) {
                    e.preventDefault();
                }
            });
        } else {
            button.addEventListener('click', function(e) {
                if (!confirm('Bạn có chắc chắn muốn xóa mục này?')) {
                    e.preventDefault();
                }
            });
        }
    });
    
    // Auto-save forms
    const autoSaveForms = document.querySelectorAll('form[data-autosave]');
    autoSaveForms.forEach(form => {
        let saveTimeout;
        
        form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('input', function() {
                clearTimeout(saveTimeout);
                saveTimeout = setTimeout(() => {
                    saveForm(form);
                }, 1000);
            });
        });
    });
}

function createImagePreview(input) {
    const preview = document.createElement('img');
    preview.className = 'image-preview mt-2';
    preview.style.display = 'none';
    preview.alt = 'Preview';
    
    const container = input.parentNode;
    container.appendChild(preview);
    return preview;
}

function saveForm(form) {
    const formData = new FormData(form);
    formData.append('__RequestVerificationToken', getAntiForgeryToken());
    
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showAdminToast('Đã lưu tự động', 'success');
        }
    })
    .catch(error => {
        console.error('Auto-save error:', error);
    });
}

function getAntiForgeryToken() {
    return document.querySelector('input[name="__RequestVerificationToken"]').value;
}

// Admin toast notifications
function showAdminToast(message, type = 'info') {
    const toastContainer = document.getElementById('admin-toast-container') || createAdminToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

function createAdminToastContainer() {
    const container = document.createElement('div');
    container.id = 'admin-toast-container';
    container.className = 'toast-container position-fixed top-0 end-0 p-3';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    return container;
}

// Bulk actions
function initializeBulkActions() {
    const bulkActionForm = document.getElementById('bulk-action-form');
    if (bulkActionForm) {
        const checkAll = bulkActionForm.querySelector('.check-all');
        const itemCheckboxes = bulkActionForm.querySelectorAll('.item-checkbox');
        const bulkActionSelect = bulkActionForm.querySelector('.bulk-action-select');
        const bulkActionButton = bulkActionForm.querySelector('.bulk-action-button');
        
        if (checkAll) {
            checkAll.addEventListener('change', function() {
                itemCheckboxes.forEach(checkbox => {
                    checkbox.checked = this.checked;
                });
                updateBulkActionButton();
            });
        }
        
        itemCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                updateBulkActionButton();
                updateCheckAllState();
            });
        });
        
        function updateBulkActionButton() {
            const checkedCount = Array.from(itemCheckboxes).filter(cb => cb.checked).length;
            bulkActionButton.disabled = checkedCount === 0;
            bulkActionButton.textContent = `Áp dụng (${checkedCount})`;
        }
        
        function updateCheckAllState() {
            if (checkAll) {
                const allChecked = Array.from(itemCheckboxes).every(cb => cb.checked);
                const someChecked = Array.from(itemCheckboxes).some(cb => cb.checked);
                
                checkAll.checked = allChecked;
                checkAll.indeterminate = someChecked && !allChecked;
            }
        }
    }
}

// Search and filter functionality
function initializeAdminSearch() {
    const searchInput = document.querySelector('.admin-search');
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performAdminSearch(this.value);
            }, 500);
        });
    }
}

function performAdminSearch(searchTerm) {
    const url = new URL(window.location);
    
    if (searchTerm) {
        url.searchParams.set('search', searchTerm);
    } else {
        url.searchParams.delete('search');
    }
    
    window.location.href = url.toString();
}

// Export functions for global use in admin
window.admin = {
    showToast: showAdminToast,
    initializeBulkActions,
    performAdminSearch
};