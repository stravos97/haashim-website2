# CV Website Content Management System

This repository now includes multiple easy ways to manage your CV website content without manually editing TypeScript files.

## Quick Start - Easiest Method

```bash
# Just run this single command:
./manage-cv
```

This will automatically select the best available manager on your system.

## Available Managers

### Option 1: Python CV Manager (Most Features)
Interactive menu-driven interface for managing all CV data.

```bash
# Run the manager
python3 cv_manager.py

# Or make it executable and run directly
./cv_manager.py
```

**Features:**
- ✅ Interactive menu system
- ✅ View, Add, Update, Delete all CV sections
- ✅ Automatic TypeScript file generation
- ✅ Data validation
- ✅ Backup functionality
- ✅ Direct website building

### Option 2: Node.js ES Module Manager
Native ES module implementation with direct TypeScript editing.

```bash
# Run the ES module version
node cv-manager.mjs

# Or make it executable
./cv-manager.mjs
```

**Features:**
- ✅ Direct TypeScript file editing
- ✅ Interactive menus for all sections
- ✅ Preserves TypeScript structure
- ✅ Add/Edit/Delete operations
- ✅ Direct website building
- ✅ Backup creation

### Option 3: CommonJS Manager (JSON-based)
For environments that need CommonJS compatibility.

```bash
# Run the CommonJS version
node cv-data-manager.cjs
```

**Features:**
- ✅ JSON file editing
- ✅ Import/Export TypeScript
- ✅ Simple CRUD operations

### Option 4: Direct JSON Editing
For quick edits, you can directly modify `cv-data.json` (created after first run).

1. Edit `cv-data.json` with your preferred editor
2. Run the manager and select "Export to TypeScript"
3. Build the website

## Data Structure

### Personal Information
```json
{
  "personal": {
    "name": "Your Name",
    "title": "Your Title",
    "summary": "Professional summary...",
    "contact": {
      "email": "email@example.com",
      "linkedin": "linkedin.com/in/username",
      "github": "github.com/username",
      "website": "yourwebsite.com"
    }
  }
}
```

### Skills
```json
{
  "skills": {
    "Languages": ["Python", "JavaScript", "Go"],
    "DevOps": ["Docker", "Kubernetes", "Terraform"],
    "Cloud": ["AWS", "Azure", "GCP"]
  }
}
```

### Experience
```json
{
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "period": "Jan 2024 - Current",
      "location": "City",
      "points": [
        "Achievement 1",
        "Achievement 2"
      ]
    }
  ]
}
```

### Projects
```json
{
  "projects": [
    {
      "name": "Project Name",
      "slug": "project-url-slug",
      "description": "Project description",
      "techStack": ["React", "Node.js", "MongoDB"],
      "github": "https://github.com/username/project",
      "live": "https://project.com",
      "highlights": [
        "Key feature 1",
        "Key feature 2"
      ]
    }
  ]
}
```

## Common Operations

### Adding a New Job
1. Run the CV manager
2. Select "Experience Management" (option 3)
3. Choose "Add new experience"
4. Fill in the details
5. The most recent job will appear first

### Adding a New Project
1. Run the CV manager
2. Select "Projects Management" (option 4)
3. Choose "Add new project"
4. Enter project details including slug for URL
5. Project page will be automatically generated at `/projects/[slug]`

### Updating Skills
1. Run the CV manager
2. Select "Skills Management" (option 2)
3. Add skills to existing categories or create new categories

### Building the Website
Both managers have a "Build Website" option that runs `npm run build`.

Alternatively:
```bash
npm run build
```

## Backup and Recovery

### Python Manager
- Automatic backup feature (option 9)
- Backups saved to `backups/backup_TIMESTAMP/`

### Manual Backup
```bash
# Backup all data files
cp -r src/data src/data.backup.$(date +%Y%m%d)
```

## Tips

1. **TypeScript Safety**: Both managers preserve TypeScript interfaces and type safety
2. **Validation**: The website validates data at build time using Zod schemas
3. **Hot Reload**: Run `npm run dev` to see changes in real-time
4. **Project Pages**: Each project with a `slug` gets its own page at `/projects/[slug]`
5. **SEO**: The site automatically generates sitemap, RSS feed, and meta tags

## Troubleshooting

### Module Type Errors
If you get "require is not defined" or ES module errors:
1. Use the wrapper script: `./manage-cv`
2. Or use the correct version:
   - ES Module: `node cv-manager.mjs`
   - CommonJS: `node cv-data-manager.cjs`
   - Python: `python3 cv_manager.py`

### Build Errors
If you get TypeScript errors after editing:
1. Check the generated TypeScript files in `src/data/`
2. Ensure all required fields are present
3. Run `npm run validate:data` to check data structure

### Manager Not Working
1. Ensure you're in the `haashim-website2` directory
2. For Python: Requires Python 3.6+
3. For Node: Requires Node.js 14+
4. Try the wrapper script: `./manage-cv`

### Data Not Updating
1. After editing with the manager, rebuild the website
2. Clear browser cache if changes don't appear
3. Check the console for validation errors

## Advanced Usage

### Custom Fields
To add custom fields to projects or experiences:
1. Edit the TypeScript interface in the respective `.ts` file
2. Update the schema in `src/data/schemas.ts`
3. Add the field through the manager or JSON

### Bulk Import
For bulk data import:
1. Prepare data in JSON format
2. Place in `cv-data.json`
3. Run manager and export to TypeScript

### API Access
Your CV data is available as JSON at `/api/cv.json` after building.

## File Structure
```
haashim-website2/
├── manage-cv              # Universal launcher (use this!)
├── cv_manager.py          # Python CRUD manager
├── cv-manager.mjs         # Node.js ES Module manager
├── cv-data-manager.cjs    # Node.js CommonJS manager
├── cv-data.json          # JSON data file (generated)
├── src/data/             # TypeScript data files
│   ├── personal.ts
│   ├── skills.ts
│   ├── experience.ts
│   ├── projects.ts
│   ├── education.ts
│   ├── certifications.ts
│   └── community.ts
└── backups/              # Backup directory (generated)
```

---

Choose the management method that works best for your workflow. The Python manager is great for interactive editing, while the JSON approach is perfect for batch updates or integration with other tools.