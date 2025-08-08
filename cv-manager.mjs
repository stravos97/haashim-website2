#!/usr/bin/env node

/**
 * CV Data Manager - Enhanced ES Module Version
 * 
 * A comprehensive CRUD system for managing CV website data
 * Works with the existing TypeScript data structure
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CVManager {
  constructor() {
    this.dataDir = path.join(__dirname, 'src', 'data');
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // Data file mappings
    this.dataFiles = {
      personal: 'personal.ts',
      skills: 'skills.ts',
      experience: 'experience.ts',
      projects: 'projects.ts',
      education: 'education.ts',
      certifications: 'certifications.ts',
      community: 'community.ts'
    };
  }

  async init() {
    console.clear();
    console.log('🚀 CV Website Content Manager');
    console.log('================================\n');
    
    await this.mainMenu();
  }

  async mainMenu() {
    console.log('\n📋 MAIN MENU');
    console.log('─────────────────────────────');
    console.log('1. 👤 Personal Information');
    console.log('2. 🛠️  Skills');
    console.log('3. 💼 Experience');
    console.log('4. 🚀 Projects');
    console.log('5. 🎓 Education');
    console.log('6. 📜 Certifications');
    console.log('7. 🌐 Community');
    console.log('8. 🔨 Build Website');
    console.log('9. 💾 Create Backup');
    console.log('0. 👋 Exit');
    console.log('─────────────────────────────\n');
    
    const choice = await this.prompt('Enter your choice: ');
    
    switch (choice) {
      case '1':
        await this.managePersonal();
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
        await this.manageEducation();
        break;
      case '6':
        await this.manageCertifications();
        break;
      case '7':
        console.log('Community management coming soon...');
        break;
      case '8':
        await this.buildWebsite();
        break;
      case '9':
        await this.createBackup();
        break;
      case '0':
        console.log('\nGoodbye! 👋\n');
        this.rl.close();
        process.exit(0);
        break;
      default:
        console.log('❌ Invalid choice. Please try again.');
    }
    
    await this.mainMenu();
  }

  // Read TypeScript file and extract data
  readTSFile(filename) {
    const filepath = path.join(this.dataDir, filename);
    if (!fs.existsSync(filepath)) {
      return null;
    }
    
    const content = fs.readFileSync(filepath, 'utf8');
    return content;
  }

  // Write TypeScript file
  writeTSFile(filename, content) {
    const filepath = path.join(this.dataDir, filename);
    fs.writeFileSync(filepath, content);
    console.log(`✅ Updated ${filename}`);
  }

  async managePersonal() {
    console.log('\n👤 PERSONAL INFORMATION');
    console.log('─────────────────────────────');
    
    const content = this.readTSFile('personal.ts');
    if (!content) {
      console.log('❌ Could not read personal.ts');
      return;
    }
    
    // Extract current values using regex
    const nameMatch = content.match(/name:\s*"([^"]*)"/);
    const titleMatch = content.match(/title:\s*"([^"]*)"/);
    const summaryMatch = content.match(/summary:\s*"([^"]*)"/);
    const emailMatch = content.match(/email:\s*"([^"]*)"/);
    const linkedinMatch = content.match(/linkedin:\s*"([^"]*)"/);
    const githubMatch = content.match(/github:\s*"([^"]*)"/);
    const websiteMatch = content.match(/website:\s*"([^"]*)"/);
    
    console.log('\nCurrent Information:');
    console.log(`Name: ${nameMatch?.[1] || 'Not set'}`);
    console.log(`Title: ${titleMatch?.[1] || 'Not set'}`);
    console.log(`Email: ${emailMatch?.[1] || 'Not set'}`);
    
    console.log('\n1. Update Name');
    console.log('2. Update Title');
    console.log('3. Update Summary');
    console.log('4. Update Contact Info');
    console.log('5. Back to Main Menu');
    
    const choice = await this.prompt('\nChoice: ');
    
    switch (choice) {
      case '1':
        const newName = await this.prompt(`New name [${nameMatch?.[1]}]: `);
        if (newName) {
          const updated = content.replace(/name:\s*"[^"]*"/, `name: "${newName}"`);
          this.writeTSFile('personal.ts', updated);
        }
        break;
        
      case '2':
        const newTitle = await this.prompt(`New title [${titleMatch?.[1]}]: `);
        if (newTitle) {
          const updated = content.replace(/title:\s*"[^"]*"/, `title: "${newTitle}"`);
          this.writeTSFile('personal.ts', updated);
        }
        break;
        
      case '3':
        console.log(`\nCurrent summary:\n${summaryMatch?.[1]}\n`);
        const newSummary = await this.prompt('New summary (or press Enter to keep): ');
        if (newSummary) {
          const updated = content.replace(/summary:\s*"[^"]*"/, `summary: "${newSummary}"`);
          this.writeTSFile('personal.ts', updated);
        }
        break;
        
      case '4':
        await this.updateContactInfo(content);
        break;
    }
  }

  async updateContactInfo(content) {
    console.log('\n📧 UPDATE CONTACT INFO');
    console.log('─────────────────────────────');
    
    console.log('1. Email');
    console.log('2. LinkedIn');
    console.log('3. GitHub');
    console.log('4. Website');
    console.log('5. Back');
    
    const choice = await this.prompt('\nWhat to update: ');
    
    const fields = {
      '1': 'email',
      '2': 'linkedin',
      '3': 'github',
      '4': 'website'
    };
    
    if (fields[choice]) {
      const field = fields[choice];
      const currentMatch = content.match(new RegExp(`${field}:\\s*"([^"]*)"`));
      const newValue = await this.prompt(`New ${field} [${currentMatch?.[1]}]: `);
      
      if (newValue) {
        const updated = content.replace(
          new RegExp(`${field}:\\s*"[^"]*"`),
          `${field}: "${newValue}"`
        );
        this.writeTSFile('personal.ts', updated);
      }
    }
  }

  async manageSkills() {
    console.log('\n🛠️  SKILLS MANAGEMENT');
    console.log('─────────────────────────────');
    
    const content = this.readTSFile('skills.ts');
    if (!content) {
      console.log('❌ Could not read skills.ts');
      return;
    }
    
    console.log('1. View All Skills');
    console.log('2. Add Skill to Category');
    console.log('3. Remove Skill');
    console.log('4. Add New Category');
    console.log('5. Back to Main Menu');
    
    const choice = await this.prompt('\nChoice: ');
    
    switch (choice) {
      case '1':
        await this.viewSkills(content);
        break;
      case '2':
        await this.addSkill(content);
        break;
      case '3':
        await this.removeSkill(content);
        break;
      case '4':
        await this.addSkillCategory(content);
        break;
    }
  }

  async viewSkills(content) {
    // Parse skills categories
    const skillsMatch = content.match(/export const skills.*?=\s*{([\s\S]*?)^}/m);
    if (skillsMatch) {
      const skillsContent = skillsMatch[1];
      const categoryMatches = skillsContent.matchAll(/(\w+):\s*\[(.*?)\]/gs);
      
      console.log('\n📚 Current Skills:');
      for (const match of categoryMatches) {
        const category = match[1];
        const skills = match[2].match(/"([^"]*)"/g)?.map(s => s.replace(/"/g, '')) || [];
        
        console.log(`\n${category}:`);
        skills.forEach(skill => console.log(`  • ${skill}`));
      }
    }
  }

  async addSkill(content) {
    // Extract categories
    const skillsMatch = content.match(/export const skills.*?=\s*{([\s\S]*?)^}/m);
    if (!skillsMatch) return;
    
    const categories = [];
    const categoryMatches = skillsMatch[1].matchAll(/(\w+):\s*\[/g);
    for (const match of categoryMatches) {
      categories.push(match[1]);
    }
    
    console.log('\nCategories:');
    categories.forEach((cat, i) => console.log(`${i + 1}. ${cat}`));
    
    const catChoice = await this.prompt('\nSelect category: ');
    const catIndex = parseInt(catChoice) - 1;
    
    if (catIndex >= 0 && catIndex < categories.length) {
      const category = categories[catIndex];
      const newSkill = await this.prompt('New skill: ');
      
      if (newSkill) {
        // Find the category and add the skill
        const categoryRegex = new RegExp(`(${category}:\\s*\\[)([^\\]]*)\\]`);
        const updated = content.replace(categoryRegex, (match, prefix, skills) => {
          const currentSkills = skills.trim();
          if (currentSkills) {
            return `${prefix}${skills}, "${newSkill}"]`;
          } else {
            return `${prefix}"${newSkill}"]`;
          }
        });
        
        this.writeTSFile('skills.ts', updated);
      }
    }
  }

  async removeSkill(content) {
    // Similar to addSkill but removes instead
    console.log('Remove skill functionality - similar to add but removes');
    // Implementation would follow similar pattern
  }

  async addSkillCategory(content) {
    const categoryName = await this.prompt('New category name: ');
    
    if (categoryName) {
      // Add new category before the closing brace
      const updated = content.replace(
        /(export const skills.*?=\s*{[\s\S]*?)(^})/m,
        `$1  ${categoryName}: [],\n$2`
      );
      
      this.writeTSFile('skills.ts', updated);
    }
  }

  async manageExperience() {
    console.log('\n💼 EXPERIENCE MANAGEMENT');
    console.log('─────────────────────────────');
    
    const content = this.readTSFile('experience.ts');
    if (!content) {
      console.log('❌ Could not read experience.ts');
      return;
    }
    
    console.log('1. View All Experiences');
    console.log('2. Add New Experience');
    console.log('3. Edit Experience');
    console.log('4. Delete Experience');
    console.log('5. Back to Main Menu');
    
    const choice = await this.prompt('\nChoice: ');
    
    switch (choice) {
      case '1':
        await this.viewExperiences(content);
        break;
      case '2':
        await this.addExperience(content);
        break;
      case '3':
        console.log('Edit experience - coming soon');
        break;
      case '4':
        console.log('Delete experience - coming soon');
        break;
    }
  }

  async viewExperiences(content) {
    // Parse experiences
    const expMatches = content.matchAll(/{\s*title:\s*"([^"]*)".*?company:\s*"([^"]*)".*?period:\s*"([^"]*)"/gs);
    
    console.log('\n📋 Current Experiences:');
    let i = 1;
    for (const match of expMatches) {
      console.log(`\n${i}. ${match[1]} at ${match[2]}`);
      console.log(`   Period: ${match[3]}`);
      i++;
    }
  }

  async addExperience(content) {
    console.log('\n➕ ADD NEW EXPERIENCE');
    console.log('─────────────────────────────');
    
    const title = await this.prompt('Job title: ');
    const company = await this.prompt('Company: ');
    const period = await this.prompt('Period (e.g., "Jan 2024 - Current"): ');
    const location = await this.prompt('Location: ');
    
    console.log('\nEnter accomplishments (empty line to finish):');
    const points = [];
    while (true) {
      const point = await this.prompt('• ');
      if (!point) break;
      points.push(point);
    }
    
    // Create new experience object
    const newExp = `  {
    title: "${title}",
    company: "${company}",
    period: "${period}",
    location: "${location}",
    points: [
${points.map(p => `      "${p}"`).join(',\n')}
    ]
  }`;
    
    // Add to beginning of array (most recent first)
    const updated = content.replace(
      /(export const experience.*?=\s*\[)/s,
      `$1\n${newExp},`
    );
    
    this.writeTSFile('experience.ts', updated);
  }

  async manageProjects() {
    console.log('\n🚀 PROJECTS MANAGEMENT');
    console.log('─────────────────────────────');
    
    const content = this.readTSFile('projects.ts');
    if (!content) {
      console.log('❌ Could not read projects.ts');
      return;
    }
    
    console.log('1. View All Projects');
    console.log('2. Add New Project');
    console.log('3. Edit Project');
    console.log('4. Delete Project');
    console.log('5. Back to Main Menu');
    
    const choice = await this.prompt('\nChoice: ');
    
    switch (choice) {
      case '1':
        await this.viewProjects(content);
        break;
      case '2':
        await this.addProject(content);
        break;
      case '3':
        console.log('Edit project - coming soon');
        break;
      case '4':
        console.log('Delete project - coming soon');
        break;
    }
  }

  async viewProjects(content) {
    const projMatches = content.matchAll(/{\s*name:\s*"([^"]*)".*?slug:\s*"([^"]*)".*?description:\s*"([^"]*)"/gs);
    
    console.log('\n📦 Current Projects:');
    let i = 1;
    for (const match of projMatches) {
      console.log(`\n${i}. ${match[1]}`);
      console.log(`   Slug: ${match[2]}`);
      console.log(`   ${match[3].substring(0, 80)}...`);
      i++;
    }
  }

  async addProject(content) {
    console.log('\n➕ ADD NEW PROJECT');
    console.log('─────────────────────────────');
    
    const name = await this.prompt('Project name: ');
    const slug = await this.prompt('URL slug: ');
    const description = await this.prompt('Description: ');
    
    const techInput = await this.prompt('Tech stack (comma separated): ');
    const techStack = techInput.split(',').map(t => t.trim()).filter(t => t);
    
    const github = await this.prompt('GitHub URL (optional): ');
    const live = await this.prompt('Live URL (optional): ');
    
    console.log('\nEnter highlights (empty line to finish):');
    const highlights = [];
    while (true) {
      const highlight = await this.prompt('• ');
      if (!highlight) break;
      highlights.push(highlight);
    }
    
    // Create new project object
    const newProj = `  {
    name: "${name}",
    slug: "${slug}",
    description: "${description}",
    techStack: [${techStack.map(t => `"${t}"`).join(', ')}],${github ? `
    github: "${github}",` : ''}${live ? `
    live: "${live}",` : ''}${highlights.length ? `
    highlights: [
${highlights.map(h => `      "${h}"`).join(',\n')}
    ]` : ''}
  }`;
    
    // Add to array
    const updated = content.replace(
      /(export const projects.*?=\s*\[)([\s\S]*?)(\s*\];)/,
      (match, prefix, projects, suffix) => {
        const hasProjects = projects.trim().length > 0;
        if (hasProjects) {
          return `${prefix}${projects},\n${newProj}${suffix}`;
        } else {
          return `${prefix}\n${newProj}${suffix}`;
        }
      }
    );
    
    this.writeTSFile('projects.ts', updated);
  }

  async manageEducation() {
    console.log('\n🎓 EDUCATION MANAGEMENT');
    console.log('─────────────────────────────');
    
    const content = this.readTSFile('education.ts');
    if (!content) {
      console.log('❌ Could not read education.ts');
      return;
    }
    
    console.log('1. View Education');
    console.log('2. Add Education Entry');
    console.log('3. Edit Education');
    console.log('4. Back to Main Menu');
    
    const choice = await this.prompt('\nChoice: ');
    
    switch (choice) {
      case '1':
        await this.viewEducation(content);
        break;
      case '2':
        await this.addEducation(content);
        break;
      case '3':
        console.log('Edit education - coming soon');
        break;
    }
  }

  async viewEducation(content) {
    const eduMatches = content.matchAll(/{\s*institution:\s*"([^"]*)".*?degree:\s*"([^"]*)".*?period:\s*"([^"]*)"/gs);
    
    console.log('\n📚 Current Education:');
    let i = 1;
    for (const match of eduMatches) {
      console.log(`\n${i}. ${match[2]}`);
      console.log(`   ${match[1]}`);
      console.log(`   ${match[3]}`);
      i++;
    }
  }

  async addEducation(content) {
    console.log('\n➕ ADD EDUCATION ENTRY');
    console.log('─────────────────────────────');
    
    const institution = await this.prompt('Institution: ');
    const degree = await this.prompt('Degree/Program: ');
    const period = await this.prompt('Period (e.g., "2020 - 2024"): ');
    const location = await this.prompt('Location: ');
    
    console.log('\nEnter details/achievements (empty line to finish):');
    const details = [];
    while (true) {
      const detail = await this.prompt('• ');
      if (!detail) break;
      details.push(detail);
    }
    
    const newEdu = `  {
    institution: "${institution}",
    degree: "${degree}",
    period: "${period}",
    location: "${location}"${details.length ? `,
    details: [
${details.map(d => `      "${d}"`).join(',\n')}
    ]` : ''}
  }`;
    
    const updated = content.replace(
      /(export const education.*?=\s*\[)([\s\S]*?)(\s*\];)/,
      (match, prefix, education, suffix) => {
        const hasEducation = education.trim().length > 0;
        if (hasEducation) {
          return `${prefix}${education},\n${newEdu}${suffix}`;
        } else {
          return `${prefix}\n${newEdu}${suffix}`;
        }
      }
    );
    
    this.writeTSFile('education.ts', updated);
  }

  async manageCertifications() {
    console.log('\n📜 CERTIFICATIONS MANAGEMENT');
    console.log('─────────────────────────────');
    
    const content = this.readTSFile('certifications.ts');
    if (!content) {
      console.log('❌ Could not read certifications.ts');
      return;
    }
    
    console.log('1. View Certifications');
    console.log('2. Add Certification');
    console.log('3. Back to Main Menu');
    
    const choice = await this.prompt('\nChoice: ');
    
    switch (choice) {
      case '1':
        await this.viewCertifications(content);
        break;
      case '2':
        await this.addCertification(content);
        break;
    }
  }

  async viewCertifications(content) {
    const certMatches = content.matchAll(/{\s*name:\s*"([^"]*)".*?issuer:\s*"([^"]*)".*?date:\s*"([^"]*)"/gs);
    
    console.log('\n🏆 Current Certifications:');
    let i = 1;
    for (const match of certMatches) {
      console.log(`\n${i}. ${match[1]}`);
      console.log(`   Issuer: ${match[2]}`);
      console.log(`   Date: ${match[3]}`);
      i++;
    }
  }

  async addCertification(content) {
    console.log('\n➕ ADD CERTIFICATION');
    console.log('─────────────────────────────');
    
    const name = await this.prompt('Certification name: ');
    const issuer = await this.prompt('Issuer: ');
    const date = await this.prompt('Date (e.g., "Dec 2024" or "Planned 2025"): ');
    const credential = await this.prompt('Credential ID (optional): ');
    const link = await this.prompt('Verification link (optional): ');
    
    const newCert = `  {
    name: "${name}",
    issuer: "${issuer}",
    date: "${date}"${credential ? `,
    credential: "${credential}"` : ''}${link ? `,
    link: "${link}"` : ''}
  }`;
    
    const updated = content.replace(
      /(export const certifications.*?=\s*\[)([\s\S]*?)(\s*\];)/,
      (match, prefix, certs, suffix) => {
        const hasCerts = certs.trim().length > 0;
        if (hasCerts) {
          return `${prefix}${certs},\n${newCert}${suffix}`;
        } else {
          return `${prefix}\n${newCert}${suffix}`;
        }
      }
    );
    
    this.writeTSFile('certifications.ts', updated);
  }

  async buildWebsite() {
    console.log('\n🔨 BUILDING WEBSITE');
    console.log('─────────────────────────────');
    console.log('Running: npm run build\n');
    
    try {
      const { stdout, stderr } = await execAsync('npm run build', { cwd: __dirname });
      
      if (stderr && !stderr.includes('warning')) {
        console.error('❌ Build errors:', stderr);
      } else {
        console.log('✅ Website built successfully!');
        console.log('📁 Output location: dist/');
        console.log('\nTo preview: npm run preview');
      }
    } catch (error) {
      console.error('❌ Build failed:', error.message);
      console.log('\nTry running manually: npm run build');
    }
  }

  async createBackup() {
    console.log('\n💾 CREATING BACKUP');
    console.log('─────────────────────────────');
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const backupDir = path.join(__dirname, 'backups', `backup-${timestamp}`);
    
    // Create backup directory
    fs.mkdirSync(backupDir, { recursive: true });
    
    // Copy all data files
    for (const [key, filename] of Object.entries(this.dataFiles)) {
      const src = path.join(this.dataDir, filename);
      const dst = path.join(backupDir, filename);
      
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dst);
        console.log(`✅ Backed up ${filename}`);
      }
    }
    
    console.log(`\n📁 Backup saved to: ${backupDir}`);
  }

  prompt(question) {
    return new Promise(resolve => {
      this.rl.question(question, answer => resolve(answer));
    });
  }
}

// Run the manager
const manager = new CVManager();
manager.init().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});