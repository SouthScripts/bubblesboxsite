// Tebex Store Integration for Bubbles Box Minecraft Server

document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let storeId = ''; // Replace with your Tebex store ID
    let currentCategory = null;
    let packages = [];
    let categories = [];
    
    // Admin check
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (isAdmin) {
        // Show admin bar
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
                        <button id="admin-logout-btn" class="btn btn-sm btn-danger">
                            <i class="fas fa-sign-out-alt"></i> Logout
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.querySelector('header').after(adminBar);
        
        // Show admin controls
        document.querySelector('.admin-controls').style.display = 'block';
        
        // Admin logout button
        document.getElementById('admin-logout-btn').addEventListener('click', function() {
            localStorage.removeItem('isAdmin');
            window.location.reload();
        });
        
        // Configure store button
        document.getElementById('configure-store-btn').addEventListener('click', function() {
            showStoreConfigModal();
        });
    }
    
    // Check if store ID is saved
    storeId = localStorage.getItem('tebexStoreId');
    if (storeId) {
        initializeTebexStore(storeId);
    } else if (isAdmin) {
        showStoreConfigModal();
    } else {
        showStoreIdPrompt();
    }
    
    // Function to show store configuration modal for admins
    function showStoreConfigModal() {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        modalContent.innerHTML = `
            <span class="close-modal">&times;</span>
            <h2>Configure Tebex Store</h2>
            <form id="store-config-form">
                <div class="form-group">
                    <label for="tebex-store-id">Tebex Store ID</label>
                    <input type="text" id="tebex-store-id" value="${storeId || ''}" placeholder="Enter your Tebex store ID" required>
                    <small class="form-text">You can find your store ID in your Tebex dashboard</small>
                </div>
                <div class="form-group">
                    <label for="store-currency">Currency Symbol</label>
                    <input type="text" id="store-currency" value="${localStorage.getItem('storeCurrency') || '$'}" placeholder="$" required>
                </div>
                <div class="form-buttons">
                    <button type="button" class="btn btn-outline close-modal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Save Configuration</button>
                </div>
            </form>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeButtons = modal.querySelectorAll('.close-modal');
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                modal.remove();
            });
        });
        
        // Form submission
        document.getElementById('store-config-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const newStoreId = document.getElementById('tebex-store-id').value.trim();
            const currency = document.getElementById('store-currency').value.trim();
            
            localStorage.setItem('tebexStoreId', newStoreId);
            localStorage.setItem('storeCurrency', currency);
            
            modal.remove();
            
            if (newStoreId !== storeId) {
                storeId = newStoreId;
                initializeTebexStore(storeId);
            }
        });
    }
    
    // Function to prompt for store ID for non-admins if not set
    function showStoreIdPrompt() {
        const storeMain = document.querySelector('.store-main');
        storeMain.innerHTML = `
            <div class="store-not-configured">
                <i class="fas fa-store-slash fa-4x"></i>
                <h2>Store Not Configured</h2>
                <p>The store has not been configured yet. Please contact the server administrator.</p>
            </div>
        `;
    }
    
    // Initialize Tebex store with the provided store ID
    function initializeTebexStore(id) {
        const storeElement = document.getElementById('tebex-store');
        storeElement.innerHTML = `
            <div class="loading-container">
                <i class="fas fa-spinner fa-spin fa-3x"></i>
                <p>Loading store items...</p>
            </div>
        `;
        
        // Initialize Tebex
        try {
            // Fetch categories
            fetch(`https://plugin.tebex.io/api/${id}/categories`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to load categories: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    categories = data;
                    renderCategories(data);
                    
                    // Fetch packages
                    return fetch(`https://plugin.tebex.io/api/${id}/packages`);
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to load packages: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    packages = data;
                    renderPackages(data);
                })
                .catch(error => {
                    console.error('Error loading Tebex store:', error);
                    storeElement.innerHTML = `
                        <div class="store-error">
                            <i class="fas fa-exclamation-circle fa-4x"></i>
                            <h2>Error Loading Store</h2>
                            <p>${error.message}</p>
                            <p>Please check your store ID and try again.</p>
                            ${isAdmin ? '<button id="reconfigure-store-btn" class="btn btn-primary">Configure Store</button>' : ''}
                        </div>
                    `;
                    
                    if (isAdmin) {
                        document.getElementById('reconfigure-store-btn').addEventListener('click', showStoreConfigModal);
                    }
                });
        } catch (error) {
            console.error('Error initializing Tebex:', error);
            storeElement.innerHTML = `
                <div class="store-error">
                    <i class="fas fa-exclamation-circle fa-4x"></i>
                    <h2>Error Loading Store</h2>
                    <p>${error.message}</p>
                </div>
            `;
        }
    }
    
    // Render categories in the sidebar
    function renderCategories(categories) {
        const categoriesElement = document.getElementById('store-categories');
        
        if (categories.length === 0) {
            categoriesElement.innerHTML = '<li>No categories found</li>';
            return;
        }
        
        let html = `
            <li>
                <a href="#" class="category-link active" data-category="all">
                    All Items
                </a>
            </li>
        `;
        
        categories.forEach(category => {
            html += `
                <li>
                    <a href="#" class="category-link" data-category="${category.id}">
                        ${category.name}
                    </a>
                </li>
            `;
        });
        
        categoriesElement.innerHTML = html;
        
        // Add event listeners to category links
        document.querySelectorAll('.category-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Update active class
                document.querySelectorAll('.category-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Filter packages by category
                const categoryId = this.getAttribute('data-category');
                currentCategory = categoryId === 'all' ? null : categoryId;
                
                // Re-render packages with filter
                renderPackages(packages);
            });
        });
    }
    
    // Render packages in the main content area
    function renderPackages(packages) {
        const storeElement = document.getElementById('tebex-store');
        
        if (packages.length === 0) {
            storeElement.innerHTML = '<div class="no-packages">No packages found</div>';
            return;
        }
        
        // Filter packages by category if needed
        const filteredPackages = currentCategory 
            ? packages.filter(pkg => pkg.category.id === currentCategory)
            : packages;
        
        if (filteredPackages.length === 0) {
            storeElement.innerHTML = '<div class="no-packages">No packages found in this category</div>';
            return;
        }
        
        // Get currency symbol
        const currencySymbol = localStorage.getItem('storeCurrency') || '$';
        
        // Generate HTML for packages
        let html = '<div class="packages-grid">';
        
        filteredPackages.forEach(pkg => {
            const price = pkg.price;
            
            html += `
                <div class="package-card" data-package-id="${pkg.id}">
                    <div class="package-image">
                        ${pkg.image 
                            ? `<img src="${pkg.image}" alt="${pkg.name}">`
                            : `<div class="placeholder-image"><i class="fas fa-box-open"></i></div>`
                        }
                    </div>
                    <div class="package-content">
                        <h3 class="package-name">${pkg.name}</h3>
                        <div class="package-price">${currencySymbol}${price}</div>
                        <button class="btn btn-primary btn-block view-package-btn" data-package-id="${pkg.id}">
                            View Details
                        </button>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        storeElement.innerHTML = html;
        
        // Add event listeners to package buttons
        document.querySelectorAll('.view-package-btn').forEach(button => {
            button.addEventListener('click', function() {
                const packageId = this.getAttribute('data-package-id');
                showPackageDetails(packageId);
            });
        });
    }
    
    // Show package details in modal
    function showPackageDetails(packageId) {
        const pkg = packages.find(p => p.id === packageId);
        if (!pkg) return;
        
        const modal = document.getElementById('package-modal');
        const detailsElement = document.getElementById('package-details');
        
        // Get currency symbol
        const currencySymbol = localStorage.getItem('storeCurrency') || '$';
        
        detailsElement.innerHTML = `
            <div class="package-detail-header">
                ${pkg.image 
                    ? `<img src="${pkg.image}" alt="${pkg.name}" class="package-detail-image">`
                    : `<div class="placeholder-image large"><i class="fas fa-box-open fa-3x"></i></div>`
                }
                <div class="package-detail-info">
                    <h2>${pkg.name}</h2>
                    <div class="package-detail-price">${currencySymbol}${pkg.price}</div>
                </div>
            </div>
            <div class="package-detail-description">
                ${pkg.description || 'No description available.'}
            </div>
            <div class="package-detail-actions">
                <a href="${pkg.url}" target="_blank" class="btn btn-primary btn-lg btn-block">
                    <i class="fas fa-shopping-cart"></i> Purchase
                </a>
            </div>
        `;
        
        modal.style.display = 'block';
        
        // Close modal functionality
        const closeButton = modal.querySelector('.close-modal');
        closeButton.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        // Close when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});