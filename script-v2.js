// script-v2.js - Simplified and Stable Version
// Minimal JavaScript for SyntheraLink

// Global error handler
window.onerror = function(msg, url, line) {
  console.error("ERROR:", msg, "at line:", line);
};

// Utility functions
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function getWebsites() {
    return JSON.parse(localStorage.getItem('websites')) || [];
}

function saveWebsites(websites) {
    localStorage.setItem('websites', JSON.stringify(websites));
}

function getPendingWebsites() {
    return JSON.parse(localStorage.getItem('pendingWebsites')) || [];
}

function savePendingWebsites(pending) {
    localStorage.setItem('pendingWebsites', JSON.stringify(pending));
}

function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser')) || null;
}

function trackClick(id) {
    console.log('trackClick:', id);
}

// Initialize sample data
function initializeData() {
    try {
        console.log("Initializing data...");

        // Initialize users if not exists
        if (getUsers().length === 0) {
            const sampleUsers = [
                { id: 1, email: 'admin@example.com', password: 'admin123', role: 'admin' },
                { id: 2, email: 'user@example.com', password: 'user123', role: 'user' }
            ];
            saveUsers(sampleUsers);
            console.log("Sample users created");
        }

        // Initialize websites if not exists
        if (getWebsites().length === 0) {
            const sampleWebsites = [
                { id: 1, name: 'Google', description: 'Search engine', url: 'https://google.com', category: 'Tools' },
                { id: 2, name: 'GitHub', description: 'Code repository', url: 'https://github.com', category: 'Tech' }
            ];
            saveWebsites(sampleWebsites);
            console.log("Sample websites created");
        }

        console.log("Data initialization complete");
    } catch (err) {
        console.error("Error initializing data:", err);
    }
}

// Safe render websites
function renderWebsites() {
    try {
        const container = document.getElementById('website-list');
        const emptyState = document.getElementById('empty-state');

        // Safety check
        if (!container) {
            console.warn("Website list container not found");
            return;
        }

        let websites = getWebsites();
        if (!Array.isArray(websites)) {
            console.error("Websites data is not an array");
            websites = [];
        }

        console.log("Rendering", websites.length, "websites");

        container.innerHTML = '';

        if (websites.length === 0) {
            if (emptyState) emptyState.style.display = 'block';
            container.style.display = 'none';
            console.log("No websites to display");
            return;
        }

        if (emptyState) emptyState.style.display = 'none';
        container.style.display = 'grid';

        websites.forEach((website, index) => {
            try {
                if (!website || !website.name || !website.url) {
                    console.warn("Invalid website data:", website);
                    return;
                }

                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = '<div class="card-header"><div class="card-icon">' + website.name.charAt(0).toUpperCase() + '</div><span class="card-category">' + (website.category || 'General') + '</span></div><h4>' + website.name + '</h4><p>' + (website.description || '-') + '</p><button class="visit-btn btn btn-primary" data-url="' + website.url + '">Visit</button>';

                container.appendChild(card);
                console.log("Rendered website:", website.name);
            } catch (err) {
                console.error("Error rendering website", index, ":", err);
            }
        });
    } catch (err) {
        console.error("CRITICAL ERROR in renderWebsites:", err);
    }
}

// Setup visit button event delegation
function setupVisitButton() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('visit-btn')) {
            try {
                const url = e.target.dataset.url;
                console.log("Opening URL:", url);

                if (!url || !url.startsWith('http')) {
                    alert("Link tidak valid!");
                    return;
                }

                window.open(url, "_blank");
            } catch (err) {
                console.error("Error opening URL:", err);
            }
        }
    });
}

// Simple login handler
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        setCurrentUser(user);
        showToast('Login berhasil!', 'success');
        setTimeout(() => {
            window.location.href = user.role === 'admin' ? 'admin-v2.html' : 'index-v2.html';
        }, 1000);
    } else {
        showToast('Email atau password salah.', 'error');
    }
}

