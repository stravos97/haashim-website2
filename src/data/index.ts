import { personal, type Personal } from './personal';
import { skills, type Skills } from './skills';
import { experience, type Experience } from './experience';
import { projects, type Project } from './projects';
import { education, certifications, type Education } from './education';
import { community, type Community } from './community';
import { CVDataSchema } from './schemas';

// Re-export types for external use
export type { Personal, Skills, Experience, Project, Education, Community };

// Main CV data structure
export interface CVData {
  personal: Personal;
  skills: Skills;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: string[];
  community?: Community[];
}

// Assemble raw data
const rawData: CVData = {
  personal,
  skills,
  experience,
  projects,
  education,
  certifications,
  community
};

// Validate data at build time
function validateCVData(data: CVData): CVData {
  const result = CVDataSchema.safeParse(data);
  
  if (!result.success) {
    const errors = result.error.errors.map(err => 
      `  - ${err.path.join('.')}: ${err.message}`
    ).join('\n');
    
    console.error('❌ CV Data Validation Failed:\n' + errors);
    
    // In development, throw error. In production, return data anyway
    if (import.meta.env.DEV) {
      throw new Error('Invalid CV data structure. Fix the errors above.');
    }
    
    console.warn('⚠️ Running with invalid data in production mode');
    return data;
  }
  
  if (import.meta.env.DEV) {
    console.log('✅ CV data validated successfully');
  }
  
  return result.data;
}

// Main validated export
export const cvData: CVData = validateCVData(rawData);

// Utility functions for common operations
export const cvUtils = {
  // Find project by slug
  getProjectBySlug: (slug: string): Project | undefined => {
    return cvData.projects.find(p => p.slug === slug);
  },
  
  // Get current role (most recent experience)
  getCurrentRole: (): Experience | undefined => {
    return cvData.experience[0];
  },
  
  // Get featured projects (those with live URLs)
  getFeaturedProjects: (): Project[] => {
    return cvData.projects.filter(p => p.live);
  },
  
  // Get all tech stack items (unique)
  getAllTechnologies: (): string[] => {
    const techSet = new Set<string>();
    
    // From skills
    Object.values(cvData.skills).forEach(skillList => {
      skillList.forEach(skill => techSet.add(skill));
    });
    
    // From projects
    cvData.projects.forEach(project => {
      project.techStack.forEach(tech => techSet.add(tech));
    });
    
    return Array.from(techSet).sort();
  },
  
  // Get experience duration in years
  getTotalExperience: (): number => {
    const firstJob = cvData.experience[cvData.experience.length - 1];
    if (!firstJob) return 0;
    
    const startYear = parseInt(firstJob.period.match(/\d{4}/)?.[0] || '0');
    const currentYear = new Date().getFullYear();
    
    return currentYear - startYear;
  },
  
  // Get skills by category
  getSkillsByCategory: (category: string): string[] => {
    return cvData.skills[category] || [];
  },
  
  // Format contact info for display
  getFormattedContact: () => ({
    email: cvData.personal.contact.email,
    linkedin: `https://${cvData.personal.contact.linkedin}`,
    github: `https://${cvData.personal.contact.github}`,
    website: `https://${cvData.personal.contact.website}`
  }),
  
  // Get project metrics summary
  getProjectStats: () => ({
    total: cvData.projects.length,
    withLiveDemo: cvData.projects.filter(p => p.live).length,
    openSource: cvData.projects.filter(p => p.github).length,
    technologies: new Set(cvData.projects.flatMap(p => p.techStack)).size
  }),
  
  // Search projects by technology
  getProjectsByTech: (tech: string): Project[] => {
    return cvData.projects.filter(p => 
      p.techStack.some(t => t.toLowerCase().includes(tech.toLowerCase()))
    );
  },
  
  // Get certifications count
  getCertificationCount: (): number => {
    return cvData.certifications.length;
  },
  
  // Check if has community involvement
  hasCommunityInvolvement: (): boolean => {
    return !!(cvData.community && cvData.community.length > 0);
  }
};

// SEO and meta data helpers
export const metaData = {
  title: `${cvData.personal.name} - ${cvData.personal.title}`,
  description: cvData.personal.summary.substring(0, 160),
  keywords: cvUtils.getAllTechnologies().slice(0, 10).join(', '),
  author: cvData.personal.name,
  
  // Open Graph data
  og: {
    title: `${cvData.personal.name} - ${cvData.personal.title}`,
    description: cvData.personal.summary.substring(0, 200),
    type: 'website',
    locale: 'en_GB',
  },
  
  // Structured data for SEO
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: cvData.personal.name,
    jobTitle: cvData.personal.title,
    description: cvData.personal.summary,
    email: cvData.personal.contact.email,
    url: `https://${cvData.personal.contact.website}`,
    sameAs: [
      `https://${cvData.personal.contact.linkedin}`,
      `https://${cvData.personal.contact.github}`
    ],
    alumniOf: cvData.education[0]?.institution,
    knowsAbout: cvUtils.getAllTechnologies().slice(0, 20),
  }
};

// Export everything as a single unified API
export default {
  data: cvData,
  utils: cvUtils,
  meta: metaData,
  
  // Destructured access for convenience
  ...cvData,
  
  // Direct access helpers
  get currentRole() { return cvUtils.getCurrentRole(); },
  get featuredProjects() { return cvUtils.getFeaturedProjects(); },
  get totalExperience() { return cvUtils.getTotalExperience(); },
  get allTechnologies() { return cvUtils.getAllTechnologies(); },
};

// For backward compatibility (will be removed in future)
export { personal, skills, experience, projects, education, certifications, community };