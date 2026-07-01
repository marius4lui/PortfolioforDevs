"use client";

import { useEffect, useState } from "react";
import { config } from "@/lib/config";
import SetupWizard from "@/components/SetupWizard";

interface Repo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    language: string | null;
    stargazers_count: number;
    pushed_at: string;
}

interface UserProfile {
    name: string | null;
    public_repos: number;
    followers: number;
    following: number;
    bio: string | null;
}

export default function Home() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loadingRepos, setLoadingRepos] = useState(true);
    const [repoError, setRepoError] = useState<string | null>(null);

    // Dynamic Text State
    const [displayName, setDisplayName] = useState<{ main: string; suffix: string }>({
        main: config.hero.title,
        suffix: config.hero.titleSuffix
    });

    useEffect(() => {
        // Set colors from config
        const root = document.documentElement;
        if (config.theme) {
            if (config.theme.accentColor)
                root.style.setProperty("--accent-color", config.theme.accentColor);
            if (config.theme.backgroundColor)
                root.style.setProperty("--bg-color", config.theme.backgroundColor);
            if (config.theme.textColor)
                root.style.setProperty("--text-primary", config.theme.textColor);
            if (config.theme.secondaryColor)
                root.style.setProperty("--text-secondary", config.theme.secondaryColor);
        }

        async function fetchData() {
            try {
                const username = config.githubUsername;

                // Fetch Profile
                const profileRes = await fetch(`https://api.github.com/users/${username}`);
                if (profileRes.ok) {
                    const profileData = await profileRes.json();
                    setProfile(profileData);

                    // Update Display Name logic
                    const nameToUse = profileData.name || username;
                    if (nameToUse) {
                        // 1. Try splitting by space
                        if (nameToUse.includes(' ')) {
                            const parts = nameToUse.split(" ");
                            setDisplayName({
                                main: parts[0],
                                suffix: parts.slice(1).join(" ")
                            });
                        }
                        // 2. Try splitting by number (e.g. marius4lui -> marius 4lui)
                        else if (/\d/.test(nameToUse)) {
                            const match = nameToUse.match(/^([^\d]+)(\d.*)$/);
                            if (match) {
                                setDisplayName({
                                    main: match[1],
                                    suffix: match[2]
                                });
                            } else {
                                setDisplayName({ main: nameToUse, suffix: "" });
                            }
                        }
                        // 3. Fallback: Full name
                        else {
                            setDisplayName({
                                main: nameToUse,
                                suffix: ""
                            });
                        }
                    }
                }

                // Fetch Repos (100 to sort)
                const reposRes = await fetch(
                    `https://api.github.com/users/${username}/repos?per_page=100&type=owner`
                );

                if (!reposRes.ok) {
                    if (reposRes.status === 403) throw new Error("Rate Limit Exceeded");
                    throw new Error("Failed to load repos");
                }

                let reposData: Repo[] = await reposRes.json();

                // Client-side sort by stars
                reposData.sort((a, b) => b.stargazers_count - a.stargazers_count);

                // Take top 3
                setRepos(reposData.slice(0, 3));
                setLoadingRepos(false);

            } catch (err: any) {
                console.error(err);
                setRepoError(err.message || "Error loading data");
                setLoadingRepos(false);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <div className="noise-bg"></div>
            <div className="grid-bg"></div>

            <header className="header">
                <div className="container header-container">
                    <a href="#" className="logo">
                        <span className="logo-text">{config.logoText}</span>
                    </a>
                    <nav className="nav">
                        <a href="#stats" className="nav-link">STATS</a>
                        {config.ventures.length > 0 && (
                            <a href="#ventures" className="nav-link">WORK</a>
                        )}
                        <a href="#projects" className="nav-link">REPOS</a>
                        <a
                            href={`https://github.com/${config.githubUsername}`}
                            target="_blank"
                            className="nav-link special-link"
                        >
                            GITHUB
                        </a>
                    </nav>
                </div>
            </header>

            <main>
                <section className="hero">
                    <div className="container hero-container-inner">
                        <div className="profile-wrapper">
                            <img
                                src={`https://github.com/${config.githubUsername}.png`}
                                alt="Profile"
                                className="avatar"
                            />
                            <div className="status-indicator"></div>
                        </div>

                        <p className="intro-label">{config.hero.subtitle}</p>

                        <h1 className="huge-title">
                            {displayName.main}
                            <span className="outline-text">{displayName.suffix}</span>
                        </h1>

                        <div className="accent-line"></div>

                        <p className="hero-description">
                            {profile?.bio || "Loading bio..."}
                        </p>

                        <div className="hero-actions">
                            <a href="#projects" className="btn btn-primary">
                                VIEW PROJECTS
                            </a>
                            <a
                                href={`https://github.com/${config.githubUsername}`}
                                target="_blank"
                                className="btn btn-outline"
                            >
                                CONTACT ME
                            </a>
                        </div>
                    </div>
                </section>

                {config.ventures.length > 0 && (
                    <section id="ventures" className="ventures-section">
                        <div className="container">
                            <div className="section-header">
                                <h2>Ventures & Products</h2>
                                <p>TOOLS, AGENCIES & LIBRARIES I'VE BUILT</p>
                            </div>

                            <div className="ventures-grid">
                                {config.ventures.map((venture, i) => (
                                    <a
                                        key={i}
                                        href={venture.url}
                                        target="_blank"
                                        className="venture-card"
                                    >
                                        <div className="venture-content">
                                            <span className="venture-tag">{venture.tag}</span>
                                            <h3>{venture.title}</h3>
                                            <p>{venture.description}</p>
                                        </div>
                                        <div className="venture-arrow">
                                            <i className="fas fa-arrow-right"></i>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <section id="stats" className="stats-section">
                    <div className="container">
                        <div className="stats-grid">
                            <div className="stat-item">
                                <h3>{profile?.public_repos || "-"}</h3>
                                <p>Repositories</p>
                            </div>
                            <div className="stat-item">
                                <h3>{profile?.followers || "-"}</h3>
                                <p>Followers</p>
                            </div>
                            <div className="stat-item">
                                <h3>{profile?.following || "-"}</h3>
                                <p>Following</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="projects" className="projects-section">
                    <div className="container">
                        <div className="section-header">
                            <h2>Featured Projects</h2>
                            <p>A collection of my latest work from GitHub</p>
                        </div>
                        <div className="projects-grid">
                            {loadingRepos && (
                                <div className="loading-state" style={{ gridColumn: "1/-1" }}>
                                    <div className="spinner"></div>
                                    <p>Loading repositories...</p>
                                </div>
                            )}

                            {repoError && (
                                <div style={{ gridColumn: "1/-1", textAlign: "center", color: "#ff5555", padding: "20px", border: "1px solid #ff5555" }}>
                                    <p><strong>Error loading projects:</strong></p>
                                    <p>{repoError}</p>
                                </div>
                            )}

                            {repos.map((repo) => (
                                <div
                                    key={repo.id}
                                    className="project-card"
                                    onClick={(e) => {
                                        // Prevent navigation if clicking on link
                                        if (!(e.target as HTMLElement).closest("a")) {
                                            window.open(repo.html_url, "_blank");
                                        }
                                    }}
                                >
                                    <div className="project-header">
                                        <i className="far fa-folder folder-icon"></i>
                                        <div className="project-links">
                                            {repo.homepage && (
                                                <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                                                    <i className="fas fa-external-link-alt"></i>
                                                </a>
                                            )}
                                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                                <i className="fab fa-github"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <h3 className="project-title">{repo.name}</h3>
                                    <p className="project-description">
                                        {repo.description
                                            ? repo.description.length > 100
                                                ? repo.description.substring(0, 100) + "..."
                                                : repo.description
                                            : "No description available."}
                                    </p>
                                    <div className="project-tech">
                                        {repo.language && <span>{repo.language}</span>}
                                        <span style={{ marginLeft: "12px" }}>
                                            <i className="far fa-star"></i> {repo.stargazers_count}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <div className="container footer-container">
                    <p>
                        &copy; {new Date().getFullYear()} {config.githubUsername}. Built with
                        Vercel Style.
                    </p>
                    <div className="social-links">
                        <a
                            href={`https://github.com/${config.githubUsername}`}
                            target="_blank"
                        >
                            <i className="fab fa-github"></i>
                        </a>
                    </div>
                </div>
            </footer>

            {/* Setup Wizard only on default username, if not dismissed, AND IN DEV MODE */}
            {process.env.NODE_ENV === 'development' && config.githubUsername === 'marius4lui' && !config.setupDismissed && (
                <SetupWizard />
            )}
        </>
    );
}
