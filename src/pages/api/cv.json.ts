import type { APIRoute } from 'astro';
import { cvData, cvUtils } from '../../data';

export const GET: APIRoute = async () => {
  // Create a simplified version for API consumption
  const apiData = {
    meta: {
      generated: new Date().toISOString(),
      version: '1.0.0',
    },
    personal: {
      ...cvData.personal,
      contact: cvUtils.getFormattedContact(),
    },
    summary: {
      totalExperience: cvUtils.getTotalExperience(),
      currentRole: cvUtils.getCurrentRole(),
      projectCount: cvData.projects.length,
      technologiesCount: cvUtils.getAllTechnologies().length,
      certificationCount: cvUtils.getCertificationCount(),
      hasCommunityInvolvement: cvUtils.hasCommunityInvolvement(),
    },
    skills: cvData.skills,
    experience: cvData.experience,
    projects: cvData.projects.map(project => ({
      name: project.name,
      slug: project.slug,
      description: project.description,
      techStack: project.techStack,
      github: project.github ? `https://${project.github}` : null,
      live: project.live ? `https://${project.live}` : null,
      achievements: project.achievements,
    })),
    education: cvData.education,
    certifications: cvData.certifications.map(cert => ({
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date,
      expiryDate: cert.expiryDate || null,
      credentialId: cert.credentialId || null,
      verificationUrl: cert.verificationUrl || null,
      skills: cert.skills || [],
      description: cert.description || null,
      status: cert.date.toLowerCase().includes('planned') ? 'planned' : 'earned'
    })),
    stats: cvUtils.getProjectStats(),
    technologies: cvUtils.getAllTechnologies(),
  };

  return new Response(JSON.stringify(apiData, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  });
};