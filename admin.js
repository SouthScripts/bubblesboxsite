/**
 * Admin functionality for Bubbles Box Minecraft Server Store
 * Handles admin authentication, store management, and admin-specific features
 */

document.addEventListener('DOMContentLoaded', function() {
    // Admin configuration
    const ADMIN_CONFIG = {
        // Default admin credentials - CHANGE THESE IN PRODUCTION!
        defaultUsername: 'admin',
        defaultPassword: 'bubblesbox',
        // Store configuration
        defaultCurrency: '$',
        // UI settings
        notificationDuration: 5000, // milliseconds
    };

    // Initialize admin functionality
    initAdminFunctionality();

    /**
     * Initialize all admin functionality
     */
    function initAdminFunctionality() {
        // Check if we're on the admin login page
        if (window.location.pathname.includes('admin-login.html')) {
            setupAdminLoginPage();
            return;
        }

        // Check if admin is logged in
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        if (isAdmin) {
            setupAdminInterface();
        }

        // Setup admin logout functionality
        setupAdminLogout();
    }

    /**
     * Setup the admin login page functionality
     */
    function setupAdminLoginPage() {
        const loginForm = document.getElementById('admin-login-form');
        if (!loginForm) return;

        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('admin-username').value.trim();
            const password = document.getElementById('admin-password').value.trim();
            const rememberMe = document.getElementById('remember-me').checked;
            
            // Check credentials
            if (validateAdminCredentials(username, password)) {
                // Set admin status in localStorage
                localStorage.setItem('isAdmin', 'true');
                
                // Set expiration if not "remember me"
                if (!rememberMe) {
                    // Set session expiration to 2 hours from now
                    const expiration = new Date();
                    expiration.setHours(expiration.getHours() + 2);
                    localStorage.setItem('adminExpiration', expiration.toISOString());
                } else {
                    // Remove expiration if exists
                    localStorage.removeItem('adminExpiration');
                }
                
                // Redirect to store page
                window.location.href = 'store.html';
            } else {
                // Show error message
                const errorElement = document.getElementById('login-error');
                if (errorElement) {
                    errorElement.textContent = 'Invalid username or password';
                    errorElement.style.display = 'block';
                } else {
                    // Create error element if it doesn't exist
                    const errorDiv = document.createElement('div');
                    errorDiv.id = 'login-error';
                    errorDiv.className = 'login-error';
                    errorDiv.textContent = 'Invalid username or password';
                    loginForm.prepend(errorDiv);
                }
            }
        });
    }

    /**
     * Validate admin credentials
     * In a real application, this would check against a secure backend
     */
    function validateAdminCredentials(username, password) {
        // Get stored credentials or use defaults
        const storedUsername = localStorage.getItem('adminUsername') || ADMIN_CONFIG.defaultUsername;
        const storedPassword = localStorage.getItem('adminPassword') || ADMIN_CONFIG.defaultPassword;
        
        return username === storedUsername && password === storedPassword;
    }

    /**
     * Setup admin logout functionality
     */
    function setupAdminLogout() {
        // Check for session expiration
        const expiration = localStorage.getItem('adminExpiration');
        if (expiration) {
            const expirationDate = new Date(expiration);
            if (new Date() > expirationDate) {
                // Session expired, log out
                logoutAdmin();
                return;
            }
        }
        
        // Add event listener to logout button if it exists
        const logoutBtn = document.getElementById('admin-logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                logoutAdmin();
            });
        }
    }

    /**
     * Log out the admin user
     */
    function logoutAdmin() {
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('adminExpiration');
        
        // Reload the page to reflect logged out state
        window.location.reload();
    }

    /**
     * Setup the admin interface elements and functionality
     */
    function setupAdminInterface() {
        // Add admin mode class to body
        document.body.classList.add('admin-mode');
        
        // Create and insert admin bar if not already present
        if (!document.querySelector('.admin-bar')) {
            createAdminBar();
        }
        
        // Show admin controls
        const adminControls = document.querySelectorAll('.admin-controls');
        adminControls.forEach(control => {
            control.style.display = 'block';
        });
        
        // Setup store configuration
        setupStoreConfiguration();
        
        // Setup featured packages management
        setupFeaturedPackagesManagement();
        
        // Add admin controls to package details modal
        setupPackageDetailsAdminControls();
    }

    /**
     * Create and insert the admin bar
     */
    function createAdminBar() {
        const adminBar = document.createElement('div');
        adminBar.className = 'admin-bar';
        adminBar.innerHTML = `
            <div class="container">
                <div class="admin-bar-content">
                    <span><i class="fas fa-user-shield"></i> Admin Mode</span>
                    <div class="admin-actions">
                        <button id="configure-store-btn" class="btn btn-sm">
                            <i class="fas fa-cog"></i> Configure Store
                        </button>
                        <button id="manage-featured-btn" class="btn btn-sm">
                            <i class="fas fa-star"></i> Featured Items
                        </button>
                        <button id="change-password-btn" class="btn btn-sm">
                            <i class="fas fa-key"></i> Change Password
                        </button>
                        <button id="admin-logout-btn" class="btn btn-sm btn-danger">
                            <i class="fas fa-sign-out-alt"></i> Logout
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Insert after header
        const header = document.querySelector('header');
        if (header) {
            header.after(adminBar);
        } else {
            document.body.prepend(adminBar);
        }
        
        // Add event listeners to admin buttons
        document.getElementById('configure-store-btn').addEventListener('click', showStoreConfigModal);
        document.getElementById('manage-featured-btn').addEventListener('click', showFeaturedPackagesModal);
        document.getElementById('change-password-btn').addEventListener('click', showChangePasswordModal);
    }

    /**
     * Setup store configuration functionality
     */
    function setupStoreConfiguration() {
        // Add event listener to configure store button
        const configureBtn = document.getElementById('configure-store-btn');
        if (configureBtn) {
            configureBtn.addEventListener('click', showStoreConfigModal);
        }
    }

    /**
     * Show the store configuration modal
     */
    function showStoreConfigModal() {
        // Get current store settings
        const storeId = localStorage.getItem('tebexStoreId') || '';
        const currency = localStorage.getItem('storeCurrency') || ADMIN_CONFIG.defaultCurrency;
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'store-config-modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        modalContent.innerHTML = `
            <span class="close-modal">&times;</span>
            <h2>Configure Tebex Store</h2>
            <form id="store-config-form">
                <div class="form-group">
                    <label for="tebex-store-id">Tebex Store ID</label>
                    <input type="text" id="tebex-store-id" value="${storeId}" placeholder="Enter your Tebex store ID" required>
                    <small class="form-text">You can find your store ID in your Tebex dashboard</small>
                </div>
                <div class="form-group">
                    <label for="store-currency">Currency Symbol</label>
                    <input type="text" id="store-currency" value="${currency}" placeholder="$" required>
                </div>
                <div class="form-buttons">
                    <button type="button" class="btn btn-outline close-modal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Save Configuration</button>
                </div>
            </form>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Show the modal
        modal.style.display = 'block';
        
        // Close modal functionality
        setupModalClose(modal);
        
        // Form submission
        document.getElementById('store-config-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newStoreId = document.getElementById('tebex-store-id').value.trim();
            const newCurrency = document.getElementById('store-currency').value.trim();
            
            // Save settings
            localStorage.setItem('tebexStoreId', newStoreId);
            localStorage.setItem('storeCurrency', newCurrency);
            
            // Close modal
            modal.style.display = 'none';
            modal.remove();
            
            // Show notification
            showAdminNotification('Store configuration saved successfully', 'success');
            
            // Reload store if ID changed
            if (newStoreId !== storeId) {
                // Reload the page to apply new store ID
                window.location.reload();
            }
        });
    }

    /**
     * Setup featured packages management
     */
    function setupFeaturedPackagesManagement() {
        // Add event listener to manage featured button
        const manageFeaturedBtn = document.getElementById('manage-featured-btn');
        if (manageFeaturedBtn) {
            manageFeaturedBtn.addEventListener('click', showFeaturedPackagesModal);
        }
        
        // Apply featured styling to packages
        applyFeaturedStyling();
    }

    /**
     * Show the featured packages management modal
     */
    function showFeaturedPackagesModal() {
        // Get packages from the page or localStorage
        let packages = [];
        try {
            // Try to get packages from window object (set by store.js)
            if (window.storePackages && Array.isArray(window.storePackages)) {
                packages = window.storePackages;
            } else {
                // Fallback to localStorage
                const packagesJson = localStorage.getItem('storePackages');
                if (packagesJson) {
                    packages = JSON.parse(packagesJson);
                }
            }
        } catch (error) {
            console.error('Error getting packages:', error);
            showAdminNotification('Error loading packages. Please refresh the page.', 'error');
            return;
        }
        
        if (!packages || packages.length === 0) {
            showAdminNotification('No packages found. Please configure your store first.', 'error');
            return;
        }
        
        // Get featured packages
        const featuredPackages = JSON.parse(localStorage.getItem('featuredPackages') || '[]');
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'featured-packages-modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content wide-modal';
        
        // Generate package list HTML
        let packagesHtml = '';
        packages.forEach(pkg => {
            const isFeatured = featuredPackages.includes(pkg.id);
            packagesHtml += `
                <div class="featured-package-item ${isFeatured ? 'is-featured' : ''}" data-package-id="${pkg.id}">
                    <div class="featured-package-info">
                        <h4>${pkg.name}</h4>
                        <p>${pkg.category ? pkg.category.name : 'No category'}</p>
                    </div>
                    <button class="btn ${isFeatured ? 'btn-danger' : 'btn-primary'} feature-toggle-btn">
                        ${isFeatured ? '<i class="fas fa-star-half-alt"></i> Remove Featured' : '<i class="fas fa-star"></i> Make Featured'}
                    </button>
                </div>
            `;
        });
        
        modalContent.innerHTML = `
            <span class="close-modal">&times;</span>
            <h2>Manage Featured Packages</h2>
            <p>Select packages to feature on your store. Featured packages will be highlighted to customers.</p>
            
            <div class="featured-packages-list">
                ${packagesHtml || '<p class="text-center">No packages found</p>'}
            </div>
            
            <div class="form-buttons">
                <button type="button" class="btn btn-outline close-modal">Close</button>
                <button type="button" id="save-featured-btn" class="btn btn-primary">Save Changes</button>
            </div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Show the modal
        modal.style.display = 'block';
        
        // Close modal functionality
        setupModalClose(modal);
        
        // Toggle featured status
        const toggleButtons = modal.querySelectorAll('.feature-toggle-btn');
        toggleButtons.forEach(button => {
            button.addEventListener('click', function() {
                const packageItem = this.closest('.featured-package-item');
                const packageId = packageItem.getAttribute('data-package-id');
                
                // Toggle featured class
                packageItem.classList.toggle('is-featured');
                
                // Update button text
                if (packageItem.classList.contains('is-featured')) {
                    this.innerHTML = '<i class="fas fa-star-half-alt"></i> Remove Featured';
                    this.classList.remove('btn-primary');
                    this.classList.add('btn-danger');
                } else {
                    this.innerHTML = '<i class="fas fa-star"></i> Make Featured';
                    this.classList.remove('btn-danger');
                    this.classList.add('btn-primary');
                }
            });
        });
        
        // Save changes
        const saveBtn = document.getElementById('save-featured-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', function() {
                // Get all featured package IDs
                const featuredItems = modal.querySelectorAll('.featured-package-item.is-featured');
                const newFeaturedPackages = Array.from(featuredItems).map(item => 
                    item.getAttribute('data-package-id')
                );
                
                // Save to localStorage
                localStorage.setItem('featuredPackages', JSON.stringify(newFeaturedPackages));
                
                // Close modal
                modal.style.display = 'none';
                modal.remove();
                
                // Apply styling to packages
                applyFeaturedStyling();
                
                // Show notification
                showAdminNotification('Featured packages updated successfully', 'success');
            });
        }
    }

    /**
     * Apply featured styling to packages on the page
     */
    function applyFeaturedStyling() {
        // Get featured packages
        const featuredPackages = JSON.parse(localStorage.getItem('featuredPackages') || '[]');
        if (featuredPackages.length === 0) return;
        
        // Apply featured class to package cards
        const packageCards = document.querySelectorAll('.package-card');
        packageCards.forEach(card => {
            const packageId = card.getAttribute('data-package-id');
            if (featuredPackages.includes(packageId)) {
                card.classList.add('featured');
            } else {
                card.classList.remove('featured');
            }
        });
    }

    /**
     * Setup admin controls in package details modal
     */
    function setupPackageDetailsAdminControls() {
        // Listen for package modal opening
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && 
                    mutation.attributeName === 'style' && 
                    mutation.target.style.display === 'block' && 
                    mutation.target.id === 'package-modal') {
                    
                    addPackageModalAdminControls(mutation.target);
                }
            });
        });
        
        const packageModal = document.getElementById('package-modal');
        if (packageModal) {
            observer.observe(packageModal, { attributes: true });
        }
    }

    /**
     * Add admin controls to the package details modal
     */
    function addPackageModalAdminControls(modal) {
        // Check if admin controls already exist
        if (modal.querySelector('.package-admin-controls')) return;
        
        // Get package ID
        const packageDetails = modal.querySelector('#package-details');
        if (!packageDetails) return;
        
        const packageId = packageDetails.getAttribute('data-package-id');
        if (!packageId) return;
        
        // Get featured packages
        const featuredPackages = JSON.parse(localStorage.getItem('featuredPackages') || '[]');
        const isFeatured = featuredPackages.includes(packageId);
        
        // Create admin controls
        const adminControls = document.createElement('div');
        adminControls.className = 'package-admin-controls';
        adminControls.innerHTML = `
            <button class="btn ${isFeatured ? 'btn-danger' : 'btn-primary'} feature-package-btn ${isFeatured ? 'featured' : ''}">
                ${isFeatured ? '<i class="fas fa-star-half-alt"></i> Remove Featured' : '<i class="fas fa-star"></i> Make Featured'}
            </button>
        `;
        
        // Add to modal
        packageDetails.appendChild(adminControls);
        
        // Add event listener to feature button
        const featureBtn = adminControls.querySelector('.feature-package-btn');
        featureBtn.addEventListener('click', function() {
            // Toggle featured status
            const newFeaturedPackages = [...featuredPackages];
            
            if (isFeatured) {
                // Remove from featured
                const index = newFeaturedPackages.indexOf(packageId);
                if (index !== -1) {
                    newFeaturedPackages.splice(index, 1);
                }
                
                // Update button
                this.innerHTML = '<i class="fas fa-star"></i> Make Featured';
                this.classList.remove('btn-danger', 'featured');
                this.classList.add('btn-primary');
            } else {
                // Add to featured
                if (!newFeaturedPackages.includes(packageId)) {
                    newFeaturedPackages.push(packageId);
                }
                
                // Update button
                this.innerHTML = '<i class="fas fa-star-half-alt"></i> Remove Featured';
                this.classList.remove('btn-primary');
                this.classList.add('btn-danger', 'featured');
            }
            
            // Save to localStorage
            localStorage.setItem('featuredPackages', JSON.stringify(newFeaturedPackages));
            
            // Apply styling to packages
            applyFeaturedStyling();
            
            // Show notification
            showAdminNotification('Featured status updated', 'success');
        });
    }

    /**
     * Show change password modal
     */
    function showChangePasswordModal() {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'change-password-modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        modalContent.innerHTML = `
            <span class="close-modal">&times;</span>
            <h2>Change Admin Password</h2>
            <form id="change-password-form">
                <div class="form-group">
                    <label for="current-password">Current Password</label>
                    <input type="password" id="current-password" required>
                </div>
                <div class="form-group">
                    <label for="new-password">New Password</label>
                    <input type="password" id="new-password" required>
                </div>
                <div class="form-group">
                    <label for="confirm-password">Confirm New Password</label>
                    <input type="password" id="confirm-password" required>
                </div>
                <div id="password-error" class="login-error" style="display: none;"></div>
                <div class="form-buttons">
                    <button type="button" class="btn btn-outline close-modal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Change Password</button>
                </div>
            </form>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Show the modal
        modal.style.display = 'block';
        
        // Close modal functionality
        setupModalClose(modal);
        
        // Form submission
        document.getElementById('change-password-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const errorElement = document.getElementById('password-error');
            
            // Validate current password
            const storedPassword = localStorage.getItem('adminPassword') || ADMIN_CONFIG.defaultPassword;
            if (currentPassword !== storedPassword) {
                errorElement.textContent = 'Current password is incorrect';
                errorElement.style.display = 'block';
                return;
            }
            
            // Validate new password
            if (newPassword.length < 6) {
                errorElement.textContent = 'New password must be at least 6 characters';
                errorElement.style.display = 'block';
                return;
            }
            
            // Validate password match
            if (newPassword !== confirmPassword) {
                errorElement.textContent = 'New passwords do not match';
                errorElement.style.display = 'block';
                return;
            }
            
            // Save new password
            localStorage.setItem('adminPassword', newPassword);
            
            // Close modal
            modal.style.display = 'none';
            modal.remove();
            
            // Show notification
            showAdminNotification('Password changed successfully', 'success');
        });
    }

    /**
     * Setup modal close functionality
     */
    function setupModalClose(modal) {
        // Close button
        const closeButtons = modal.querySelectorAll('.close-modal');
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                modal.style.display = 'none';
                modal.remove();
            });
        });
        
        // Close when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                modal.remove();
            }
        });
    }

    /**
     * Show admin notification
     */
    function showAdminNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.admin-notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `admin-notification ${type}`;
        
        // Set icon based on type
        let icon = 'info-circle';
        if (type === 'success') icon = 'check-circle';
        if (type === 'error') icon = 'exclamation-circle';
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${icon}"></i>
                <div class="notification-message">${message}</div>
            </div>
            <button class="close-notification">&times;</button>
        `;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Show notification with animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Close button
        const closeButton = notification.querySelector('.close-notification');
        closeButton.addEventListener('click', function() {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto-hide after duration
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        notification.remove();
                    }
                }, 300);
            }
        }, ADMIN_CONFIG.notificationDuration);
    }
});