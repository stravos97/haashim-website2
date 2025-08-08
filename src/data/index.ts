import { personal, type Personal } from './personal';
import { skills, type Skills } from './skills';
import { experience, type Experience } from './experience';
import { projects, type Project } from './projects';
import { education, certifications, type Education } from './education';
import { community, type Community } from './community';
import { CVDataSchema } from './schemas';

export type { Personal, Skills, Experience, Project, Education, Community };

export interface CVData {
  personal: Personal;
  skills: Skills;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: string[];
  community?: Community[];
}

const unvalidatedData: CVData = {
  personal,
  skills,
  experience,
  projects,
  education,
  certifications,
  community
};

const validationResult = CVDataSchema.safeParse(unvalidatedData);

if (!validationResult.success) {
  console.error('CV Data validation failed:', validationResult.error.errors);
  throw new Error('Invalid CV data structure. Check console for details.');
}

export const cvData: CVData = validationResult.data;

export { personal } from './personal';
export { skills } from './skills';
export { experience } from './experience';
export { projects } from './projects';
export { education, certifications } from './education';
export { community } from './community';