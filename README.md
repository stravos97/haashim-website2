# Haashim Alvi - Professional CV Website

A modern, accessible CV/Resume website built with Astro, following GOV.UK Design System principles and WCAG 2.2 accessibility standards.

## 🌟 Features

- **Dark Mode First**: Default dark theme with seamless light mode toggle
- **WCAG 2.2 AA Compliant**: Full accessibility including screen reader support, keyboard navigation, and cognitive accessibility features
- **GOV.UK Design System**: Professional, government-standard design patterns for maximum readability
- **Responsive Design**: Mobile-first approach with proper text scaling
- **Print Optimized**: Clean PDF generation via browser print function
- **Static Site**: Fast loading with no runtime dependencies
- **TypeScript**: Type-safe data management for CV content

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/stravos97/haashim-cv.git
cd haashim-cv/examples/haashim-website2

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see the site.

## 📦 Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start dev server at `localhost:4321`        |
| `npm run build`   | Build production site to `./dist/`          |
| `npm run preview` | Preview production build locally            |

## 🏗️ Project Structure

```text
/
├── src/
│   ├── components/          # Reusable Astro components
│   │   ├── ExperienceCard.astro
│   │   ├── ProjectCard.astro
│   │   ├── SkillSection.astro
│   │   └── ThemeToggle.astro
│   ├── data/
│   │   └── cvData.ts       # Single source of truth for CV content
│   ├── layouts/
│   │   └── Layout.astro    # Main layout with WCAG 2.2 CSS
│   ├── pages/
│   │   └── index.astro     # Main CV page
│   └── utils/
│       └── theme.ts        # Theme management utilities
├── public/                 # Static assets
└── package.json
```

## 🎨 Design Principles

### Typography
- Base font: 19px for optimal readability
- Maximum line length: 66 characters
- Proper heading hierarchy for screen readers

### Accessibility
- **Touch Targets**: Minimum 44×44 pixels
- **Color Contrast**: All text meets WCAG 2.2 ratios (4.5:1 minimum)
- **Focus Indicators**: High-contrast yellow (#ffdd00) with 3:1 ratio
- **Skip Links**: Multiple navigation skip options
- **ARIA Labels**: Comprehensive screen reader support

### Performance
- Static HTML generation
- Minimal JavaScript (only for theme toggle)
- Optimized CSS with custom properties
- Fast loading times

## 🔧 Customization

### Update CV Content
Edit the data in `src/data/cvData.ts`:
- Personal information
- Work experience
- Education
- Skills
- Projects

### Modify Styling
CSS variables are defined in `src/layouts/Layout.astro`. Key variables include:
- Color scheme (light/dark themes)
- Typography scale
- Spacing system (GOV.UK 5px grid)

## 🔌 API Endpoints & Integration

The website provides programmatic access to CV data through multiple API endpoints, enabling integration with ATS systems, portfolio aggregators, and automated tools.

### Available Endpoints

#### 1. JSON API - `/api/cv.json`
Complete CV data in structured JSON format for programmatic access.

**Test Command:**
```bash
curl -s https://haashim-alvi.netlify.app/api/cv.json | python3 -m json.tool
```

**Response Structure:**
```json
{
  "meta": {
    "generated": "2025-08-08T10:14:47.401Z",
    "version": "1.0.0"
  },
  "personal": {
    "name": "Haashim Alvi",
    "title": "Software Developer • Security Engineer",
    "contact": {
      "email": "haashimalvi@pm.me",
      "linkedin": "https://linkedin.com/in/haashim-alvi",
      "github": "https://github.com/stravos97",
      "website": "https://haashim-alvi.netlify.app"
    }
  },
  "summary": {
    "totalExperience": 6,
    "projectCount": 8,
    "technologiesCount": 63,
    "certificationCount": 0
  },
  "skills": {
    "Cloud & Infrastructure": ["Azure", "AWS", "Terraform", ...],
    "Container & Orchestration": ["Docker", "Kubernetes", ...],
    "CI/CD & Automation": ["Jenkins", "GitHub Actions", ...]
  },
  "experience": [...],
  "projects": [
    {
      "name": "Home Media Server - Kubernetes Infrastructure",
      "slug": "kubernetes-media-server",
      "techStack": ["Kubernetes", "Docker", "Terraform"],
      "live": "homepage.haashim.org",
      "github": "github.com/stravos97/K3s-media-server"
    }
  ]
}
```

**Use Cases:**
- **ATS Integration**: Parse structured data for applicant tracking systems
- **Portfolio Aggregation**: Include CV data in professional portfolio sites
- **Skills Analysis**: Extract technology stack for skills matching
- **Automated Screening**: Enable recruiters to programmatically filter candidates
- **Data Visualization**: Create charts/graphs from experience and skills data

#### 2. Sitemap - `/sitemap.xml`
XML sitemap for search engine optimization and site structure discovery.

**Test Command:**
```bash
curl -s https://haashim-alvi.netlify.app/sitemap.xml
```

**Response Sample:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://haashim-alvi.netlify.app/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://haashim-alvi.netlify.app/projects/kubernetes-media-server</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- 8 more project URLs -->
</urlset>
```

**Use Cases:**
- **SEO Optimization**: Help search engines discover all pages
- **Site Monitoring**: Track page availability and structure
- **Content Auditing**: Verify all projects have dedicated pages

#### 3. RSS Feed - `/rss.xml`
RSS feed for project updates and portfolio subscriptions.

**Test Command:**
```bash
curl -s https://haashim-alvi.netlify.app/rss.xml
```

**Response Sample:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Haashim Alvi - Projects</title>
    <item>
      <title>Home Media Server - Kubernetes Infrastructure</title>
      <description><![CDATA[
        Self-hosted media server with automated operations...
        <p>Technologies: Kubernetes, Docker, Terraform</p>
        <p>Live: https://homepage.haashim.org</p>
      ]]></description>
      <link>https://haashim-alvi.netlify.app/projects/kubernetes-media-server</link>
      <category>Kubernetes</category>
      <category>Docker</category>
    </item>
  </channel>
</rss>
```

**Use Cases:**
- **Portfolio Updates**: Subscribe to new project additions
- **Content Syndication**: Share projects on aggregator sites
- **Recruitment Monitoring**: Track candidate activity and new skills

### API Testing & Validation

#### Comprehensive Test Suite
```bash
# Test all endpoints and validate data
npm run test:api

# Or manually test each endpoint:

# 1. Validate JSON structure
curl -s https://haashim-alvi.netlify.app/api/cv.json | \
  python3 -c "import json, sys; data = json.load(sys.stdin); \
  print(f'✅ Projects: {len(data[\"projects\"])}'); \
  print(f'✅ Skills: {len(data[\"skills\"])} categories'); \
  print(f'✅ Experience: {len(data[\"experience\"])} roles')"

# 2. Check for live project URLs
curl -s https://haashim-alvi.netlify.app/api/cv.json | \
  jq '.projects[] | select(.live != null) | {name, live}'

# 3. Extract all technologies
curl -s https://haashim-alvi.netlify.app/api/cv.json | \
  jq '[.projects[].techStack[]] | unique | sort'
```

### Integration Examples

#### Python - ATS Integration
```python
import requests
import json

# Fetch CV data
response = requests.get('https://haashim-alvi.netlify.app/api/cv.json')
cv_data = response.json()

# Extract key information
candidate_name = cv_data['personal']['name']
years_experience = cv_data['summary']['totalExperience']
skills = cv_data['skills']

# Check for required skills
required_skills = ['Kubernetes', 'Docker', 'Terraform']
candidate_skills = []
for category in skills.values():
    candidate_skills.extend(category)

matching_skills = [s for s in required_skills if s in candidate_skills]
match_percentage = (len(matching_skills) / len(required_skills)) * 100

print(f"Candidate: {candidate_name}")
print(f"Experience: {years_experience} years")
print(f"Skill Match: {match_percentage}%")
```

#### JavaScript - Portfolio Widget
```javascript
// Fetch and display projects
fetch('https://haashim-alvi.netlify.app/api/cv.json')
  .then(res => res.json())
  .then(data => {
    const projects = data.projects.filter(p => p.live);
    
    projects.forEach(project => {
      console.log(`📦 ${project.name}`);
      console.log(`   Tech: ${project.techStack.join(', ')}`);
      console.log(`   Live: https://${project.live}`);
    });
  });
