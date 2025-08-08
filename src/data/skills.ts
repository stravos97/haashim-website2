export interface Skills {
  [category: string]: string[];
}

export const skills: Skills = {
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
};