document.addEventListener('DOMContentLoaded', () => {
    const username = 'Marius4lui';
    const currentYear = new Date().getFullYear();
    document.getElementById('year').textContent = currentYear;

    fetchUserData();
    fetchRepos();

    async function fetchUserData() {
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) throw new Error('User not found');
            const data = await response.json();

            // Update stats
            const statsHtml = `
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
            document.getElementById('stats-grid').innerHTML = statsHtml;

            // Update Bio if available
            if (data.bio) {
                document.getElementById('bio-text').textContent = data.bio;
            } else {
                document.getElementById('bio-text').textContent = "Full Stack Developer mainly working with Node.js, Python and Go.";
            }

        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    async function fetchRepos() {
        try {
            // Fetching more to filter/sort if needed, but 'pushed' is good proxy for "most active"
            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=3`);
            if (!response.ok) throw new Error('Repos not found');
            const data = await response.json();

            const projectsContainer = document.getElementById('projects-grid');
            projectsContainer.innerHTML = ''; // Clear loading state

            data.forEach(repo => {
                const card = createProjectCard(repo);
                projectsContainer.appendChild(card);
            });

        } catch (error) {
            console.error('Error fetching repos:', error);
            document.getElementById('projects-grid').innerHTML = '<p class="text-center" style="grid-column: 1/-1; color: #888;">Could not load projects at this time.</p>';
        }
    }

    function createProjectCard(repo) {
        const div = document.createElement('div');
        div.className = 'project-card';

        // Make the whole card clickable
        div.onclick = (e) => {
            // Prevent navigation if clicking on a specific link/icon inside the card
            if (!e.target.closest('a')) {
                window.open(repo.html_url, '_blank');
            }
        };

        const description = repo.description ? repo.description : 'No description available.';
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
