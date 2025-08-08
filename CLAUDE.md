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

# Preview production build locally
npm run preview

# Run Astro CLI commands
npm run astro -- --help

# Clear Astro cache (if experiencing build issues)
rm -rf .astro dist node_modules/.vite
```

## Common Development Tasks

### Adding a New Project
1. Add project data to `cvData.ts` with required `slug` field
2. Include optional fields: `detailedDescription`, `features`, `challenges`, `architecture`, `gallery`
3. Build site to generate new project page at `/projects/[slug]`

### Modifying Project Links
- Project links on main page are in `index.astro` (lines 114-156)
- NOT in `ProjectCard.astro` component (which is currently unused)
- Add link styles to the `<style>` section in `index.astro`

### Adding Images for Project Galleries
1. Place images in `public/images/` directory
2. Reference in `cvData.ts` gallery array with `src`, `alt`, and optional `caption`
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
│   ├── ProjectCard.astro     # Project showcase cards (not currently used in index.astro)
│   ├── ThemeToggle.astro     # Dark/light mode switch
│   └── SkillSection.astro    # Skills categorization
├── data/
│   └── cvData.ts    # Single source of truth for all CV content
├── layouts/
│   └── Layout.astro # Main layout with WCAG 2.2 CSS system
├── pages/
│   ├── index.astro          # Main CV page with inline project rendering
│   ├── cv-print.astro       # Print-optimized CV version
│   └── projects/
│       └── [slug].astro     # Dynamic project detail pages
└── utils/
    └── theme.ts     # Theme management utilities
```

### Project Pages Architecture

The site includes dynamic project detail pages generated from project data:

1. **Project Data Structure** (`cvData.ts`):
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

3. **Important Note**: 
   - The main page (`index.astro`) renders projects inline, NOT using `ProjectCard.astro`
   - Project links must be added directly to `index.astro` when modifying navigation

### Key Design Patterns

1. **Data-Driven**: All CV content is centralized in `src/data/cvData.ts` with TypeScript interfaces
2. **Component-Based**: Modular Astro components for maintainability (note: index.astro uses inline rendering for projects)
3. **Progressive Enhancement**: Core functionality works without JavaScript
4. **Mobile-First**: Responsive design with proper text scaling
5. **Static Generation**: All pages are built at compile time, including dynamic project pages

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

1. Astro generates static HTML for all pages including dynamic project pages
2. CSS is inlined or bundled based on usage
3. JavaScript is minimal (only theme toggle functionality)
4. All project pages are pre-generated at build time from `cvData.ts`

### Important Deployment Notes

- The site builds to static HTML/CSS/JS files in the `dist/` directory
- No server-side rendering or API endpoints are required
- Netlify automatically rebuilds on push to the repository
- Security headers are configured in `netlify.toml` (X-Frame-Options, CSP, etc.)