// Simple register handler
function handleRegister(e) {
    e.preventDefault();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value.trim();
    const users = getUsers();

    if (users.find(u => u.email === email)) {
        showToast('Email sudah terdaftar.', 'error');
        return;
    }

    const newUser = {
        id: users.length + 1,
        email,
        password,
        role: 'user'
    };

    users.push(newUser);
    saveUsers(users);
    setCurrentUser(newUser);
    showToast('Registrasi berhasil!', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Simple submit handler
function handleSubmitForm(e) {
    e.preventDefault();
    const name = document.getElementById('website-name').value.trim();
    const url = document.getElementById('website-url').value.trim();
    const description = document.getElementById('website-description').value.trim();

    if (!name || !url || !description) {
        showToast('Semua field harus diisi.', 'error');
        return;
    }

    const pending = getPendingWebsites();
    pending.push({
        id: Date.now(),
        name,
        url,
        description,
        submittedBy: 'User'
    });
    savePendingWebsites(pending);

    document.getElementById('submit-form').reset();
    showToast('Website berhasil dikirim untuk review!', 'success');
}

// Simple admin functions
function renderPendingSubmissions() {
    try {
        const container = document.getElementById('pending-list');
        const emptyState = document.getElementById('pending-empty');

        if (!container) return;

        const pending = getPendingWebsites();
        container.innerHTML = '';

        if (pending.length === 0) {
            if (emptyState) emptyState.style.display = 'block';
            container.style.display = 'none';
            return;
        }

        if (emptyState) emptyState.style.display = 'none';
        container.style.display = 'grid';

        pending.forEach(sub => {
            const card = document.createElement('div');
            card.className = 'pending-card';
            card.innerHTML = '<h4>' + sub.name + '</h4><p>URL: ' + sub.url + '</p><p>Description: ' + sub.description + '</p><div class="pending-actions"><button class="btn btn-success" onclick="approveWebsite(' + sub.id + ')">Approve</button><button class="btn btn-danger" onclick="rejectWebsite(' + sub.id + ')">Reject</button></div>';
            container.appendChild(card);
        });
    } catch (err) {
        console.error("Error rendering pending:", err);
    }
}

function approveWebsite(id) {
    const pending = getPendingWebsites();
    const websites = getWebsites();
    const submission = pending.find(p => p.id == id);

    if (submission) {
        websites.push({
            id: Date.now(),
            name: submission.name,
            url: submission.url,
            description: submission.description,
            category: 'General'
        });
        saveWebsites(websites);

        const updatedPending = pending.filter(p => p.id != id);
        savePendingWebsites(updatedPending);

        renderPendingSubmissions();
        renderWebsites();
        showToast('Website approved!', 'success');
    }
}

function rejectWebsite(id) {
    const pending = getPendingWebsites();
    const updatedPending = pending.filter(p => p.id != id);
    savePendingWebsites(updatedPending);
    renderPendingSubmissions();
    showToast('Website rejected!', 'success');
}

function renderAdminWebsites() {
    try {
        const container = document.getElementById('website-list-admin');
        if (!container) return;

        const websites = getWebsites();
        container.innerHTML = '';

        websites.forEach(site => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = '<div class="card-header"><div class="card-icon">' + site.name.charAt(0).toUpperCase() + '</div><span class="card-category">' + (site.category || 'General') + '</span></div><h4>' + site.name + '</h4><p>' + site.description + '</p><div class="pending-actions"><a href="' + site.url + '" target="_blank" class="btn btn-primary">Visit</a><button class="btn btn-danger" onclick="deleteWebsite(' + site.id + ')">Delete</button></div>';
            container.appendChild(card);
        });
    } catch (err) {
        console.error("Error rendering admin websites:", err);
    }
}

function deleteWebsite(id) {
    if (confirm('Delete this website?')) {
        const websites = getWebsites();
        const filtered = websites.filter(w => w.id != id);
        saveWebsites(filtered);
        renderAdminWebsites();
        showToast('Website deleted!', 'success');
    }
}

// Simple toast system
function createToastContainer() {
    if (!document.getElementById('toast-container')) {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
}

function showToast(message, type = 'success') {
    createToastContainer();
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast toast--' + type;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast--visible');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('toast--visible');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Theme toggle
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.classList.add('light-mode');
    }
}

