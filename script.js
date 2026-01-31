// DOM Elements
let currentTheme = 'dark';
let linksData = [
    { id: 1, icon: 'fab fa-instagram', url: 'https://instagram.com/rizaa', text: 'Instagram' },
    { id: 2, icon: 'fab fa-youtube', url: 'https://youtube.com/c/rizaa', text: 'YouTube' },
    { id: 3, icon: 'fab fa-tiktok', url: 'https://tiktok.com/@rizaa', text: 'TikTok' },
    { id: 4, icon: 'fab fa-github', url: 'https://github.com/rizaa', text: 'GitHub' },
    { id: 5, icon: 'fas fa-envelope', url: 'mailto:rizaa@example.com', text: 'Email' }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    renderLinks();
    updatePreview();
    updateExportCode();
});

// Initialize App
function initializeApp() {
    // Tab Navigation
    document.querySelectorAll('.nav-link').forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab
            document.querySelectorAll('.nav-link').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Avatar Upload
    document.getElementById('avatarUpload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const avatarPreview = document.getElementById('avatarPreview');
                avatarPreview.innerHTML = `<img src="${event.target.result}" alt="Avatar">`;
                updatePreview();
                updateExportCode();
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Real-time Updates
    document.getElementById('nameInput').addEventListener('input', updatePreview);
    document.getElementById('taglineInput').addEventListener('input', updatePreview);
    document.getElementById('bioInput').addEventListener('input', updatePreview);
    document.getElementById('footerInput').addEventListener('input', updatePreview);
    
    // Color Pickers
    document.getElementById('primaryColor').addEventListener('input', updateColors);
    document.getElementById('backgroundColor').addEventListener('input', updateColors);
    document.getElementById('textColor').addEventListener('input', updateColors);
    
    // VIP Mode
    document.getElementById('vipMode').addEventListener('click', toggleVIPMode);
}

// Render Links
function renderLinks() {
    const linksContainer = document.getElementById('linksContainer');
    linksContainer.innerHTML = '';
    
    linksData.forEach(link => {
        const linkElement = document.createElement('div');
        linkElement.className = 'link-item';
        linkElement.innerHTML = `
            <select class="link-icon-select" onchange="updateLinkIcon(${link.id}, this.value)">
                <option value="fab fa-instagram" ${link.icon === 'fab fa-instagram' ? 'selected' : ''}>Instagram</option>
                <option value="fab fa-youtube" ${link.icon === 'fab fa-youtube' ? 'selected' : ''}>YouTube</option>
                <option value="fab fa-tiktok" ${link.icon === 'fab fa-tiktok' ? 'selected' : ''}>TikTok</option>
                <option value="fab fa-twitter" ${link.icon === 'fab fa-twitter' ? 'selected' : ''}>Twitter</option>
                <option value="fab fa-facebook" ${link.icon === 'fab fa-facebook' ? 'selected' : ''}>Facebook</option>
                <option value="fab fa-github" ${link.icon === 'fab fa-github' ? 'selected' : ''}>GitHub</option>
                <option value="fab fa-linkedin" ${link.icon === 'fab fa-linkedin' ? 'selected' : ''}>LinkedIn</option>
                <option value="fab fa-whatsapp" ${link.icon === 'fab fa-whatsapp' ? 'selected' : ''}>WhatsApp</option>
                <option value="fas fa-globe" ${link.icon === 'fas fa-globe' ? 'selected' : ''}>Website</option>
                <option value="fas fa-envelope" ${link.icon === 'fas fa-envelope' ? 'selected' : ''}>Email</option>
                <option value="fas fa-shopping-bag" ${link.icon === 'fas fa-shopping-bag' ? 'selected' : ''}>Store</option>
                <option value="fas fa-music" ${link.icon === 'fas fa-music' ? 'selected' : ''}>Music</option>
                <option value="fas fa-podcast" ${link.icon === 'fas fa-podcast' ? 'selected' : ''}>Podcast</option>
            </select>
            <input type="text" class="link-url-input" value="${link.url}" 
                   placeholder="https://example.com" 
                   oninput="updateLinkUrl(${link.id}, this.value)">
            <input type="text" class="link-text-input" value="${link.text}" 
                   placeholder="Link text" 
                   oninput="updateLinkText(${link.id}, this.value)"
                   style="flex: 1; padding: 10px; background: var(--background); border: 1px solid var(--border); border-radius: 8px; color: var(--text);">
            <div class="link-actions">
                <button class="btn-icon" onclick="moveLinkUp(${link.id})">
                    <i class="fas fa-arrow-up"></i>
                </button>
                <button class="btn-icon" onclick="moveLinkDown(${link.id})">
                    <i class="fas fa-arrow-down"></i>
                </button>
                <button class="btn-icon" onclick="removeLink(${link.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        linksContainer.appendChild(linkElement);
    });
}

// Link Management
function addNewLink() {
    const newId = linksData.length > 0 ? Math.max(...linksData.map(l => l.id)) + 1 : 1;
    linksData.push({
        id: newId,
        icon: 'fas fa-link',
        url: 'https://example.com',
        text: 'New Link'
    });
    renderLinks();
    updatePreview();
    updateExportCode();
}

function updateLinkIcon(id, icon) {
    const link = linksData.find(l => l.id === id);
    if (link) {
        link.icon = icon;
        updatePreview();
        updateExportCode();
    }
}

function updateLinkUrl(id, url) {
    const link = linksData.find(l => l.id === id);
    if (link) {
        link.url = url;
        updatePreview();
        updateExportCode();
    }
}

function updateLinkText(id, text) {
    const link = linksData.find(l => l.id === id);
    if (link) {
        link.text = text;
        updatePreview();
        updateExportCode();
    }
}

function removeLink(id) {
    linksData = linksData.filter(link => link.id !== id);
    renderLinks();
    updatePreview();
    updateExportCode();
}

function moveLinkUp(id) {
    const index = linksData.findIndex(link => link.id === id);
    if (index > 0) {
        [linksData[index], linksData[index - 1]] = [linksData[index - 1], linksData[index]];
        renderLinks();
        updatePreview();
        updateExportCode();
    }
}

function moveLinkDown(id) {
    const index = linksData.findIndex(link => link.id === id);
    if (index < linksData.length - 1) {
        [linksData[index], linksData[index + 1]] = [linksData[index + 1], linksData[index]];
        renderLinks();
        updatePreview();
        updateExportCode();
    }
}

// Update Preview
function updatePreview() {
    const preview = document.getElementById('linktreePreview');
    const fullPreview = document.getElementById('fullPreview');
    
    // Get current values
    const name = document.getElementById('nameInput').value || 'Han';
    const tagline = document.getElementById('taglineInput').value || 'Digital Creator';
    const bio = document.getElementById('bioInput').value || 'Welcome to my space!';
    const footer = document.getElementById('footerInput').value || 'Made with ❤️';
    const avatarSrc = document.querySelector('#avatarPreview img')?.src || '';
    
    // Generate links HTML
    let linksHTML = '';
    linksData.forEach(link => {
        linksHTML += `
            <a href="${link.url}" class="linktree-link" target="_blank">
                <div class="link-icon">
                    <i class="${link.icon}"></i>
                </div>
                <div class="link-text">${link.text}</div>
                <div class="link-arrow">
                    <i class="fas fa-arrow-right"></i>
                </div>
            </a>
        `;
    });
    
    // Preview HTML
    const previewHTML = `
        <div class="linktree-avatar">
            ${avatarSrc ? `<img src="${avatarSrc}" alt="${name}">` : '<i class="fas fa-user-circle"></i>'}
        </div>
        <h1 class="linktree-name">${name}</h1>
        <p class="linktree-tagline">${tagline}</p>
        <p class="linktree-bio">${bio}</p>
        <div class="linktree-links">
            ${linksHTML}
        </div>
        <div class="linktree-footer">
            ${footer}
        </div>
    `;
    
    preview.innerHTML = previewHTML;
    
    // Full Preview (for preview tab)
    const fullPreviewHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${name} | Linktree</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
            <style>
                ${generateCustomCSS()}
            </style>
        </head>
        <body class="linktree-full">
            ${previewHTML}
            <script>
                // Analytics script can be added here
                console.log("Linktree for ${name} loaded successfully!");
            </script>
        </body>
        </html>
    `;
    
    fullPreview.innerHTML = fullPreviewHTML;
}

// Update Colors
function updateColors() {
    const primaryColor = document.getElementById('primaryColor').value;
    const backgroundColor = document.getElementById('backgroundColor').value;
    const textColor = document.getElementById('textColor').value;
    
    document.documentElement.style.setProperty('--primary', primaryColor);
    document.documentElement.style.setProperty('--background', backgroundColor);
    document.documentElement.style.setProperty('--text', textColor);
    
    updatePreview();
    updateExportCode();
}

// Apply Theme Preset
function applyTheme(themeName) {
    currentTheme = themeName;
    
    const themes = {
        dark: { primary: '#6366f1', background: '#0f172a', text: '#f1f5f9' },
        neon: { primary: '#00ff88', background: '#0f0c29', text: '#ffffff' },
        gradient: { primary: '#667eea', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', text: '#ffffff' },
        light: { primary: '#3b82f6', background: '#ffffff', text: '#1f2937' }
    };
    
    const theme = themes[themeName];
    
    if (themeName === 'gradient') {
        document.documentElement.style.setProperty('--background', '#667eea');
        document.body.style.background = theme.background;
    } else {
        document.documentElement.style.setProperty('--background', theme.background);
        document.body.style.background = theme.background;
    }
    
    document.documentElement.style.setProperty('--primary', theme.primary);
    document.documentElement.style.setProperty('--text', theme.text);
    
    // Update color pickers
    document.getElementById('primaryColor').value = theme.primary;
    document.getElementById('textColor').value = theme.text;
    
    if (themeName !== 'gradient') {
        document.getElementById('backgroundColor').value = theme.background;
    }
    
    updatePreview();
    updateExportCode();
}

// Generate Custom CSS for Export
function generateCustomCSS() {
    const primaryColor = document.getElementById('primaryColor').value;
    const backgroundColor = document.getElementById('backgroundColor').value;
    const textColor = document.getElementById('textColor').value;
    
    return `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body.linktree-full {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: ${backgroundColor};
            color: ${textColor};
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        
        .linktree-full .linktree-preview {
            width: 100%;
            max-width: 500px;
            text-align: center;
            padding: 40px 20px;
        }
        
        .linktree-full .linktree-avatar {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            margin: 0 auto 25px;
            border: 4px solid ${primaryColor};
            overflow: hidden;
            background: linear-gradient(135deg, ${primaryColor}, #a855f7);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3.5rem;
            color: white;
        }
        
        .linktree-full .linktree-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .linktree-full .linktree-name {
            font-size: 2.2rem;
            font-weight: 700;
            margin-bottom: 10px;
        }
        
        .linktree-full .linktree-tagline {
            color: ${primaryColor};
            font-size: 1.1rem;
            margin-bottom: 15px;
            font-weight: 500;
        }
        
        .linktree-full .linktree-bio {
            margin-bottom: 30px;
            line-height: 1.6;
            color: ${textColor}cc;
        }
        
        .linktree-full .linktree-links {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-bottom: 30px;
        }
        
        .linktree-full .linktree-link {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 18px 25px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            text-decoration: none;
            color: ${textColor};
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .linktree-full .linktree-link:hover {
            background: ${primaryColor};
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .linktree-full .link-icon {
            font-size: 1.3rem;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
        }
        
        .linktree-full .link-text {
            flex: 1;
            font-weight: 500;
            text-align: left;
        }
        
        .linktree-full .link-arrow {
            color: ${textColor}aa;
        }
        
        .linktree-full .linktree-footer {
            color: ${textColor}aa;
            font-size: 0.9rem;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        @media (max-width: 480px) {
            .linktree-full .linktree-preview {
                padding: 20px 15px;
            }
            
            .linktree-full .linktree-name {
                font-size: 1.8rem;
            }
            
            .linktree-full .linktree-link {
                padding: 15px 20px;
            }
        }
    `;
}

// Export Functions
function updateExportCode() {
    const codePreview = document.getElementById('codePreview');
    const exportHTML = generateExportHTML();
    codePreview.innerHTML = exportHTML.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    Prism.highlightAll();
}

function generateExportHTML() {
    const name = document.getElementById('nameInput').value || 'Han';
    const tagline = document.getElementById('taglineInput').value || 'Digital Creator';
    const bio = document.getElementById('bioInput').value || 'Welcome to my space!';
    const footer = document.getElementById('footerInput').value || 'Made with ❤️';
    const avatarSrc = document.querySelector('#avatarPreview img')?.src || '';
    
    let linksHTML = '';
    linksData.forEach(link => {
        linksHTML += `
        <a href="${link.url}" class="linktree-link" target="_blank">
            <div class="link-icon">
                <i class="${link.icon}"></i>
            </div>
            <div class="link-text">${link.text}</div>
            <div class="link-arrow">
                <i class="fas fa-arrow-right"></i>
            </div>
        </a>`;
    });
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} | Linktree</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        ${generateCustomCSS()}
    </style>
</head>
<body class="linktree-full">
    <div class="linktree-preview">
        <div class="linktree-avatar">
            ${avatarSrc ? `<img src="${avatarSrc}" alt="${name}">` : '<i class="fas fa-user-circle"></i>'}
        </div>
        <h1 class="linktree-name">${name}</h1>
        <p class="linktree-tagline">${tagline}</p>
        <p class="linktree-bio">${bio}</p>
        <div class="linktree-links">
            ${linksHTML}
        </div>
        <div class="linktree-footer">
            ${footer}
        </div>
    </div>
    
    <!-- Optional Analytics -->
    <script>
        // Page view tracking
        console.log("${name}'s Linktree loaded successfully!");
        
        // Link click tracking
        document.querySelectorAll('.linktree-link').forEach(link => {
            link.addEventListener('click', function() {
                console.log('Link clicked:', this.href);
            });
        });
    </script>
</body>
</html>`;
}

function exportAsHTML() {
    const htmlContent = generateExportHTML();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `linktree-${document.getElementById('nameInput').value || 'profile'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('HTML file downloaded successfully!', 'success');
}

function exportFullWebsite() {
    const htmlContent = generateExportHTML();
    const cssContent = generateCustomCSS();
    const jsContent = `
// Analytics and additional functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Linktree loaded!');
    
    // Smooth hover effects
    const links = document.querySelectorAll('.linktree-link');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Click tracking
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log(\`Link clicked: \${this.href}\`);
        });
    });
});
`;
    
    const zipContent = `
FOLDER STRUCTURE:
linktree-website/
├── index.html
├── style.css
└── script.js

CONTENTS:
=========
index.html:
${htmlContent}

=========
style.css:
${cssContent}

=========
script.js:
${jsContent}
`;
    
    const blob = new Blob([zipContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `linktree-full-website-${document.getElementById('nameInput').value || 'profile'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Website files downloaded! Check the .txt file for instructions.', 'success');
}

function deployOnline() {
    showNotification('VIP Feature: This would deploy to a live URL. Upgrade to VIP!', 'warning');
}

function copyCode() {
    const code = generateExportHTML();
    navigator.clipboard.writeText(code).then(() => {
        showNotification('Code copied to clipboard!', 'success');
    });
}

// Utility Functions
function generateRandomAvatar() {
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#3b82f6'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const avatarPreview = document.getElementById('avatarPreview');
    avatarPreview.style.background = `linear-gradient(135deg, ${randomColor}, ${randomColor}dd)`;
    avatarPreview.innerHTML = '<i class="fas fa-user-astronaut"></i>';
    
    updatePreview();
    updateExportCode();
}

function toggleFullscreen() {
    const preview = document.getElementById('linktreePreview');
    if (!document.fullscreenElement) {
        preview.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

function refreshPreview() {
    updatePreview();
    showNotification('Preview refreshed!', 'info');
}

function toggleVIPMode() {
    document.body.classList.toggle('vip-active');
    const vipBtn = document.getElementById('vipMode');
    const isVIP = document.body.classList.contains('vip-active');
    
    if (isVIP) {
        vipBtn.innerHTML = '<i class="fas fa-crown"></i> VIP ACTIVE';
        vipBtn.style.background = 'linear-gradient(135deg, #f59e0b, #d97706, #b45309)';
        showNotification('VIP Mode Activated! Unlocking premium features...', 'vip');
        
        // Add VIP features
        document.querySelectorAll('.export-card').forEach(card => {
            card.style.border = '2px solid #f59e0b';
        });
    } else {
        vipBtn.innerHTML = '<i class="fas fa-crown"></i> VIP Mode';
        vipBtn.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
        showNotification('VIP Mode Deactivated', 'info');
        
        // Remove VIP features
        document.querySelectorAll('.export-card').forEach(card => {
            card.style.border = '1px solid var(--border)';
        });
    }
}

function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'vip' ? 'crown' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : type === 'vip' ? '#f59e0b' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        min-width: 300px;
        max-width: 400px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS animations for notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 1.2rem;
        opacity: 0.8;
        transition: opacity 0.2s;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    .vip-active .header {
        background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), transparent);
        border-bottom: 2px solid #f59e0b;
    }
    
    .vip-active .logo {
        text-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
    }
`;
document.head.appendChild(style);
