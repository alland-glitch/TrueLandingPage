<<<<<<< HEAD
// script.js - Simplified and Stable Version
// Minimal JavaScript for SyntheraLink

// Global error handler
window.onerror = function(msg, url, line) {
  console.error("ERROR:", msg, "at line:", line);
};
=======
// script.js - Minimal JavaScript for WebHub
>>>>>>> 2bca715cc5392ea95574d8ad5200741f8cc915e1

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

<<<<<<< HEAD
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
=======
// Analytics functions
function getAnalytics() {
    return JSON.parse(localStorage.getItem('analytics')) || {
        pageViews: {},
        clicks: {}
    };
}

function saveAnalytics(analytics) {
    localStorage.setItem('analytics', JSON.stringify(analytics));
}

function trackPageView() {
    let analytics = getAnalytics();
    const page = window.location.pathname.split('/').pop() || 'index.html';

    if (!analytics.pageViews[page]) {
        analytics.pageViews[page] = 0;
    }

    analytics.pageViews[page]++;
    saveAnalytics(analytics);
}

function trackClick(id) {
    let analytics = getAnalytics();

    if (!analytics.clicks[id]) {
        analytics.clicks[id] = 0;
    }

    analytics.clicks[id]++;
    saveAnalytics(analytics);
}

function getAnalyticsStats() {
    const analytics = getAnalytics();
    const totalPageViews = Object.values(analytics.pageViews).reduce((sum, count) => sum + count, 0);
    const totalClicks = Object.values(analytics.clicks).reduce((sum, count) => sum + count, 0);

    return {
        pageViews: analytics.pageViews,
        clicks: analytics.clicks,
        totalPageViews,
        totalClicks
    };
}

function renderAnalyticsStats() {
    const stats = getAnalyticsStats();
    const container = document.getElementById('analytics-stats');

    if (!container) return;

    let html = `
        <div class="analytics-overview">
            <h3>Analytics Overview</h3>
            <div class="stats-grid">
                <div class="stat-card">
                    <h4>Total Page Views</h4>
                    <p class="stat-number">${stats.totalPageViews}</p>
                </div>
                <div class="stat-card">
                    <h4>Total Clicks</h4>
                    <p class="stat-number">${stats.totalClicks}</p>
                </div>
            </div>
        </div>

        <div class="analytics-details">
            <div class="page-views-section">
                <h4>Page Views by Page</h4>
                <div class="stats-list">
    `;

    for (const [page, count] of Object.entries(stats.pageViews)) {
        html += `<div class="stat-item"><span>${page}</span><span>${count} views</span></div>`;
    }

    html += `
                </div>
            </div>

            <div class="clicks-section">
                <h4>Clicks by Element</h4>
                <div class="stats-list">
    `;

    for (const [element, count] of Object.entries(stats.clicks)) {
        html += `<div class="stat-item"><span>${element}</span><span>${count} clicks</span></div>`;
    }

    html += `
                </div>
            </div>
        </div>
    `;

    container.innerHTML = html;
}

function createToastContainer() {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    return container;
}

function showToast(message, type = 'success') {
    const container = createToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('toast--visible'));

    setTimeout(() => {
        toast.classList.remove('toast--visible');
        toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, 3200);
}

function clearFormError() {
    const errorBox = document.getElementById('submit-error');
    if (errorBox) {
        errorBox.innerHTML = '';
    }
}

function setFormError(message) {
    const errorBox = document.getElementById('submit-error');
    if (errorBox) {
        errorBox.innerHTML = `<p class="error-text">${message}</p>`;
    }
}

function validateSubmitData({ name, url, description }) {
    if (!name.trim() || !url.trim() || !description.trim()) {
        return { valid: false, message: 'Semua field wajib diisi.' };
    }

    try {
        const parsedUrl = new URL(url);
        if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
            return { valid: false, message: 'URL harus dimulai dengan http:// atau https://.' };
        }
    } catch (error) {
        return { valid: false, message: 'URL tidak valid.' };
    }

    if (description.trim().length < 10) {
        return { valid: false, message: 'Deskripsi minimal 10 karakter.' };
    }

    return { valid: true };
}

