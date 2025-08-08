// CV Data Structure - Single source of truth for all CV information

export interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  points: string[];
}

export interface Project {
  name: string;
  description: string;
  techStack: string[];
  metrics?: string[];
  achievements: string[];
  github?: string;
  live?: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
  grade?: string;
  modules?: string[];
}

export interface Community {
  title: string;
  organization: string;
  location: string;
  period: string;
  points: string[];
}

export interface CVData {
  personal: {
    name: string;
    title: string;
    summary: string;
    contact: {
      email: string;
      phone: string;
      location: string;
      linkedin: string;
      github: string;
      website: string;
    };
  };
  skills: {
    [category: string]: string[];
  };
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: string[];
  community?: Community[];
}

export const cvData: CVData = {
  personal: {
    name: "Haashim Alvi",
    title: "Software Developer • Security Engineer",
    summary: "Junior DevOps engineer with hands-on experience automating deployments and managing infrastructure. Currently at Sparta Global developing enterprise DevOps skills: Azure cloud architecture, Terraform IaC, Kubernetes orchestration, and CI/CD pipelines through intensive training projects. Previous role at Dematic involved improving deployment processes with Jenkins and Ansible, while earlier development experience provided insight into application needs. Skilled in Python and Bash scripting, Docker containerization, and cloud platforms (Azure, AWS). Passionate about automation and continuously learning modern DevOps practices.",
    contact: {
      email: "haashimalvi@pm.me",
      phone: "",
      location: "",
      linkedin: "linkedin.com/in/haashim-alvi",
      github: "github.com/stravos97",
      website: "haashim-alvi.netlify.app"
    }
  },
  skills: {
    "Cloud & Infrastructure": [
      "Azure", "AWS", "Terraform", "ARM Templates", "CloudFormation", 
      "Infrastructure as Code", "Cloud Architecture", "Cost Optimization"
    ],
    "Container & Orchestration": [
      "Docker", "Kubernetes", "K3s", "Helm", "ArgoCD", "GitOps", 
      "Container Security", "Service Mesh"
    ],
    "CI/CD & Automation": [
      "Jenkins", "GitHub Actions", "Azure DevOps", "GitLab CI", 
      "Ansible", "Bash Scripting", "Python Automation"
    ],
    "Monitoring & Security": [
      "Prometheus", "Grafana", "ELK Stack", "Azure Monitor", 
      "OWASP", "Network Policies", "RBAC", "Zero Trust"
    ],
    "Development & Tools": [
      "Python", "TypeScript", "React", "Node.js", "Git", 
      "Linux", "Agile", "Documentation"
    ],
    "Databases & Storage": [
      "MySQL", "PostgreSQL", "MongoDB", "Azure Storage", 
      "Longhorn", "Persistent Volumes", "Backup Strategies"
    ]
  },
  experience: [
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
  ],
  projects: [
    {
      name: "File Organization GUI - Python Desktop Application",
      description: "Automated file organization tool with GUI interface",
      techStack: ["Python", "Tkinter", "PyInstaller", "Jenkins", "Bash"],
      achievements: [
        "Built Python/Tkinter desktop application to automate file organization based on user-defined rules",
        "Implemented CI/CD with Jenkins pipeline for automated builds using PyInstaller",
        "Created installation scripts for macOS and Linux to simplify deployment process"
      ],
      github: "github.com/stravos97/organise-files-folders-front-end"
    },
    {
      name: "DevOps Learning Documentation",
      description: "Personal learning journey documentation and guides",
      techStack: ["Markdown", "Git", "Documentation"],
      achievements: [
        "Documented personal learning journey with detailed notes on Azure, Terraform, and Kubernetes",
        "Created step-by-step guides for Jenkins pipelines and Ansible playbooks to help fellow trainees",
        "Shared practical examples and troubleshooting tips from hands-on training exercises"
      ],
      github: "github.com/stravos97/sparta-code.wiki"
    },
    {
      name: "Home Media Server - Kubernetes Infrastructure",
      description: "Production-grade K3s cluster hosting 22 stateful applications",
      techStack: ["K3s", "ArgoCD", "LLDAP", "Authelia", "Longhorn", "MetalLB", "Traefik", "Prometheus"],
      achievements: [
        "Orchestrated 22 stateful applications on K3s with LLDAP/Authelia authentication and ArgoCD GitOps",
        "Implemented zero-trust security with 52 network policies controlling ingress/egress traffic flows",
        "Configured component-based RBAC with 6 service accounts following least-privilege principles",
        "Deployed hybrid storage architecture using Longhorn for configs and local-path for 1.4TB media"
      ],
      github: "github.com/stravos97/torrentbox-kubernetes",
      live: "homepage.haashim.org"
    },
    {
      name: "Dependency Update Automation",
      description: "Automated dependency management with Renovate bot",
      techStack: ["Renovate", "GitHub Actions", "CI/CD"],
      achievements: [
        "Configured Renovate bot to automatically check for updates across multiple repositories",
        "Set up automated pull requests for container image updates with semantic versioning",
        "Reduced manual dependency management work by implementing update scheduling"
      ],
      github: "github.com/stravos97/renovate-config-torrentbox"
    },
    {
      name: "Bash Automation Scripts",
      description: "Collection of automation scripts for common tasks",
      techStack: ["Bash", "Shell Scripting", "Linux"],
      achievements: [
        "Created collection of Bash scripts for common tasks like backups, log rotation, and monitoring",
        "Automated daily backups to cloud storage with basic retention policies",
        "Wrote health check scripts to monitor service status and send alerts"
      ],
      github: "github.com/stravos97/Bash-Scripts"
    },
    {
      name: "Smart Meter Data Pipeline",
      description: "Python application for processing and analyzing energy consumption data",
      techStack: ["Python", "Pandas", "NumPy", "Matplotlib"],
      achievements: [
        "Built data pipeline processing 10,000+ daily meter readings",
        "Implemented anomaly detection algorithms for usage patterns",
        "Created visualization dashboards for consumption trends",
        "Optimized data processing reducing runtime by 60%"
      ],
      github: "github.com/stravos97/smart_meter"
    },
    {
      name: "Infrastructure Automation Suite",
      description: "Collection of Terraform modules and Ansible playbooks for cloud automation",
      techStack: ["Terraform", "Ansible", "Azure", "Bash", "Python"],
      metrics: [
        "53KB of Terraform configurations",
        "30+ Ansible playbooks",
        "365KB of automation scripts"
      ],
      achievements: [
        "Developed reusable Terraform modules for Azure resource provisioning",
        "Created Ansible playbooks for Windows and Linux server configuration",
        "Built Python scripts for cloud resource monitoring and cost analysis",
        "Implemented automated backup and disaster recovery procedures"
      ],
      github: "github.com/stravos97/terraform-azure"
    },
    {
      name: "React Charity Dashboard",
      description: "Real-time event management dashboard for charity dinner visualization",
      techStack: ["React", "TypeScript", "Chart.js", "Tailwind CSS", "Vite"],
      achievements: [
        "Built interactive dashboard with real-time data updates and responsive charts",
        "Implemented table management system with drag-and-drop seating arrangements",
        "Created donation tracking with visual progress indicators and analytics",
        "Designed mobile-responsive UI with Tailwind CSS utility classes"
      ],
      github: "github.com/stravos97/anoosh-charity-dashboard"
    }
  ],
  education: [
    {
      degree: "BSc (Hons) Computer Science with Web Development",
      institution: "University of Salford",
      period: "Sep 2017 - Jul 2021",
      location: "Salford, Manchester",
      grade: "First Class Honours",
      modules: [
        "Cyber Security",
        "Web Security & Privacy",
        "Database Systems",
        "Operating Systems",
        "Computer Networks",
        "Agile Software Development"
      ]
    }
  ],
  certifications: [],
  community: [
    {
      title: "Sports & Fitness",
      organization: "Various Athletic Activities",
      location: "Manchester",
      period: "2023 - Present",
      points: [
        "Compete in regional badminton tournaments, maintaining physical fitness and strategic thinking",
        "Active rock climbing enthusiast, developing problem-solving skills and physical endurance",
        "Play in local hockey team, fostering teamwork and communication skills"
      ]
    },
    {
      title: "Open Source Contributor",
      organization: "Community Projects & Technical Content",
      location: "GitHub",
      period: "2024 - Present",
      points: [
        "Developing React-based charity dinner dashboard (github.com/stravos97/anoosh-charity-dashboard) for event data visualization",
        "Maintaining open source DevOps tools: Renovate configurations, Windows Ansible playbooks, automation scripts",
        "Sharing knowledge through GitHub: Kubernetes guides, Docker configurations, helping others learn DevOps practices"
      ]
    }
  ]
};