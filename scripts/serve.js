/**
 * Local preview server for landing pages
 * Usage: node scripts/serve.js [client-slug]
 * Then open: http://localhost:3000
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const slug = process.argv[2];
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  let urlPath = req.url === '/' ? '/index.html' : req.url;

  // Resolve file path
  let filePath;
  if (slug) {
    filePath = path.join(ROOT, 'clients', slug, urlPath);
  } else {
    filePath = path.join(ROOT, 'clients', urlPath);
  }

  // Default to index.html for directory requests
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Try serving the index listing
      if (req.url === '/' && !slug) {
        const clients = fs.existsSync(path.join(ROOT, 'clients'))
          ? fs.readdirSync(path.join(ROOT, 'clients')).filter(d =>
              fs.statSync(path.join(ROOT, 'clients', d)).isDirectory()
            )
          : [];

        const html = `<!DOCTYPE html>
<html>
<head><title>Landing Page Builder — Preview</title>
<style>body{font-family:sans-serif;max-width:600px;margin:60px auto;padding:0 20px}
h1{font-size:24px}a{color:#0070f3;text-decoration:none}a:hover{text-decoration:underline}
li{margin:8px 0;font-size:18px}</style></head>
<body>
<h1>Landing Pages</h1>
<ul>${clients.map(c => `<li><a href="/${c}">${c}</a></li>`).join('\n')}</ul>
</body></html>`;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
        return;
      }
      res.writeHead(404);
      res.end(`404 Not Found: ${urlPath}`);
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  if (slug) {
    console.log(`\nPreview: http://localhost:${PORT}\nServing: clients/${slug}/\n`);
  } else {
    console.log(`\nPreview all clients: http://localhost:${PORT}\n`);
  }
});
