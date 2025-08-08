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