function setSubmitButtonLoading(isLoading) {
    const submitBtn = document.querySelector('#submit-form button[type="submit"]');
    if (!submitBtn) return;

    if (isLoading) {
        submitBtn.disabled = true;
        submitBtn.classList.add('btn--loading');
        submitBtn.textContent = 'Loading...';
    } else {
        submitBtn.disabled = false;
        submitBtn.classList.remove('btn--loading');
        submitBtn.textContent = 'Submit for Review';
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    showToast('Berhasil logout', 'success');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 500);
}

function getSavedTheme() {
    return localStorage.getItem('theme');
}

function updateThemeToggleIcon() {
    const toggles = document.querySelectorAll('#themeToggle');
    toggles.forEach(btn => {
        btn.textContent = document.documentElement.classList.contains('light-mode') ? '🌙' : '☀️';
    });
}

function applyTheme(theme) {
    if (theme === 'light') {
        document.documentElement.classList.add('light-mode');
    } else {
        document.documentElement.classList.remove('light-mode');
    }
    updateThemeToggleIcon();
}

function initTheme() {
    const savedTheme = getSavedTheme();
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        applyTheme('light');
        localStorage.setItem('theme', 'light');
    } else {
        applyTheme('dark');
    }
}

function toggleTheme() {
    const isLightMode = document.documentElement.classList.toggle('light-mode');
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    updateThemeToggleIcon();
}

function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

function createProgressBar() {
    if (!document.getElementById('progressBar')) {
        const progressBar = document.createElement('div');
        progressBar.id = 'progressBar';
        document.body.appendChild(progressBar);
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    if (!progressBar) return;

    const scroll = document.documentElement.scrollTop || document.body.scrollTop;
    const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progressBar.style.width = total > 0 ? `${Math.min(100, (scroll / total) * 100)}%` : '0%';
}

function initCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', e => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });

    document.querySelectorAll('button, a, .card, .nav-link').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.9)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

function initButtonRipples() {
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', e => {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Update navbar based on login status
function updateNavbar() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    // Skip update for admin page as it has its own navbar
    if (document.title.includes('Admin')) return;

    const currentUser = getCurrentUser();
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (currentUser && isLoggedIn) {
        const userName = currentUser.email.split('@')[0];
        const isAdmin = currentUser.role === 'admin';
        navLinks.innerHTML = `
            <li><a href="index.html#home" class="nav-link">Home</a></li>
            <li><a href="index.html#websites" class="nav-link">Explore</a></li>
            ${isAdmin ? '<li><a href="#dashboard" class="nav-link">Dashboard</a></li>' : ''}
            <li class="user-menu">
                <a href="#" class="user-toggle">${userName} ▼</a>
                <ul class="dropdown">
                    <li><a href="#" id="logoutBtn">Logout</a></li>
                </ul>
            </li>
        `;
        // Add logout event listener
        setTimeout(() => {
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', logout);
            }
        }, 0);
    } else {
        navLinks.innerHTML = `
            <li><a href="index.html#home" class="nav-link">Home</a></li>
            <li><a href="index.html#websites" class="nav-link">Explore</a></li>
            <li><a href="login.html">Login</a></li>
            <li><a href="register.html">Register</a></li>
        `;
    }
}

function setActiveNavLinks() {
    const links = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    let currentHash = window.location.hash || '';
    if (currentPath === 'index.html') {
        currentHash = currentHash || '#home';
    }
    if (currentPath === 'admin.html') {
        currentHash = currentHash || '#dashboard';
    }

    links.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        const [linkPathRaw, linkHashRaw] = href.split('#');
        const linkPath = linkPathRaw ? linkPathRaw.split('/').pop() : currentPath;
        const linkHash = linkHashRaw ? `#${linkHashRaw}` : '';

        link.classList.remove('active');

        if (linkPath !== currentPath) return;

        if (linkHash) {
            if (linkHash === currentHash || (linkHash === '#home' && currentHash === '#home')) {
                link.classList.add('active');
            }
        } else if (!currentHash || currentHash === '#home') {
            link.classList.add('active');
>>>>>>> 2bca715cc5392ea95574d8ad5200741f8cc915e1
        }
    });
}

<<<<<<< HEAD
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
            window.location.href = user.role === 'admin' ? 'admin.html' : 'index.html';
        }, 1000);
    } else {
        showToast('Email atau password salah.', 'error');
    }
}

