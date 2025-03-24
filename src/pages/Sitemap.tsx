import React, { useEffect } from 'react';

const DOMAIN = 'https://topdisks.eu';
const ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/type/hdd', priority: '0.8', changefreq: 'weekly' },
  { path: '/type/nvme', priority: '0.8', changefreq: 'weekly' },
  { path: '/type/sata', priority: '0.8', changefreq: 'weekly' }
];

const Sitemap = () => {
  useEffect(() => {
    // Generate XML sitemap
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(route => `  <url>
    <loc>${DOMAIN}${route.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    // Set the content type and send the XML
    const blob = new Blob([xml], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    
    // Create a link and trigger download (for testing)
    // In production, you'd set headers and return the XML directly
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);
  
  return (
    <div>
      <h1>Sitemap Generator</h1>
      <p>Your sitemap is being generated...</p>
    </div>
  );
};

export default Sitemap;