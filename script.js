document.addEventListener('DOMContentLoaded', () => {
    // Default values
    let githubUsername = 'Marius4lui';

    // Apply Config safely
    if (typeof config !== 'undefined') {
        githubUsername = config.githubUsername || githubUsername;

        const root = document.documentElement;

        // Colors
        if (config.theme) {
            if (config.theme.accentColor) root.style.setProperty('--accent-color', config.theme.accentColor);
            if (config.theme.backgroundColor) root.style.setProperty('--bg-color', config.theme.backgroundColor);
            if (config.theme.textColor) root.style.setProperty('--text-primary', config.theme.textColor);
            if (config.theme.secondaryColor) root.style.setProperty('--text-secondary', config.theme.secondaryColor);
        }

        // Text Content
        if (config.logoText) {
            const logoEl = document.getElementById('logo-text');
            if (logoEl) logoEl.textContent = config.logoText;
        }

        if (config.hero) {
            if (config.hero.subtitle) {
                const subEl = document.getElementById('hero-subtitle');
                if (subEl) subEl.textContent = config.hero.subtitle;
            }
            if (config.hero.title) {
                const titleEl = document.getElementById('hero-title');
                if (titleEl) titleEl.textContent = config.hero.title;
            }
            if (config.hero.titleSuffix) {
                const suffixEl = document.getElementById('hero-title-suffix');
                if (suffixEl) suffixEl.textContent = config.hero.titleSuffix;
            }
        }

        // Links and Images
        const avatarImg = document.getElementById('avatar-img');
        if (avatarImg) avatarImg.src = `https://github.com/${githubUsername}.png`;

        const githubUrl = `https://github.com/${githubUsername}`;
        const navGithub = document.getElementById('nav-github');
        if (navGithub) navGithub.href = githubUrl;

        const contactBtn = document.getElementById('contact-btn');
        if (contactBtn) contactBtn.href = githubUrl;

        // Ventures
        const venturesSection = document.getElementById('ventures');
        const venturesGrid = document.getElementById('ventures-grid');
        const navVentures = document.getElementById('nav-ventures');

        if (config.ventures && config.ventures.length > 0 && venturesSection && venturesGrid) {
            venturesSection.style.display = 'block';
            if (navVentures) navVentures.style.display = 'block';

            venturesGrid.innerHTML = '';

            config.ventures.forEach(venture => {
                const card = document.createElement('a');
                card.href = venture.url;
                card.target = '_blank';
                card.className = 'venture-card';
                card.innerHTML = `
                    <div class="venture-content">
                        <span class="venture-tag">${venture.tag}</span>
                        <h3>${venture.title}</h3>
                        <p>${venture.description}</p>
                    </div>
                    <div class="venture-arrow"><i class="fas fa-arrow-right"></i></div>
                `;
                venturesGrid.appendChild(card);
            });
        } else {
            if (venturesSection) venturesSection.style.display = 'none';
            if (navVentures) navVentures.style.display = 'none';
        }
    } else {
        console.warn('Config not found, using defaults.');
    }

    // Set Year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    fetchUserData();
    fetchRepos();

    async function fetchUserData() {
        try {
            const response = await fetch(`https://api.github.com/users/${githubUsername}`);
            if (!response.ok) throw new Error(`User not found (${response.status})`);
            const data = await response.json();

            // Update stats
            const statsGrid = document.getElementById('stats-grid');
            if (statsGrid) {
                statsGrid.innerHTML = `
                <div class="stat-item">
                    <h3>${data.public_repos}</h3>
                    <p>Repositories</p>
                </div>
                <div class="stat-item">
                    <h3>${data.followers}</h3>
                    <p>Followers</p>
                </div>
                <div class="stat-item">
                    <h3>${data.following}</h3>
                    <p>Following</p>
                </div>
            `;
            }

            // Update Bio
            const bioText = document.getElementById('bio-text');
            if (bioText) {
                bioText.textContent = data.bio || "Full Stack Developer";
            }

        } catch (error) {
            console.error('Error fetching user data:', error);
            const statsGrid = document.getElementById('stats-grid');
            if (statsGrid) statsGrid.innerHTML = '<p style="color: #666;">Stats unavailable</p>';
        }
    }

    async function fetchRepos() {
        const projectsContainer = document.getElementById('projects-grid');
        if (!projectsContainer) return;

        try {
            console.log(`Fetching repos for: ${githubUsername}`);
            // Fetch 100 to sort properly by stars on client side
            const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100&type=owner`);

            if (!response.ok) {
                if (response.status === 403) throw new Error('Rate Limit Exceeded. Try again later.');
                if (response.status === 404) throw new Error(`User '${githubUsername}' repos not found.`);
                throw new Error(`GitHub API Error: ${response.status}`);
            }

            let data = await response.json();
            console.log('Repos fetched:', data);

            if (!Array.isArray(data) || data.length === 0) {
                projectsContainer.innerHTML = '<p class="text-center" style="grid-column: 1/-1; color: #888;">No public repositories found.</p>';
                return;
            }

            // Client-side sort by stars (descending)
            data.sort((a, b) => b.stargazers_count - a.stargazers_count);

            // Take top 3
            data = data.slice(0, 3);

            projectsContainer.innerHTML = ''; // Clear loading state

            data.forEach(repo => {
                const card = createProjectCard(repo);
                projectsContainer.appendChild(card);
            });

        } catch (error) {
            console.error('Error fetching repos:', error);
            projectsContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #ff5555; padding: 20px; border: 1px solid #ff5555;">
                <p><strong>Error loading projects:</strong></p>
                <p>${error.message}</p>
                <p style="font-size: 0.8em; margin-top:10px; opacity: 0.7;">Check console (F12) for details.</p>
            </div>`;
        }
    }

    function createProjectCard(repo) {
        const div = document.createElement('div');
        div.className = 'project-card';

        div.onclick = (e) => {
            if (!e.target.closest('a')) {
                window.open(repo.html_url, '_blank');
            }
        };

        const description = repo.description || 'No description available.';
        const language = repo.language ? `<span>${repo.language}</span>` : '';

        div.innerHTML = `
            <div class="project-header">
                <i class="far fa-folder folder-icon"></i>
                <div class="project-links">
                    ${repo.homepage ? `<a href="${repo.homepage}" target="_blank"><i class="fas fa-external-link-alt"></i></a>` : ''}
                    <a href="${repo.html_url}" target="_blank"><i class="fab fa-github"></i></a>
                </div>
            </div>
            <h3 class="project-title">${repo.name}</h3>
            <p class="project-description">${description.substring(0, 100)}${description.length > 100 ? '...' : ''}</p>
            <div class="project-tech">
                ${language}
                <span><i class="far fa-star"></i> ${repo.stargazers_count}</span>
            </div>
        `;
        return div;
    }
});
