
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic
  const vite = await createViteServer({
    server: { 
      middlewareMode: true,
      // headers: {
      //   "Strict-Transport-Security": "max-age=86400; includeSubDomains", // Adds HSTS options to your website, with a expiry time of 1 day
      //   "X-Content-Type-Options": "nosniff", // Protects from improper scripts runnings
      //   "X-Frame-Options": "DENY", // Stops your site being used as an iframe
      //   "X-XSS-Protection": "1; mode=block", // Gives XSS protection to legacy browsers
      // }
   },
    appType: 'custom'
  });

  // Use vite's connect instance as middleware
  app.use(vite.middlewares);

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // 1. Read index.html
      let template = fs.readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8'
      );

      // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
      //    also applies HTML transforms from Vite plugins
      template = await vite.transformIndexHtml(url, template);

      // 3. Load the server entry. vite.ssrLoadModule automatically transforms
      //    your ESM source code to be usable in Node.js
      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');

      // 4. Render the app HTML
      const { html: appHtml } = await render(url);

      // 5. Inject the app-rendered HTML into the template
      const html = template.replace(`<div id="root"></div>`, `<div id="root">${appHtml}</div>`);

      // 6. Send the rendered HTML back
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      // If an error is caught, let Vite fix the stack trace
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(3000, () => {
    console.log('Server started at http://localhost:3000');
  });
}

createServer();