// Simple register handler
=======
function enableSmoothScroll() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href) return;

            const [pathRaw, hashRaw] = href.split('#');
            const targetId = hashRaw ? hashRaw : null;
            const linkPath = pathRaw ? pathRaw.split('/').pop() : currentPath;

            if (!targetId) return;
            if (linkPath !== currentPath) return;

            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.replaceState(null, '', `${currentPath}#${targetId}`);
                setActiveNavLinks();
            }
        });
    });
}

// Clean invalid website data
function cleanWebsiteData() {
    const websites = getWebsites();
    const cleaned = websites.filter(site => site.url && site.url.startsWith('http'));
    if (cleaned.length !== websites.length) {
        console.log("Cleaned invalid website data");
        saveWebsites(cleaned);
    }
}
        const sampleUsers = [
            { id: 1, email: 'admin@example.com', password: 'admin123', role: 'admin' },
            { id: 2, email: 'user@example.com', password: 'user123', role: 'user' }
        ];
        saveUsers(sampleUsers);
    }

    if (getWebsites().length === 0) {
        const sampleWebsites = [
            { id: 1, name: 'Google', description: 'Search engine', url: 'https://google.com', ownerId: 1, category: 'Tools' },
            { id: 2, name: 'GitHub', description: 'Code repository', url: 'https://github.com', ownerId: 1, category: 'Tech' }
        ];
        saveWebsites(sampleWebsites);
    }

    // Initialize custom names if not exists
    if (!localStorage.getItem('customNames')) {
        localStorage.setItem('customNames', JSON.stringify({}));
    }

    // Initialize ranking if not exists
    if (!localStorage.getItem('ranking')) {
        localStorage.setItem('ranking', JSON.stringify({}));
    }

    // Clean invalid website data
    cleanWebsiteData();

// Friends websites data - add your friends' websites here
const friendsWebsites = [
    {
        name: "Website Teman 1",
        path: "teman1/index.html",
        author: "Nama Teman 1",
        category: "Game"
    },
    {
        name: "Website Teman 2",
        path: "teman2/index.html",
        author: "Nama Teman 2",
        category: "Edukasi"
    },
    // Add more friends' websites here
    // {
    //     name: "Website Teman 3",
    //     path: "teman3/index.html",
    //     author: "Nama Teman 3",
    //     category: "Portfolio"
    // }
];

// Ranking functions
function addView(folder) {
    let ranking = JSON.parse(localStorage.getItem('ranking')) || {};
    if (!ranking[folder]) {
        ranking[folder] = { views: 0, clicks: 0 };
    }
    ranking[folder].views += 1;
    localStorage.setItem('ranking', JSON.stringify(ranking));
}

function addClick(folder) {
    let ranking = JSON.parse(localStorage.getItem('ranking')) || {};
    if (!ranking[folder]) {
        ranking[folder] = { views: 0, clicks: 0 };
    }
    ranking[folder].clicks += 1;
    localStorage.setItem('ranking', JSON.stringify(ranking));
}

function getScore(folder) {
    let ranking = JSON.parse(localStorage.getItem('ranking')) || {};
    let data = ranking[folder] || { views: 0, clicks: 0 };
    return data.clicks * 2 + data.views; // Clicks worth more than views
}

