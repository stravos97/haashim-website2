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
}

export const cvData: CVData = {
  personal: {
    name: "Haashim Alvi",
    title: "DevOps Engineer | Cloud Infrastructure Specialist",
    summary: "Passionate DevOps Engineer specializing in cloud infrastructure automation, CI/CD pipelines, and Kubernetes orchestration. Experienced in Azure cloud services, Infrastructure as Code with Terraform, and implementing GitOps workflows. Committed to optimizing deployment processes and maintaining secure, scalable infrastructure solutions.",
    contact: {
      email: "haashimalvi@pm.me",
      phone: "+44 7450 281 801",
      location: "Manchester, UK",
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
      title: "DevOps Consultant",
      company: "Sparta Global",
      period: "Aug 2024 - Present",
      location: "Manchester, UK",
      points: [
        "Deployed multi-tier Azure architectures using Terraform, implementing hub-spoke networking with secure VNet peering",
        "Built CI/CD pipelines in Jenkins and Azure DevOps, reducing deployment time from hours to under 15 minutes",
        "Containerized legacy applications with Docker and deployed to AKS with Helm charts and GitOps practices",
        "Automated infrastructure provisioning using ARM templates and Terraform modules for consistent environments",
        "Implemented monitoring solutions with Azure Monitor and Log Analytics for proactive issue detection"
      ]
    },
    {
      title: "DevOps Trainee",
      company: "Sparta Global",
      period: "Jun 2024 - Aug 2024",
      location: "Birmingham, UK",
      points: [
        "Completed intensive 10-week DevOps engineering program covering cloud, automation, and CI/CD practices",
        "Achieved Azure Fundamentals (AZ-900) certification with comprehensive cloud services knowledge",
        "Developed Infrastructure as Code using Terraform to provision Azure resources programmatically",
        "Created automated deployment pipelines with Jenkins, implementing build, test, and deploy stages",
        "Built configuration management solutions using Ansible playbooks for consistent server setups"
      ]
    },
    {
      title: "Data Analyst",
      company: "BUPA",
      period: "Jan 2023 - Apr 2024",
      location: "Manchester, UK",
      points: [
        "Analyzed healthcare data to identify trends and patterns, improving operational efficiency by 20%",
        "Created automated Power BI dashboards refreshing daily, reducing manual reporting time by 10 hours weekly",
        "Developed Python scripts for data extraction and transformation from multiple sources",
        "Collaborated with cross-functional teams to deliver data-driven insights for strategic decisions",
        "Implemented data quality checks and validation processes ensuring 99.9% data accuracy"
      ]
    },
    {
      title: "Pricing Specialist",
      company: "Advanced Supply Chain UK (Booker Group/Tesco)",
      period: "Aug 2021 - Jan 2023",
      location: "Manchester, UK",
      points: [
        "Managed product pricing for 300+ items using automated Excel models and SQL queries",
        "Analyzed competitor pricing data to optimize margins while maintaining market competitiveness",
        "Developed VBA macros to automate pricing updates, saving 5 hours of manual work weekly",
        "Coordinated with suppliers and internal teams to implement strategic pricing changes",
        "Created weekly performance reports tracking pricing effectiveness and market trends"
      ]
    }
  ],
  projects: [
    {
      name: "Home Media Server - Kubernetes Infrastructure",
      description: "Production-grade K3s cluster hosting 22 stateful applications with enterprise security",
      techStack: ["K3s", "ArgoCD", "LLDAP", "Authelia", "Longhorn", "MetalLB", "Traefik", "Prometheus"],
      metrics: [
        "22 stateful applications orchestrated",
        "52 network policies enforced",
        "1.4TB media storage managed",
        "99.9% uptime achieved"
      ],
      achievements: [
        "Implemented GitOps with ArgoCD for declarative deployments and automated rollbacks",
        "Configured zero-trust security with LLDAP/Authelia SSO and granular RBAC policies",
        "Deployed hybrid storage architecture using Longhorn for configs and local-path for media",
        "Set up comprehensive monitoring with Prometheus/Grafana dashboards and alerting"
      ],
      github: "github.com/stravos97/torrentbox-kubernetes",
      live: "homepage.haashim.org"
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
    },
    {
      name: "File Organization GUI",
      description: "Python desktop application for automated file organization",
      techStack: ["Python", "Tkinter", "PyInstaller", "Jenkins", "Bash"],
      achievements: [
        "Developed rule-based file organization system with custom filtering logic",
        "Implemented CI/CD pipeline with Jenkins for automated builds and testing",
        "Created cross-platform installation scripts for macOS and Linux",
        "Built intuitive GUI with drag-and-drop file selection"
      ],
      github: "github.com/stravos97/organise-files-folders-front-end"
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
      name: "DevOps Learning Documentation",
      description: "Comprehensive wiki documenting DevOps practices and implementations",
      techStack: ["Markdown", "Git", "Documentation"],
      achievements: [
        "Created step-by-step guides for Jenkins pipelines and CI/CD workflows",
        "Documented Kubernetes deployment strategies and troubleshooting tips",
        "Shared practical examples from hands-on training exercises",
        "Built searchable knowledge base for team reference"
      ],
      github: "github.com/stravos97/sparta-code.wiki"
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
    }
  ],
  education: [
    {
      degree: "BSc Computer Science",
      institution: "University of Leicester",
      period: "2015 - 2019",
      location: "Leicester, UK",
      grade: "2:1 Honours",
      modules: [
        "Software Engineering",
        "Database Systems",
        "Computer Networks",
        "Cloud Computing",
        "Cybersecurity Fundamentals"
      ]
    }
  ],
  certifications: [
    "Azure Fundamentals (AZ-900) - Microsoft Certified",
    "DevOps Engineering - Sparta Global Certified"
  ]
};