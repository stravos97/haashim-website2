import type { APIRoute } from 'astro';
import { cvData, metaData } from '../data';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = (site?.toString() || 'https://haashim-alvi.netlify.app').replace(/\/$/, '');
  
  // Generate RSS XML for projects
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${metaData.title} - Projects</title>
    <description>Latest projects and work by ${cvData.personal.name}</description>
    <link>${siteUrl}</link>
    <language>en-gb</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>${cvData.personal.contact.email} (${cvData.personal.name})</managingEditor>
    <webMaster>${cvData.personal.contact.email} (${cvData.personal.name})</webMaster>
    
${cvData.projects.map(project => `    <item>
      <title>${project.name}</title>
      <description><![CDATA[
        ${project.description}
        ${project.detailedDescription ? `<p>${project.detailedDescription}</p>` : ''}
        <p>Technologies: ${project.techStack.join(', ')}</p>
        ${project.github ? `<p>GitHub: https://${project.github}</p>` : ''}
        ${project.live ? `<p>Live: https://${project.live}</p>` : ''}
      ]]></description>
      <link>${siteUrl}/projects/${project.slug}</link>
      <guid isPermaLink="true">${siteUrl}/projects/${project.slug}</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <category>Projects</category>
      ${project.techStack.map(tech => `<category>${tech}</category>`).join('\n      ')}
    </item>`).join('\n')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};