# madu-28-birthday
Maduakolam Collins Ugwu @ 28

# 🎀 Madu @ 28 — Birthday Website

A personalised birthday website built with pure HTML, CSS, and JavaScript. No frameworks, no build tools — just open `index.html` in a browser or deploy to GitHub Pages.

---

## 📁 Folder Structure

```
madu-birthday/
│
├── index.html              ← Main HTML file
├── README.md               ← This file
│
├── assets/
│   ├── css/
│   │   └── style.css       ← All styles
│   └── js/
│       └── main.js         ← All JavaScript
│
├── images/
│   ├── hero.jpg            ← Optional hero/profile photo
│   └── joys/
│       ├── joy-1.jpg       ← Image for Joy box #1
│       ├── joy-1b.jpg      ← Second image for Joy box #1 (optional)
│       ├── joy-2.jpg
│       └── ...             ← Repeat for all 28 boxes
│
└── videos/
    ├── joy-5.mp4           ← Video for Joy box #5 (optional)
    └── ...
```

---

## ✏️ How to Personalise

### 1. Your name & partner's name
In `index.html`, search for:
- `Your Name` → replace with your name (appears in the footer)
- `Happy Birthday, My Love` → replace with her name if you like
- `Madu` → already set throughout

### 2. Hero text
Find the `hp-hero` section and update the subtitle paragraph.

### 3. Joy box messages
Each joy box has a `data-msg="..."` attribute. Replace the placeholder text with a real memory or message for each of the 28 boxes.

### 4. Adding photos to Joy boxes

**Single image:**
```html
<img class="joy-thumb" src="images/joys/joy-1.jpg" alt=""/>
```

**Multiple images or a video (swipeable):**
```html
data-media='[
  {"type":"img",   "src":"images/joys/joy-1.jpg"},
  {"type":"img",   "src":"images/joys/joy-1b.jpg"},
  {"type":"video", "src":"videos/joy-1.mp4"}
]'
```

---

## 🚀 Deploying to GitHub Pages

1. Create a new **public** repository on GitHub
2. Upload all files keeping the folder structure intact
3. Go to **Settings → Pages**
4. Set source to `main` branch, `/ (root)` folder
5. Click **Save** — your site will be live at:
   `https://yourusername.github.io/madu-birthday/`

---

## 🎨 Colour Reference

| Variable     | Value     | Used for              |
|-------------|-----------|----------------------|
| `--rose`    | `#c8536a` | Accents, headings     |
| `--rose-dk` | `#8e2d3f` | Dark text             |
| `--blush`   | `#f5dde3` | Backgrounds           |
| `--cream`   | `#fdf6f0` | Page background       |
| `--gold`    | `#c9973a` | Pull ribbon tag       |
| `--muted`   | `#9a7080` | Secondary text        |

---

*Made with love, every pixel just for you 💕*
