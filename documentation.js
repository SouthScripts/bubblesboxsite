document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const docNav = document.getElementById('doc-nav');
    const docContent = document.getElementById('doc-content');
    const adminControls = document.getElementById('admin-controls');
    const toggleEditModeBtn = document.getElementById('toggle-edit-mode');
    const addSectionBtn = document.getElementById('add-section');
    const editModal = document.getElementById('edit-modal');
    const closeModal = document.querySelector('.close-modal');
    const cancelEdit = document.getElementById('cancel-edit');
    const editForm = document.getElementById('edit-form');
    const modalTitle = document.getElementById('modal-title');
    const sectionTitleInput = document.getElementById('section-title');
    const sectionContentInput = document.getElementById('section-content');
    
    let editMode = false;
    let currentSection = null;
    
    // Check if user is authenticated
    function isAuthenticated() {
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
        
        return true;
    }
    
    // Show/hide admin controls based on authentication
    function updateAdminUI() {
        if (adminControls) {
            if (isAuthenticated()) {
                adminControls.style.display = 'block';
                
                // Update the edit mode button text
                if (toggleEditModeBtn) {
                    toggleEditModeBtn.innerHTML = '<i class="fas fa-edit"></i> Edit Mode';
                    
                    // Remove any existing event listeners
                    toggleEditModeBtn.replaceWith(toggleEditModeBtn.cloneNode(true));
                    
                    // Get the new button reference
                    const newToggleBtn = document.getElementById('toggle-edit-mode');
                    
                    // Add event listener
                    newToggleBtn.addEventListener('click', toggleEditMode);
                }
            } else {
                adminControls.style.display = 'none';
                
                // If in edit mode, exit it
                if (editMode) {
                    toggleEditMode();
                }
                
                // Update the edit mode button text to show login instead
                if (toggleEditModeBtn) {
                    toggleEditModeBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Admin Login';
                    
                    // Remove any existing event listeners
                    toggleEditModeBtn.replaceWith(toggleEditModeBtn.cloneNode(true));
                    
                    // Get the new button reference
                    const newToggleBtn = document.getElementById('toggle-edit-mode');
                    
                    // Add event listener
                    newToggleBtn.addEventListener('click', function() {
                        window.location.href = 'admin-login.html';
                    });
                }
            }
        }
    }
    
    // Initialize documentation from localStorage or use default content
    function initDocumentation() {
        // Check if we have saved documentation in localStorage
        const savedDocs = localStorage.getItem('bubblesBoxDocs');
        
        if (savedDocs) {
            // Load saved documentation
            const docs = JSON.parse(savedDocs);
            updateNavigation(docs);
            renderDocSections(docs);
        } else {
            // Use default content (already in HTML)
            const defaultDocs = [];
            document.querySelectorAll('.doc-section').forEach(section => {
                const id = section.id;
                const title = section.querySelector('h2').textContent;
                const content = section.querySelector('.section-content').innerHTML;
                
                defaultDocs.push({
                    id,
                    title,
                    content
                });
            });
            
            // Save default docs to localStorage
            localStorage.setItem('bubblesBoxDocs', JSON.stringify(defaultDocs));
        }
        
        // Set up navigation click handlers
        setupNavigation();
        
        // Update admin UI based on authentication
        updateAdminUI();
    }
    
    // Update navigation based on documentation sections
    function updateNavigation(docs) {
        if (!docNav) return;
        
        docNav.innerHTML = '';
        
        docs.forEach(section => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${section.id}`;
            a.textContent = section.title;
            li.appendChild(a);
            docNav.appendChild(li);
        });
    }
    
    // Render documentation sections
    function renderDocSections(docs) {
        if (!docContent) return;
        
        docContent.innerHTML = '';
        
        docs.forEach(section => {
            const sectionEl = document.createElement('div');
            sectionEl.className = 'doc-section';
            sectionEl.id = section.id;
            
            sectionEl.innerHTML = `
                <div class="section-header">
                    <h2>${section.title}</h2>
                    <div class="edit-controls" style="display: ${editMode ? 'flex' : 'none'};">
                        <button class="edit-btn"><i class="fas fa-edit"></i></button>
                        <button class="delete-btn"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
                <div class="section-content">
                    ${section.content}
                </div>
            `;
            
            docContent.appendChild(sectionEl);
        });
        
        // If in edit mode, setup edit buttons
        if (editMode) {
            setupEditButtons();
        }
    }
    
    // Set up navigation click handlers
    function setupNavigation() {
        document.querySelectorAll('#doc-nav a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links
                document.querySelectorAll('#doc-nav a').forEach(a => a.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Scroll to section
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Toggle edit mode
    function toggleEditMode() {
        // Check if user is authenticated
        if (!isAuthenticated() && !editMode) {
            window.location.href = 'admin-login.html';
            return;
        }
        
        editMode = !editMode;
        
        if (editMode) {
            toggleEditModeBtn.innerHTML = '<i class="fas fa-times"></i> Exit Edit Mode';
            toggleEditModeBtn.classList.remove('btn-primary');
            toggleEditModeBtn.classList.add('btn-danger');
            
            if (addSectionBtn) {
                addSectionBtn.style.display = 'block';
            }
            
            // Show edit controls
            document.querySelectorAll('.edit-controls').forEach(control => {
                control.style.display = 'flex';
            });
            
            // Add event listeners to edit and delete buttons
            setupEditButtons();
        } else {
            toggleEditModeBtn.innerHTML = '<i class="fas fa-edit"></i> Edit Mode';
            toggleEditModeBtn.classList.remove('btn-danger');
            toggleEditModeBtn.classList.add('btn-primary');
            
            if (addSectionBtn) {
                addSectionBtn.style.display = 'none';
            }
            
            // Hide edit controls
            document.querySelectorAll('.edit-controls').forEach(control => {
                control.style.display = 'none';
            });
        }
    }
    
    // Setup edit and delete buttons
    function setupEditButtons() {
        // Edit buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            // Remove existing event listeners by cloning and replacing
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', function() {
                const section = this.closest('.doc-section');
                const sectionId = section.id;
                const sectionTitle = section.querySelector('h2').textContent;
                const sectionContent = section.querySelector('.section-content').innerHTML;
                
                // Set current section
                currentSection = sectionId;
                
                // Fill modal with section data
                modalTitle.textContent = 'Edit Section';
                sectionTitleInput.value = sectionTitle;
                sectionContentInput.value = sectionContent;
                
                // Show modal
                editModal.style.display = 'block';
            });
        });
        
        // Delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            // Remove existing event listeners by cloning and replacing
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', function() {
                if (confirm('Are you sure you want to delete this section? This action cannot be undone.')) {
                    const section = this.closest('.doc-section');
                    const sectionId = section.id;
                    
                    // Get current docs
                    const docs = JSON.parse(localStorage.getItem('bubblesBoxDocs'));
                    
                    // Filter out the section to delete
                    const updatedDocs = docs.filter(doc => doc.id !== sectionId);
                    
                    // Save updated docs
                    localStorage.setItem('bubblesBoxDocs', JSON.stringify(updatedDocs));
                    
                    // Update UI
                    updateNavigation(updatedDocs);
                    renderDocSections(updatedDocs);
                    setupNavigation();
                }
            });
        });
    }
    
    // Add new section
    function addNewSection() {
        // Check if user is authenticated
        if (!isAuthenticated()) {
            window.location.href = 'admin-login.html';
            return;
        }
        
        // Generate a unique ID
        const timestamp = new Date().getTime();
        const newId = `section-${timestamp}`;
        
        // Set current section
        currentSection = newId;
        
        // Fill modal with empty data
        modalTitle.textContent = 'Add New Section';
        sectionTitleInput.value = '';
        sectionContentInput.value = '<p>Enter your content here...</p>';
        
        // Show modal
        editModal.style.display = 'block';
    }
    
    // Save section changes
    function saveSection(e) {
        e.preventDefault();
        
        // Check if user is authenticated
        if (!isAuthenticated()) {
            window.location.href = 'admin-login.html';
            return;
        }
        
        const title = sectionTitleInput.value.trim();
        const content = sectionContentInput.value.trim();
        
        if (!title || !content) {
            alert('Please fill in all fields');
            return;
        }
        
        // Get current docs
        const docs = JSON.parse(localStorage.getItem('bubblesBoxDocs'));
        
        // Check if we're editing an existing section or adding a new one
        const existingIndex = docs.findIndex(doc => doc.id === currentSection);
        
        if (existingIndex !== -1) {
            // Update existing section
            docs[existingIndex].title = title;
            docs[existingIndex].content = content;
        } else {
            // Add new section
            docs.push({
                id: currentSection,
                title,
                content
            });
        }
        
        // Save updated docs
        localStorage.setItem('bubblesBoxDocs', JSON.stringify(docs));
        
        // Update UI
        updateNavigation(docs);
        renderDocSections(docs);
        setupNavigation();
        
        // Close modal
        editModal.style.display = 'none';
        
        // Scroll to the edited/added section
        const targetElement = document.getElementById(currentSection);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Highlight the section briefly
            targetElement.style.backgroundColor = 'rgba(67, 97, 238, 0.1)';
            setTimeout(() => {
                targetElement.style.backgroundColor = 'transparent';
                targetElement.style.transition = 'background-color 0.5s ease';
            }, 100);
        }
    }
    
    // Event Listeners
    if (toggleEditModeBtn) {
        // Check if user is authenticated first
        if (isAuthenticated()) {
            toggleEditModeBtn.addEventListener('click', toggleEditMode);
        } else {
            toggleEditModeBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Admin Login';
            toggleEditModeBtn.addEventListener('click', function() {
                window.location.href = 'admin-login.html';
            });
        }
    }
    
    if (addSectionBtn) {
        addSectionBtn.addEventListener('click', addNewSection);
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            editModal.style.display = 'none';
        });
    }
    
    if (cancelEdit) {
        cancelEdit.addEventListener('click', () => {
            editModal.style.display = 'none';
        });
    }
    
    if (editForm) {
        editForm.addEventListener('submit', saveSection);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === editModal) {
            editModal.style.display = 'none';
        }
    });
    
    // Initialize documentation
    initDocumentation();
    
    // Set first nav item as active by default
    const firstNavItem = document.querySelector('#doc-nav a');
    if (firstNavItem) {
        firstNavItem.classList.add('active');
    }
    
    // Check for hash in URL and scroll to that section
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            setTimeout(() => {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Set the corresponding nav item as active
                const navItem = document.querySelector(`#doc-nav a[href="${window.location.hash}"]`);
                if (navItem) {
                    document.querySelectorAll('#doc-nav a').forEach(a => a.classList.remove('active'));
                    navItem.classList.add('active');
                }
            }, 300);
        }
    }
});