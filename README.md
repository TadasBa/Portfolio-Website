
# Portfolio & Blog

A personal portfolio and blog website built with **React** and **CSS**, deployed using **GitHub Pages**. This project showcases my skills and projects I have already worked on.

🌐 **Live Site:** [https://tadasba.github.io/Blog/](https://tadasba.github.io/Blog/)

## 📌 Features

- Custom built with React, without templates or UI frameworks
- Responsive layout
- Separate sections: Home, About, Blog, Projects
- Blog post viewer
- Social/contact icons (GitHub, email, LinkedIn)
  
## ⚙️ Tech Stack

| Technology | Purpose                         |
|------------|----------------------------------|
| React      | Frontend framework               |
| CSS        | Styling                          |
| GitHub Pages | Static deployment              |
| npm        | Dependency and build management  |

## 🚀 Running the Project Locally

1. **Clone the repo:**

   ```bash
   git clone https://github.com/TadasBa/Blog.git
   cd Blog
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm start
   ```

   This will run the app at `http://localhost:3000`.

---

## 🌍 Deployment — GitHub Pages

This project uses `gh-pages` to deploy.

### 🛠 Initial Setup (if not already done):

```bash
npm install gh-pages --save-dev
```

Add these lines to `package.json`:

```json
"homepage": "https://TadasBa.github.io/Blog",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

### 🚀 Deploy to GitHub Pages:

```bash
npm run deploy
```

> It will build the app and push the contents of the `build/` folder to the `gh-pages` branch.

## ✍️ Editing Content

### ➕ Adding Blog Posts

- Add new entries in `src/pages/BlogPost.js`

### ➕ Adding Projects

- Modify `Project.js` and `Projects.js` in `src/pages/`.

