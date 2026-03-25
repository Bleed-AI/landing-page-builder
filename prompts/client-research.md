# Client Research Protocol

When researching a client website, extract the following. Use WebFetch as primary tool, WebSearch to fill gaps.

## Pages to Fetch

1. `[base-url]/` — Homepage (most important)
2. `[base-url]/about` or `/about-us` — Company story, team size, mission
3. `[base-url]/pricing` — Pricing tiers, target market signals
4. `[base-url]/customers` or `/case-studies` or `/testimonials` — Social proof
5. `[base-url]/features` or `/product` — Product detail

## What to Extract from Each Page

### From Homepage HTML:
- `<title>` tag text
- `<meta name="description">` content
- `<h1>` — their primary headline (their positioning statement)
- `<h2>` tags in hero — subheadline
- CTA button text (usually in `<a>` or `<button>` in the hero)
- Client logo URLs (in `<header>` or `<nav>`, look for `<img>` with "logo" in src)
- Any customer logo section (trust section)
- Stats/numbers mentioned (e.g., "10,000+ customers", "99.9% uptime")

### From CSS (inline styles or `<style>` blocks):
- CSS custom properties: `--primary`, `--color-primary`, `--brand-color`, etc.
- Background colors on hero/header sections
- Button background colors
- Font family declarations or Google Fonts import URLs

### Brand Tone Signals:
- Formal/corporate vs casual/friendly?
- Technical/developer-focused vs business/executive?
- Bold/aggressive vs subtle/elegant?
- Keywords they repeat across pages

## WebSearch Queries to Run

```
"[company name]" site:g2.com OR site:capterra.com
"[company name]" what does [company name] do
"[company name]" customers OR clients
```

## Output Format

Save to `workspace/[slug]/research.json`:

```json
{
  "company_name": "Acme Corp",
  "url": "https://acme.com",
  "industry": "B2B SaaS / Sales Intelligence",
  "product_description": "One-sentence plain-English description",
  "target_audience": "Who they sell to (role, company size, industry)",
  "value_propositions": [
    "VP1: Save X hours per week",
    "VP2: Increase pipeline by Y%"
  ],
  "key_features": [
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ],
  "social_proof": {
    "testimonials": [
      { "quote": "...", "author": "Name", "title": "Title, Company" }
    ],
    "client_logos": ["Company A", "Company B"],
    "stats": ["500+ customers", "$2M saved annually"]
  },
  "brand": {
    "primary_color": "#1a1a2e",
    "secondary_color": "#16213e",
    "accent_color": "#0f3460",
    "cta_color": "#e94560",
    "font_family": "Inter",
    "logo_url": "https://acme.com/logo.svg",
    "tone": "professional, modern, data-driven"
  },
  "existing_cta": "Start Free Trial",
  "objective": "Book a demo",
  "email_angle": "Helping [ICP role] at [company type] solve [specific pain point]"
}
```

## Notes

- If colors aren't in CSS, check the logo for dominant colors or ask Taha
- If no testimonials found, use stats or generic social proof placeholder
- Never guess specific stats — mark as `"[verify]"` if uncertain
- The `email_angle` comes from Taha, not the website — always ask if not provided
