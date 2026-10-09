# Pallav Mishra — Portfolio Website

A responsive, static HTML/CSS/JavaScript portfolio website. It has **no build step and no package installation requirement**. The repository root contains `index.html`, so it can be imported directly into Netlify or Vercel.

## Project structure

```text
.
├── index.html
├── case-studies/
│   ├── index.html
│   └── *.svg
├── services/
│   └── index.html
├── assets/
│   ├── css/site.css
│   ├── js/site.js
│   ├── fonts/
│   └── img/
├── netlify.toml
├── .gitignore
└── README.md
```

## Deploy to GitHub

1. Sign in to GitHub and create a **new empty repository** named `pallav-mishra-portfolio` (do not add a README, license, or `.gitignore` during creation).
2. Extract this ZIP. Open Terminal and `cd` into the extracted `pallav-mishra-portfolio-github` folder.
3. Run the following commands, replacing `YOUR-GITHUB-USERNAME` with your GitHub username:

```bash
git init
git add .
git commit -m "Initial portfolio website"
git branch -M main
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/pallav-mishra-portfolio.git
git push -u origin main
```

If Git asks you to authenticate, complete the browser sign-in or use GitHub's recommended authentication method. Never put a password or access token into the repository or source files.

## Deploy from GitHub to Netlify

1. In Netlify, choose **Add new site → Import an existing project**.
2. Select GitHub and authorize access to `pallav-mishra-portfolio`.
3. Use these settings:
   - **Base directory:** leave blank / repository root
   - **Build command:** leave blank
   - **Publish directory:** `.` (repository root)
4. Deploy. `netlify.toml` also sets the publish directory to the repository root.

## Deploy from GitHub to Vercel

1. In Vercel, choose **Add New → Project** and import `pallav-mishra-portfolio` from GitHub.
2. Set **Framework Preset** to **Other** if it is not detected automatically.
3. Leave the **Build Command** blank and set **Output Directory** to `.` / repository root.
4. Deploy. No `npm install` or build command is required for this static site.

Both platforms can automatically redeploy whenever you push updates to the connected GitHub branch.

## Before sharing publicly

- The original project notes identify two placeholder testimonials (ThreatSafe AI and Scalabl AI). Review the content in `index.html` and replace any placeholder text before publishing.
- Confirm that client names, project work, testimonials, and images are approved for public display.
- Test navigation, mobile layout, project screenshots, WhatsApp links, and all pages after deployment.
- Project preview screenshots currently rely on an external image service in some places; provide local screenshots if you want those images to work independently of that service.

## Local preview

Open `index.html` in a browser, or run a local static server from the repository root, for example:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.
