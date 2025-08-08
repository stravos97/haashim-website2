export interface Personal {
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
}

export const personal: Personal = {
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
};