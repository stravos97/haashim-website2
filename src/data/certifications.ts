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
  },
  {
    name: "Azure Fundamentals (AZ-900)",
    issuer: "Microsoft",
    date: "Planned Q2 2025",
    skills: ["Azure", "Cloud Computing", "IaaS", "PaaS", "SaaS"],
    description: "Foundational knowledge of cloud services and Azure"
  },
  {
    name: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation",
    date: "Planned Q2 2025",
    skills: ["Kubernetes", "Container Orchestration", "Cloud Native"],
    description: "Demonstrates the skills required to be a Kubernetes administrator"
  },
  {
    name: "HashiCorp Certified: Terraform Associate",
    issuer: "HashiCorp",
    date: "Planned Q3 2025",
    skills: ["Terraform", "Infrastructure as Code", "Cloud Automation"],
    description: "Best practices for using Terraform in production"
  },
  {
    name: "AWS Certified Solutions Architect - Associate",
    issuer: "Amazon Web Services",
    date: "Planned Q4 2025",
    skills: ["AWS", "Cloud Architecture", "Solution Design"],
    description: "Design distributed systems on AWS"
  }
];