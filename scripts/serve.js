import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const port = Number(process.env.PORT) || 5173;
const mime = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
};
createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = resolve(root, `.${path === '/' ? '/index.html' : path}`);
    const relative = file.slice(root.length + 1);
    if (
      !file.startsWith(root + sep) ||
      relative.split(/[\\/]/).some((part) => part.startsWith('.')) ||
      !['index.html', 'src', 'public'].includes(relative.split(/[\\/]/)[0])
    ) {
      res.writeHead(403).end('Forbidden');
      return;
    }
    const body = await readFile(file);
    res
      .writeHead(200, {
        'Content-Type': `${mime[extname(file)] || 'application/octet-stream'}; charset=utf-8`,
        'Cache-Control': 'no-cache',
      })
      .end(body);
  } catch {
    res.writeHead(404).end('Not found');
  }
}).listen(port, '127.0.0.1', () => console.log(`Portfolio: http://127.0.0.1:${port}`));
