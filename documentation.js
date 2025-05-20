document.addEventListener('DOMContentLoaded', function() {
    console.log('Documentation script loaded');
    
    // Check if we're on the documentation page
    const docMain = document.querySelector('.doc-main');
    if (!docMain) return;
    
    console.log('Documentation page detected');
    
    // Default documentation sections
    const defaultDocSections = [
        {
            id: 'server-info',
            title: 'Server Information',
            content: `
                <h3>About Bubbles Box</h3>
                <p>Bubbles Box is a premium Minecraft Box PvP server offering a unique and competitive gameplay experience. Our server features custom maps, balanced kits, and regular events to keep the gameplay fresh and exciting.</p>
                
                <h3>Server Specifications</h3>
                <p>Our server runs on high-performance hardware to ensure a lag-free experience:</p>
                <ul>
                    <li>Intel Xeon E5-2690 v4 (14 cores, 28 threads)</li>
                    <li>64GB DDR4 RAM</li>
                    <li>NVMe SSD Storage</li>
                    <li>DDoS Protection</li>
                    <li>99.9% Uptime Guarantee</li>
                </ul>
                
                <h3>Server Address</h3>
                <p>You can connect to our server using the following address: <code>play.bubblesbox.net</code></p>
            `
        },
        {
            id: 'gameplay',
            title: 'Gameplay Guide',
            content: `
                <h3>Box PvP Basics</h3>
                <p>Box PvP is a fast-paced combat style in Minecraft where players fight in enclosed arenas with custom kits. Here's how to get started:</p>
                <ol>
                    <li>Join the server at <code>play.bubblesbox.net</code></li>
                    <li>Use the <code>/kit</code> command to select your preferred kit</li>
                    <li>Join a match using the NPC in the spawn area or with <code>/play</code></li>
                    <li>Fight to be the last player standing!</li>
                </ol>
                
                <h3>Available Kits</h3>
                <p>Bubbles Box offers a variety of balanced kits to suit different playstyles:</p>
                <ul>
                    <li><strong>Warrior</strong> - Balanced kit with sword and bow</li>
                    <li><strong>Archer</strong> - Ranged specialist with powerful bow</li>
                    <li><strong>Tank</strong> - High defense but slower movement</li>
                    <li><strong>Assassin</strong> - Fast movement with damage-over-time effects</li>
                    <li><strong>Mage</strong> - Special abilities and potion effects</li>
                </ul>
                
                <h3>Game Modes</h3>
                <p>We offer several game modes to keep things interesting:</p>
                <ul>
                    <li><strong>Solo</strong> - Every player for themselves</li>
                    <li><strong>Duos</strong> - Team up with one friend</li>
                    <li><strong>Squads</strong> - Teams of four compete for victory</li>
                    <li><strong>Capture the Flag</strong> - Team-based objective mode</li>
                    <li><strong>King of the Hill</strong> - Control the center to earn points</li>
                </ul>
            `
        },
        {
            id: 'ranks',
            title: 'Ranks & Perks',
            content: `
                <h3>Rank System</h3>
                <p>Bubbles Box features both earnable and purchasable ranks, each with its own set of perks and benefits.</p>
                
                <div class="rank-table">
                    <table>
                        <tr>
                            <th>Rank</th>
                            <th>Type</th>
                            <th>Cost/Requirement</th>
                            <th>Key Perks</th>
                        </tr>
                        <tr>
                            <td>Player</td>
                            <td>Default</td>
                            <td>Free</td>
                            <td>Basic access to all game modes</td>
                        </tr>
                        <tr>
                            <td>Veteran</td>
                            <td>Earnable</td>
                            <td>50 hours playtime</td>
                            <td>Custom nickname, 5 kit presets</td>
                        </tr>
                        <tr>
                            <td>Champion</td>
                            <td>Earnable</td>
                            <td>250 wins</td>
                            <td>Special title, custom kill messages</td>
                        </tr>
                        <tr>
                            <td>VIP</td>
                            <td>Purchasable</td>
                            <td>$9.99</td>
                            <td>Priority queue, 10% XP boost</td>
                        </tr>
                        <tr>
                            <td>MVP</td>
                            <td>Purchasable</td>
                            <td>$19.99</td>
                            <td>All VIP perks, custom armor colors</td>
                        </tr>
                        <tr>
                            <td>MVP+</td>
                            <td>Purchasable</td>
                            <td>$29.99</td>
                            <td>All MVP perks, private matches, 25% XP boost</td>
                        </tr>
                    </table>
                </div>
                
                <h3>Seasonal Rewards</h3>
                <p>Each season (lasting 3 months), players can earn exclusive rewards based on their performance:</p>
                <ul>
                    <li><strong>Bronze Tier</strong> - Custom title for the season</li>
                    <li><strong>Silver Tier</strong> - Bronze rewards + exclusive kit</li>
                    <li><strong>Gold Tier</strong> - Silver rewards + special effects</li>
                    <li><strong>Diamond Tier</strong> - Gold rewards + unique cosmetics</li>
                    <li><strong>Champion Tier</strong> - All rewards + permanent recognition on the server</li>
                </ul>
            `
        },
        {
            id: 'rules',
            title: 'Server Rules',
            content: `
                <h3>General Rules</h3>
                <p>To ensure a positive experience for all players, please follow these rules:</p>
                <ol>
                    <li>Be respectful to all players and staff</li>
                    <li>No harassment, hate speech, or excessive profanity</li>
                    <li>No spamming or flooding chat</li>
                    <li>No advertising other servers or services</li>
                    <li>No exploiting bugs or glitches</li>
                    <li>No hacking, cheating, or using unauthorized mods</li>
                    <li>No ban evasion</li>
                    <li>Follow staff instructions</li>
                </ol>
                
                <h3>Chat Rules</h3>
                <p>Our chat is moderated to maintain a friendly environment:</p>
                <ul>
                    <li>Keep chat family-friendly</li>
                    <li>No excessive caps</li>
                    <li>No sharing personal information</li>
                    <li>English only in main chat (other languages allowed in team chat)</li>
                    <li>Use appropriate channels for different topics</li>
                </ul>
                
                <h3>Punishment System</h3>
                <p>Violations of the rules may result in the following consequences:</p>
                <ul>
                    <li><strong>Warning</strong> - For minor first-time offenses</li>
                    <li><strong>Mute</strong> - For chat violations (duration varies)</li>
                    <li><strong>Temporary Ban</strong> - For gameplay violations or repeated offenses</li>
                    <li><strong>Permanent Ban</strong> - For severe violations or hacking</li>
                </ul>
                <p>Appeals can be submitted on our Discord server.</p>
            `
        },
        {
            id: 'faq',
            title: 'Frequently Asked Questions',
            content: `
                <div class="faq-item">
                    <h4>How do I join the server?</h4>
                    <p>To join Bubbles Box, open Minecraft Java Edition, go to Multiplayer, click "Add Server", and enter <code>play.bubblesbox.net</code> as the server address.</p>
                </div>
                
                <div class="faq-item">
                    <h4>What Minecraft versions are supported?</h4>
                    <p>Bubbles Box supports Minecraft Java Edition versions 1.8.9 to 1.20.1. For the best experience, we recommend using version 1.16.5 or newer.</p>
                </div>
                
                <div class="faq-item">
                    <h4>How do I report a player?</h4>
                    <p>You can report a player using the <code>/report [player] [reason]</code> command in-game, or by contacting a staff member on our Discord server.</p>
                </div>
                
                <div class="faq-item">
                    <h4>How do I claim seasonal rewards?</h4>
                    <p>Seasonal rewards are automatically added to your account at the end of each season. You can view and activate them using the <code>/rewards</code> command.</p>
                </div>
                
                <div class="faq-item">
                    <h4>Is there a way to practice without affecting my stats?</h4>
                    <p>Yes! You can use the <code>/practice</code> command to enter our practice arenas, where you can train without affecting your competitive statistics.</p>
                </div>
                
                <div class="faq-item">
                    <h4>How do I join a clan?</h4>
                    <p>You can create a clan with <code>/clan create [name]</code> or join an existing clan by receiving and accepting an invitation with <code>/clan accept [clan]</code>.</p>
                </div>
            `
        }
    ];
    
    // Check if user is admin
    function isAdmin() {
        const adminStatus = localStorage.getItem('adminLoggedIn');
        console.log('Admin status:', adminStatus);
        return adminStatus === 'true';
    }
    
    // Global documentation storage key
    const GLOBAL_DOC_KEY = 'bubbles_box_global_documentation';
    
    // Load documentation from global storage
    function loadDocumentation() {
        const savedDocs = localStorage.getItem(GLOBAL_DOC_KEY);
        return savedDocs ? JSON.parse(savedDocs) : defaultDocSections;
    }
    
    // Save documentation to global storage
    function saveDocumentation(sections) {
        localStorage.setItem(GLOBAL_DOC_KEY, JSON.stringify(sections));
    }
    
    // Initialize documentation if it doesn't exist
    if (!localStorage.getItem(GLOBAL_DOC_KEY)) {
        console.log('Initializing default documentation');
        saveDocumentation(defaultDocSections);
    }
    
    // Load documentation sections
    const docSections = loadDocumentation();
    console.log('Loaded documentation sections:', docSections.length);
    
    // Generate sidebar navigation
    const docNav = document.querySelector('.doc-nav');
    if (docNav) {
        docNav.innerHTML = '';
        docSections.forEach(section => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="#${section.id}" data-section="${section.id}">${section.title}</a>`;
            docNav.appendChild(li);
        });
    }
    
    // Generate documentation content
    if (docMain) {
        docMain.innerHTML = '';
        docSections.forEach(section => {
            const sectionElement = document.createElement('div');
            sectionElement.id = section.id;
            sectionElement.className = 'doc-section';
            
            // Only show edit controls for admin
            const isAdminUser = isAdmin();
            console.log('Is admin for section controls:', isAdminUser);
            
            const editControls = isAdminUser ? `
                <div class="edit-controls">
                    <button class="edit-btn" data-section="${section.id}"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" data-section="${section.id}"><i class="fas fa-trash"></i></button>
                </div>
            ` : '';
            
            sectionElement.innerHTML = `
                <div class="section-header">
                    <h2>${section.title}</h2>
                    ${editControls}
                </div>
                <div class="section-content">${section.content}</div>
            `;
            
            docMain.appendChild(sectionElement);
        });
    }
    
    // Show/hide admin controls based on login status
    const adminControls = document.querySelector('.admin-controls');
    if (adminControls) {
        const isAdminUser = isAdmin();
        console.log('Is admin for admin controls:', isAdminUser);
        
        if (isAdminUser) {
            adminControls.style.display = 'block';
            
            // Add admin bar if not already present
            if (!document.querySelector('.admin-bar')) {
                const adminBar = document.createElement('div');
                adminBar.className = 'admin-bar';
                adminBar.innerHTML = `
                    <div class="container">
                        <div class="admin-bar-content">
                            <div class="admin-bar-user">
                                <i class="fas fa-user-shield"></i> Logged in as Admin
                            </div>
                            <div class="admin-bar-actions">
                                <button id="logout-btn" class="btn btn-outline">Logout</button>
                            </div>
                        </div>
                    </div>
                `;
                
                document.body.insertBefore(adminBar, document.body.firstChild);
                
                // Add logout functionality
                document.getElementById('logout-btn').addEventListener('click', function() {
                    localStorage.removeItem('adminLoggedIn');
                    window.location.reload();
                });
            }
        } else {
            adminControls.style.display = 'none';
            
            // Remove admin bar if present
            const adminBar = document.querySelector('.admin-bar');
            if (adminBar) {
                adminBar.remove();
            }
        }
    }
    
    // Add section button (admin only)
    const addSectionBtn = document.getElementById('add-section-btn');
    if (addSectionBtn && isAdmin()) {
        addSectionBtn.addEventListener('click', function() {
            const modal = document.getElementById('doc-modal');
            const modalTitle = document.getElementById('modal-title');
            const sectionForm = document.getElementById('section-form');
            
            modalTitle.textContent = 'Add New Section';
            sectionForm.dataset.action = 'add';
            sectionForm.dataset.sectionId = '';
            
            document.getElementById('section-title').value = '';
            document.getElementById('section-content').value = '';
            
            modal.style.display = 'block';
        });
    }
    
    // Edit section buttons (admin only)
    document.querySelectorAll('.edit-btn').forEach(btn => {
        if (isAdmin()) {
            btn.addEventListener('click', function() {
                const sectionId = this.dataset.section;
                const section = docSections.find(s => s.id === sectionId);
                
                if (section) {
                    const modal = document.getElementById('doc-modal');
                    const modalTitle = document.getElementById('modal-title');
                    const sectionForm = document.getElementById('section-form');
                    
                    modalTitle.textContent = 'Edit Section';
                    sectionForm.dataset.action = 'edit';
                    sectionForm.dataset.sectionId = sectionId;
                    
                    document.getElementById('section-title').value = section.title;
                    document.getElementById('section-content').value = section.content;
                    
                    modal.style.display = 'block';
                }
            });
        }
    });
    
    // Delete section buttons (admin only)
    document.querySelectorAll('.delete-btn').forEach(btn => {
        if (isAdmin()) {
            btn.addEventListener('click', function() {
                const sectionId = this.dataset.section;
                
                if (confirm('Are you sure you want to delete this section? This action cannot be undone.')) {
                    const updatedSections = docSections.filter(s => s.id !== sectionId);
                    saveDocumentation(updatedSections);
                    window.location.reload();
                }
            });
        }
    });
    
    // Section form submission
    const sectionForm = document.getElementById('section-form');
    if (sectionForm && isAdmin()) {
        sectionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const action = this.dataset.action;
            const sectionId = this.dataset.sectionId;
            const title = document.getElementById('section-title').value.trim();
            const content = document.getElementById('section-content').value.trim();
            
            if (!title || !content) {
                alert('Please fill in all fields.');
                return;
            }
            
            if (action === 'add') {
                // Generate a unique ID based on the title
                const newId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                
                // Check if ID already exists
                if (docSections.some(s => s.id === newId)) {
                    alert('A section with a similar title already exists. Please use a different title.');
                    return;
                }
                
                // Add new section
                docSections.push({
                    id: newId,
                    title: title,
                    content: content
                });
            } else if (action === 'edit') {
                // Find and update existing section
                const sectionIndex = docSections.findIndex(s => s.id === sectionId);
                if (sectionIndex !== -1) {
                    docSections[sectionIndex].title = title;
                    docSections[sectionIndex].content = content;
                }
            }
            
            // Save updated documentation
            saveDocumentation(docSections);
            
            // Close modal and reload page
            document.getElementById('doc-modal').style.display = 'none';
            window.location.reload();
        });
    }
    
    // Close modal button
    const closeModal = document.querySelector('.close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            document.getElementById('doc-modal').style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('doc-modal');
        if (modal && e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Highlight active section in sidebar
    function highlightActiveSection() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('.doc-section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const sectionId = section.id;
                
                document.querySelectorAll('.doc-nav a').forEach(link => {
                    link.classList.remove('active');
                    
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Run on scroll
    window.addEventListener('scroll', highlightActiveSection);
    
    // Run once on page load
    highlightActiveSection();
});