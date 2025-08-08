export interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  points: string[];
}

export const experience: Experience[] = [
  {
    title: "DevOps Training Consultant",
    company: "Sparta Global",
    period: "Jan 2025 - Current",
    location: "Birmingham",
    points: [
      "Training in enterprise DevOps practices through hands-on projects: Azure, Terraform, Kubernetes, Jenkins, Docker, Ansible",
      "Reduced manual deployment steps from 8 to 2 by building CI/CD pipeline with Jenkins and Docker",
      "Managed configuration for 10+ Azure resources by implementing Terraform modules with state management",
      "Deployed 5 microservices to Kubernetes by configuring deployments, services, and ingress rules",
      "Set up basic monitoring by implementing Prometheus metrics collection and Grafana dashboards",
      "Automated application deployment by writing Ansible playbooks for 3-tier architecture"
    ]
  },
  {
    title: "IT Technician",
    company: "R.A.S Ltd",
    period: "2024 - 2025",
    location: "Rochdale",
    points: [
      "Sole IT responsible for small business infrastructure: Office 365, firewall configuration, Windows servers, networking",
      "Achieved Cyber Essentials compliance by implementing required security controls and documentation",
      "Saved 3-4 hours weekly by automating Windows updates and backups with PowerShell scripts",
      "Improved system reliability by implementing daily backups and basic disaster recovery procedures",
      "Enabled faster troubleshooting by setting up ELK stack for centralized log collection"
    ]
  },
  {
    title: "DevOps Engineer",
    company: "Dematic",
    period: "2022 - 2023",
    location: "Stockport",
    points: [
      "Improved deployment processes for warehouse software using Jenkins, Docker, and Ansible",
      "Enabled daily deployments (previously weekly) by implementing Jenkins pipeline with basic testing",
      "Reduced deployment issues by containerizing applications with Docker for consistency",
      "Simplified server setup from manual process to scripted approach using Ansible playbooks",
      "Caught code issues early by integrating SonarQube scanning into build pipeline",
      "Improved team knowledge by creating deployment documentation and basic runbooks"
    ]
  },
  {
    title: "Software Developer",
    company: "Dematic",
    period: "2021 - 2022",
    location: "Stockport",
    points: [
      "Developed features for warehouse management systems using C and Python",
      "Built components for inventory tracking and order processing in warehouse control systems",
      "Debugged and maintained existing codebase, fixing bugs and improving stability",
      "Wrote Python scripts for data processing and automation of development tasks",
      "Participated in agile development with code reviews, Git version control, and regular deployments"
    ]
  },
  {
    title: "Systems Tester (Placement Year)",
    company: "Skipton Building Society",
    period: "2019 - 2020",
    location: "Skipton",
    points: [
      "Tested financial applications including banking systems and mortgage platforms",
      "Identified and documented defects before production releases through systematic testing",
      "Created test cases based on business requirements and user stories",
      "Assisted with test environment management and test data preparation",
      "Participated in UAT coordination and defect triage meetings"
    ]
  }
];