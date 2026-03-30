# Landing Page Builder

## About This Project

This project builds high-quality, conversion-optimized landing pages for B2B cold email campaigns. Input: client website URL + description + objective. Output: a polished, deployed landing page on a client subdomain (e.g., `page.clientdomain.com`).

**Business model:** Build fast during campaign on central Vercel infrastructure. After the campaign, optionally upsell the client on ownership — spin off into their own repo + Vercel with `/spin-off`.

**Infrastructure:**
- GitHub: https://github.com/Bleed-AI/landing-page-builder
- Vercel: https://landing-page-builder-dun.vercel.app
- Deploy: `cd` to project root and run `vercel --yes` after pushing, or `git push` once GitHub is connected in Vercel dashboard

---

## Available Tools

- **Stitch MCP** — `build_site`, `get_screen_code`, `get_screen_image` (design generation via Gemini)
- **WebFetch** — Fetch and parse client websites
- **WebSearch** — Research companies, reviews, competitors
- **Chrome (claude-in-chrome)** — Visual inspection, screenshots
- **taste-skill** — Design quality standards
- **enhance-prompt** (stitch-skills) — Optimize prompts for Stitch
- **stitch-design** (stitch-skills) — Prompt enhancement + Stitch MCP call in one step
- **design-md** (stitch-skills) — Extract design tokens from existing sites

---

## Directory Structure

```
clients/[slug]/          ← Deployed landing pages (tracked in git, served by Vercel)
  index.html             ← The landing page
  assets/                ← Client-specific images, etc.

workspace/[slug]/        ← Working artifacts (gitignored)
  research.json          ← Client research data
  stitch-prompt.txt      ← The generated + enhanced Stitch prompt
  design-context.json    ← Brand tokens (colors, fonts, style)
  stitch-raw.html        ← Raw HTML from Stitch before refinement
```

**Client slug convention:** `[company-name]` lowercase hyphenated, e.g., `acme-corp`

---

## Two Modes

### Quick Mode (Default)
Fully automated. Claude researches → crafts prompt → generates via Stitch → refines → deploys.

### Refined Mode (Human-in-the-Loop)
Claude generates the optimized Stitch prompt, user pastes it in stitch.withgoogle.com, reviews concept designs, approves one, Claude fetches it via MCP and refines/deploys.

---

## Quick Mode Pipeline

### Step 1: Gather Input
Ask the user for:
1. Client website URL
2. Brief description of what they do (or say "research it")
3. Landing page objective (book a demo / sign up / download / schedule a call / etc.)
4. Cold email context: what's the angle/hook in the emails? What problem are you solving for them?
5. Number of pages (default: 1)

### Step 2: Research the Client Website

Use WebFetch to pull:
- Homepage (root URL) — look for H1, tagline, value props, CTA text
- /about page — company story, team, mission
- /pricing page — tiers, pricing signals
- /customers or /case-studies — social proof, logos, stats

Parse from HTML:
- `<title>`, `<meta name="description">`, OG tags
- H1/H2/H3 hierarchy — their messaging framework
- CSS custom properties and inline styles — brand colors
- Google Fonts links, @font-face — typography
- Logo URL (usually in `<header>` or `<nav>`)
- Trust badges, client logos, testimonials

Use WebSearch for:
- `"[company name]" site:g2.com reviews` — social proof quotes
- `"[company name]" what is [company name]` — plain-language description
- `"[company name]" competitors` — positioning context

Save all to `workspace/[slug]/research.json`:
```json
{
  "company_name": "",
  "url": "",
  "industry": "",
  "product_description": "",
  "target_audience": "",
  "value_propositions": [],
  "key_features": [],
  "social_proof": { "testimonials": [], "client_logos": [], "stats": [] },
  "brand": {
    "primary_color": "",
    "secondary_color": "",
    "accent_color": "",
    "font_family": "",
    "logo_url": "",
    "tone": ""
  },
  "existing_cta": "",
  "objective": "",
  "email_angle": ""
}
```

### Step 3: Extract Design Context

Using the HTML fetched in Step 2:
- Extract hex color codes from CSS variables, inline styles, or `background-color` properties
- Identify font families from Google Fonts import URLs or `font-family` declarations
- Determine visual style: minimal / corporate / bold / playful / technical
- Note if they use gradients, shadows, rounded corners, etc.

Save to `workspace/[slug]/design-context.json`.

### Step 4: Craft the Stitch Prompt

Read `prompts/stitch-prompt-builder.md` and fill the template using research.json and design-context.json.

Key requirements for every Stitch prompt:
- Specify this is a **single landing page** (not a full website)
- State the primary objective and CTA text explicitly
- List sections in order: Hero → Social Proof → Features/Benefits → How It Works → Final CTA
- Include exact hex codes for colors
- Include font family names
- Use 3-4 tone adjectives
- Write specific copy for H1 and CTA (never "Headline Here")
- Mention the cold email context so the page message matches the outreach

Run `/enhance-prompt` skill to optimize for Stitch's format.

Save final prompt to `workspace/[slug]/stitch-prompt.txt`.

### Step 5: Generate via Stitch MCP

Call the `build_site` tool with the enhanced prompt. If `build_site` returns multiple screens, use `get_screen_code` on the most suitable one (usually the first full-page design).

Alternatively, invoke the `stitch-design` skill which wraps prompt enhancement + `build_site` in one call.

Save raw output to `workspace/[slug]/stitch-raw.html`.

**If Stitch MCP fails or is unavailable:** Use the fallback approach — generate HTML directly using `templates/base.html` as starting point, apply taste-skill quality standards, and proceed to Step 6.

### Step 6: Refine the Design

