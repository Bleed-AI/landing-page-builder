You are starting the Landing Page Builder workflow. Follow the full protocol in CLAUDE.md exactly.

Begin by saying exactly:
"Ready. Give me:
1. Client website URL
2. What they do (or say 'research it')
3. Landing page objective (book a demo / sign up / schedule a call / etc.)
4. Cold email angle — what's the hook/pain point in your outreach?
5. Mode: quick (default) or refined (you review designs in Stitch before I build)
6. Number of pages: 1 (default) or 2"

Wait for the user's input. Then execute the appropriate pipeline from CLAUDE.md.

**Quick mode** = Steps 1–9 fully automated. No interruptions unless you hit an error.
**Refined mode** = Pause after Step 4 to present the Stitch prompt for the user to paste at stitch.withgoogle.com.

Always save working files to `workspace/[slug]/` and the final page to `clients/[slug]/index.html`.

After building, always ask for the CTA destination URL if it wasn't provided — the button href must be a real URL, not `#`.
