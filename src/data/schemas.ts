import { z } from 'zod';

export const PersonalSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  summary: z.string().min(50, "Summary should be at least 50 characters"),
  contact: z.object({
    email: z.string().email("Invalid email format"),
    phone: z.string(),
    location: z.string(),
    linkedin: z.string().url().or(z.string()),
    github: z.string().url().or(z.string()),
    website: z.string().url().or(z.string())
  })
});

export const SkillsSchema = z.record(z.string(), z.array(z.string().min(1)));

export const ExperienceSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company name is required"),
  period: z.string().min(1, "Period is required"),
  location: z.string().min(1, "Location is required"),
  points: z.array(z.string().min(10, "Achievement points should be descriptive"))
    .min(1, "At least one achievement point is required")
});

export const ProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be URL-friendly"),
  description: z.string().min(10, "Description should be at least 10 characters"),
  techStack: z.array(z.string()).min(1, "At least one technology is required"),
  metrics: z.array(z.string()).optional(),
  achievements: z.array(z.string()).min(1, "At least one achievement is required"),
  github: z.string().optional(),
  live: z.string().optional(),
  detailedDescription: z.string().optional(),
  features: z.array(z.string()).optional(),
  challenges: z.array(z.string()).optional(),
  architecture: z.string().optional(),
  gallery: z.array(z.object({
    src: z.string(),
    alt: z.string(),
    caption: z.string().optional()
  })).optional()
});

export const EducationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  institution: z.string().min(1, "Institution is required"),
  period: z.string().min(1, "Period is required"),
  location: z.string().min(1, "Location is required"),
  grade: z.string().optional(),
  modules: z.array(z.string()).optional()
});

export const CommunitySchema = z.object({
  title: z.string().min(1, "Title is required"),
  organization: z.string().min(1, "Organization is required"),
  location: z.string().min(1, "Location is required"),
  period: z.string().min(1, "Period is required"),
  points: z.array(z.string()).min(1, "At least one point is required")
});

export const CertificationSchema = z.object({
  name: z.string().min(1, "Certification name is required"),
  issuer: z.string().min(1, "Issuer is required"),
  date: z.string().min(1, "Date is required"),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
  verificationUrl: z.string().url().optional().or(z.string().optional()),
  skills: z.array(z.string()).optional(),
  description: z.string().optional()
});

export const CVDataSchema = z.object({
  personal: PersonalSchema,
  skills: SkillsSchema,
  experience: z.array(ExperienceSchema),
  projects: z.array(ProjectSchema),
  education: z.array(EducationSchema),
  certifications: z.array(CertificationSchema),
  community: z.array(CommunitySchema).optional()
});

export type ValidatedCVData = z.infer<typeof CVDataSchema>;
export type ValidatedPersonal = z.infer<typeof PersonalSchema>;
export type ValidatedSkills = z.infer<typeof SkillsSchema>;
export type ValidatedExperience = z.infer<typeof ExperienceSchema>;
export type ValidatedProject = z.infer<typeof ProjectSchema>;
export type ValidatedEducation = z.infer<typeof EducationSchema>;
export type ValidatedCommunity = z.infer<typeof CommunitySchema>;
export type ValidatedCertification = z.infer<typeof CertificationSchema>;