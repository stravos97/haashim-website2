export interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
  grade?: string;
  modules?: string[];
}

export const education: Education[] = [
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
];