function toggleTheme() {
    const isLight = document.documentElement.classList.toggle('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    const toggles = document.querySelectorAll('#themeToggle');
    toggles.forEach(btn => {
        btn.textContent = isLight ? '🌙' : '☀️';
    });
}

// Logout
function logout() {
    localStorage.removeItem('currentUser');
    showToast('Logged out!', 'success');
    setTimeout(() => {
        window.location.href = 'login-v2.html';
    }, 500);
}

// Main app initialization
function initApp() {
    console.log("App Start");
    initializeData();

    // Page-specific initialization
    const searchInput = document.getElementById('search');
    if (searchInput) {
        renderWebsites();
        searchInput.addEventListener('input', (e) => {
            // Simple search - filter by name
            const term = e.target.value.toLowerCase();
            const websites = getWebsites();
            const filtered = websites.filter(w => {
                const name = (w.name || '').toLowerCase();
                const description = (w.description || '').toLowerCase();
                return name.includes(term) || description.includes(term);
            });
            // Re-render with filtered data (simplified)
            renderFilteredWebsites(filtered);
        });
    }

    // Add website button (FIX)
const addBtn = document.getElementById('addWebsiteBtn'); // ❗ hapus yang admin
if (addBtn) {
    addBtn.addEventListener('click', () => {
        const user = getCurrentUser();
        if (!user) {
            window.location.href = 'login-v2.html';
        } else if (user.role === 'admin') {
            window.location.href = 'admin-v2.html';
        } else {
            window.location.href = 'submit-v2.html';
        }
    });
}

    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Register form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Submit form
    const submitForm = document.getElementById('submit-form');
    if (submitForm) {
        submitForm.addEventListener('submit', handleSubmitForm);
    }

    // Admin page
    const adminList = document.getElementById('website-list-admin');
    if (adminList) {
        const user = getCurrentUser();
        if (!user || user.role !== 'admin') {
            window.location.href = 'login-v2.html';
        } else {
            renderAdminWebsites();
            renderPendingSubmissions();
        }
    }

    // Theme toggle
    initTheme();
    const themeToggles = document.querySelectorAll('#themeToggle');
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleTheme);
    });

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    setupVisitButton();
}

// Helper for filtered rendering
function renderFilteredWebsites(filteredWebsites) {
    const container = document.getElementById('website-list');
    const emptyState = document.getElementById('empty-state');

    if (!container) return;

    container.innerHTML = '';

    if (filteredWebsites.length === 0) {
        if (emptyState) emptyState.style.display = 'block';
        container.style.display = 'none';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';
    container.style.display = 'grid';

    filteredWebsites.forEach(website => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = '<div class="card-header"><div class="card-icon">' + website.name.charAt(0).toUpperCase() + '</div><span class="card-category">' + (website.category || 'General') + '</span></div><h4>' + website.name + '</h4><p>' + (website.description || '-') + '</p><button class="visit-btn btn btn-primary" data-url="' + website.url + '">Visit</button>';
        container.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("App Start");
    initApp();

    // === MODAL LOGIC (FIXED) ===
    const modal = document.getElementById('website-modal');
    const openBtn = document.getElementById('add-website-btn');
    const closeBtn = document.querySelector('.close');

    if (openBtn && modal) {
        openBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // 🔥 penting
            console.log("OPEN MODAL 🚀");
            modal.style.display = 'block';
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // === ANIMATIONS & CURSOR (biarkan tetap di sini) ===
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const trailCount = 10;
    const trails = [];

    for (let i = 0; i < trailCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('cursor-trail');
        document.body.appendChild(dot);
        trails.push({ el: dot, x: 0, y: 0 });
    }

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTrail() {
        let x = mouseX;
        let y = mouseY;

        trails.forEach((trail, index) => {
            trail.x += (x - trail.x) * 0.3;
            trail.y += (y - trail.y) * 0.3;

            trail.el.style.left = trail.x + 'px';
            trail.el.style.top = trail.y + 'px';
            trail.el.style.opacity = 1 - index / trailCount;
            trail.el.style.transform = `scale(${1 - index / trailCount})`;

            x = trail.x;
            y = trail.y;
        });

        requestAnimationFrame(animateTrail);
    }

    animateTrail();

    const websiteForm = document.getElementById('website-form');

if (websiteForm) {
    websiteForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('modal-name').value.trim();
        const url = document.getElementById('modal-url').value.trim();
        const description = document.getElementById('modal-description').value.trim();

        if (!name || !url || !description) {
            showToast('Semua field harus diisi!', 'error');
            return;
        }

        const websites = getWebsites();

        websites.push({
            id: Date.now(),
            name,
            url,
            description,
            category: 'General'
        });

        saveWebsites(websites);

        showToast('Website berhasil ditambahkan!', 'success');

        // reset form & close modal
        websiteForm.reset();
        document.getElementById('website-modal').style.display = 'none';

        // refresh list
        renderAdminWebsites();
        renderWebsites();
    });
  }
});
