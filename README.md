# Manjushree English School — Website

Static marketing site for **Manjushree English School**, Sira — a private, co-educational English medium school established in 1994-95, following the Karnataka State Board curriculum.

**Location:** Manjushree English School, Manjunatha Nagara, Sira, Tumakuru District, Karnataka – 572137

## Tech

- Plain HTML, CSS, JavaScript — no build step
- Red & white theme with motion (respects `prefers-reduced-motion`)
- Responsive: single-column mobile layout with a full-screen side navigation
- Contact form wired to [Web3Forms](https://web3forms.com/) — replace the access key in `contact.html`

## Pages

`index.html` · `about.html` · `academics.html` · `results.html` · `achievements.html` · `sports.html` · `facilities.html` · `events.html` · `management.html` · `contact.html`

## Run locally

```bash
npx --yes http-server -p 5253 -c-1
```

Then open http://localhost:5253/

Or double-click `index.html` — all asset paths are relative, so `file://` works too.

## Before going live — fill these in

- School office phone number (currently placeholder `+91 0000000000`)
- Confirmed email address (currently `siramanjushree@yahoo.com`)
- Web3Forms access key in `contact.html`
- Real names for the Management page and any published Results / Achievements

## Deploy

Static site — drop the folder into any static host (GitHub Pages, Netlify, Cloudflare Pages, etc.).
