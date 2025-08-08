export interface Community {
  title: string;
  organization: string;
  location: string;
  period: string;
  points: string[];
}

export const community: Community[] = [
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
];