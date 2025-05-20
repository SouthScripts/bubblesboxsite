document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            
            // Simple admin authentication (in a real app, this would be server-side)
            if (username === 'admin' && password === 'admin123') {
                // Set admin login status
                localStorage.setItem('adminLoggedIn', 'true');
                
                // Show success message
                const loginMessage = document.createElement('div');
                loginMessage.className = 'login-message success';
                loginMessage.textContent = 'Login successful! Redirecting...';
                
                const formButtons = document.querySelector('.form-buttons');
                formButtons.parentNode.insertBefore(loginMessage, formButtons);
                
                // Redirect to documentation page after a short delay
                setTimeout(() => {
                    window.location.href = 'documentation.html';
                }, 1500);
            } else {
                // Show error message
                const loginMessage = document.createElement('div');
                loginMessage.className = 'login-message error';
                loginMessage.textContent = 'Invalid username or password. Please try again.';
                
                const formButtons = document.querySelector('.form-buttons');
                formButtons.parentNode.insertBefore(loginMessage, formButtons);
                
                // Remove error message after 3 seconds
                setTimeout(() => {
                    loginMessage.remove();
                }, 3000);
            }
        });
    }
    
    // Check if user is already logged in
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        // If on login page, redirect to documentation
        if (window.location.pathname.includes('admin-login.html')) {
            window.location.href = 'documentation.html';
        }
    }
});