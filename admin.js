document.addEventListener('DOMContentLoaded', function() {
    // Simple hash function for password (for demo purposes only)
    // In a real application, use a proper hashing algorithm on the server side
    function simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash.toString(16);
    }
    
    // Check if admin account exists, if not create default admin
    function initAdminAccount() {
        const adminExists = localStorage.getItem('bubblesBoxAdmin');
        
        if (!adminExists) {
            // Create default admin account (username: admin, password: admin123)
            const defaultAdmin = {
                username: 'admin',
                // Store hashed password
                passwordHash: simpleHash('admin123')
            };
            
            localStorage.setItem('bubblesBoxAdmin', JSON.stringify(defaultAdmin));
            console.log('Default admin account created');
        }
    }
    
    // Initialize admin account
    initAdminAccount();
    
    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            const loginMessage = document.getElementById('login-message');
            
            // Get admin account
            const adminData = JSON.parse(localStorage.getItem('bubblesBoxAdmin'));
            
            // Check credentials
            if (username === adminData.username && simpleHash(password) === adminData.passwordHash) {
                // Login successful
                loginMessage.textContent = 'Login successful! Redirecting...';
                loginMessage.className = 'login-message success';
                
                // Create session
                const session = {
                    username: username,
                    isAdmin: true,
                    loginTime: new Date().getTime(),
                    // Session expires in 1 hour
                    expiresAt: new Date().getTime() + (60 * 60 * 1000)
                };
                
                localStorage.setItem('bubblesBoxSession', JSON.stringify(session));
                
                // Redirect to documentation page
                setTimeout(() => {
                    window.location.href = 'documentation.html';
                }, 1500);
            } else {
                // Login failed
                loginMessage.textContent = 'Invalid username or password';
                loginMessage.className = 'login-message error';
            }
        });
    }
    
    // Check if user is logged in
    function checkAuth() {
        const session = localStorage.getItem('bubblesBoxSession');
        
        if (!session) {
            return false;
        }
        
        const sessionData = JSON.parse(session);
        const now = new Date().getTime();
        
        // Check if session is expired
        if (now > sessionData.expiresAt) {
            // Session expired, remove it
            localStorage.removeItem('bubblesBoxSession');
            return false;
        }
        
        return sessionData;
    }
    
    // Add admin bar if logged in
    function addAdminBar() {
        const session = checkAuth();
        
        if (session) {
            // Create admin bar
            const adminBar = document.createElement('div');
            adminBar.className = 'admin-bar';
            
            adminBar.innerHTML = `
                <div class="container">
                    <div class="admin-bar-content">
                        <div class="admin-bar-user">
                            <i class="fas fa-user-shield"></i>
                            <span>Logged in as: <strong>${session.username}</strong></span>
                        </div>
                        <div class="admin-bar-actions">
                            <button id="logout-btn" class="btn btn-sm btn-danger">
                                <i class="fas fa-sign-out-alt"></i> Logout
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            // Insert admin bar at the top of the body
            document.body.insertBefore(adminBar, document.body.firstChild);
            
            // Add logout functionality
            document.getElementById('logout-btn').addEventListener('click', function() {
                localStorage.removeItem('bubblesBoxSession');
                window.location.href = 'index.html';
            });
        }
    }
    
    // Add admin bar if user is logged in
    addAdminBar();
    
    // Export functions for use in other scripts
    window.adminAuth = {
        checkAuth: checkAuth
    };
});