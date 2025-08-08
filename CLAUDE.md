# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Haashim Alvi's personal CV/Resume website built with Astro framework. The website follows GOV.UK Design System principles and WCAG 2.2 accessibility standards for maximum readability and accessibility. The site is deployed to Netlify and features both a main CV page and individual project detail pages.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (localhost:4321)
npm run dev

# Build for production (outputs to ./dist/)
npm run build

# Build with data validation output
npm run build:verbose

# Preview production build locally
npm run preview

# Validate CV data structure
npm run validate:data

# Type checking
npm run validate

# Clean build artifacts
npm run clean

# Clear Astro cache (if experiencing build issues)
rm -rf .astro dist node_modules/.vite
```

## Common Development Tasks

### Adding a New Project
1. Add project data to `src/data/projects.ts` with required `slug` field
2. Include optional fields: `detailedDescription`, `features`, `challenges`, `architecture`, `gallery`
3. Build site to generate new project page at `/projects/[slug]`
4. Data will be automatically validated by Zod schemas on build

### Modifying Experience or Skills
- Edit `src/data/experience.ts` for work history
- Edit `src/data/skills.ts` for skills categories
- Edit `src/data/personal.ts` for contact info
- All changes are validated at build time

### Adding Images for Project Galleries
1. Place images in `public/images/` directory
2. Reference in `src/data/projects.ts` gallery array with `src`, `alt`, and optional `caption`
3. Images are displayed on individual project pages

## Architecture & Design Principles

### Core Technology Stack
- **Framework**: Astro 4.15.3 (static site generator)
- **Language**: TypeScript with Astro components (.astro files)
- **Styling**: CSS custom properties following GOV.UK Design System
- **Theme**: Dark mode default with light mode toggle

### Design System Implementation

The website follows **GOV.UK Design System** and **WCAG 2.2 AA** standards:

1. **Typography**: 
   - Base font size: 19px for optimal readability
   - Line length: Maximum 66 characters (--max-width-content)
   - Font scale: 16px, 19px, 24px, 27px, 36px, 48px
   
2. **Color Contrast**:
   - All text meets WCAG 2.2 contrast ratios (4.5:1 minimum)
   - Focus indicators: 3:1 contrast with yellow (#ffdd00) highlight
   
3. **Touch Targets**: 
   - Minimum 44×44 pixels for all interactive elements
   - Proper spacing between adjacent targets

4. **Accessibility Features**:
   - Multiple skip navigation links
   - ARIA landmarks throughout
   - Screen reader optimized content
   - Keyboard navigation support
   - Progress indicator for cognitive accessibility
   - Consistent help section

### Component Structure

```
src/
├── components/       # Reusable Astro components
│   ├── ExperienceCard.astro  # Work experience display
│   ├── ThemeToggle.astro     # Dark/light mode switch
│   └── SkillSection.astro    # Skills categorization
├── data/            # Modular data architecture (refactored 2025)
│   ├── index.ts     # Unified export with validation & 15+ utility functions
│   ├── personal.ts  # Personal information
│   ├── skills.ts    # Skills categorization
│   ├── experience.ts # Work experience
│   ├── projects.ts  # Project showcase (8 projects)
│   ├── education.ts # Education & certifications
│   ├── community.ts # Community involvement
│   └── schemas.ts   # Zod validation schemas
├── layouts/
│   └── Layout.astro # Main layout with SEO meta tags
├── pages/
│   ├── index.astro          # Main CV page
│   ├── cv-print.astro       # Print-optimized version
│   ├── projects/
│   │   └── [slug].astro     # Dynamic project detail pages
│   ├── api/
│   │   └── cv.json.ts       # JSON API endpoint
│   ├── sitemap.xml.ts       # Dynamic sitemap generation
│   └── rss.xml.ts          # RSS feed for projects
└── utils/
    └── theme.ts     # Theme management utilities
```

### Unified Data API (Refactored 2025)

The `src/data/index.ts` provides a powerful unified API with utility functions:

```typescript
import { cvData, cvUtils, metaData } from '../data';

// Direct data access
const projects = cvData.projects;
const skills = cvData.skills;

// Utility functions
const project = cvUtils.getProjectBySlug('kubernetes-media-server');
const currentRole = cvUtils.getCurrentRole();
const featuredProjects = cvUtils.getFeaturedProjects();
const allTech = cvUtils.getAllTechnologies();
const experience = cvUtils.getTotalExperience(); // years
const projectStats = cvUtils.getProjectStats();

