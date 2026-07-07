# ⚛️ Tekkadan Labs

**Think Different. Do Different.**

The official website for **Tekkadan Labs** — a student-run research and innovation community exploring AI/ML, game design, space science, data science, physics, environmental science, digital ethics, and psychology. Built with Flask and a heavily animated, atom-themed front end.

---

## ✨ Features

- ⚛️ **3D animated atomic logo** — an SVG nucleus with orbiting electron rings in the navbar, built with CSS/SVG animation (no external 3D library required).
- 🌀 **3D hero atom animation** — an orbiting-electron atom visual on the homepage hero section.
- 🎴 **3D card slider** — an interactive, auto-playing stacked card carousel showcasing each research field (AI & ML, Game Design, Space & Astronomy, Data Science, Physics, Environmental Science, Digital Ethics, Psychology), navigable by buttons, arrow keys, or autoplay, with hover-to-pause.
- 🌍 **Interactive world map** (via amCharts 4) plotting Tekkadan's global community presence across 10 countries.
- ⌨️ **Typewriter quote rotator** — cycles through educational quotes with type/erase animation.
- 🔢 **Animated stat counters** — eased count-up animation for members, projects, lines of code, etc., triggered on scroll.
- 🪄 **Scroll-reveal animations** for cards and sections using `IntersectionObserver`.
- 🍔 **Responsive burger-menu navigation** for mobile.
- 📬 **Contact form** with backend handling via Flask (`/contact`, `/send_message`).
- 🔐 **Sign-up / Sign-in pages** with a detailed multi-step membership application form (skills, interests, values, self-rating sliders).
- 🖱️ Right-click protection on images.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python (Flask), Jinja2 templates |
| Frontend | HTML5, CSS3, vanilla JavaScript |
| Charts / Maps | amCharts 4 (core, maps, world geodata, dark + animated themes) |
| Icons | Font Awesome 7 |
| Deployment | Vercel (`@vercel/python`, see `vercel.json`) |

---

## 📁 Project Structure

Flask expects templates and static assets in specific folders. Arrange the uploaded files like this before running or deploying:

```
tekkadan-labs/
├── app.py
├── vercel.json
├── requirements.txt          # create this — see below
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── about.html
│   ├── contact.html
│   ├── signin.html
│   └── signup.html
└── static/
    ├── css/
    │   ├── style.css
    │   └── auth.css
    ├── js/
    │   ├── script.js
    │   └── login.js
    └── images/
        ├── logo.jpg
        ├── uzi.jpg
        ├── wajahat.jpg
        ├── ig.jpg
        └── ln.png
```

> `base.html` references `url_for('static', filename='css/style.css')`, `js/script.js`, and `images/logo.jpg` — those exact subfolders are required for the links to resolve. `signin.html`/`signup.html` currently don't link `auth.css` or `login.js` in their markup; add `<link>`/`<script>` tags for them in those templates (or in `base.html`) once they're in place.

---

## 🚀 Getting Started (Local Development)

1. **Install Python 3.9+** if you don't already have it.
2. **Create a `requirements.txt`:**
   ```
   Flask
   ```
3. **Set up a virtual environment and install dependencies:**
   ```bash
   python -m venv venv
   source venv/bin/activate      # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
4. **Run the app:**
   ```bash
   python app.py
   ```
5. Visit **http://localhost:5000** in your browser.

---

## 🌐 Routes

| Route | Method(s) | Description |
|---|---|---|
| `/` | GET | Homepage — hero, field previews, card slider, world map, quotes, counters |
| `/about` | GET | About page — mission and team |
| `/contact` | GET, POST | Contact form (submissions currently print to console) |
| `/send_message` | POST | Handles contact form submission |
| `/signup` | GET | Membership application form |
| `/signin` | GET | Login page |

> **Note:** the contact form currently only prints submitted messages to the server console (`print(...)` in `app.py`). To actually receive messages, wire this up to an email service (e.g. Flask-Mail, SendGrid) or save submissions to a database.

> **Note:** sign-up/sign-in forms are front-end only right now — there's no backend route handling form submission, authentication, or user storage yet. You'll need to add a `/signup` POST handler and a database (or auth provider) before accounts actually work.

---

## ☁️ Deployment (Vercel)

This project already includes a `vercel.json` configured to run the Flask app via `@vercel/python`.

1. Push the project (with the folder structure above) to GitHub.
2. Go to [vercel.com](https://vercel.com) → **New Project** → import your GitHub repo.
3. Vercel will detect `vercel.json` and deploy `app.py` as a Python serverless function automatically.
4. Once deployed, you'll get a live URL (e.g. `tekkadan-labs.vercel.app`).

Make sure `requirements.txt` is present in the repo root — Vercel needs it to install Flask during the build.

---

## 🧩 Roadmap / Ideas

- Connect the contact form to a real email or database backend.
- Add authentication (sessions, password hashing) for sign-up/sign-in.
- Store membership applications in a database instead of discarding form data.
- Add a `/team` or `/projects` page as the community grows.

---
Team
- **Wajahat Zahid** 

---

## 📍 Location

Rawalpindi, Pakistan


