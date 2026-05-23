import puppeteer from 'puppeteer-core';
import { readFileSync, writeFileSync } from 'fs';
import { marked } from 'marked';
import path from 'path';

const mdPath = process.argv[2] || 'docs/landing-page-ownership-transfer.md';
const outPath = mdPath.replace(/\.md$/, '.pdf');
const md = readFileSync(mdPath, 'utf8');
const body = marked.parse(md);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 10.5pt;
    color: #1a1a2e;
    line-height: 1.7;
    background: #fff;
    padding: 48px 56px;
    max-width: 720px;
    margin: 0 auto;
  }

  h1 {
    font-size: 22pt;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 6px;
    letter-spacing: -0.02em;
  }

  h2 {
    font-size: 13pt;
    font-weight: 700;
    color: #067FAE;
    margin-top: 32px;
    margin-bottom: 10px;
    padding-bottom: 6px;
    border-bottom: 2px solid #e8f4f9;
  }

  h3 {
    font-size: 10.5pt;
    font-weight: 700;
    color: #1a1a2e;
    margin-top: 20px;
    margin-bottom: 8px;
  }

  p {
    margin-bottom: 10px;
    color: #2d2d2d;
  }

  /* Subtitle line directly under h1 */
  h1 + p {
    font-size: 10pt;
    color: #6b7280;
    margin-bottom: 28px;
    font-style: italic;
  }

  a {
    color: #067FAE;
    text-decoration: none;
    font-weight: 500;
  }

  strong { font-weight: 700; color: #1a1a2e; }

  ul, ol {
    padding-left: 20px;
    margin-bottom: 12px;
  }

  li {
    margin-bottom: 6px;
    color: #2d2d2d;
  }

  blockquote {
    background: #f0f9ff;
    border-left: 4px solid #067FAE;
    padding: 14px 18px;
    margin: 18px 0;
    border-radius: 0 6px 6px 0;
  }

  blockquote p {
    margin: 0;
    color: #1a1a2e;
    font-size: 10pt;
  }

  blockquote strong {
    color: #067FAE;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0 20px;
    font-size: 9.5pt;
  }

  thead tr {
    background: #0d1b2a;
    color: #fff;
  }

  thead th {
    padding: 10px 14px;
    text-align: left;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  tbody tr:nth-child(even) { background: #f8fafc; }
  tbody tr:nth-child(odd)  { background: #ffffff; }

  td {
    padding: 9px 14px;
    border-bottom: 1px solid #e5e7eb;
    color: #2d2d2d;
  }

  /* Horizontal rule — double line = section divider */
  hr {
    border: none;
    border-top: 1px solid #e5e7eb;
    margin: 28px 0;
  }

  /* Double hr (---\n--- in markdown renders as two <hr>) — "Later" section separator */
  hr + hr {
    display: none; /* collapse the pair visually */
  }

  hr + hr + * {
    margin-top: 4px;
  }

  /* "Later" section label */
  hr ~ h2:first-of-type {
    color: #6b7280;
  }

  /* Branding footer */
  .footer {
    margin-top: 48px;
    padding-top: 16px;
    border-top: 1px solid #e5e7eb;
    font-size: 9pt;
    color: #9ca3af;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .footer a { color: #9ca3af; }
  .dot { display: inline-block; width: 8px; height: 8px; background: #2AB27B; border-radius: 50%; margin-right: 6px; }
</style>
</head>
<body>
${body}
<div class="footer">
  <span><span class="dot"></span><strong>Bleed AI</strong></span>
  <span><a href="mailto:owner@bleedai.com">owner@bleedai.com</a></span>
</div>
</body>
</html>`;

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'networkidle0' });

await page.pdf({
  path: outPath,
  format: 'A4',
  margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
  printBackground: true,
});

await browser.close();
console.log(`✓ Written: ${outPath}`);