// SEO metadata
const meta = metaData.jsonLd; // Structured data for SEO
```

Available utility functions:
- `getProjectBySlug(slug)` - Find project by URL slug
- `getCurrentRole()` - Get most recent job
- `getFeaturedProjects()` - Projects with live demos
- `getAllTechnologies()` - All unique tech skills
- `getTotalExperience()` - Years of experience
- `getSkillsByCategory(category)` - Skills by category
- `getFormattedContact()` - Formatted contact URLs
- `getProjectStats()` - Project statistics
- `getProjectsByTech(tech)` - Search projects by technology

### Project Pages Architecture

The site includes dynamic project detail pages generated from project data:

1. **Project Data Structure** (`src/data/projects.ts`):
   - `slug`: URL-friendly identifier for routing
   - `detailedDescription`: Extended project description
   - `features`: List of key features
   - `challenges`: Technical challenges overcome
   - `architecture`: System architecture description
   - `gallery`: Array of image objects with src, alt, and caption

2. **Dynamic Routing**: 
   - Uses Astro's `getStaticPaths()` to generate pages at build time
   - Each project gets its own page at `/projects/[slug]`
   - All pages are statically generated, no server-side rendering needed

3. **API Endpoints**:
   - `/api/cv.json` - JSON API for programmatic access
   - `/sitemap.xml` - Dynamic sitemap generation
   - `/rss.xml` - RSS feed for project updates

### Key Design Patterns

1. **Modular Data Architecture**: CV content split into 7 focused modules with TypeScript interfaces
2. **Runtime Validation**: Zod schemas validate all data at build time
3. **Component-Based**: Modular Astro components for maintainability
4. **Progressive Enhancement**: Core functionality works without JavaScript
5. **Mobile-First**: Responsive design with proper text scaling
6. **Static Generation**: All pages are built at compile time, including dynamic project pages
7. **Single Source of Truth**: Unified data export with validation and utilities

### CSS Architecture

The project uses CSS custom properties defined in `Layout.astro`:
- WCAG 2.2 compliant color system with light/dark themes
- GOV.UK spacing scale (multiples of 5px)
- Focus indicators meeting 3:1 contrast requirements
- Print-optimized styles for PDF generation

### Important Implementation Details

1. **Theme Persistence**: Uses localStorage to remember user's theme preference, defaults to dark mode
2. **Focus Management**: Enhanced focus indicators that are never obscured (WCAG 2.2 requirement)
3. **Semantic HTML**: Proper heading hierarchy and ARIA labels throughout
4. **Print Styles**: Comprehensive print CSS for proper PDF generation via browser print
5. **Data Validation**: All CV data is validated at build time using Zod schemas
6. **SEO Optimization**: Dynamic sitemap, RSS feed, Open Graph tags, and structured data

### Data Validation

All CV data is validated using Zod schemas (`src/data/schemas.ts`):
- Required fields are enforced
- Email and URL format validation
- Minimum length requirements for text fields
- Array content validation
- Development mode throws errors, production mode logs warnings

Validation happens automatically on build and can be run manually:
```bash
npm run validate:data
```

## Testing Accessibility

When making changes, ensure:
1. All interactive elements meet 44×44px minimum touch target
2. Color contrast ratios meet WCAG 2.2 AA standards
3. Keyboard navigation works for all interactive elements
4. Screen reader announces content properly
5. Focus indicators are visible and meet contrast requirements

## Building and Deployment

### Netlify Deployment

The site is configured for Netlify deployment with automatic builds on git push:

```bash
# Build command (configured in netlify.toml)
npm run build

# Output directory
dist/

# Node version
18 (specified in netlify.toml)
```

### Build Process

1. Data validation runs first using Zod schemas
2. Astro generates static HTML for all pages including dynamic project pages
3. CSS is minified and inlined or bundled based on usage
4. JavaScript is minified with Terser and code-split
5. HTML is compressed for smaller file sizes
6. All project pages are pre-generated at build time from modular data files
7. Sitemap and RSS feed are dynamically generated
8. API endpoint is created at `/api/cv.json`

### Important Deployment Notes

- The site builds to static HTML/CSS/JS files in the `dist/` directory
- Static API endpoints are generated at build time (sitemap, RSS, JSON API)
- Netlify automatically rebuilds on push to the repository
- Security headers are configured in `netlify.toml` (X-Frame-Options, CSP, etc.)

## Recent Refactoring (2025)

Major architectural improvements completed:
- **Data Layer**: Split 484-line monolithic file into 7 focused modules
- **Validation**: Added Zod schemas for runtime data validation
- **Unified API**: Created comprehensive data API with 15+ utility functions
- **SEO**: Added sitemap, RSS feed, and JSON API endpoints
- **Performance**: Implemented minification, compression, and code splitting
- **Dead Code**: Removed 250 lines of unused components

For detailed refactoring documentation, see `README-ARCHITECTURE.md`