# TECHFEST 2026 🚀

**Where Humans, AI and Innovation Converge**

A production-ready, fully immersive 3D interactive website for TECHFEST 2026 — the world's most ambitious technology festival experience. Built with a cyberpunk aesthetic, holographic UI, and cutting-edge web technologies.

---

## 🌐 Live Preview

> Open `index.html` in any modern browser for the full experience.
> **No build step required — runs entirely in the browser.**

---

## ✨ Features

### 3D & Visual
- Interactive 3D cyborg head built with Three.js (mouse-driven rotation, breathing, glowing eyes)
- Dynamic lighting with cyan, purple, and blue point lights
- Rotating energy rings around the 3D model
- Floating holographic particle system (200+ particles)
- Neural network background animation (About & Hero sections)
- Pulsing quantum particle grid (Tech Domes section)
- Animated energy rings (Registration section)
- Scanline and grid overlay effects

### Scroll Experience
- GSAP ScrollTrigger-powered animations throughout
- Staggered reveal animations for all card grids
- Parallax effects on hero content and holographic card
- Timeline progress bar driven by scroll position
- Camera movement on the hero scene reacting to scroll
- Section-by-section fade and slide animations

### Interactive UI
- Custom animated cursor (desktop only)
- Magnetic button effect on CTA elements
- 3D card tilt effect on hover (all cards)
- Touch-enabled image gallery carousel with auto-scroll
- FAQ accordion with smooth height transitions
- Hamburger menu for mobile with animated icon
- Typing effect on hero subtitle
- Mouse-follow scan line on hero section

### Sections
1. **Preloader** — AI boot sequence with animated bar, particle canvas, and boot log
2. **Hero** — Fullscreen 3D scene, animated title, stats counter, scroll hint
3. **About** — Animated holographic card, badges, neural network background
4. **Event Highlights** — 6 interactive holographic event cards
5. **Speakers** — 6 speaker cards with avatar rings and topic info
6. **Timeline** — 4-day roadmap with scroll-driven progress line
7. **Tech Domes** — 6 interactive domain domes with orbit animations
8. **Gallery** — Draggable carousel with touch support and auto-play
9. **FAQ** — Animated accordion system
10. **Registration CTA** — 3 pricing tiers with featured card, energy ring canvas
11. **Footer** — Full links, social buttons, contact info

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| HTML5 | — | Semantic structure, accessibility |
| CSS3 | — | Custom properties, glassmorphism, animations |
| JavaScript (ES6+) | — | All interactivity and logic |
| Three.js | r128 | 3D hero scene, materials, lighting |
| GSAP | 3.12.2 | Scroll animations, tweens |
| ScrollTrigger | 3.12.2 | Scroll-driven animation plugin |
| Google Fonts | — | Orbitron, Rajdhani, Share Tech Mono |

> All libraries loaded from CDN — no npm/node required.

---

## 📁 Folder Structure

```
techfest2026/
├── index.html      # Full HTML structure (11 sections)
├── style.css       # Complete styling (~700 lines)
├── script.js       # All JS logic (~500 lines, 23 modules)
└── README.md       # This file
```

---

## 🚀 Installation & Running

### Option 1: Open directly
```bash
# Simply open in browser
open index.html
# Or double-click index.html in your file explorer
```

### Option 2: Local server (recommended for best performance)
```bash
# Python
python3 -m http.server 8080

# Node.js
npx serve .

# VS Code
# Install "Live Server" extension → Right-click index.html → "Open with Live Server"
```

Then visit: `http://localhost:8080`

---

## 🌍 Deployment

### GitHub Pages
```bash
git init
git add .
git commit -m "TECHFEST 2026 launch"
git branch -M main
git remote add origin https://github.com/yourusername/techfest2026.git
git push -u origin main
# Enable GitHub Pages in repo Settings → Pages → main branch
```

### Netlify (Drag & Drop)
1. Visit [netlify.com](https://netlify.com)
2. Drag the `techfest2026/` folder onto the deploy area
3. Done — live in seconds

### Vercel
```bash
npx vercel --prod
```

### Any Static Host
Upload all 3 files (`index.html`, `style.css`, `script.js`) to any static hosting:
- Cloudflare Pages
- Firebase Hosting
- AWS S3 + CloudFront
- Render (Static Site)

---

## 🎨 Design System

### Color Palette
| Name | Hex | Usage |
|---|---|---|
| Cyan | `#00ffff` | Primary accent, glow effects |
| Blue | `#0077ff` | Gradients, buttons |
| Purple | `#b400ff` | Secondary accent |
| Magenta | `#ff00cc` | Highlights |
| Green | `#00ff88` | Status indicators |
| Background | `#020408` | Main dark background |

### Typography
- **Orbitron** — Headings, logo, CTAs (futuristic display)
- **Rajdhani** — Body text (clean, technical)
- **Share Tech Mono** — Code labels, tags, UI metadata

---

## 📸 Screenshots

> _Place your screenshots here after taking them:_

| Section | Preview |
|---|---|
| Preloader | `screenshots/preloader.png` |
| Hero | `screenshots/hero.png` |
| Highlights | `screenshots/highlights.png` |
| Speakers | `screenshots/speakers.png` |
| Tech Domes | `screenshots/domes.png` |
| Registration | `screenshots/register.png` |

---

## ♿ Accessibility

- Semantic HTML5 elements (`<nav>`, `<section>`, `<article>`, `<footer>`)
- ARIA labels on interactive elements
- `aria-expanded` on accordions and mobile menu
- `aria-label` on gallery navigation buttons
- Keyboard-navigable links and buttons
- Skip cursor on mobile (touch devices)

---

## ⚡ Performance Tips

- Three.js scene pauses rendering when hero section is out of viewport
- Particle counts optimized for 60fps on mid-range hardware
- `Math.min(devicePixelRatio, 2)` cap on renderer pixel ratio
- CSS `will-change` avoided to prevent excess GPU layers
- GSAP ScrollTrigger used instead of scroll event listeners for efficiency

---

## 📄 License

MIT License — free to use, modify, and deploy for personal or commercial projects.

---

## 🤝 Contributing

Built as a showcase project. PRs welcome for:
- Additional 3D sections
- WebGL shader effects
- Backend integration (registration form)
- Dark/light mode toggle
- Internationalization (i18n)

---

**TECHFEST 2026** · Hyderabad, India · March 15–18, 2026  
📧 hello@techfest2026.io · [techfest2026.io](https://techfest2026.io)
