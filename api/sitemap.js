export default function handler(req, res) {
  // Set the appropriate headers
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, max-age=86400, immutable'); // 24 hours

  // Define your website routes
  const routes = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/type/hdd', priority: '0.8', changefreq: 'weekly' },
    { path: '/type/nvme', priority: '0.8', changefreq: 'weekly' },
    { path: '/type/sata', priority: '0.8', changefreq: 'weekly' }
  ];
  
  const domain = 'https://topdisks.eu';
  const today = new Date().toISOString().split('T')[0];
  
  // Generate the XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${domain}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  // Send the XML response
  res.status(200).send(sitemap);
}