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
        if (savedDocs) {
            try {
                const parsedData = JSON.parse(savedDocs);
                // Check if it's the new format with sections and lastUpdated
                if (parsedData.sections) {
                    return parsedData;
                } else {
                    // Old format, convert to new format
                    return {
                        sections: parsedData,
                        lastUpdated: new Date().toISOString()
                    };
                }
            } catch (e) {
                console.error('Error parsing stored documentation:', e);
                return {
                    sections: defaultDocSections,
                    lastUpdated: new Date().toISOString()
                };
            }
        } else {
            return {
                sections: defaultDocSections,
                lastUpdated: new Date().toISOString()
            };
        }
    }
    
    // Save documentation to global storage
    function saveDocumentation(sections) {
        // Add a timestamp to track when the documentation was last updated
        const docData = {
            sections: sections,
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem(GLOBAL_DOC_KEY, JSON.stringify(docData));
    }
    
    // Initialize documentation if it doesn't exist
    if (!localStorage.getItem(GLOBAL_DOC_KEY)) {
        console.log('Initializing default documentation');
        saveDocumentation(defaultDocSections);
    }
    
    // Load documentation sections
    const docData = loadDocumentation();
    const docSections = docData.sections;
    const lastUpdated = docData.lastUpdated;
    
    console.log('Loaded documentation sections:', docSections.length);
    console.log('Last updated:', new Date(lastUpdated).toLocaleString());
    
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
        
        if (isAdminUser) {
            // Update admin controls to include deploy to Vercel option
            adminControls.innerHTML = `
                <button id="add-section-btn" class="btn btn-primary btn-block">
                    <i class="fas fa-plus"></i> Add Section
                </button>
                <button id="deploy-to-vercel-btn" class="btn btn-secondary btn-block">
                    <i class="fas fa-rocket"></i> Deploy to Vercel
                </button>
                <div id="github-settings" style="display: none; margin-top: 1rem;">
                    <div class="form-group">
                        <label for="github-token">GitHub Token</label>
                        <input type="password" id="github-token" placeholder="Personal Access Token" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="github-repo">Repository</label>
                        <input type="text" id="github-repo" placeholder="username/repo" class="form-control">
                    </div>
                    <button id="save-github-settings" class="btn btn-primary btn-block">Save Settings</button>
                </div>
                <a href="admin-login.html" class="btn btn-outline btn-block" style="margin-top: 1rem;">
                    <i class="fas fa-user-shield"></i> Admin Login
                </a>
            `;
            
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
                            <div class="admin-bar-info">
                                Last updated: <span id="last-updated-time">${new Date(lastUpdated).toLocaleString()}</span>
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
            
            // Load GitHub settings if they exist
            const githubToken = localStorage.getItem('github_token');
            const githubRepo = localStorage.getItem('github_repo');
            
            if (githubToken && githubRepo) {
                document.getElementById('github-token').value = githubToken;
                document.getElementById('github-repo').value = githubRepo;
            }
            
            // Add deploy to Vercel functionality
            document.getElementById('deploy-to-vercel-btn').addEventListener('click', function() {
                const githubToken = localStorage.getItem('github_token');
                const githubRepo = localStorage.getItem('github_repo');
                
                if (!githubToken || !githubRepo) {
                    // Show GitHub settings form
                    document.getElementById('github-settings').style.display = 'block';
                    alert('Please enter your GitHub token and repository information to deploy to Vercel.');
                } else {
                    // Deploy to Vercel
                    deployToVercel(githubToken, githubRepo);
                }
            });
            
            // Save GitHub settings
            document.getElementById('save-github-settings').addEventListener('click', function() {
                const token = document.getElementById('github-token').value.trim();
                const repo = document.getElementById('github-repo').value.trim();
                
                if (!token || !repo) {
                    alert('Please enter both GitHub token and repository.');
                    return;
                }
                
                localStorage.setItem('github_token', token);
                localStorage.setItem('github_repo', repo);
                
                document.getElementById('github-settings').style.display = 'none';
                alert('GitHub settings saved! You can now deploy to Vercel.');
            });
        } else {
            adminControls.style.display = 'none';
            
            // Remove admin bar if present
            const adminBar = document.querySelector('.admin-bar');
            if (adminBar) {
                adminBar.remove();
            }
        }
    }
    
    // Function to deploy to Vercel by updating GitHub repository
    // Update the deployToVercel function to include better error handling and validation

