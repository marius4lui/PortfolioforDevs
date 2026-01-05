<div align="center">

  <h1>⚡ Modern Developer Portfolio</h1>
  
  <p>
    <strong>A high-performance, industrial-designed portfolio template for developers.</strong><br>
    Built with Next.js 15, React 19, and a touch of Cyberpunk.
  </p>

  <p>
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js 15" /></a>
    <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React 19" /></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript" /></a>
    <a href="https://vercel.com"><img src="https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel" alt="Vercel" /></a>
  </p>

  <br />

  <img src="https://github.com/marius4lui.png" width="120" style="border-radius: 50%; border: 4px solid #D4FF00;" alt="Avatar" />
  
</div>

<br />

## ✨ Introduction

Welcome to the **Modern Developer Portfolio**. This isn't just a static HTML page; it's a dynamic application that pulls your latest work directly from GitHub. It features a bold, industrial design language that stands out from the sea of generic portfolios.

**Why this template?**
- **Zero Maintenance**: Your projects update automatically via the GitHub API.
- **Instant Setup**: Our built-in **Setup Wizard** configures the site for you in seconds.
- **Top Efficiency**: Built on the bleeding edge with Next.js 15 and Server Components (where applicable).
- **JSON Config**: All data is stored in a simple `data.json` file. No code editing required.

---

## 🚀 Features

### 🎨 Design & UI
- **Industrial Aesthetic**: Grid backgrounds, noise textures, and monospaced typography (`Syne` + `Inter`).
- **Responsive**: Flawless on Mobile, Tablet, and Desktop.
- **Animations**: Subtle, buttery smooth entrance and hover effects powered by `framer-motion`.

### 🛠️ Functionality
- **GitHub Integration**: Fetches Profile Bio, Avatar, Followers, and Top Repositories (sorted by Stars).
- **Dynamic Favicon**: Your browser tab icon is essentially your GitHub avatar.
- **Multi-Step Wizard**: A beautiful in-app setup tool to configure your username and ventures.
- **Ventures Section**: A dedicated area for your SaaS, Agencies, or non-code products.

---

## 🛠️ Quick Start

### 1. Clone
```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Run Development Server
```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000).

---

## 🔮 The "Magic" Setup

When you first launch the app, you will see a **Setup Overlay**.

1. **Step 1**: Enter your GitHub Username.
   - *The app fetches your name, splits it for the stylish Title (e.g. "MARIUS" + "4LUI"), and grabs your bio.*
   
2. **Step 2**: Add your Ventures.
   - *Add links to your other projects, startup, or social media.*

3. **Step 3**: Finish.
   - *The Wizard writes everything to `data.json` and reloads the page.*

> **Pro Tip**: To bring the Wizard back, just open `data.json` and change your username back to `marius4lui`.

---

## ⚙️ Configuration (`data.json`)

All site data is stored in `data.json` in the root directory. You can edit this file manually at any time.

```json
{
  "githubUsername": "yourname",
  "logoText": "DEV.",
  "hero": {
    "subtitle": "FULL STACK DEV",
    "title": "YOUR",          // Solid Text
    "titleSuffix": "NAME"     // Outlined Text
  },
  "ventures": [
    {
      "title": "My Startup",
      "description": "Building the future of AI.",
      "tag": "FOUNDER",
      "url": "https://example.com"
    }
  ],
  "theme": {
    "accentColor": "#D4FF00",  // The signature Lime Green
    "textColor": "#ffffff",
    "secondaryColor": "#aaaaaa",
    "backgroundColor": "#050505"
  }
}
```

---

## 📦 Tech Stack

| Tech | Description |
| :--- | :--- |
| **Next.js 15** | The React Framework for the Web. |
| **react-dom 19** | The latest React Core. |
| **TypeScript** | Type safety and better DX. |
| **Vanilla CSS** | Maximum performance, scoped via Global CSS. |
| **Framer Motion** | Declarative animations. |
| **GitHub API** | Dynamic data fetching. |

---

## ☁️ Deployment

The easiest way to deploy is **Vercel**.

1. Push your code to your GitHub repository.
2. Log in to Vercel and click **Add New...** > **Project**.
3. Import your repository.
4. Click **Deploy**.

*That's it! Your portfolio is live.*

---

<div align="center">
  <p>Created by <a href="https://github.com/marius4lui.png">Marius4lui</a></p>
  <p><i>Make it yours. Build something great.</i></p>
</div>
