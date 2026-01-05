# Modern Developer Portfolio Template

A bold, industrial-style developer portfolio template inspired by modern design trends (Vercel, Linear). Built with pure HTML, CSS, and vanilla JavaScript. Features dynamic GitHub data fetching and easy configuration.

## 🚀 Features

- **GitHub Integration**: Automatically fetches your profile stats (Followers, Repos) and top 3 active repositories.
- **Dynamic Configuration**: Edit one file (`config.js`) to change the entire site's content and colors.
- **Bold Design**: High-contrast dark mode, industrial typography (Syne + Inter), and neon accents.
- **Ventures Section**: Showcase your startups, libraries, or products manually.
- **Responsive**: Fully optimized for mobile and desktop.
- **Zero Dependencies**: No React, Vue, or build steps required. Just host the files.

## 🛠️ Quick Start

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/portfolio-template.git
    ```
2.  **Open `config.js`**:
    Change the values to match your profile.
    ```javascript
    const config = {
        githubUsername: "YourGitHubHandle",
        logoText: "YOUR LOGO",
        // ...
    }
    ```
3.  **Host it**:
    Push to GitHub Pages, Vercel, or Netlify.

## 🎨 Configuration

All customizations happen in `config.js`.

### Personal Details
```javascript
githubUsername: "Marius4lui", // Your GitHub username
logoText: "M4L.",           // Text in top left
```

### Colors
You can change the entire theme by modifying the `theme` object.
```javascript
theme: {
    accentColor: "#D4FF00", // The main neon color
    textColor: "#ffffff",
    secondaryColor: "#aaaaaa",
    backgroundColor: "#050505"
}
```

### Ventures
Add your external projects to the `ventures` array. If you leave this array empty, the section will automatically hide.
```javascript
ventures: [
    {
        title: "My App",
        description: "What it does...",
        tag: "SAAS",
        url: "https://myapp.com"
    }
]
```

## 📄 License

MIT License. Free to use for your own portfolio.
