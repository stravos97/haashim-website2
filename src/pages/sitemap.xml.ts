import type { APIRoute } from 'astro';
import { cvData } from '../data';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = (site?.toString() || 'https://haashim-alvi.netlify.app').replace(/\/$/, '');
  
  // Generate URLs for all pages
  const staticPages = [
    '',  // Homepage
    'cv-print',
  ];
  
  // Add project pages
  const projectPages = cvData.projects.map(project => 
    `projects/${project.slug}`
  );
  
  const allPages = [...staticPages, ...projectPages];
  
  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${siteUrl}${page ? '/' + page : ''}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${page === '' ? '1.0' : page.startsWith('projects/') ? '0.8' : '0.5'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};