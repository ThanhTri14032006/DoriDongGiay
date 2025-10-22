// Login Page JavaScript

// Function to switch to register page
function goToRegister() {
    window.location.href = 'register.html';
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Basic validation
    if (!username || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Show loading state
    const loginBtn = document.querySelector('.login-btn');
    const originalText = loginBtn.textContent;
    loginBtn.textContent = 'Logging in...';
    loginBtn.disabled = true;
    
    // Simulate API call (replace with actual API call)
    setTimeout(() => {
        // Mock login logic
        if (username === 'admin' && password === 'admin') {
            showMessage('Login successful!', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showMessage('Invalid username or password', 'error');
            loginBtn.textContent = originalText;
            loginBtn.disabled = false;
        }
    }, 1500);
});

// Social login handlers
document.querySelector('.social-btn.facebook').addEventListener('click', function() {
    showMessage('Facebook login not implemented yet', 'info');
});

document.querySelector('.social-btn.google').addEventListener('click', function() {
    showMessage('Google login not implemented yet', 'info');
});

document.querySelector('.social-btn.tiktok').addEventListener('click', function() {
    showMessage('TikTok login not implemented yet', 'info');
});

// Show message function
function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    // Add styles
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            messageDiv.style.background = '#10b981';
            break;
        case 'error':
            messageDiv.style.background = '#ef4444';
            break;
        case 'info':
            messageDiv.style.background = '#3b82f6';
            break;
        default:
            messageDiv.style.background = '#6b7280';
    }
    
    // Add animation keyframes
    if (!document.querySelector('#messageStyles')) {
        const style = document.createElement('style');
        style.id = 'messageStyles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(messageDiv);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 300);
    }, 3000);
}

// Input focus effects
document.querySelectorAll('.input-group input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Add loading animation to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.disabled) {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        }
    });
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const focusedElement = document.activeElement;
        if (focusedElement.tagName === 'INPUT') {
            const form = focusedElement.closest('form');
            if (form) {
                form.dispatchEvent(new Event('submit'));
            }
        }
    }
});

// Page load animation
window.addEventListener('load', function() {
    document.querySelector('.welcome-section').style.animation = 'slideInLeft 0.8s ease';
    document.querySelector('.form-section').style.animation = 'slideInRight 0.8s ease';
    
    // Add animation keyframes
    if (!document.querySelector('#pageAnimations')) {
        const style = document.createElement('style');
        style.id = 'pageAnimations';
        style.textContent = `
            @keyframes slideInLeft {
                from {
                    transform: translateX(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
});