async function deployToVercel(token, repo, generateHTMLContent) {
    try {
        // Show loading message
        const loadingMessage = document.createElement('div');
        loadingMessage.className = 'deploy-message';
        loadingMessage.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deploying to Vercel...';
        document.querySelector('.admin-controls').appendChild(loadingMessage);
        
        // Validate repository format
        if (!repo.includes('/')) {
            throw new Error('Repository must be in the format "username/repo"');
        }
        
        // Generate HTML content
        const htmlContent = generateHTMLContent();
        
        // First, verify the repository exists and the token has access
        const [owner, repoName] = repo.split('/');
        
        // Check if the repository exists and token has access
        const repoCheckResponse = await fetch(`https://api.github.com/repos/${repo}`, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (!repoCheckResponse.ok) {
            if (repoCheckResponse.status === 404) {
                throw new Error(`Repository "${repo}" not found. Please check the repository name and ensure it exists.`);
            } else if (repoCheckResponse.status === 401) {
                throw new Error('Invalid GitHub token. Please check your token and ensure it has the "repo" scope.');
            } else {
                throw new Error(`GitHub API returned ${repoCheckResponse.status}: ${await repoCheckResponse.text()}`);
            }
        }
        
        const repoData = await repoCheckResponse.json();
        console.log('Repository found:', repoData.full_name);
        
        // Get the default branch
        const defaultBranch = repoData.default_branch || 'main';
        console.log('Default branch:', defaultBranch);
        
        const filePath = 'documentation.html';
        
        // First, try to get the file to see if it exists and get its SHA
        let fileSha = '';
        try {
            const fileResponse = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}?ref=${defaultBranch}`, {
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            
            if (fileResponse.ok) {
                const fileData = await fileResponse.json();
                fileSha = fileData.sha;
                console.log('File exists, got SHA:', fileSha);
            } else if (fileResponse.status === 404) {
                console.log('File does not exist yet, will create it');
            } else {
                console.warn('Unexpected response when checking file:', fileResponse.status);
            }
        } catch (error) {
            console.error('Error checking if file exists:', error);
        }
        
        // Prepare the request to update or create the file
        console.log('Preparing to update file...');
        const updateResponse = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Update documentation.html via admin panel',
                content: btoa(unescape(encodeURIComponent(htmlContent))), // Base64 encode the content
                branch: defaultBranch,
                sha: fileSha || undefined // Include SHA if updating, omit if creating
            })
        });
        
        if (updateResponse.ok) {
            const updateData = await updateResponse.json();
            console.log('File updated successfully:', updateData);
            
            // Remove loading message
            loadingMessage.remove();
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'deploy-message success';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Documentation deployed successfully! Vercel will automatically update your site.';
            document.querySelector('.admin-controls').appendChild(successMessage);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        } else {
            const errorText = await updateResponse.text();
            console.error('Error response:', errorText);
            throw new Error(`GitHub API returned ${updateResponse.status}: ${errorText}`);
        }
    } catch (error) {
        console.error('Error deploying to Vercel:', error);
        
        // Remove loading message if it exists
        const loadingMessage = document.querySelector('.deploy-message');
        if (loadingMessage) {
            loadingMessage.remove();
        }
        
        // Show error message with more helpful information
        const errorMessage = document.createElement('div');
        errorMessage.className = 'deploy-message error';
        
        let errorText = error.message;
        
        // Add troubleshooting tips based on the error
        if (error.message.includes('404')) {
            errorText += `
                <div class="troubleshooting-tips">
                    <p><strong>Troubleshooting tips:</strong></p>
                    <ul>
                        <li>Check that the repository name is correct (format: username/repo)</li>
                        <li>Ensure the repository exists and is not private, or your token has access to it</li>
                        <li>Verify your GitHub token has the "repo" scope</li>
                    </ul>
                </div>
            `;
        } else if (error.message.includes('401')) {
            errorText += `
                <div class="troubleshooting-tips">
                    <p><strong>Troubleshooting tips:</strong></p>
                    <ul>
                        <li>Your GitHub token may be invalid or expired</li>
                        <li>Create a new token with the "repo" scope</li>
                    </ul>
                </div>
            `;
        }
        
        errorMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${errorText}`;
        document.querySelector('.admin-controls').appendChild(errorMessage);
        
        // Add a "Try Again" button
        const tryAgainButton = document.createElement('button');
        tryAgainButton.className = 'btn btn-outline btn-block';
        tryAgainButton.innerHTML = '<i class="fas fa-redo"></i> Update GitHub Settings';
        tryAgainButton.style.marginTop = '1rem';
        tryAgainButton.addEventListener('click', function() {
            // Remove error message
            errorMessage.remove();
            tryAgainButton.remove();
            
            // Show GitHub settings form
            document.getElementById('github-settings').style.display = 'block';
        });
        
        document.querySelector('.admin-controls').appendChild(tryAgainButton);
    }
}
    
    // Function to generate HTML content
    function generateHTMLContent() {
        let htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documentation - Bubbles Box Minecraft Server</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <nav class="navbar">
            <div class="container">
                <a href="index.html" class="logo">Bubbles Box</a>
                <ul class="nav-menu">
                    <li><a href="index.html" class="nav-link">Home</a></li>
                    <li><a href="index.html#features" class="nav-link">Features</a></li>
                    <li><a href="index.html#gallery" class="nav-link">Gallery</a></li>
                    <li><a href="index.html#join" class="nav-link">Join Us</a></li>
                    <li><a href="documentation.html" class="nav-link active">Documentation</a></li>
                </ul>
                <div class="nav-actions">
                    <button id="theme-toggle" class="theme-toggle">
                        <i class="fas fa-moon"></i>
                    </button>
                    <div class="hamburger">
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </div>
                </div>
            </div>
        </nav>
    </header>

    <section class="documentation-hero">
        <div class="container">
            <h1>Server Documentation</h1>
            <p>Everything you need to know about Bubbles Box Minecraft Server</p>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <div class="doc-layout">
                <div class="doc-sidebar">
                    <div class="sidebar-header">
                        <h3>Contents</h3>
                    </div>
                    <ul class="doc-nav">
`;

        // Add navigation links
        docSections.forEach(section => {
            htmlContent += `                        <li><a href="#${section.id}" data-section="${section.id}">${section.title}</a></li>\n`;
        });

        htmlContent += `                    </ul>
                    <div class="admin-controls" style="display: none;">
                        <button id="add-section-btn" class="btn btn-primary btn-block">
                            <i class="fas fa-plus"></i> Add Section
                        </button>
                        <button id="deploy-to-vercel-btn" class="btn btn-secondary btn-block">
                            <i class="fas fa-rocket"></i> Deploy to Vercel
                        </button>
                        <a href="admin-login.html" class="btn btn-outline btn-block" style="margin-top: 1rem;">
                            <i class="fas fa-user-shield"></i> Admin Login
                        </a>
                    </div>
                </div>
                <div class="doc-main">
`;

        // Add documentation sections
        docSections.forEach(section => {
            htmlContent += `                    <div id="${section.id}" class="doc-section">
                        <div class="section-header">
                            <h2>${section.title}</h2>
                        </div>
                        <div class="section-content">${section.content}</div>
                    </div>\n`;
        });

        htmlContent += `                </div>
            </div>
        </div>
    </section>

    <!-- Modal for adding/editing sections -->
    <div id="doc-modal" class="modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2 id="modal-title">Add New Section</h2>
            <form id="section-form" data-action="add" data-section-id="">
                <div class="form-group">
                    <label for="section-title">Section Title</label>
                    <input type="text" id="section-title" required>
                </div>
                <div class="form-group">
                    <label for="section-content">Content (HTML)</label>
                    <textarea id="section-content" rows="15" required></textarea>
                </div>
                <div class="form-buttons">
                    <button type="button" class="btn btn-outline close-modal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    </div>

    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-logo">
                    <h2>Bubbles Box</h2>
                    <p>The ultimate Minecraft Box PvP experience.</p>
                    <div class="social-icons">
                        <a href="#"><i class="fab fa-discord"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-youtube"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div class="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="index.html#features">Features</a></li>
                        <li><a href="index.html#gallery">Gallery</a></li>
                        <li><a href="index.html#join">Join Us</a></li>
                        <li><a href="documentation.html">Documentation</a></li>
                    </ul>
                </div>
                <div class="footer-contact">
                    <h3>Contact Us</h3>
                    <p><i class="fas fa-envelope"></i> support@bubblesbox.net</p>
                    <p><i class="fab fa-discord"></i> Join our Discord</p>
                    <p>
                        <i class="fas fa-server"></i> 
                        <span id="server-address-footer">play.bubblesbox.net</span>
                        <button id="copy-ip-footer" class="btn btn-outline btn-sm">
                            <i class="fas fa-copy"></i> Copy
                        </button>
                    </p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2023 Bubbles Box. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
    <script src="documentation.js"></script>
</body>
</html>`;

        return htmlContent;
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