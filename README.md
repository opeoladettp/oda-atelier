# ODA Atelier — one-page brand website

A responsive editorial fashion-brand landing page for ODA Atelier, based on the supplied resume and the Sample.jpg visual reference.

## Files
- `index.html` — semantic page structure, SEO metadata, Open Graph tags and JSON-LD brand schema
- `styles.css` — responsive editorial layout, typography, animations and mobile styles
- `script.js` — mobile navigation, reveal-on-scroll, subtle parallax, hover interaction and back-to-top

## Run locally
Open `index.html` in a browser, or use a local server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Before publishing
1. Replace the placeholder domain `https://www.odaatelier.com/` with the confirmed live domain.
2. Confirm the founder email and add official social profiles to the JSON-LD `sameAs` array and footer if desired.
3. Replace the editorial stock photography with licensed ODA Atelier campaign, textile and founder photographs. The current Unsplash images are visual placeholders.
4. Add a `robots.txt` and XML sitemap at the live domain, and submit the sitemap through Google Search Console and Bing Webmaster Tools.
5. Confirm that any claims about responsible/sustainable practices match the brand's actual practices before launch.

## Notes
- No newsletter or backend form is included.
- Google Material Symbols are used for interface icons.
- Motion respects `prefers-reduced-motion`; parallax is disabled on touch devices.
- Sections use viewport-aware heights on desktop and content-driven heights on smaller screens.
