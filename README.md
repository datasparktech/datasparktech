# DataSpark Tech LLC — Website

A 7-page static site: Home, Services, Portfolio, Pricing, About, Careers, Contact.
Pure HTML/CSS/JS — no build step, no framework. Works on GitHub Pages, Netlify, or any static host as-is.

## File structure

```
/
├── index.html
├── services.html
├── portfolio.html
├── pricing.html
├── about.html
├── careers.html
├── contact.html
├── .nojekyll
└── assets/
    ├── css/style.css
    ├── js/main.js
    └── img/ (logo, badge icon, favicon)
```

## Easiest way to go live: Netlify Drop

1. Go to **app.netlify.com/drop**
2. Drag this whole folder onto the page
3. You get a live URL in seconds
4. Sign up (free) to keep the site and connect your domain: **Domain settings → Add a domain → datasparktech.com**, then add the DNS records Netlify gives you at your domain registrar.

## Alternative: GitHub Pages

1. Push these files to a new GitHub repo (root of the repo, or a `docs/` folder).
2. **Settings → Pages → Source: Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
3. Your site is live at `https://<your-username>.github.io/<repo-name>/` within a minute or two.
4. For the custom domain: **Settings → Pages → Custom domain**, enter `datasparktech.com`, then add these DNS records at your registrar:
   - A records (root domain) → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - CNAME record (`www`) → `<your-username>.github.io`

## Current contact info used on the site

- **Email**: connect@datasparktech.com (contact page + the "Send project details" form both point here)
- **Location**: Dallas, TX
- **Careers email**: careers@datasparktech.com

Update these directly in `contact.html`, `about.html`, `careers.html`, and `assets/js/main.js` if they change.

## Things to fill in before a public launch

- **Portfolio page**: the 4 case studies are illustrative samples (generic company descriptions, plausible outcomes) meant to show the kind of work you do. Swap in real projects, with client permission, as you complete them.
- **Testimonials** (bottom of Home page): sample quotes in the same spirit — replace with real client feedback as it comes in.
- **Careers page**: role list is generic/evergreen; update with actual current openings if you're actively hiring.
- **Contact form**: opens the visitor's email client with a pre-filled message to `connect@datasparktech.com` — no backend required. If you'd rather have submissions land silently in an inbox or CRM, swap in a form service like Formspree, or connect a backend.

## Editing content

There's no CMS — edit the HTML files directly. Nav and footer are duplicated across all 7 pages (by design, so the site works with zero build tooling); if you rename a page or change the nav, update it in all files, or ask me to regenerate them.
