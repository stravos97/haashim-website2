#!/usr/bin/env node

/**
 * CV Data Manager - Simple JSON-based CRUD system
 * 
 * This script provides an easy way to manage CV data through JSON files
 * and automatically generates the TypeScript files for the website.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

class CVDataManager {
  constructor() {
    this.dataDir = path.join(__dirname, 'src', 'data');
    this.jsonFile = path.join(__dirname, 'cv-data.json');
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async init() {
    // Load or create JSON data file
    if (!fs.existsSync(this.jsonFile)) {
      console.log('Creating initial CV data file...');
      await this.importFromTypeScript();
    }
    
    await this.showMenu();
  }

  async importFromTypeScript() {
    // Import existing TypeScript data to JSON
    const data = {
      personal: this.parseTypeScriptFile('personal.ts'),
      skills: this.parseTypeScriptFile('skills.ts'),
      experience: this.parseTypeScriptFile('experience.ts'),
      projects: this.parseTypeScriptFile('projects.ts'),
      education: this.parseTypeScriptFile('education.ts'),
      certifications: this.parseTypeScriptFile('certifications.ts'),
      community: this.parseTypeScriptFile('community.ts')
    };
    
    fs.writeFileSync(this.jsonFile, JSON.stringify(data, null, 2));
    console.log('✓ CV data imported to cv-data.json');
  }

  parseTypeScriptFile(filename) {
    const filepath = path.join(this.dataDir, filename);
    if (!fs.existsSync(filepath)) return null;
    
    const content = fs.readFileSync(filepath, 'utf8');
    
    // Extract the exported const data
    const match = content.match(/export const \w+.*?=\s*([\s\S]*?);?\s*$/m);
    if (!match) return null;
    
    let dataStr = match[1];
    
    // Clean TypeScript syntax for JSON parsing
    dataStr = dataStr
      .replace(/\/\/.*$/gm, '') // Remove comments
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multiline comments
      .replace(/^\s*(\w+):/gm, '"$1":') // Quote keys
      .replace(/`([^`]*)`/g, '"$1"') // Convert template literals
      .replace(/'/g, '"') // Convert single quotes
      .replace(/,\s*}/g, '}') // Remove trailing commas
      .replace(/,\s*]/g, ']'); // Remove trailing commas in arrays
    
    try {
      return JSON.parse(dataStr);
    } catch (e) {
      console.log(`Warning: Could not parse ${filename}, using empty data`);
      return filename.includes('[]') ? [] : {};
    }
  }

  loadData() {
    return JSON.parse(fs.readFileSync(this.jsonFile, 'utf8'));
  }

  saveData(data) {
    // Save to JSON
    fs.writeFileSync(this.jsonFile, JSON.stringify(data, null, 2));
    
    // Generate TypeScript files
    this.generateTypeScriptFiles(data);
    
    console.log('✓ Data saved successfully!');
  }

  generateTypeScriptFiles(data) {
    // Generate personal.ts
    if (data.personal) {
      const content = `export interface Personal {
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

export const personal: Personal = ${this.toTypeScript(data.personal)};
`;
      fs.writeFileSync(path.join(this.dataDir, 'personal.ts'), content);
    }

    // Generate skills.ts
    if (data.skills) {
      const content = `export interface Skills {
  [category: string]: string[];
}

export const skills: Skills = ${this.toTypeScript(data.skills)};
`;
      fs.writeFileSync(path.join(this.dataDir, 'skills.ts'), content);
    }

    // Generate experience.ts
    if (data.experience) {
      const content = `export interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  points: string[];
}

export const experience: Experience[] = ${this.toTypeScript(data.experience)};
`;
      fs.writeFileSync(path.join(this.dataDir, 'experience.ts'), content);
    }

    // Generate projects.ts
    if (data.projects) {
      const content = `export interface Project {
  name: string;
  slug: string;
  description: string;
  techStack: string[];
  github?: string;
  live?: string;
  highlights?: string[];
  detailedDescription?: string;
  features?: string[];
  challenges?: string[];
  architecture?: string;
  gallery?: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
}

export const projects: Project[] = ${this.toTypeScript(data.projects)};
`;
      fs.writeFileSync(path.join(this.dataDir, 'projects.ts'), content);
    }

    // Similar for education, certifications, community...
  }

  toTypeScript(obj, indent = 0) {
    const spaces = '  '.repeat(indent);
    
    if (Array.isArray(obj)) {
      if (obj.length === 0) return '[]';
      
      if (obj.every(item => typeof item === 'string')) {
        return `[${obj.map(item => `"${item}"`).join(', ')}]`;
      }
      
      return `[\n${obj.map(item => 
        `${spaces}  ${this.toTypeScript(item, indent + 1)}`
      ).join(',\n')}\n${spaces}]`;
    }
    
    if (typeof obj === 'object' && obj !== null) {
      const entries = Object.entries(obj);
      if (entries.length === 0) return '{}';
      
      return `{\n${entries.map(([key, value]) => 
        `${spaces}  ${key}: ${this.toTypeScript(value, indent + 1)}`
      ).join(',\n')}\n${spaces}}`;
    }
    
    if (typeof obj === 'string') {
      // Use template literals for multiline strings
      if (obj.includes('\n')) {
        return '`' + obj + '`';
      }
      return `"${obj.replace(/"/g, '\\"')}"`;
    }
    
    return String(obj);
  }

  async showMenu() {
    console.log('\n========================================');
    console.log('       CV DATA MANAGER');
    console.log('========================================');
    console.log('1. Edit Personal Information');
    console.log('2. Manage Skills');
    console.log('3. Manage Experience');
    console.log('4. Manage Projects');
    console.log('5. Manage Education');
    console.log('6. Manage Certifications');
    console.log('7. Export to TypeScript');
    console.log('8. Open JSON in editor');
    console.log('9. Build Website');
    console.log('0. Exit');
    console.log('----------------------------------------');
    
    const choice = await this.prompt('Enter choice: ');
    
    switch (choice) {
      case '1':
        await this.editPersonal();
        break;
      case '2':
        await this.manageSkills();
        break;
      case '3':
        await this.manageExperience();
        break;
      case '4':
        await this.manageProjects();
        break;
      case '5':
        console.log('Education management coming soon...');
        break;
      case '6':
        console.log('Certifications management coming soon...');
        break;
      case '7':
        const data = this.loadData();
        this.generateTypeScriptFiles(data);
        console.log('✓ TypeScript files generated!');
        break;
      case '8':
        console.log(`\nJSON file location: ${this.jsonFile}`);
        console.log('You can edit this file directly with any text editor.');
        console.log('After editing, use option 7 to generate TypeScript files.');
        break;
      case '9':
        await this.buildWebsite();
        break;
      case '0':
        console.log('\nGoodbye! 👋');
        this.rl.close();
        return;
      default:
        console.log('Invalid choice.');
    }
    
    await this.showMenu();
  }

  async editPersonal() {
    const data = this.loadData();
    const personal = data.personal || {};
    
    console.log('\n--- EDIT PERSONAL INFORMATION ---');
    console.log('Press Enter to keep current value\n');
    
    personal.name = await this.prompt(`Name [${personal.name}]: `) || personal.name;
    personal.title = await this.prompt(`Title [${personal.title}]: `) || personal.title;
    
    console.log(`\nCurrent summary:\n${personal.summary}\n`);
    const newSummary = await this.prompt('New summary (or press Enter to keep): ');
    if (newSummary) personal.summary = newSummary;
    
    // Contact info
    console.log('\n--- Contact Information ---');
    personal.contact = personal.contact || {};
    personal.contact.email = await this.prompt(`Email [${personal.contact.email}]: `) || personal.contact.email;
    personal.contact.linkedin = await this.prompt(`LinkedIn [${personal.contact.linkedin}]: `) || personal.contact.linkedin;
    personal.contact.github = await this.prompt(`GitHub [${personal.contact.github}]: `) || personal.contact.github;
    personal.contact.website = await this.prompt(`Website [${personal.contact.website}]: `) || personal.contact.website;
    
    data.personal = personal;
    this.saveData(data);
  }

  async manageSkills() {
    const data = this.loadData();
    const skills = data.skills || {};
    
    console.log('\n--- MANAGE SKILLS ---');
    console.log('1. View all skills');
    console.log('2. Add skill to category');
    console.log('3. Remove skill');
    console.log('4. Add new category');
    
    const choice = await this.prompt('Choice: ');
    
    if (choice === '1') {
      Object.entries(skills).forEach(([category, items]) => {
        console.log(`\n${category}:`);
        items.forEach(skill => console.log(`  • ${skill}`));
      });
    } else if (choice === '2') {
      const categories = Object.keys(skills);
      console.log('\nCategories:');
      categories.forEach((cat, i) => console.log(`${i + 1}. ${cat}`));
      
      const catIndex = parseInt(await this.prompt('Select category: ')) - 1;
      if (catIndex >= 0 && catIndex < categories.length) {
        const category = categories[catIndex];
        const newSkill = await this.prompt('New skill: ');
        if (newSkill && !skills[category].includes(newSkill)) {
          skills[category].push(newSkill);
          data.skills = skills;
          this.saveData(data);
        }
      }
    } else if (choice === '4') {
      const categoryName = await this.prompt('New category name: ');
      if (categoryName && !skills[categoryName]) {
        skills[categoryName] = [];
        data.skills = skills;
        this.saveData(data);
        console.log(`✓ Added category: ${categoryName}`);
      }
    }
  }

  async manageExperience() {
    const data = this.loadData();
    const experience = data.experience || [];
    
    console.log('\n--- MANAGE EXPERIENCE ---');
    console.log('1. View all experiences');
    console.log('2. Add new experience');
    console.log('3. Edit experience');
    console.log('4. Delete experience');
    
    const choice = await this.prompt('Choice: ');
    
    if (choice === '1') {
      experience.forEach((exp, i) => {
        console.log(`\n${i + 1}. ${exp.title} at ${exp.company}`);
        console.log(`   ${exp.period} | ${exp.location}`);
      });
    } else if (choice === '2') {
      const newExp = {};
      console.log('\n--- ADD NEW EXPERIENCE ---');
      newExp.title = await this.prompt('Job title: ');
      newExp.company = await this.prompt('Company: ');
      newExp.period = await this.prompt('Period (e.g., "Jan 2024 - Current"): ');
      newExp.location = await this.prompt('Location: ');
      
      console.log('Enter accomplishments (empty line to finish):');
      newExp.points = [];
      while (true) {
        const point = await this.prompt('• ');
        if (!point) break;
        newExp.points.push(point);
      }
      
      experience.unshift(newExp); // Add to beginning
      data.experience = experience;
      this.saveData(data);
      console.log('✓ Experience added!');
    }
  }

  async manageProjects() {
    const data = this.loadData();
    const projects = data.projects || [];
    
    console.log('\n--- MANAGE PROJECTS ---');
    console.log('1. View all projects');
    console.log('2. Add new project');
    console.log('3. Edit project');
    console.log('4. Delete project');
    
    const choice = await this.prompt('Choice: ');
    
    if (choice === '1') {
      projects.forEach((proj, i) => {
        console.log(`\n${i + 1}. ${proj.name}`);
        console.log(`   ${proj.description.substring(0, 80)}...`);
        console.log(`   Tech: ${proj.techStack.join(', ')}`);
      });
    } else if (choice === '2') {
      const newProj = {};
      console.log('\n--- ADD NEW PROJECT ---');
      newProj.name = await this.prompt('Project name: ');
      newProj.slug = await this.prompt('URL slug: ');
      newProj.description = await this.prompt('Description: ');
      
      const techStack = await this.prompt('Tech stack (comma separated): ');
      newProj.techStack = techStack.split(',').map(t => t.trim());
      
      newProj.github = await this.prompt('GitHub URL (optional): ') || '';
      newProj.live = await this.prompt('Live URL (optional): ') || '';
      
      console.log('Enter highlights (empty line to finish):');
      newProj.highlights = [];
      while (true) {
        const highlight = await this.prompt('• ');
        if (!highlight) break;
        newProj.highlights.push(highlight);
      }
      
      projects.push(newProj);
      data.projects = projects;
      this.saveData(data);
      console.log('✓ Project added!');
    }
  }

  async buildWebsite() {
    console.log('\n--- BUILDING WEBSITE ---');
    const { exec } = require('child_process');
    
    exec('npm run build', { cwd: __dirname }, (error, stdout, stderr) => {
      if (error) {
        console.error('Build failed:', error);
        return;
      }
      console.log('✓ Website built successfully!');
      console.log('Output in: dist/');
    });
  }

  prompt(question) {
    return new Promise(resolve => {
      this.rl.question(question, answer => resolve(answer));
    });
  }
}

// Run the manager
const manager = new CVDataManager();
manager.init().catch(console.error);