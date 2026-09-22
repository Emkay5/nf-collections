# NF Collections — Digital Presence Project

A responsive, multi-page frontend website for **NF Collections**, a fashion brand by **Nana Firdausi Asabi** dealing in clothing, shoes, bags and jewelry.

Built for the Digital Presence Final Project (HTML, CSS, AI-assisted development, Git/GitHub, Vercel deployment).

## Live links

- **Live site (Vercel):** _add your deployed URL here after Step 5 below_
- **GitHub repository:** _add your repo URL here_

## Pages

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero, category highlights, founder statement, CTA |
| About | `about.html` | Brand story, founder bio, values |
| Shop | `shop.html` | Product grid for clothing, shoes, bags and jewelry with category filters |
| Gallery | `gallery.html` | Lookbook-style image gallery with filters |
| Contact | `contact.html` | Frontend-only contact form, studio info, socials |

## Technologies used

- **HTML5** — semantic structure across 5 pages
- **CSS3** — custom design system (CSS variables, Grid, Flexbox), fully responsive (mobile / tablet / desktop)
- **JavaScript (vanilla)** — mobile nav toggle, shop/gallery category filters, contact form validation + confirmation message
- **Google Fonts** — Fraunces (display serif) + Work Sans (body)
- **Unsplash** — royalty-free photography (Unsplash License — free for commercial use, no attribution required)
- **Git & GitHub** — version control
- **Vercel** — static hosting / deployment

## Project structure

```
nf-collections/
├── index.html
├── about.html
├── shop.html
├── gallery.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── logo-full.svg      (nav / footer logo)
│   └── logo-mark.svg      (favicon / monogram)
└── README.md
```

## Design notes

- Palette: ink black, ivory, a wine-red accent and a muted gold — chosen to read as a boutique fashion label rather than a generic tech template.
- Typography: Fraunces (serif) for headlines, Work Sans (sans) for body copy.
- Product photography is placeholder Unsplash imagery grouped by category (clothing, shoes, bags, jewelry) — swap in real product photos before final submission.

## Running locally

No build step required — it's plain HTML/CSS/JS.

1. Download or clone the repo.
2. Open `index.html` in a browser, **or** run a local server (recommended, so relative paths behave exactly like production):
   ```bash
   npx serve .
   ```
3. Visit the printed local URL.

## Credits

- Photography: Unsplash contributors QingYu, Tom The Photographer, Karina Khalmetova, Zayed Ahmed Zadu, Vitaly Gariev — used under the [Unsplash License](https://unsplash.com/license).
- Fonts: Fraunces and Work Sans via Google Fonts (Open Font License).
