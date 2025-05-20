document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin login script loaded');
    
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        console.log('Login form found');
        
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Login form submitted');
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            
            console.log('Attempting login with:', username);
            
            // Simple admin authentication (in a real app, this would be server-side)
            if (username === 'admin' && password === 'admin123') {
                console.log('Login successful');
                
                // Set admin login status
                localStorage.setItem('adminLoggedIn', 'true');
                
                // Show success message
                const loginMessage = document.createElement('div');
                loginMessage.className = 'login-message success';
                loginMessage.textContent = 'Login successful! Redirecting...';
                
                // Remove any existing messages
                const existingMessages = document.querySelectorAll('.login-message');
                existingMessages.forEach(msg => msg.remove());
                
                // Add the new message
                loginForm.appendChild(loginMessage);
                
                // Redirect to documentation page after a short delay
                setTimeout(() => {
                    window.location.href = 'documentation.html';
                }, 1500);
            } else {
                console.log('Login failed');
                
                // Show error message
                const loginMessage = document.createElement('div');
                loginMessage.className = 'login-message error';
                loginMessage.textContent = 'Invalid username or password. Please try again.';
                
                // Remove any existing messages
                const existingMessages = document.querySelectorAll('.login-message');
                existingMessages.forEach(msg => msg.remove());
                
                // Add the new message
                loginForm.appendChild(loginMessage);
                
                // Remove error message after 3 seconds
                setTimeout(() => {
                    loginMessage.remove();
                }, 3000);
            }
        });
    } else {
        console.log('Login form not found');
    }
    
    // Check if user is already logged in
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        console.log('User already logged in');
        
        // If on login page, redirect to documentation
        if (window.location.pathname.includes('admin-login.html')) {
            window.location.href = 'documentation.html';
        }
    } else {
        console.log('User not logged in');
    }
});