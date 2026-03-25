# Stitch Prompt Builder

Use this template to craft the Stitch prompt from research.json and design-context.json.

Fill in every `[bracketed]` item with real data. Never leave placeholders in the final prompt.

---

## Prompt Template

```
Design a single, high-converting B2B landing page for [Company Name].

OBJECTIVE: The sole purpose of this page is to get visitors to [CTA action — e.g., "book a demo", "start a free trial", "schedule a call"]. Every design decision should support this goal.

CONTEXT: This page is the destination for a cold email campaign targeting [target audience description]. The email angle is: [email angle / pain point being solved]. The page must immediately validate that they're in the right place.

BRAND:
- Primary color: [hex]
- Secondary color: [hex]
- Accent/CTA color: [hex — should be high contrast, different from primary]
- Font family: [font name, e.g., "Inter" or "Plus Jakarta Sans"]
- Visual tone: [3-4 adjectives, e.g., "professional, clean, modern, trustworthy"]

PAGE SECTIONS (in this exact order):

1. HERO (above the fold — most important section)
   - H1: "[Specific benefit-focused headline — e.g., 'Close 40% More Deals Without Extra Headcount']"
   - Subheadline: "[One sentence explaining HOW — e.g., 'Acme's AI surfaces the 3% of prospects ready to buy today, so your team calls warm leads, not cold ones']"
   - Primary CTA button: "[CTA text]" — make it large, high-contrast, center or left-aligned
   - Supporting element: [social proof line like "Trusted by 500+ revenue teams" or a relevant stat]

2. SOCIAL PROOF BAR
   - Client logos: [Company A, Company B, Company C, Company D — or "logos of well-known B2B companies"]
   - Caption: "Trusted by teams at [type of companies]"

3. PROBLEM / STAKES SECTION
   - Headline: "[Agitate the pain point addressed in the cold email]"
   - 3 pain points: [list the specific problems your ICP faces]
   - Brief: just cards or a short list, no paragraphs

4. SOLUTION / BENEFITS SECTION
   - Headline: "[Company Name] solves this with [mechanism]"
   - 3–4 benefit cards with icons:
     - [Benefit 1]: [one-line explanation]
     - [Benefit 2]: [one-line explanation]
     - [Benefit 3]: [one-line explanation]
     - [Benefit 4 if applicable]
   - Focus on OUTCOMES, not features

5. HOW IT WORKS (optional — include if product has a clear 3-step process)
   - Numbered steps: "1. [Step] → 2. [Step] → 3. [Result]"
   - Keep it simple, no more than 3 steps

6. TESTIMONIAL / SOCIAL PROOF
   - One strong testimonial: "[Quote]" — [Name, Title, Company]
   - OR a stat callout: "[X]% increase in [outcome]" with a one-line explanation

7. FINAL CTA SECTION
   - Headline: "[Urgency or value reinforcement — e.g., 'Ready to fill your pipeline with warm leads?']"
   - Subtext: "[Remove friction — e.g., 'No credit card required. Set up in 10 minutes.']"
   - CTA button: "[same CTA text as hero]"

DESIGN REQUIREMENTS:
- NO navigation menu (this is a dedicated landing page, not a website)
- Minimal footer: just the company logo + "© 2025 [Company Name]" + optional privacy link
- CTA button must appear at least 3 times: hero, mid-page, final section
- Mobile-first responsive layout
- Clean whitespace — not cramped, sections should breathe
- High contrast CTA button (use the accent color)
- The page should load fast: use web fonts from Google Fonts, no heavy images unless provided

OUTPUT: A complete single-page HTML file with all CSS inline or in a `<style>` block. Include Tailwind CSS via CDN for responsive utilities. The file should be self-contained and work when opened directly in a browser.
```

---

## After Filling the Template

1. Save the filled prompt to `workspace/[slug]/stitch-prompt.txt`
2. Run `/enhance-prompt` skill on it to optimize for Stitch's format
3. The enhanced version is what gets passed to `build_site` or used in Refined Mode

## Common Mistakes to Avoid

- Using vague tone words like "professional" alone — always pair with specific ones
- Leaving `[Company Name]` as placeholder — Stitch will generate generic output
- Generic CTAs like "Learn More" or "Get Started" — use specific action words
- Not specifying the no-nav requirement — Stitch defaults to full website navigation
- Forgetting the mobile-first requirement
