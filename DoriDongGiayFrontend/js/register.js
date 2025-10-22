// Register Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeRegisterPage();
});

// Khởi tạo trang register
function initializeRegisterPage() {
    setupFormValidation();
    setupInputEffects();
    setupSocialButtons();
    setupKeyboardNavigation();
    addPageLoadAnimation();
}

// Chuyển đến trang login
function goToLogin() {
    // Thêm hiệu ứng transition
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 300);
}

// Xử lý form đăng ký
function setupFormValidation() {
    const form = document.getElementById('registerForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Validation
        if (!validateForm(username, email, password)) {
            return;
        }

        // Hiển thị loading state
        showLoading(true);

        try {
            // Simulate API call
            await simulateRegisterAPI(username, email, password);
            showMessage('Đăng ký thành công! Chuyển hướng đến trang đăng nhập...', 'success');
            
            // Chuyển hướng sau 2 giây
            setTimeout(() => {
                goToLogin();
            }, 2000);
            
        } catch (error) {
            showMessage('Đăng ký thất bại: ' + error.message, 'error');
        } finally {
            showLoading(false);
        }
    });
}

// Validate form data
function validateForm(username, email, password) {
    // Clear previous errors
    clearErrors();

    let isValid = true;

    // Username validation
    if (username.length < 3) {
        showFieldError('username', 'Tên đăng nhập phải có ít nhất 3 ký tự');
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFieldError('email', 'Email không hợp lệ');
        isValid = false;
    }

    // Password validation
    if (password.length < 6) {
        showFieldError('password', 'Mật khẩu phải có ít nhất 6 ký tự');
        isValid = false;
    }

    if (!isValid) {
        showMessage('Vui lòng kiểm tra lại thông tin đăng ký', 'error');
    }

    return isValid;
}

// Hiển thị lỗi cho field cụ thể
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.classList.add('error');
    
    // Remove error class after 3 seconds
    setTimeout(() => {
        field.classList.remove('error');
    }, 3000);
}

// Clear tất cả errors
function clearErrors() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.classList.remove('error', 'success');
    });
}

// Simulate register API call
async function simulateRegisterAPI(username, email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate random success/failure
            if (Math.random() > 0.2) { // 80% success rate
                resolve({
                    success: true,
                    message: 'Đăng ký thành công',
                    user: { username, email }
                });
            } else {
                reject(new Error('Email đã được sử dụng'));
            }
        }, 1500);
    });
}

// Hiển thị loading state
function showLoading(isLoading) {
    const form = document.getElementById('registerForm');
    const submitBtn = document.querySelector('.register-btn');
    
    if (isLoading) {
        form.classList.add('loading');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang đăng ký...';
        submitBtn.disabled = true;
    } else {
        form.classList.remove('loading');
        submitBtn.innerHTML = 'Registration';
        submitBtn.disabled = false;
    }
}

// Hiển thị message
function showMessage(message, type = 'info') {
    // Remove existing message
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;

    // Insert before form
    const form = document.getElementById('registerForm');
    form.parentNode.insertBefore(messageDiv, form);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Setup input effects
function setupInputEffects() {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        // Focus effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        // Blur effect
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            
            // Validate on blur
            if (this.value.trim()) {
                validateSingleField(this);
            }
        });

        // Input effect
        input.addEventListener('input', function() {
            // Remove error state when user starts typing
            this.classList.remove('error');
        });
    });
}

// Validate single field
function validateSingleField(field) {
    const value = field.value.trim();
    
    switch(field.id) {
        case 'username':
            if (value.length >= 3) {
                field.classList.add('success');
                field.classList.remove('error');
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(value)) {
                field.classList.add('success');
                field.classList.remove('error');
            }
            break;
        case 'password':
            if (value.length >= 6) {
                field.classList.add('success');
                field.classList.remove('error');
            }
            break;
    }
}

// Setup social login buttons
function setupSocialButtons() {
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.classList.contains('facebook') ? 'Facebook' : 
                           this.classList.contains('google') ? 'Google' : 'TikTok';
            
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Simulate social login
            showMessage(`Đăng nhập bằng ${platform} đang được phát triển...`, 'info');
        });
    });
}

// Setup keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Enter key on switch button
        if (e.key === 'Enter' && e.target.classList.contains('switch-btn')) {
            goToLogin();
        }
        
        // Escape key to clear messages
        if (e.key === 'Escape') {
            const message = document.querySelector('.message');
            if (message) {
                message.remove();
            }
        }
    });
}

// Add page load animation
function addPageLoadAnimation() {
    // Animate form elements
    const formElements = document.querySelectorAll('.input-group, .register-btn, .social-login');
    formElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
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

// Add smooth transitions when leaving page
window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0';
});

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden
        console.log('Page hidden');
    } else {
        // Page is visible
        console.log('Page visible');
    }
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        simulateRegisterAPI,
        showMessage
    };
}