// Render friends websites automatically
function renderFriendsWebsites() {
    const container = document.getElementById('friends-website-list');
    if (!container) return;

    container.innerHTML = '';

    const customNames = JSON.parse(localStorage.getItem('customNames')) || {};
    const ranking = JSON.parse(localStorage.getItem('ranking')) || {};
    const currentUser = getCurrentUser();
    const isAdmin = currentUser && currentUser.role === 'admin';

    // Fetch from API first, fallback to JSON file, then array
    fetch('/api/websites')
        .then(res => res.json())
        .then(data => {
            // Sort by score (highest first)
            data.sort((a, b) => getScore(b.name) - getScore(a.name));

            data.forEach(site => {
                addView(site.name); // Add view when rendering
                const displayName = customNames[site.name] || site.name;
                const rankData = ranking[site.name] || { views: 0, clicks: 0 };

                const card = document.createElement('div');
                card.className = 'card';

                let editButton = '';
                if (isAdmin) {
                    editButton = `<button class="btn btn-secondary btn-small" onclick="editWebsiteName('${site.name}', '${displayName}')">Edit Name</button>`;
                }

                card.innerHTML = `
                    <div class="card-header">
                        <div class="card-icon">${site.name.charAt(0).toUpperCase()}</div>
                        <div class="card-category">Website</div>
                    </div>
                    <h4>${displayName}</h4>
                    <p>Personal Website</p>
                    <div class="stats">
                        <small>👁️ ${rankData.views} views | 🖱️ ${rankData.clicks} clicks</small>
                    </div>
                    <div class="card-actions">
                        <a href="${site.path}" target="_blank" onclick="addClick('${site.name}'); trackClick('visitWebsite')" class="btn btn-primary">Visit Website</a>
                        ${editButton}
                    </div>
                `;

                container.appendChild(card);
            });

            // Render trending after friends websites
            renderTrending(data.slice(0, 3));
        })
        .catch(() => {
            // Fallback to JSON file
            fetch('websites.json')
                .then(res => res.json())
                .then(data => {
                    // Sort by score
                    data.sort((a, b) => getScore(b.name) - getScore(a.name));

                    data.forEach(site => {
                        addView(site.name);
                        const displayName = customNames[site.name] || site.name;
                        const rankData = ranking[site.name] || { views: 0, clicks: 0 };

                        const card = document.createElement('div');
                        card.className = 'card';

                        let editButton = '';
                        if (isAdmin) {
                            editButton = `<button class="btn btn-secondary btn-small" onclick="editWebsiteName('${site.name}', '${displayName}')">Edit Name</button>`;
                        }

                        card.innerHTML = `
                            <div class="card-header">
                                <div class="card-icon">${site.category.charAt(0)}</div>
                                <div class="card-category">${site.category}</div>
                            </div>
                            <h4>${displayName}</h4>
                            <p>By: ${site.author}</p>
                            <div class="stats">
                                <small>👁️ ${rankData.views} views | 🖱️ ${rankData.clicks} clicks</small>
                            </div>
                            <div class="card-actions">
                                <a href="${site.path}" target="_blank" onclick="addClick('${site.name}'); trackClick('visitWebsite')" class="btn btn-primary">Visit Website</a>
                                ${editButton}
                            </div>
                        `;

                        container.appendChild(card);
                    });

                    renderTrending(data.slice(0, 3));
                })
                .catch(() => {
                    // Final fallback to array
                    friendsWebsites.forEach(site => {
                        addView(site.name);
                        const displayName = customNames[site.name] || site.name;
                        const rankData = ranking[site.name] || { views: 0, clicks: 0 };

                        const card = document.createElement('div');
                        card.className = 'card';

                        let editButton = '';
                        if (isAdmin) {
                            editButton = `<button class="btn btn-secondary btn-small" onclick="editWebsiteName('${site.name}', '${displayName}')">Edit Name</button>`;
                        }

                        card.innerHTML = `
                            <div class="card-header">
                                <div class="card-icon">${site.category.charAt(0)}</div>
                                <div class="card-category">${site.category}</div>
                            </div>
                            <h4>${displayName}</h4>
                            <p>By: ${site.author}</p>
                            <div class="stats">
                                <small>👁️ ${rankData.views} views | 🖱️ ${rankData.clicks} clicks</small>
                            </div>
                            <div class="card-actions">
                                <a href="${site.path}" target="_blank" onclick="addClick('${site.name}'); trackClick('visitWebsite')" class="btn btn-primary">Visit Website</a>
                                ${editButton}
                            </div>
                        `;

                        container.appendChild(card);
                    });

                    renderTrending(friendsWebsites.slice(0, 3));
                });
        });
}