```

#### Bash - Skills Analyzer
```bash
#!/bin/bash
# Analyze technology stack and experience

API_URL="https://haashim-alvi.netlify.app/api/cv.json"

# Get all unique technologies
echo "=== Technology Stack Analysis ==="
curl -s $API_URL | jq -r '.skills | to_entries[] | 
  "📊 \(.key): \(.value | length) skills"'

# Get projects with live demos
echo -e "\n=== Live Projects ==="
curl -s $API_URL | jq -r '.projects[] | 
  select(.live != null) | "🚀 \(.name): https://\(.live)"'

# Calculate metrics
TOTAL_TECH=$(curl -s $API_URL | jq '.summary.technologiesCount')
TOTAL_PROJECTS=$(curl -s $API_URL | jq '.summary.projectCount')
YEARS_EXP=$(curl -s $API_URL | jq '.summary.totalExperience')

echo -e "\n=== Summary Metrics ==="
echo "📈 Total Technologies: $TOTAL_TECH"
echo "📦 Total Projects: $TOTAL_PROJECTS"
echo "⏱️ Years Experience: $YEARS_EXP"
```

### Data Validation Results

All endpoints tested and validated (2025-08-08):
- ✅ **JSON API**: Valid structure, 8 projects, 63 technologies, 5 experiences
- ✅ **Sitemap**: 10 URLs (homepage + print view + 8 project pages)
- ✅ **RSS Feed**: All 8 projects with metadata and categories
- ✅ **Data Consistency**: All endpoints synchronized with source data
- ✅ **Zod Validation**: Runtime type checking ensures data integrity

### Rate Limiting & Usage

- **No rate limiting** currently implemented
- **CORS enabled** for cross-origin requests
- **Cache headers** set for optimal performance (1 hour TTL)
- **Static generation** means endpoints update only on deployment

## 🚢 Deployment

The site builds to static files and can be deployed to any static hosting service:

```bash
# Build for production
npm run build

# Output is in ./dist/ directory
```

Recommended hosting options:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront

## 📄 License

This project is based on the open-source Astro framework and follows GOV.UK Design System principles. 

## 👤 Contact

**Haashim Alvi**
- Email: haashimalvi@pm.me
- GitHub: [@stravos97](https://github.com/stravos97)
- LinkedIn: [haashimalvi](https://linkedin.com/in/haashimalvi)

---

Built with ❤️ using [Astro](https://astro.build) and [GOV.UK Design System](https://design-system.service.gov.uk/)