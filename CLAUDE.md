# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Haashim Alvi's personal CV/Resume website built with Astro framework. The website has been comprehensively redesigned to follow GOV.UK Design System principles and WCAG 2.2 accessibility standards for maximum readability and accessibility.

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
```

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
│   ├── ProjectCard.astro     # Project showcase cards
│   ├── ThemeToggle.astro     # Dark/light mode switch
│   └── SkillSection.astro    # Skills categorization
├── data/
│   └── cvData.ts    # Single source of truth for all CV content
├── layouts/
│   └── Layout.astro # Main layout with WCAG 2.2 CSS system
├── pages/
│   └── index.astro  # Main page with GOV.UK component patterns
└── utils/
    └── theme.ts     # Theme management utilities
```

### Key Design Patterns

1. **Data-Driven**: All CV content is centralized in `src/data/cvData.ts` with TypeScript interfaces
2. **Component-Based**: Modular Astro components for maintainability
3. **Progressive Enhancement**: Core functionality works without JavaScript
4. **Mobile-First**: Responsive design with proper text scaling

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

The site builds to static HTML/CSS/JS files in the `dist/` directory. No server-side rendering or API endpoints are required. The build output can be deployed to any static hosting service.