// Render websites on landing page
function renderWebsites(searchTerm = '') {
    const websites = getWebsites();
    const websiteList = document.getElementById('website-list');
    const emptyState = document.getElementById('empty-state');

    if (!websiteList) return;

    const filteredWebsites = websites.filter(website =>
        (website.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        website.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
        website.url && website.url.startsWith('http')
    );

    websiteList.innerHTML = '';

    if (filteredWebsites.length === 0) {
        emptyState.style.display = 'block';
        websiteList.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        websiteList.style.display = 'grid';

        filteredWebsites.forEach(website => {
            const card = document.createElement('div');
            card.className = 'card fade-in';
            card.innerHTML = `
                <div class="card-header">
                    <div class="card-icon">${website.name.charAt(0).toUpperCase()}</div>
                    <span class="card-category">${website.category || 'General'}</span>
                </div>
                <h4>${website.name}</h4>
                <p>${website.description}</p>
                <button class="visit-btn btn btn-primary" data-url="${website.url}">Visit</button>
            `;
            websiteList.appendChild(card);
        });
    }
}

// Render pending submissions on admin page
function renderPendingSubmissions(searchTerm = '') {
    const pendingWebsites = getPendingWebsites();
    const pendingList = document.getElementById('pending-list');
    const pendingEmpty = document.getElementById('pending-empty');

    if (!pendingList) return;

    const filteredPending = pendingWebsites.filter(submission =>
        submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    pendingList.innerHTML = '';

    if (filteredPending.length === 0) {
        pendingEmpty.style.display = 'block';
        pendingList.style.display = 'none';
    } else {
        pendingEmpty.style.display = 'none';
        pendingList.style.display = 'grid';

        filteredPending.forEach(submission => {
            const card = document.createElement('div');
            card.className = 'pending-card fade-in';
            card.innerHTML = `
                <h4>${submission.name}</h4>
                <p><strong>URL:</strong> <a href="${submission.url}" target="_blank">${submission.url}</a></p>
                <p><strong>Description:</strong> ${submission.description}</p>
                <p><strong>Submitted by:</strong> ${submission.submittedBy}</p>
                <div class="pending-actions">
                    <button class="btn btn-success approve-btn" data-id="${submission.id}">Approve ✅</button>
                    <button class="btn btn-danger reject-btn" data-id="${submission.id}">Reject ❌</button>
                </div>
            `;
            pendingList.appendChild(card);
        });

        // Add event listeners
        document.querySelectorAll('.approve-btn').forEach(btn => {
            btn.addEventListener('click', (e) => approveWebsite(e.target.dataset.id));
        });

        document.querySelectorAll('.reject-btn').forEach(btn => {
            btn.addEventListener('click', (e) => rejectWebsite(e.target.dataset.id));
        });
    }
}

function renderAdminWebsites() {
    const websiteListAdmin = document.getElementById('website-list-admin');
    if (!websiteListAdmin) return;

    const websites = getWebsites();
    websiteListAdmin.innerHTML = '';

    websites.forEach(site => {
        const card = document.createElement('div');
        card.className = 'card fade-in';
        card.innerHTML = `
            <div class="card-header">
                <div class="card-icon">${site.name.charAt(0).toUpperCase()}</div>
                <span class="card-category">${site.category || 'General'}</span>
            </div>
            <h4>${site.name}</h4>
            <p>${site.description}</p>
            <div class="pending-actions">
                <a href="${site.link}" target="_blank" class="btn btn-primary">Visit</a>
                <button class="btn btn-danger" data-id="${site.id}" onclick="deleteWebsite(${site.id})">Delete</button>
            </div>
        `;
        websiteListAdmin.appendChild(card);
    });
}

// Render custom names management for admin
function renderCustomNames() {
    const container = document.getElementById('custom-names-list');
    if (!container) return;

    container.innerHTML = '';

    // Fetch websites and show custom names
    fetch('/api/websites')
        .then(res => res.json())
        .then(data => {
            const customNames = JSON.parse(localStorage.getItem('customNames')) || {};

            data.forEach(site => {
                const displayName = customNames[site.name] || site.name;

                const card = document.createElement('div');
                card.className = 'card';

                card.innerHTML = `
                    <div class="card-header">
                        <div class="card-icon">${site.name.charAt(0).toUpperCase()}</div>
                        <div class="card-category">Folder: ${site.name}</div>
                    </div>
                    <h4>Current Display Name: ${displayName}</h4>
                    <div class="form-group">
                        <input type="text" id="name-${site.name}" value="${displayName}" class="form-control">
                    </div>
                    <button class="btn btn-primary" onclick="updateCustomName('${site.name}')">Update Name</button>
                `;

                container.appendChild(card);
            });
        })
        .catch(() => {
            showToast('Unable to load websites. Make sure server is running.', 'error');
        });
}

// Update custom name
function updateCustomName(folderName) {
    const input = document.getElementById(`name-${folderName}`);
    const newName = input.value.trim();

    if (!newName) {
        showToast('Name cannot be empty!', 'error');
        return;
    }

    saveCustomName(folderName, newName);
}

// Render trending websites
function renderTrending(trendingData) {
    const container = document.getElementById('trending-grid');
    if (!container) return;

    container.innerHTML = '';

    const customNames = JSON.parse(localStorage.getItem('customNames')) || {};
    const ranking = JSON.parse(localStorage.getItem('ranking')) || {};

    trendingData.forEach((site, index) => {
        const displayName = customNames[site.name] || site.name;
        const rankData = ranking[site.name] || { views: 0, clicks: 0 };
        const badges = ['🥇', '🥈', '🥉'];

        const card = document.createElement('div');
        card.className = 'trending-card trending';

        card.innerHTML = `
            <div class="trending-icon">${badges[index] || '🔥'}</div>
            <h4>${displayName}</h4>
            <p>Score: ${getScore(site.name)} | 👁️ ${rankData.views} | 🖱️ ${rankData.clicks}</p>
            <a href="${site.path}" target="_blank" onclick="addClick('${site.name}')" class="btn btn-primary btn-small">Visit</a>
        `;

        container.appendChild(card);
    });
}

>>>>>>> 2bca715cc5392ea95574d8ad5200741f8cc915e1
function handleRegister(e) {
    e.preventDefault();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value.trim();
    const users = getUsers();

<<<<<<< HEAD
=======
    if (!email || !password) {
        showToast('Semua field harus diisi.', 'error');
        return;
    }

>>>>>>> 2bca715cc5392ea95574d8ad5200741f8cc915e1
    if (users.find(u => u.email === email)) {
        showToast('Email sudah terdaftar.', 'error');
        return;
    }

    const newUser = {
<<<<<<< HEAD
        id: users.length + 1,
=======
        id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
>>>>>>> 2bca715cc5392ea95574d8ad5200741f8cc915e1
        email,
        password,
        role: 'user'
    };

    users.push(newUser);
    saveUsers(users);
    setCurrentUser(newUser);
<<<<<<< HEAD
    showToast('Registrasi berhasil!', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Simple submit handler
=======
    localStorage.setItem('isLoggedIn', 'true');
    showToast('Registrasi berhasil! Mengalihkan ke beranda...', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 700);
}

// Login form handler
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!email || !password) {
        showToast('Masukkan email dan password.', 'error');
        return;
    }

    if (user) {
        setCurrentUser(user);
        localStorage.setItem('isLoggedIn', 'true');
        updateNavbar();
        const destination = user.role === 'admin' ? 'admin.html' : 'index.html';
        showToast('Login berhasil! Mengalihkan...', 'success');
        setTimeout(() => {
            window.location.href = destination;
        }, 700);
    } else {
        showToast('Email atau password salah.', 'error');
    }
}

// Submit form handler for users
>>>>>>> 2bca715cc5392ea95574d8ad5200741f8cc915e1
function handleSubmitForm(e) {
    e.preventDefault();
    const name = document.getElementById('website-name').value.trim();
    const url = document.getElementById('website-url').value.trim();
    const description = document.getElementById('website-description').value.trim();
<<<<<<< HEAD

    if (!name || !url || !description) {
        showToast('Semua field harus diisi.', 'error');
        return;
    }

    const pending = getPendingWebsites();
    pending.push({
=======
    const currentUser = getCurrentUser();

    const validation = validateSubmitData({ name, url, description });
    if (!validation.valid) {
        clearFormError();
        setFormError(validation.message);
        showToast(validation.message, 'error');
        return;
    }

    clearFormError();
    setSubmitButtonLoading(true);

    setTimeout(() => {
        const pendingWebsites = getPendingWebsites();
        const newSubmission = {
            id: Date.now(),
            name,
            url,
            description,
            status: 'pending',
            createdBy: currentUser.email.split('@')[0],
            submittedBy: currentUser.email
        };

        pendingWebsites.push(newSubmission);
        savePendingWebsites(pendingWebsites);
        document.getElementById('submit-form').reset();
        showToast('Website berhasil dikirim. Tunggu persetujuan admin.', 'success');
        setSubmitButtonLoading(false);
    }, 800);
}

// Website form handler (add/edit)
function handleWebsiteForm(e) {
    e.preventDefault();
    const name = document.getElementById('modal-name').value;
    const url = document.getElementById('modal-url').value;
    const description = document.getElementById('modal-description').value;
    const currentUser = getCurrentUser();

    if (!currentUser || currentUser.role !== 'admin') {
        showToast('Unauthorized', 'error');
        return;
    }

    const websites = getWebsites();

    // Add new website
    const newWebsite = {
>>>>>>> 2bca715cc5392ea95574d8ad5200741f8cc915e1
        id: Date.now(),
        name,
        url,
        description,
<<<<<<< HEAD
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
=======
        ownerId: currentUser.id
    };
    websites.push(newWebsite);

    saveWebsites(websites);
    closeModal();
    renderAdminWebsites();
    showToast('Website added successfully!', 'success');
}

// Approve website submission
function approveWebsite(id) {
    const pendingWebsites = getPendingWebsites();
    const websites = getWebsites();
    const submission = pendingWebsites.find(p => p.id == id);

    if (submission) {
        const approvedWebsite = {
>>>>>>> 2bca715cc5392ea95574d8ad5200741f8cc915e1
            id: Date.now(),
            name: submission.name,
            url: submission.url,
            description: submission.description,
<<<<<<< HEAD
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
        window.location.href = 'login.html';
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

    // Add website button
    const addBtn = document.getElementById('addWebsiteBtn') || document.getElementById('add-website-btn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const user = getCurrentUser();
            if (!user) {
                window.location.href = 'login.html';
            } else if (user.role === 'admin') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'submit.html';
=======
            ownerId: 1, // Admin owner
            category: 'General'
        };
        websites.push(approvedWebsite);
        saveWebsites(websites);

        // Remove from pending
        const updatedPending = pendingWebsites.filter(p => p.id != id);
        savePendingWebsites(updatedPending);

        renderPendingSubmissions();
        renderWebsites(); // Update main list if on index
    }
}

// Reject website submission
function rejectWebsite(id) {
    const pendingWebsites = getPendingWebsites();
    const updatedPending = pendingWebsites.filter(p => p.id != id);
    savePendingWebsites(updatedPending);
    renderPendingSubmissions();
}

// Delete website
function deleteWebsite(id) {
    if (confirm('Are you sure you want to delete this website?')) {
        const websites = getWebsites();
        const filteredWebsites = websites.filter(w => w.id != id);
        saveWebsites(filteredWebsites);
        renderAdminWebsites();
    }
}

// Modal functions
function openModal() {
    console.log("Button clicked - opening modal");
    const modal = document.getElementById('website-modal');
    if (modal) {
        // Clear form fields
        document.getElementById('modal-name').value = '';
        document.getElementById('modal-url').value = '';
        document.getElementById('modal-description').value = '';
        modal.style.display = 'block';
    } else {
        console.error("Modal not found!");
    }
}

function closeModal() {
    const modal = document.getElementById('website-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Edit website name function
function editWebsiteName(folderName, currentName) {
    const newName = prompt('Enter new display name for ' + folderName + ':', currentName);
    if (newName && newName.trim() !== '') {
        saveCustomName(folderName, newName.trim());
    }
}

// Save custom name
function saveCustomName(folderName, displayName) {
    let customNames = JSON.parse(localStorage.getItem('customNames')) || {};
    customNames[folderName] = displayName;
    localStorage.setItem('customNames', JSON.stringify(customNames));
    showToast('Website name updated successfully!', 'success');
    renderFriendsWebsites(); // Re-render to show changes
}

// Fade-in animation on scroll
function handleScroll() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('visible');
        }
    });
}

// Create analytics charts
function createAnalyticsCharts() {
    const analytics = getAnalytics();

    // Page Views Chart
    const ctx = document.getElementById('analyticsChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(analytics.pageViews),
                datasets: [{
                    label: 'Page Views',
                    data: Object.values(analytics.pageViews),
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
>>>>>>> 2bca715cc5392ea95574d8ad5200741f8cc915e1
            }
        });
    }

<<<<<<< HEAD
    // Login form
=======
    // Clicks Chart
    const clickCtx = document.getElementById('clickChart');
    if (clickCtx) {
        new Chart(clickCtx, {
            type: 'pie',
            data: {
                labels: Object.keys(analytics.clicks),
                datasets: [{
                    data: Object.values(analytics.clicks),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 205, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true
            }
        });
    }
}

// Display top project and additional stats
function displayTopProjectAndStats() {
    const analytics = getAnalytics();
    const clicks = analytics.clicks;

    // Determine top project
    let topProject = 'None';
    if (Object.keys(clicks).length > 0) {
        topProject = Object.keys(clicks).reduce((a, b) => {
            return clicks[a] > clicks[b] ? a : b;
        });
    }

    // Display top project
    const topProjectEl = document.getElementById('topProject');
    if (topProjectEl) {
        topProjectEl.innerHTML = `<h3>🔥 Top Project: ${topProject}</h3>`;
    }

    // Display additional stats
    const statsEl = document.getElementById('stats');
    if (statsEl) {
        const totalViews = Object.values(analytics.pageViews).reduce((a, b) => a + b, 0);
        const totalClicks = Object.values(analytics.clicks).reduce((a, b) => a + b, 0);
        statsEl.innerHTML = `
            <p>👁️ Total Views: ${totalViews}</p>
            <p>🖱️ Total Clicks: ${totalClicks}</p>
        `;
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log("JS Loaded - DOMContentLoaded fired");
    trackPageView(); // Track page view on load
    initializeData();
    updateNavbar();
    setActiveNavLinks();
    enableSmoothScroll();
    handleScroll(); // Initial check
    setupScrollAnimations();
    createProgressBar();
    updateProgressBar();
    initCursor();
    initButtonRipples();
    window.addEventListener('scroll', () => requestAnimationFrame(updateProgressBar));

    // Landing page
    if (document.getElementById('search')) {
        renderWebsites();
        renderFriendsWebsites();
        document.getElementById('search').addEventListener('input', (e) => {
            renderWebsites(e.target.value);
        });

        // Event delegation for visit buttons
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('visit-btn')) {
                const url = e.target.dataset.url;
                console.log("Opening URL:", url);
                if (!url || url === "undefined" || !url.startsWith('http')) {
                    alert("Link tidak valid!");
                    return;
                }
                window.open(url, "_blank");
                trackClick('visitWebsite');
            }
        });

        // Add website button logic
        const addBtn = document.getElementById('addWebsiteBtn');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                const currentUser = getCurrentUser();
                if (!currentUser) {
                    window.location.href = 'login.html';
                } else if (currentUser.role === 'admin') {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'submit.html';
                }
            });
        }
    }

    // Login page
