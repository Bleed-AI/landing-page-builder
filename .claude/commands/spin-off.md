You are starting the Client Spin-Off workflow. This extracts a client's landing page from the central repo into their own standalone GitHub repository + Vercel project for ownership transfer.

Begin by asking:
"Which client do you want to spin off? Give me the client slug (e.g., `acme-corp`) or company name."

Then execute:

## Spin-Off Steps

1. **Verify the client folder exists**
   - Check that `clients/[slug]/index.html` exists
   - List what's in `clients/[slug]/` so the user can confirm

2. **Create standalone repo structure**
   Create a new folder at the repo root: `spinoffs/[slug]/`
   Copy everything from `clients/[slug]/` into it.
   Add these files to `spinoffs/[slug]/`:

   - `vercel.json`:
     ```json
     { "rewrites": [{ "source": "/:path*", "destination": "/index.html" }] }
     ```
   - `package.json`: minimal, just name + version
   - `README.md`: instructions for the client

   The README should include:
   - Brief description of what the page is
   - How to make simple text edits (edit index.html)
   - DNS setup instructions (CNAME to cname.vercel-dns.com)
   - How to add Taha as collaborator (GitHub Settings → Collaborators → add `[taha's github handle]`)

3. **Prepare GitHub repo creation instructions**
   Output step-by-step instructions for the client:
   ```
   GITHUB SETUP:
   1. Go to github.com/new
   2. Repo name: [slug]-landing-page
   3. Make it Private
   4. Don't initialize with README (we have one)
   5. Click Create Repository
   6. Then run these commands in your terminal:
      cd spinoffs/[slug]
      git init
      git add .
      git commit -m "Initial landing page"
      git remote add origin https://github.com/[client-github]/[slug]-landing-page.git
      git push -u origin main

   VERCEL SETUP:
   1. Go to vercel.com → New Project
   2. Import from GitHub → select [slug]-landing-page
   3. Framework: Other
   4. Click Deploy
   5. Go to Settings → Domains → Add your custom domain: page.[clientdomain.com]

   DNS SETUP:
   Add CNAME in your domain registrar:
   - Name: page
   - Value: cname.vercel-dns.com
   ```

4. **Confirm with user**
   Show them the `spinoffs/[slug]/` folder is ready and ask if they want any changes to the README instructions before handing off to the client.