Transform the Stitch raw HTML into a polished, client-ready landing page:

1. **Replace all placeholder text** with real copy from research.json
   - Use the H1 from Step 4 (not Stitch's placeholder)
   - Use real feature/benefit names
   - Use real testimonials or stats from research
   - CTA button text must match the objective

2. **Inject brand assets**
   - Replace placeholder colors with client's exact hex codes
   - Replace placeholder fonts with client's font family
   - Reference client's logo URL in the header
   - Match the tone of their existing site

3. **Apply taste-skill standards** (invoke taste-skill):
   - Typography hierarchy: H1 > H2 > body, clear visual weight
   - Adequate whitespace between sections (not cramped)
   - CTA buttons: high contrast, visually prominent, above the fold
   - Smooth hover states on buttons and links
   - Consistent spacing rhythm throughout

4. **Ensure responsiveness:**
   - Mobile-first layout
   - CTA visible above fold on mobile
   - Text readable at 320px
   - Images scale properly

5. **Add technical requirements:**
   - `<meta charset="UTF-8">`
   - `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
   - `<title>[Benefit-focused headline] | [Company Name]</title>`
   - `<meta name="description">` — one sentence, includes the CTA
   - OG tags (og:title, og:description, og:image placeholder)
   - Google Analytics placeholder comment
   - Smooth scroll behavior

### Step 7: Quality Audit

Run through `prompts/design-audit.md` checklist. Fix every failing item before proceeding.

### Step 8: Deploy

1. Save final HTML to `clients/[slug]/index.html`
2. Create `clients/[slug]/assets/` if any assets are referenced
3. **Add host-specific rewrites to `vercel.json`** for the client's custom domain (e.g. `join.clientdomain.com`). Add these two entries at the top of the `rewrites` array, before the generic rules:
```json
{
  "source": "/",
  "has": [{ "type": "host", "value": "join.clientdomain.com" }],
  "destination": "/clients/[slug]/index.html"
},
{
  "source": "/:path*",
  "has": [{ "type": "host", "value": "join.clientdomain.com" }],
  "destination": "/clients/[slug]/:path*"
}
```
4. Git add, commit: `"Add landing page for [company name]"`
5. Git push (triggers Vercel auto-deploy)
6. Vercel will deploy to: `https://[vercel-project].vercel.app/[slug]`

### Step 9: Deliver

Present to the user:
```
✅ Landing page built for [Company Name]

Preview URL: https://[vercel-project].vercel.app/[slug]

DNS Setup for client:
  Add CNAME: page.[clientdomain.com] → cname.vercel-dns.com
  Then in Vercel dashboard: add custom domain page.[clientdomain.com]

Sections built:
  - Hero: [headline]
  - Social Proof: [what's there]
  - Features: [list]
  - How It Works: [if present]
  - CTA: [button text]

File: clients/[slug]/index.html
```

---

## Refined Mode Pipeline

Steps 1–4 are identical to Quick Mode. Then:

**Step 4.5: Present Prompt to User**
```
Here's your optimized Stitch prompt. Paste it at stitch.withgoogle.com:

---
[paste the full enhanced prompt]
---

Instructions:
1. Go to stitch.withgoogle.com
2. Click "New Design" and paste the prompt
3. Stitch will generate 2-3 concept designs
4. Pick your favorite
5. Come back and tell me which concept you chose (or "all good" to use the first one)
```

**Step 5 (Refined): Fetch Approved Design**
After user confirms their choice:
- Use `get_screen_code` with the screen ID from the Stitch project to retrieve the HTML
- Or if user exports manually, they paste the HTML back

Steps 6–9 proceed identically to Quick Mode.

---

## B2B Landing Page Best Practices

These must be reflected in every page built:

**Conversion:**
- Single primary CTA — no competing actions
- CTA above the fold (visible without scrolling)
- Social proof within first scroll (logos, stats, or a testimonial)
- Benefits language in the hero, not feature lists
- Specific, credible claims (numbers beat adjectives)
- Urgency or clear next-step language in the final CTA section

**Messaging:**
- The page H1 should echo the email subject or hook
- Subheadline explains HOW they deliver the benefit
- Copy addresses the specific ICP pain point from the email angle
- No navigation menu (reduces exit paths)
- Minimal footer (just logo + privacy link if needed)

**Design:**
- Clean, scannable layout — visitor should grasp the offer in 5 seconds
- High-contrast CTA button (different color from everything else)
- Whitespace is intentional — don't pack sections
- Mobile CTA is thumb-reachable (bottom-center on mobile)

---

## Error Handling

| Issue | Action |
|---|---|
| Client site blocks WebFetch (403) | Use Chrome browser tools to visit and screenshot. Extract visible text manually. |
| Brand colors not in CSS | Ask user to provide hex codes, or use their logo colors as primary. |
| Stitch MCP returns error | Fall back to direct HTML generation using `templates/base.html` + taste-skill. |
| Stitch output has lorem ipsum | Step 6 replaces ALL placeholder text. Never ship with lorem ipsum. |
| Page not mobile responsive | Re-add Tailwind CDN and restructure with mobile-first classes. |

---

## DNS Setup Instructions (for client handoff)

When delivering to a client, include these instructions:

```
To connect your landing page to your domain:

1. Log into your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.)
2. Go to DNS settings for [clientdomain.com]
3. Add a new CNAME record:
   - Type: CNAME
   - Name/Host: page  (or whatever subdomain you want)
   - Value/Target: cname.vercel-dns.com
   - TTL: Auto/3600

4. Send me a message once you've added it — I'll add the custom domain
   in Vercel and it will be live within minutes.
```
