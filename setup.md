# One-Time Setup Instructions

Run these commands once in your terminal to complete the skills installation.

## 1. Install Taste Skill (design quality)

```bash
npx skills add https://github.com/Leonxlnx/taste-skill
```

When prompted, select these skills:
- taste-skill ✓
- stitch-skill ✓
- soft-skill ✓
- output-skill ✓
- minimalist-skill ✓ (optional)

Installation method: **Claude Code (global)**

## 2. Install Stitch Agent Skills

```bash
npx skills add google-labs-code/stitch-skills --skill enhance-prompt --global
npx skills add google-labs-code/stitch-skills --skill stitch-design --global
npx skills add google-labs-code/stitch-skills --skill design-md --global
```

## 3. Set Up GitHub + Vercel (do once)

### GitHub
1. Create a new repo: `github.com/new`
2. Name: `landing-page-builder`
3. Private or Public (your choice)
4. Don't initialize with README

Then in this folder:
```bash
git remote add origin https://github.com/[your-github-username]/landing-page-builder.git
git add .
git commit -m "Initial setup"
git push -u origin main
```

### Vercel
1. Go to vercel.com → New Project
2. Import from GitHub → select `landing-page-builder`
3. Framework: Other
4. Root directory: leave as `/`
5. Click Deploy

Note your Vercel deployment URL (e.g., `landing-page-builder-xxxx.vercel.app`).

## 4. Verify Stitch MCP

Restart Claude Code in this project directory. The Stitch MCP server should connect automatically (it's already configured with your API key).

You can verify by starting a conversation and checking if `build_site`, `get_screen_code`, and `get_screen_image` tools appear available.

## 5. Start Building!

Run `/landing-page` in Claude Code and provide your first client details.
