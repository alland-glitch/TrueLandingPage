// script.js - Minimal JavaScript for WebHub

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
        }
    });
}

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

// Initialize sample data if not exists
function initializeData() {
    if (getUsers().length === 0) {
        const sampleUsers = [
            { id: 1, email: 'admin@example.com', password: 'admin123', role: 'admin' },
            { id: 2, email: 'user@example.com', password: 'user123', role: 'user' }
        ];
        saveUsers(sampleUsers);
    }

    if (getWebsites().length === 0) {
        const sampleWebsites = [
            { id: 1, name: 'Google', description: 'Search engine', link: 'https://google.com', ownerId: 1, category: 'Tools' },
            { id: 2, name: 'GitHub', description: 'Code repository', link: 'https://github.com', ownerId: 1, category: 'Tech' }
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
}

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
                        <a href="${site.path}" target="_blank" onclick="addClick('${site.name}')" class="btn btn-primary">Visit Website</a>
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
                                <a href="${site.path}" target="_blank" onclick="addClick('${site.name}')" class="btn btn-primary">Visit Website</a>
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
                                <a href="${site.path}" target="_blank" onclick="addClick('${site.name}')" class="btn btn-primary">Visit Website</a>
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
        website.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        website.description.toLowerCase().includes(searchTerm.toLowerCase())
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
                <a href="${website.link}" target="_blank" class="btn btn-primary">Visit</a>
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

function handleRegister(e) {
    e.preventDefault();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value.trim();
    const users = getUsers();

    if (!email || !password) {
        showToast('Semua field harus diisi.', 'error');
        return;
    }

    if (users.find(u => u.email === email)) {
        showToast('Email sudah terdaftar.', 'error');
        return;
    }

    const newUser = {
        id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
        email,
        password,
        role: 'user'
    };

    users.push(newUser);
    saveUsers(users);
    setCurrentUser(newUser);
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
function handleSubmitForm(e) {
    e.preventDefault();
    const name = document.getElementById('website-name').value.trim();
    const url = document.getElementById('website-url').value.trim();
    const description = document.getElementById('website-description').value.trim();
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
    const id = document.getElementById('website-id').value;
    const name = document.getElementById('website-name').value;
    const description = document.getElementById('website-description').value;
    const link = document.getElementById('website-link').value;
    const currentUser = getCurrentUser();

    const websites = getWebsites();

    if (id) {
        // Edit
        const index = websites.findIndex(w => w.id == id);
        if (index !== -1 && websites[index].ownerId === currentUser.id) {
            websites[index] = { ...websites[index], name, description, link };
        }
    } else {
        // Add
        const newWebsite = {
            id: Date.now(),
            name,
            description,
            link,
            ownerId: currentUser.id
        };
        websites.push(newWebsite);
    }

    saveWebsites(websites);
    closeModal();
    renderAdminWebsites();
}

// Approve website submission
function approveWebsite(id) {
    const pendingWebsites = getPendingWebsites();
    const websites = getWebsites();
    const submission = pendingWebsites.find(p => p.id == id);

    if (submission) {
        const approvedWebsite = {
            id: Date.now(),
            name: submission.name,
            description: submission.description,
            link: submission.url,
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
    document.getElementById('website-id').value = '';
    document.getElementById('website-name').value = '';
    document.getElementById('website-description').value = '';
    document.getElementById('website-link').value = '';
    document.getElementById('modal-title').textContent = 'Add Website';
    document.getElementById('website-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('website-modal').style.display = 'none';
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

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    updateNavbar();
    setActiveNavLinks();
    enableSmoothScroll();
    handleScroll(); // Initial check

    // Landing page
    if (document.getElementById('search')) {
        renderWebsites();
        renderFriendsWebsites();
        document.getElementById('search').addEventListener('input', (e) => {
            renderWebsites(e.target.value);
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
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Register page
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

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

    // Admin page
    if (document.getElementById('website-list-admin')) {
        const currentUser = getCurrentUser();
        if (!currentUser || currentUser.role !== 'admin') {
            window.location.href = 'login.html';
        } else {
            renderAdminWebsites();
            renderPendingSubmissions();
            renderCustomNames();
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