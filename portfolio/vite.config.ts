import { defineConfig, type Plugin } from 'vite';
import type { IncomingMessage, ServerResponse } from 'node:http';
import react from '@vitejs/plugin-react';

// Preserve old résumé links without storing a duplicate PDF, and provide /api/contact relay.
function legacyResume(req: IncomingMessage, res: ServerResponse, next: () => void) {
  let pathname = (req.url || '').split('?')[0];
  try { pathname = decodeURIComponent(pathname); } catch { next(); return; }
  if (/^\/assets\/jeffresume.*\.pdf$/i.test(pathname)) { res.writeHead(302, { Location: '/documents/jefrine-correya-resume.pdf' }); res.end(); return; }
  if (pathname === '/api/contact') {
    if (req.method === 'OPTIONS') {
      res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Accept' });
      res.end();
      return;
    }
    if (req.method === 'POST') {
      let raw = '';
      req.on('data', chunk => { raw += chunk; });
      req.on('end', () => {
        try {
          const body = JSON.parse(raw || '{}');
          const name = String(body.name || '').trim();
          const email = String(body.email || '').trim();
          const message = String(body.message || '').trim();
          const interest = String(body.interest || 'SOC opportunity').trim();
          const honey = String(body._honey || '').trim();
          if (honey || !name || !email || !message) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Invalid submission fields.' }));
            return;
          }
          // Dispatch upstream to FormSubmit using the already-activated origin in the background
          // so the browser gets confirmation within a couple of seconds while Node finishes the 20s SMTP relay.
          void fetch('https://formsubmit.co/ajax/jefrincorreya@gmail.com', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Origin: 'https://www.jeffsec.in',
              Referer: 'https://www.jeffsec.in/contact',
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
            },
            body: JSON.stringify({
              name,
              email,
              message,
              interest,
              _subject: body._subject || `Portfolio · ${interest} — ${name}`,
              _template: body._template || 'table',
              _honey: '',
            }),
          }).catch(() => {});
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: 'true', message: 'The form was submitted successfully.' }));
        } catch {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: 'Malformed JSON body.' }));
        }
      });
      return;
    }
  }
  next();
}
const legacyAlias: Plugin = { name: 'canonical-document-alias', configureServer(server) { server.middlewares.use(legacyResume); }, configurePreviewServer(server) { server.middlewares.use(legacyResume); } };
export default defineConfig({
  plugins: [react(), legacyAlias],
  server: { host: '0.0.0.0', port: 3000, strictPort: true, allowedHosts: true, hmr: process.env.DISABLE_HMR !== 'true', watch: process.env.DISABLE_HMR === 'true' ? null : {} },
  preview: { host: '0.0.0.0', port: 3000, strictPort: true, allowedHosts: true },
  build: {
    target: 'es2022', sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/three/')) return 'vendor-webgl';
          if (id.includes('/node_modules/gsap/')) return 'vendor-motion';
        },
      },
    },
  },
});
