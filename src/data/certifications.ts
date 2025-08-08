export interface Certification {
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  verificationUrl?: string;
  skills?: string[];
  description?: string;
}

export const certifications: Certification[] = [
  {
    name: "DevOps Engineering Certified",
    issuer: "Sparta Global",
    date: "February 2025",
    credentialId: "SG-DEVOPS-2025",
    verificationUrl: "/certificates/Sparta Certificate.pdf",
    skills: ["DevOps", "Azure", "Kubernetes", "Terraform", "CI/CD", "Docker"],
    description: "Comprehensive DevOps engineering certification covering cloud infrastructure, automation, and modern deployment practices"
  }
];