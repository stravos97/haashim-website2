export interface Project {
  name: string;
  slug: string;
  description: string;
  techStack: string[];
  metrics?: string[];
  achievements: string[];
  github?: string;
  live?: string;
  detailedDescription?: string;
  features?: string[];
  challenges?: string[];
  architecture?: string;
  gallery?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
}

export const projects: Project[] = [
  {
    name: "File Organization GUI - Python Desktop Application",
    slug: "file-organization-gui",
    description: "Automated file organization tool with GUI interface",
    techStack: ["Python", "Tkinter", "PyInstaller", "Jenkins", "Bash"],
    achievements: [
      "Built Python/Tkinter desktop application to automate file organization based on user-defined rules",
      "Implemented CI/CD with Jenkins pipeline for automated builds using PyInstaller",
      "Created installation scripts for macOS and Linux to simplify deployment process"
    ],
    github: "github.com/stravos97/organise-files-folders-front-end",
    detailedDescription: "A powerful desktop application built with Python and Tkinter that automates file organization tasks. The application allows users to define custom rules for organizing files based on type, name patterns, date modified, and more. Features a user-friendly GUI that makes complex file operations accessible to non-technical users.",
    features: [
      "Intuitive GUI built with Tkinter for easy file management",
      "Custom rule engine for flexible file organization",
      "Batch processing capabilities for handling large file collections",
      "Real-time preview of file operations before execution",
      "Undo functionality to reverse organization operations",
      "Cross-platform support (macOS, Linux, Windows)"
    ],
    challenges: [
      "Implementing efficient file scanning for directories with thousands of files",
      "Creating a responsive GUI that doesn't freeze during long operations",
      "Building cross-platform installation scripts",
      "Setting up CI/CD pipeline with PyInstaller for automated releases"
    ],
    architecture: "The application follows a Model-View-Controller (MVC) pattern with the Tkinter GUI as the view layer, a rule engine as the controller, and file system operations as the model. The CI/CD pipeline uses Jenkins to automatically build executables for different platforms whenever changes are pushed to the main branch."
  },
  {
    name: "DevOps Learning Documentation",
    slug: "devops-documentation",
    description: "Personal learning journey documentation and guides",
    techStack: ["Markdown", "Git", "Documentation"],
    achievements: [
      "Documented personal learning journey with detailed notes on Azure, Terraform, and Kubernetes",
      "Created step-by-step guides for Jenkins pipelines and Ansible playbooks to help fellow trainees",
      "Shared practical examples and troubleshooting tips from hands-on training exercises"
    ],
    github: "github.com/stravos97/sparta-code/wiki",
    detailedDescription: "A comprehensive collection of DevOps learning materials and practical guides created during my training at Sparta Global. This documentation serves as both a personal knowledge base and a resource for fellow engineers learning DevOps practices.",
    features: [
      "Detailed Azure cloud service guides with real-world examples",
      "Step-by-step Terraform module creation tutorials",
      "Kubernetes deployment patterns and best practices",
      "Jenkins pipeline templates and troubleshooting guides",
      "Ansible playbook examples for common automation tasks",
      "Collection of common errors and their solutions"
    ],
    challenges: [
      "Organizing complex technical information in an accessible way",
      "Creating clear diagrams to explain infrastructure concepts",
      "Keeping documentation up-to-date with rapidly evolving tools",
      "Balancing technical accuracy with readability for beginners"
    ],
    architecture: "The documentation is organized as a GitHub wiki with a hierarchical structure. Topics are categorized by technology (Azure, Terraform, Kubernetes, etc.) with cross-references between related concepts. Each guide includes practical examples, common pitfalls, and links to official documentation."
  },
  {
    name: "Home Media Server - Kubernetes Infrastructure",
    slug: "kubernetes-media-server",
    description: "Production-grade K3s cluster hosting 22 stateful applications",
    techStack: ["K3s", "ArgoCD", "LLDAP", "Authelia", "Longhorn", "MetalLB", "Traefik", "Prometheus"],
    achievements: [
      "Orchestrated 22 stateful applications on K3s with LLDAP/Authelia authentication and ArgoCD GitOps",
      "Implemented zero-trust security with 52 network policies controlling ingress/egress traffic flows",
      "Configured component-based RBAC with 6 service accounts following least-privilege principles",
      "Deployed hybrid storage architecture using Longhorn for configs and local-path for 1.4TB media"
    ],
    github: "github.com/stravos97/torrentBox-kubernetes",
    live: "homepage.haashim.org",
    detailedDescription: "A production-grade Kubernetes cluster running on bare metal, hosting a complete media server infrastructure with 22 stateful applications. This project demonstrates advanced Kubernetes concepts including GitOps deployment, zero-trust networking, centralized authentication, and distributed storage management.",
    features: [
      "GitOps deployment model using ArgoCD for continuous delivery",
      "Centralized authentication with LLDAP and Authelia SSO",
      "Zero-trust network architecture with Cilium CNI and NetworkPolicies",
      "Distributed storage with Longhorn for persistent volumes",
      "Load balancing with MetalLB in Layer 2 mode",
      "Ingress management with Traefik and automatic SSL certificates",
      "Comprehensive monitoring with Prometheus and Grafana",
      "Automated backups and disaster recovery procedures"
    ],
    challenges: [
      "Implementing stateful applications in Kubernetes with data persistence",
      "Designing network policies for zero-trust security without breaking functionality",
      "Managing 1.4TB of media data with appropriate storage solutions",
      "Setting up SSO authentication for all applications",
      "Optimizing resource allocation for 22 applications on limited hardware",
      "Creating automated backup strategies for stateful workloads"
    ],
    architecture: "The cluster runs K3s on bare metal with a single master node and two worker nodes. ArgoCD manages deployments from Git repositories, Longhorn provides distributed block storage, and Traefik handles ingress routing. All applications authenticate through Authelia with LLDAP as the identity provider. Network segmentation is enforced through Cilium CNI with strict NetworkPolicies.",
    gallery: [
      {
        src: "/images/kubernetes-homepage.png",
        alt: "Homepage dashboard showing all running services",
        caption: "Homepage dashboard displaying all 22 applications including media management, services, download clients, and media streaming"
      }
    ]
  },
  {
    name: "Dependency Update Automation",
    slug: "dependency-automation",
    description: "Automated dependency management with Renovate bot",
    techStack: ["Renovate", "GitHub Actions", "CI/CD"],
    achievements: [
      "Configured Renovate bot to automatically check for updates across multiple repositories",
      "Set up automated pull requests for container image updates with semantic versioning",
      "Reduced manual dependency management work by implementing update scheduling"
    ],
    github: "github.com/stravos97/renovate-config-torrentbox",
    detailedDescription: "An automated dependency management system using Renovate bot to keep multiple repositories up-to-date. This solution monitors dependencies across different package managers and container registries, creating automated pull requests with detailed changelogs and compatibility information.",
    features: [
      "Multi-repository dependency scanning and updates",
      "Container image update automation with digest pinning",
      "Semantic versioning compliance and major version grouping",
      "Automated changelog generation in pull requests",
      "Custom update schedules to minimize disruption",
      "Vulnerability detection and security update prioritization"
    ],
    challenges: [
      "Configuring Renovate for different package managers and registries",
      "Setting up appropriate update strategies for production systems",
      "Managing update noise while maintaining security",
      "Creating custom regex patterns for non-standard dependencies"
    ],
    architecture: "Renovate runs as a GitHub App with custom configuration files in each repository. It scans for dependencies on a schedule, checks for updates against configured registries, and creates pull requests with grouped updates based on semantic versioning rules."
  },
  {
    name: "Bash Automation Scripts",
    slug: "bash-automation",
    description: "Collection of automation scripts for common tasks",
    techStack: ["Bash", "Shell Scripting", "Linux"],
    achievements: [
      "Created collection of Bash scripts for common tasks like backups, log rotation, and monitoring",
      "Automated daily backups to cloud storage with basic retention policies",
      "Wrote health check scripts to monitor service status and send alerts"
    ],
    github: "github.com/stravos97/Bash-Scripts",
    detailedDescription: "A comprehensive collection of Bash scripts developed to automate routine system administration tasks. These scripts handle everything from backup automation to service monitoring, reducing manual intervention and improving system reliability.",
    features: [
      "Automated backup scripts with rsync and compression",
      "Log rotation and archival with configurable retention",
      "Service health monitoring with email/webhook alerts",
      "System resource monitoring and reporting",
      "Database backup automation with encryption",
      "Cron job management and scheduling utilities"
    ],
    challenges: [
      "Creating portable scripts that work across different Linux distributions",
      "Implementing error handling and recovery mechanisms",
      "Managing script dependencies and environment variables",
      "Building efficient scripts that handle large datasets"
    ],
    architecture: "The scripts are organized by function (backup, monitoring, maintenance) with a shared library of common functions. Each script includes comprehensive error handling, logging, and can be run standalone or as part of a cron schedule."
  },
  {
    name: "Smart Meter Data Pipeline",
    slug: "smart-meter-pipeline",
    description: "Python application for processing and analyzing energy consumption data",
    techStack: ["Python", "Pandas", "NumPy", "Matplotlib"],
    achievements: [
      "Built data pipeline processing 10,000+ daily meter readings",
      "Implemented anomaly detection algorithms for usage patterns",
      "Created visualization dashboards for consumption trends",
      "Optimized data processing reducing runtime by 60%"
    ],
    github: "github.com/stravos97/Smart_Meter_Prjct",
    live: "smartmeter.altervista.org/index.php",
    detailedDescription: "A high-performance data pipeline for processing and analyzing smart meter energy consumption data. The application ingests raw meter readings, performs data cleaning and transformation, applies anomaly detection algorithms, and generates insightful visualizations for energy consumption patterns.",
    features: [
      "Real-time data ingestion from multiple meter formats",
      "Automated data cleaning and validation pipelines",
      "Statistical anomaly detection using Z-score and IQR methods",
      "Time-series analysis for consumption pattern identification",
      "Interactive dashboards with Matplotlib and Plotly",
      "Automated report generation with consumption insights",
      "Performance optimization using NumPy vectorization"
    ],
    challenges: [
      "Processing large volumes of time-series data efficiently",
      "Implementing accurate anomaly detection with seasonal variations",
      "Optimizing memory usage for datasets exceeding available RAM",
      "Creating meaningful visualizations from complex multi-dimensional data",
      "Handling missing data and meter reading errors gracefully"
    ],
    architecture: "The pipeline uses Pandas for data manipulation, NumPy for numerical computations, and Matplotlib for visualizations. Data flows through stages: ingestion, validation, transformation, analysis, and visualization. The application uses chunking for large datasets and implements caching for frequently accessed computations.",
    gallery: [
      {
        src: "/images/smart-meter.png",
        alt: "Smart meter dashboard showing electricity and gas consumption",
        caption: "Real-time energy consumption dashboard showing £0 cost for both electricity and gas usage with green status indicators"
      }
    ]
  },
  {
    name: "Infrastructure Automation Suite",
    slug: "infrastructure-automation",
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
    github: "github.com/stravos97/tech501-terraform-aws",
    detailedDescription: "A comprehensive infrastructure automation suite combining Terraform modules for cloud provisioning and Ansible playbooks for configuration management. This collection represents best practices learned from enterprise deployments and includes monitoring, cost optimization, and disaster recovery automation.",
    features: [
      "Reusable Terraform modules for Azure infrastructure components",
      "Ansible playbooks for Windows and Linux configuration",
      "Python-based cloud cost analysis and optimization tools",
      "Automated backup strategies with point-in-time recovery",
      "Infrastructure monitoring and alerting setup",
      "Compliance checking and security hardening scripts",
      "Disaster recovery automation with RTO/RPO targets"
    ],
    challenges: [
      "Creating Terraform modules that work across different Azure regions",
      "Managing state files and implementing remote backend strategies",
      "Writing idempotent Ansible playbooks for complex configurations",
      "Implementing cost optimization without compromising performance",
      "Ensuring security best practices in automated deployments"
    ],
    architecture: "The suite is organized into Terraform modules for infrastructure provisioning, Ansible playbooks for configuration management, and Python scripts for monitoring and analysis. Terraform state is managed in Azure Storage with locking, while Ansible uses dynamic inventory from Azure. All components integrate through a common CI/CD pipeline."
  },
  {
    name: "React Charity Dashboard",
    slug: "charity-dashboard",
    description: "Real-time event management dashboard for charity dinner visualization",
    techStack: ["React", "TypeScript", "Chart.js", "Tailwind CSS", "Vite"],
    achievements: [
      "Built interactive dashboard with real-time data updates and responsive charts",
      "Implemented table management system with drag-and-drop seating arrangements",
      "Created donation tracking with visual progress indicators and analytics",
      "Designed mobile-responsive UI with Tailwind CSS utility classes"
    ],
    github: "github.com/stravos97/anoosh-charity-dashboard",
    detailedDescription: "A modern React dashboard application built for managing charity dinner events. The application provides real-time visualization of event data, interactive table management, and comprehensive donation tracking. Built with TypeScript for type safety and Tailwind CSS for responsive design.",
    features: [
      "Real-time dashboard with live data updates via WebSocket",
      "Interactive seating chart with drag-and-drop functionality",
      "Donation tracking with progress visualization",
      "Guest check-in system with QR code scanning",
      "Analytics dashboard with Chart.js visualizations",
      "Responsive design optimized for tablets and mobile devices",
      "Export functionality for guest lists and donation reports"
    ],
    challenges: [
      "Implementing real-time updates without overwhelming the browser",
      "Creating an intuitive drag-and-drop interface for table management",
      "Optimizing React re-renders for smooth performance",
      "Building accessible components that work with screen readers",
      "Managing complex state with multiple interconnected components"
    ],
    architecture: "The application is built with React 18 and TypeScript, using Vite for fast development builds. State management is handled with React Context and useReducer for complex state logic. Chart.js provides data visualizations, while Tailwind CSS ensures consistent, responsive styling. The app connects to a backend API for real-time updates using WebSocket connections."
  }
];