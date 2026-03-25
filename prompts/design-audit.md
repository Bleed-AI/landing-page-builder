# Design Audit Checklist

Run this checklist on every landing page before deploying. Fix all failing items.

---

## Visual Quality

- [ ] **Typography hierarchy** — H1 is clearly larger than H2, H2 larger than body. No competing visual weights.
- [ ] **Whitespace** — Sections have adequate padding (at least 80px vertical). Not cramped.
- [ ] **Brand colors** — Primary/secondary colors match the client's brand. CTA button uses accent color.
- [ ] **Font loaded** — Google Fonts link is present and the correct font family is applied.
- [ ] **No placeholder text** — Zero instances of "Lorem ipsum", "Headline Here", "Your subtitle", "[Company Name]" (unfilled), etc.
- [ ] **No broken images** — All `<img>` tags either have valid src URLs or are removed. No 404 image icons.
- [ ] **CTA button contrast** — Button color is distinct from the background and section color. Passes visual contrast check.
- [ ] **Consistent spacing** — Padding/margin values follow a rhythm (e.g., multiples of 8px or Tailwind's spacing scale).

---

## Conversion Optimization

- [ ] **Above-fold CTA** — The primary CTA button is visible without scrolling on desktop (1024px+).
- [ ] **Single CTA focus** — Only one primary action on the page. No competing links, nav items, or secondary CTAs.
- [ ] **Social proof present** — At least one of: client logos, a testimonial quote, or a specific stat, within the first two sections.
- [ ] **Benefits-focused hero** — H1 communicates an outcome/benefit, not a product description or feature.
- [ ] **Specific copy** — At least one specific number/stat on the page (e.g., "40% faster", "500+ customers").
- [ ] **CTA appears 3x** — Button appears in hero, mid-page, and final section.
- [ ] **No navigation menu** — No site nav that would allow visitors to leave the page.
- [ ] **Email angle alignment** — The H1 / hero messaging connects to the cold email hook. Visitor should recognize the context.
- [ ] **Friction-reducing subtext** — Near the final CTA: "No credit card required" or "Setup in X minutes" or similar.

---

## Technical Quality

- [ ] **Valid HTML5 doctype** — `<!DOCTYPE html>` present.
- [ ] **Viewport meta tag** — `<meta name="viewport" content="width=device-width, initial-scale=1.0">` present.
- [ ] **Title tag** — `<title>` is benefit-focused and includes company name. Not generic.
- [ ] **Meta description** — Present, one sentence, includes the CTA concept.
- [ ] **OG tags** — `og:title`, `og:description` present (even if `og:image` is placeholder).
- [ ] **Responsive at 320px** — Page is usable on the smallest mobile screen. No horizontal scroll.
- [ ] **Responsive at 768px** — Tablet layout is clean. Two-column grids stack properly.
- [ ] **Responsive at 1440px** — Desktop layout fills the screen without stretching text lines too wide (max ~800px content width).
- [ ] **No external dependencies that can break** — All CSS/JS loaded from CDN with reliable uptime (Tailwind CDN, Google Fonts). No random third-party scripts.
- [ ] **Fast loading** — No large base64-encoded images. No blocking scripts in `<head>`.
- [ ] **Self-contained** — The HTML file opens correctly when accessed via `file://` protocol locally.

---

## Mobile-Specific

- [ ] **Mobile CTA visible** — CTA button is above the fold on iPhone SE (375px width).
- [ ] **Touch targets** — Buttons and links are at least 44x44px.
- [ ] **Text readable** — Body text is at least 16px on mobile.
- [ ] **Images don't overflow** — All images have `max-width: 100%`.

---

## Final Check

After fixing all issues:
1. Open the file in a browser and scroll through the full page
2. Resize the window to mobile width and check again
3. Read every word of copy — is it specific, credible, and benefit-focused?
4. Click the CTA button — does it go to the right URL? (or has a placeholder `#` that needs to be replaced)

**CTA URL placeholder reminder:** The CTA button href needs a real URL. Common options:
- Calendly link: `https://calendly.com/[handle]`
- Demo form: `https://[company].com/demo`
- Sign-up: `https://app.[company].com/signup`

Ask Taha for the correct CTA URL before deploying.