>>>>>>> 2bca715cc5392ea95574d8ad5200741f8cc915e1
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

<<<<<<< HEAD
    // Register form
=======
    // Register page
>>>>>>> 2bca715cc5392ea95574d8ad5200741f8cc915e1
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

<<<<<<< HEAD
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
            window.location.href = 'login.html';
        } else {
            renderAdminWebsites();
            renderPendingSubmissions();
        }
    }

    // Theme toggle
=======
    // Submit page
    const submitForm = document.getElementById('submit-form');
    if (submitForm) {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            window.location.href = 'login.html';
        } else {
            submitForm.addEventListener('submit', handleSubmitForm);
        }
    }

    // Initialize theme toggle state
>>>>>>> 2bca715cc5392ea95574d8ad5200741f8cc915e1
    initTheme();
    const themeToggles = document.querySelectorAll('#themeToggle');
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleTheme);
    });

<<<<<<< HEAD
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

// Single entry point
document.addEventListener("DOMContentLoaded", () => {
    console.log("App Start");
    initApp();

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
});

=======
    // Admin page
    if (document.getElementById('website-list-admin')) {
        const currentUser = getCurrentUser();
        if (!currentUser || currentUser.role !== 'admin') {
            window.location.href = 'login.html';
        } else {
            renderAdminWebsites();
            renderPendingSubmissions();
            renderCustomNames();
            renderAnalyticsStats(); // Add analytics stats to admin dashboard
            createAnalyticsCharts(); // Create charts
            displayTopProjectAndStats(); // Display top project and stats
            const adminSearch = document.getElementById('admin-search');
            if (adminSearch) {
                adminSearch.addEventListener('input', (e) => {
                    renderPendingSubmissions(e.target.value);
                });
            }
            document.getElementById('add-website-btn').addEventListener('click', openModal);
            document.getElementById('website-form').addEventListener('submit', handleWebsiteForm);
            document.getElementById('logoutBtn').addEventListener('click', logout);
        }
    }

    // Modal close
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (e) => {
        const modal = document.getElementById('website-modal');
        if (modal && e.target === modal) {
            closeModal();
        }
    });

    // Scroll animation
    window.addEventListener('scroll', handleScroll);
});
>>>>>>> 2bca715cc5392ea95574d8ad5200741f8cc915e1
