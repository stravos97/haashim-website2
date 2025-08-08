#!/usr/bin/env python3
"""
CV Website Content Manager - Complete Version
A comprehensive CRUD interface for managing Haashim's CV website data
"""

import json
import os
import re
from typing import Dict, List, Any, Optional
from datetime import datetime
import subprocess
from pathlib import Path

class CVManager:
    def __init__(self):
        self.base_path = Path(__file__).parent / "src" / "data"
        self.data_files = {
            "personal": "personal.ts",
            "skills": "skills.ts",
            "experience": "experience.ts",
            "projects": "projects.ts",
            "education": "education.ts",
            "certifications": "certifications.ts",
            "community": "community.ts"
        }
        
    def parse_ts_file(self, filepath: Path) -> Any:
        """Parse TypeScript file and extract the data"""
        if not filepath.exists():
            return [] if 'experience' in str(filepath) or 'project' in str(filepath) else {}
            
        with open(filepath, 'r') as f:
            content = f.read()
        
        # Extract the export const data
        if 'personal' in str(filepath):
            return self.parse_personal(content)
        elif 'skills' in str(filepath):
            return self.parse_skills(content)
        else:
            return self.parse_array(content)
    
    def parse_personal(self, content: str) -> Dict:
        """Parse personal information"""
        data = {}
        
        # Extract basic fields
        name_match = re.search(r'name:\s*"([^"]*)"', content)
        title_match = re.search(r'title:\s*"([^"]*)"', content)
        summary_match = re.search(r'summary:\s*"([^"]*)"', content)
        
        if name_match: data['name'] = name_match.group(1)
        if title_match: data['title'] = title_match.group(1)
        if summary_match: data['summary'] = summary_match.group(1)
        
        # Extract contact info
        contact = {}
        email_match = re.search(r'email:\s*"([^"]*)"', content)
        phone_match = re.search(r'phone:\s*"([^"]*)"', content)
        location_match = re.search(r'location:\s*"([^"]*)"', content)
        linkedin_match = re.search(r'linkedin:\s*"([^"]*)"', content)
        github_match = re.search(r'github:\s*"([^"]*)"', content)
        website_match = re.search(r'website:\s*"([^"]*)"', content)
        
        if email_match: contact['email'] = email_match.group(1)
        if phone_match: contact['phone'] = phone_match.group(1)
        if location_match: contact['location'] = location_match.group(1)
        if linkedin_match: contact['linkedin'] = linkedin_match.group(1)
        if github_match: contact['github'] = github_match.group(1)
        if website_match: contact['website'] = website_match.group(1)
        
        data['contact'] = contact
        return data
    
    def parse_skills(self, content: str) -> Dict:
        """Parse skills by category"""
        skills = {}
        
        # Find the skills export
        skills_match = re.search(r'export const skills.*?=\s*{([\s\S]*?)^}', content, re.MULTILINE)
        if skills_match:
            skills_content = skills_match.group(1)
            
            # Parse each category
            category_pattern = r'(\w+):\s*\[(.*?)\]'
            for match in re.finditer(category_pattern, skills_content, re.DOTALL):
                category = match.group(1)
                items_str = match.group(2)
                
                # Extract individual skills
                items = re.findall(r'"([^"]*)"', items_str)
                skills[category] = items
        
        return skills
    
    def parse_array(self, content: str) -> List[Dict]:
        """Parse array-based data (experience, projects, etc.)"""
        items = []
        
        # Find all object blocks
        pattern = r'\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}'
        
        for match in re.finditer(pattern, content):
            obj_str = match.group(1)
            obj = {}
            
            # Extract string fields
            for field_match in re.finditer(r'(\w+):\s*"([^"]*)"', obj_str):
                field_name = field_match.group(1)
                field_value = field_match.group(2)
                obj[field_name] = field_value
            
            # Extract array fields (points, techStack, modules, skills, etc.)
            for array_match in re.finditer(r'(\w+):\s*\[(.*?)\]', obj_str, re.DOTALL):
                field_name = array_match.group(1)
                array_content = array_match.group(2)
                items_list = re.findall(r'"([^"]*)"', array_content)
                obj[field_name] = items_list
            
            if obj and any(key in obj for key in ['title', 'name', 'degree', 'company', 'organization', 'institution', 'issuer']):
                items.append(obj)
        
        return items
    
    def write_ts_file(self, filepath: Path, data: Any, var_name: str, type_name: str):
        """Write data back to TypeScript file preserving interfaces"""
        # Read original to get interface
        interface_def = ""
        if filepath.exists():
            with open(filepath, 'r') as f:
                original = f.read()
                interface_match = re.search(r'(export interface.*?\n\})', original, re.DOTALL)
                if interface_match:
                    interface_def = interface_match.group(1) + "\n\n"
        
        # Generate TypeScript content
        ts_data = self.to_typescript(data, indent=0)
        content = f"{interface_def}export const {var_name}: {type_name} = {ts_data};\n"
        
        # Write to file
        with open(filepath, 'w') as f:
            f.write(content)
        
        print(f"✓ Updated {filepath.name}")
    
    def to_typescript(self, data: Any, indent: int = 0) -> str:
        """Convert Python data to TypeScript format"""
        ind = "  " * indent
        next_ind = "  " * (indent + 1)
        
        if isinstance(data, dict):
            if not data:
                return "{}"
            
            lines = ["{"]
            for key, value in data.items():
                if value or value == "":  # Include empty strings
                    ts_value = self.to_typescript(value, indent + 1)
                    lines.append(f'{next_ind}{key}: {ts_value},')
            lines.append(f"{ind}}}")
            return "\n".join(lines)
            
        elif isinstance(data, list):
            if not data:
                return "[]"
            
            # Check if it's a simple string array
            if all(isinstance(item, str) for item in data):
                if len(data) == 1:
                    return f'["{data[0]}"]'
                items = ', '.join([f'"{item}"' for item in data])
                if len(items) < 80:  # Keep short arrays on one line
                    return f"[{items}]"
                else:
                    # Multi-line for longer arrays
                    lines = ["["]
                    for item in data:
                        lines.append(f'{next_ind}"{item}",')
                    lines.append(f"{ind}]")
                    return "\n".join(lines)
            
            # Array of objects
            lines = ["["]
            for i, item in enumerate(data):
                ts_item = self.to_typescript(item, indent + 1)
                comma = "," if i < len(data) - 1 else ""
                lines.append(f"{next_ind}{ts_item}{comma}")
            lines.append(f"{ind}]")
            return "\n".join(lines)
            
        elif isinstance(data, str):
            # Escape quotes
            escaped = data.replace('"', '\\"')
            return f'"{escaped}"'
            
        elif isinstance(data, bool):
            return "true" if data else "false"
            
        elif data is None:
            return '""'
            
        else:
            return str(data)
    
    def display_menu(self):
        """Display main menu"""
        print("\n" + "="*50)
        print("CV WEBSITE CONTENT MANAGER")
        print("="*50)
        print("\n1. 👤 Personal Information")
        print("2. 🛠️  Skills")
        print("3. 💼 Experience")
        print("4. 🚀 Projects")
        print("5. 🎓 Education")
        print("6. 📜 Certifications")
        print("7. 🌐 Community")
        print("8. 🔨 Build Website")
        print("9. 💾 Backup Data")
        print("0. 👋 Exit")
        print("-"*50)
    
    def manage_personal(self):
        """Manage personal information"""
        filepath = self.base_path / self.data_files["personal"]
        
        print("\n--- PERSONAL INFORMATION ---")
        print("1. View current info")
        print("2. Update name")
        print("3. Update title")
        print("4. Update summary")
        print("5. Update contact info")
        print("6. Back to main menu")
        
        choice = input("\nEnter choice: ").strip()
        
        if choice == "1":
            data = self.parse_ts_file(filepath)
            print("\n📋 Current Personal Information:")
            print(f"Name: {data.get('name', 'N/A')}")
            print(f"Title: {data.get('title', 'N/A')}")
            print(f"Summary: {data.get('summary', 'N/A')[:100]}...")
            print("\n📧 Contact:")
            contact = data.get('contact', {})
            for field, value in contact.items():
                if value:
                    print(f"  {field}: {value}")
                    
        elif choice == "2":
            data = self.parse_ts_file(filepath)
            new_name = input(f"Current name: {data.get('name', 'N/A')}\nEnter new name: ").strip()
            if new_name:
                data['name'] = new_name
                self.write_ts_file(filepath, data, "personal", "Personal")
                
        elif choice == "3":
            data = self.parse_ts_file(filepath)
            new_title = input(f"Current title: {data.get('title', 'N/A')}\nEnter new title: ").strip()
            if new_title:
                data['title'] = new_title
                self.write_ts_file(filepath, data, "personal", "Personal")
                
        elif choice == "4":
            data = self.parse_ts_file(filepath)
            print(f"Current summary:\n{data.get('summary', 'N/A')}\n")
            print("Enter new summary (press Enter twice to finish):")
            lines = []
            while True:
                line = input()
                if line == "":
                    break
                lines.append(line)
            if lines:
                data['summary'] = " ".join(lines)
                self.write_ts_file(filepath, data, "personal", "Personal")
                
        elif choice == "5":
            self.manage_contact()
    
    def manage_contact(self):
        """Manage contact information"""
        filepath = self.base_path / self.data_files["personal"]
        data = self.parse_ts_file(filepath)
        contact = data.get('contact', {})
        
        print("\n--- CONTACT INFORMATION ---")
        print(f"1. Email: {contact.get('email', 'N/A')}")
        print(f"2. Phone: {contact.get('phone', 'N/A')}")
        print(f"3. Location: {contact.get('location', 'N/A')}")
        print(f"4. LinkedIn: {contact.get('linkedin', 'N/A')}")
        print(f"5. GitHub: {contact.get('github', 'N/A')}")
        print(f"6. Website: {contact.get('website', 'N/A')}")
        
        field = input("\nWhich field to update (1-6): ").strip()
        fields_map = {
            "1": "email", "2": "phone", "3": "location",
            "4": "linkedin", "5": "github", "6": "website"
        }
        
        if field in fields_map:
            field_name = fields_map[field]
            new_value = input(f"Enter new {field_name}: ").strip()
            contact[field_name] = new_value  # Allow empty to clear
            data['contact'] = contact
            self.write_ts_file(filepath, data, "personal", "Personal")
            print(f"✓ {field_name.capitalize()} updated!")
    
    def manage_experience(self):
        """Manage experience entries"""
        filepath = self.base_path / self.data_files["experience"]
        
        print("\n--- EXPERIENCE MANAGEMENT ---")
        print("1. View all experiences")
        print("2. Add new experience")
        print("3. Update experience")
        print("4. Delete experience")
        print("5. Reorder experiences")
        print("6. Back to main menu")
        
        choice = input("\nEnter choice: ").strip()
        
        if choice == "1":
            data = self.parse_ts_file(filepath)
            if not data:
                print("No experiences found.")
                return
                
            for i, exp in enumerate(data, 1):
                print(f"\n{i}. {exp.get('title', 'N/A')} at {exp.get('company', 'N/A')}")
                print(f"   Period: {exp.get('period', 'N/A')}")
                print(f"   Location: {exp.get('location', 'N/A')}")
                if exp.get('points'):
                    print("   Achievements:")
                    for point in exp['points'][:2]:  # Show first 2 points
                        print(f"   • {point[:80]}...")
                        
        elif choice == "2":
            data = self.parse_ts_file(filepath)
            if not isinstance(data, list):
                data = []
            
            print("\n--- ADD NEW EXPERIENCE ---")
            new_exp = {}
            new_exp['title'] = input("Job title: ").strip()
            new_exp['company'] = input("Company: ").strip()
            new_exp['period'] = input("Period (e.g., 'Jan 2024 - Current'): ").strip()
            new_exp['location'] = input("Location: ").strip()
            
            print("Enter accomplishments/points (one per line, empty line to finish):")
            points = []
            while True:
                point = input("• ").strip()
                if not point:
                    break
                points.append(point)
            new_exp['points'] = points
            
            # Add to beginning (most recent first)
            data.insert(0, new_exp)
            self.write_ts_file(filepath, data, "experience", "Experience[]")
            print("✓ Experience added successfully!")
            
        elif choice == "3":
            data = self.parse_ts_file(filepath)
            if not data:
                print("No experiences found.")
                return
                
            for i, exp in enumerate(data, 1):
                print(f"{i}. {exp.get('title', 'N/A')} at {exp.get('company', 'N/A')}")
            
            index = input("\nWhich experience to update (number): ").strip()
            try:
                idx = int(index) - 1
                if 0 <= idx < len(data):
                    exp = data[idx]
                    print("\nLeave blank to keep current value:")
                    
                    new_title = input(f"Title [{exp.get('title', '')}]: ").strip()
                    if new_title:
                        exp['title'] = new_title
                        
                    new_company = input(f"Company [{exp.get('company', '')}]: ").strip()
                    if new_company:
                        exp['company'] = new_company
                        
                    new_period = input(f"Period [{exp.get('period', '')}]: ").strip()
                    if new_period:
                        exp['period'] = new_period
                        
                    new_location = input(f"Location [{exp.get('location', '')}]: ").strip()
                    if new_location:
                        exp['location'] = new_location
                    
                    update_points = input("Update points? (y/n): ").strip().lower()
                    if update_points == 'y':
                        print("Current points:")
                        for point in exp.get('points', []):
                            print(f"• {point}")
                        
                        print("\nEnter new points (empty line to finish):")
                        points = []
                        while True:
                            point = input("• ").strip()
                            if not point:
                                break
                            points.append(point)
                        if points:
                            exp['points'] = points
                    
                    data[idx] = exp
                    self.write_ts_file(filepath, data, "experience", "Experience[]")
                    print("✓ Experience updated successfully!")
            except (ValueError, IndexError):
                print("Invalid selection.")
                
        elif choice == "4":
            data = self.parse_ts_file(filepath)
            if not data:
                print("No experiences found.")
                return
                
            for i, exp in enumerate(data, 1):
                print(f"{i}. {exp.get('title', 'N/A')} at {exp.get('company', 'N/A')}")
            
            index = input("\nWhich experience to delete (number): ").strip()
            try:
                idx = int(index) - 1
                if 0 <= idx < len(data):
                    removed = data.pop(idx)
                    self.write_ts_file(filepath, data, "experience", "Experience[]")
                    print(f"✓ Deleted: {removed.get('title', 'N/A')} at {removed.get('company', 'N/A')}")
            except (ValueError, IndexError):
                print("Invalid selection.")
                
        elif choice == "5":
            data = self.parse_ts_file(filepath)
            if not data or len(data) < 2:
                print("Need at least 2 experiences to reorder.")
                return
                
            for i, exp in enumerate(data, 1):
                print(f"{i}. {exp.get('title', 'N/A')} at {exp.get('company', 'N/A')}")
            
            from_idx = input("\nMove which item (number): ").strip()
            to_idx = input("To position (number): ").strip()
            
            try:
                from_i = int(from_idx) - 1
                to_i = int(to_idx) - 1
                if 0 <= from_i < len(data) and 0 <= to_i < len(data):
                    item = data.pop(from_i)
                    data.insert(to_i, item)
                    self.write_ts_file(filepath, data, "experience", "Experience[]")
                    print("✓ Reordered successfully!")
            except (ValueError, IndexError):
                print("Invalid selection.")
    
    def manage_skills(self):
        """Manage skills by category"""
        filepath = self.base_path / self.data_files["skills"]
        
        print("\n--- SKILLS MANAGEMENT ---")
        print("1. View all skills")
        print("2. Add skill to category")
        print("3. Remove skill from category")
        print("4. Add new category")
        print("5. Remove category")
        print("6. Back to main menu")
        
        choice = input("\nEnter choice: ").strip()
        
        if choice == "1":
            data = self.parse_ts_file(filepath)
            if not data:
                print("No skills found.")
                return
                
            for category, skills in data.items():
                print(f"\n{category}:")
                for skill in skills:
                    print(f"  • {skill}")
                    
        elif choice == "2":
            data = self.parse_ts_file(filepath)
            if not data:
                print("No categories found. Add a category first.")
                return
                
            print("\nAvailable categories:")
            categories = list(data.keys())
            for i, cat in enumerate(categories, 1):
                print(f"{i}. {cat}")
            
            cat_idx = input("\nSelect category (number): ").strip()
            try:
                category = categories[int(cat_idx) - 1]
                new_skill = input(f"Enter new skill for {category}: ").strip()
                if new_skill:
                    if new_skill not in data[category]:
                        data[category].append(new_skill)
                        self.write_ts_file(filepath, data, "skills", "Skills")
                        print(f"✓ Added '{new_skill}' to {category}")
                    else:
                        print("Skill already exists in this category.")
            except (ValueError, IndexError):
                print("Invalid selection.")
                
        elif choice == "3":
            data = self.parse_ts_file(filepath)
            if not data:
                print("No skills found.")
                return
                
            print("\nAvailable categories:")
            categories = list(data.keys())
            for i, cat in enumerate(categories, 1):
                print(f"{i}. {cat}")
            
            cat_idx = input("\nSelect category (number): ").strip()
            try:
                category = categories[int(cat_idx) - 1]
                skills = data[category]
                if not skills:
                    print("No skills in this category.")
                    return
                    
                print(f"\nSkills in {category}:")
                for i, skill in enumerate(skills, 1):
                    print(f"{i}. {skill}")
                
                skill_idx = input("\nSelect skill to remove (number): ").strip()
                removed = skills.pop(int(skill_idx) - 1)
                self.write_ts_file(filepath, data, "skills", "Skills")
                print(f"✓ Removed '{removed}' from {category}")
            except (ValueError, IndexError):
                print("Invalid selection.")
                
        elif choice == "4":
            data = self.parse_ts_file(filepath)
            if not isinstance(data, dict):
                data = {}
                
            category_name = input("New category name: ").strip()
            if category_name and category_name not in data:
                data[category_name] = []
                self.write_ts_file(filepath, data, "skills", "Skills")
                print(f"✓ Added category: {category_name}")
            elif category_name in data:
                print("Category already exists.")
                
        elif choice == "5":
            data = self.parse_ts_file(filepath)
            if not data:
                print("No categories found.")
                return
                
            categories = list(data.keys())
            for i, cat in enumerate(categories, 1):
                print(f"{i}. {cat} ({len(data[cat])} skills)")
            
            cat_idx = input("\nSelect category to remove (number): ").strip()
            try:
                category = categories[int(cat_idx) - 1]
                confirm = input(f"Delete '{category}' and all its skills? (y/n): ").strip().lower()
                if confirm == 'y':
                    del data[category]
                    self.write_ts_file(filepath, data, "skills", "Skills")
                    print(f"✓ Removed category: {category}")
            except (ValueError, IndexError):
                print("Invalid selection.")
    
    def manage_projects(self):
        """Manage projects"""
        filepath = self.base_path / self.data_files["projects"]
        
        print("\n--- PROJECTS MANAGEMENT ---")
        print("1. View all projects")
        print("2. Add new project")
        print("3. Update project")
        print("4. Delete project")
        print("5. Back to main menu")
        
        choice = input("\nEnter choice: ").strip()
        
        if choice == "1":
            data = self.parse_ts_file(filepath)
            if not data:
                print("No projects found.")
                return
                
            for i, proj in enumerate(data, 1):
                print(f"\n{i}. {proj.get('name', 'N/A')}")
                print(f"   Slug: {proj.get('slug', 'N/A')}")
                print(f"   Description: {proj.get('description', 'N/A')[:100]}...")
                tech = proj.get('techStack', [])
                if tech:
                    print(f"   Tech Stack: {', '.join(tech[:5])}{'...' if len(tech) > 5 else ''}")
                if proj.get('github'):
                    print(f"   GitHub: {proj.get('github')}")
                if proj.get('live'):
                    print(f"   Live: {proj.get('live')}")
                    
        elif choice == "2":
            data = self.parse_ts_file(filepath)
            if not isinstance(data, list):
                data = []
            
            print("\n--- ADD NEW PROJECT ---")
            new_proj = {}
            new_proj['name'] = input("Project name: ").strip()
            new_proj['slug'] = input("URL slug (e.g., 'my-project'): ").strip()
            
            print("Enter description:")
            new_proj['description'] = input().strip()
            
            print("Enter tech stack (comma separated):")
            tech = input().strip()
            new_proj['techStack'] = [t.strip() for t in tech.split(',') if t.strip()]
            
            github = input("GitHub URL (optional): ").strip()
            if github:
                new_proj['github'] = github
                
            live = input("Live URL (optional): ").strip()
            if live:
                new_proj['live'] = live
            
            print("Enter highlights/features (one per line, empty to finish):")
            highlights = []
            while True:
                highlight = input("• ").strip()
                if not highlight:
                    break
                highlights.append(highlight)
            if highlights:
                new_proj['highlights'] = highlights
            
            # Optional extended fields
            add_extended = input("\nAdd extended details for project page? (y/n): ").strip().lower()
            if add_extended == 'y':
                detailed = input("Detailed description (optional): ").strip()
                if detailed:
                    new_proj['detailedDescription'] = detailed
                    
                print("Enter features (one per line, empty to finish):")
                features = []
                while True:
                    feature = input("• ").strip()
                    if not feature:
                        break
                    features.append(feature)
                if features:
                    new_proj['features'] = features
                    
                print("Enter challenges overcome (one per line, empty to finish):")
                challenges = []
                while True:
                    challenge = input("• ").strip()
                    if not challenge:
                        break
                    challenges.append(challenge)
                if challenges:
                    new_proj['challenges'] = challenges
                    
                arch = input("Architecture description (optional): ").strip()
                if arch:
                    new_proj['architecture'] = arch
            
            data.append(new_proj)
            self.write_ts_file(filepath, data, "projects", "Project[]")
            print("✓ Project added successfully!")
            
        elif choice == "3":
            data = self.parse_ts_file(filepath)
            if not data:
                print("No projects found.")
                return
                
            for i, proj in enumerate(data, 1):
                print(f"{i}. {proj.get('name', 'N/A')}")
            
            index = input("\nWhich project to update (number): ").strip()
            try:
                idx = int(index) - 1
                if 0 <= idx < len(data):
                    proj = data[idx]
                    print("\nLeave blank to keep current value:")
                    
                    new_name = input(f"Name [{proj.get('name', '')}]: ").strip()
                    if new_name:
                        proj['name'] = new_name
                    
                    new_slug = input(f"Slug [{proj.get('slug', '')}]: ").strip()
                    if new_slug:
                        proj['slug'] = new_slug
                    
                    print(f"Current description: {proj.get('description', '')[:80]}...")
                    new_desc = input("New description (or press Enter to keep): ").strip()
                    if new_desc:
                        proj['description'] = new_desc
                    
                    update_tech = input("Update tech stack? (y/n): ").strip().lower()
                    if update_tech == 'y':
                        current = ', '.join(proj.get('techStack', []))
                        print(f"Current: {current}")
                        tech = input("New tech stack (comma separated): ").strip()
                        if tech:
                            proj['techStack'] = [t.strip() for t in tech.split(',')]
                    
                    new_github = input(f"GitHub [{proj.get('github', '')}]: ").strip()
                    if new_github:
                        proj['github'] = new_github
                    elif new_github == "" and 'github' in proj:
                        del proj['github']  # Remove if cleared
                    
                    new_live = input(f"Live URL [{proj.get('live', '')}]: ").strip()
                    if new_live:
                        proj['live'] = new_live
                    elif new_live == "" and 'live' in proj:
                        del proj['live']  # Remove if cleared
                    
                    data[idx] = proj
                    self.write_ts_file(filepath, data, "projects", "Project[]")
                    print("✓ Project updated successfully!")
            except (ValueError, IndexError):
                print("Invalid selection.")
                
        elif choice == "4":
            data = self.parse_ts_file(filepath)
            if not data:
                print("No projects found.")
                return
                
            for i, proj in enumerate(data, 1):
                print(f"{i}. {proj.get('name', 'N/A')}")
            
            index = input("\nWhich project to delete (number): ").strip()
            try:
                idx = int(index) - 1
                if 0 <= idx < len(data):
                    removed = data.pop(idx)
                    self.write_ts_file(filepath, data, "projects", "Project[]")
                    print(f"✓ Deleted: {removed.get('name', 'N/A')}")
            except (ValueError, IndexError):
                print("Invalid selection.")
    
    def manage_education(self):
        """Manage education entries"""
        filepath = self.base_path / self.data_files["education"]
        
        print("\n--- EDUCATION MANAGEMENT ---")
        print("1. View education")
        print("2. Add education entry")
        print("3. Update education")
        print("4. Delete education")
        print("5. Back to main menu")
        
        choice = input("\nEnter choice: ").strip()
        
        if choice == "1":
            data = self.parse_ts_file(filepath)
            if not data:
                print("No education entries found.")
                return
                
            for i, edu in enumerate(data, 1):
                print(f"\n{i}. {edu.get('degree', 'N/A')}")
                print(f"   Institution: {edu.get('institution', 'N/A')}")
                print(f"   Period: {edu.get('period', 'N/A')}")
                print(f"   Location: {edu.get('location', 'N/A')}")
                if edu.get('grade'):
                    print(f"   Grade: {edu.get('grade')}")
                if edu.get('modules'):
                    print(f"   Key Modules: {', '.join(edu['modules'][:3])}...")
                    
        elif choice == "2":
            data = self.parse_ts_file(filepath)
            if not isinstance(data, list):
                data = []
            
            print("\n--- ADD EDUCATION ENTRY ---")
            new_edu = {}
            new_edu['degree'] = input("Degree/Program: ").strip()
            new_edu['institution'] = input("Institution: ").strip()
            new_edu['period'] = input("Period (e.g., 'Sep 2020 - Jul 2024'): ").strip()
            new_edu['location'] = input("Location: ").strip()
            
            grade = input("Grade (optional): ").strip()
            if grade:
                new_edu['grade'] = grade
            
            print("Enter key modules/courses (one per line, empty to finish):")
            modules = []
            while True:
                module = input("• ").strip()
                if not module:
                    break
                modules.append(module)
            if modules:
                new_edu['modules'] = modules
            
            data.append(new_edu)
            self.write_ts_file(filepath, data, "education", "Education[]")
            print("✓ Education entry added successfully!")
            
        elif choice == "3":
            data = self.parse_ts_file(filepath)
            if not data:
                print("No education entries found.")
                return
                
            for i, edu in enumerate(data, 1):
                print(f"{i}. {edu.get('degree', 'N/A')} at {edu.get('institution', 'N/A')}")
            
            index = input("\nWhich entry to update (number): ").strip()
            try:
                idx = int(index) - 1
                if 0 <= idx < len(data):
                    edu = data[idx]
                    print("\nLeave blank to keep current value:")
                    
                    new_degree = input(f"Degree [{edu.get('degree', '')}]: ").strip()
                    if new_degree:
                        edu['degree'] = new_degree
                        
                    new_inst = input(f"Institution [{edu.get('institution', '')}]: ").strip()
                    if new_inst:
                        edu['institution'] = new_inst
                        
                    new_period = input(f"Period [{edu.get('period', '')}]: ").strip()
                    if new_period:
                        edu['period'] = new_period
                        
                    new_location = input(f"Location [{edu.get('location', '')}]: ").strip()
                    if new_location:
                        edu['location'] = new_location
                        
                    new_grade = input(f"Grade [{edu.get('grade', 'N/A')}]: ").strip()
                    if new_grade:
                        edu['grade'] = new_grade
                    elif new_grade == "" and 'grade' in edu:
                        del edu['grade']
                    
                    update_modules = input("Update modules? (y/n): ").strip().lower()
                    if update_modules == 'y':
                        print("Enter new modules (empty line to finish):")
                        modules = []
                        while True:
                            module = input("• ").strip()
                            if not module:
                                break
                            modules.append(module)
                        if modules:
                            edu['modules'] = modules
                    
                    data[idx] = edu
                    self.write_ts_file(filepath, data, "education", "Education[]")
                    print("✓ Education updated successfully!")
            except (ValueError, IndexError):
                print("Invalid selection.")
                
        elif choice == "4":
            data = self.parse_ts_file(filepath)
            if not data:
                print("No education entries found.")
                return
                
            for i, edu in enumerate(data, 1):
                print(f"{i}. {edu.get('degree', 'N/A')} at {edu.get('institution', 'N/A')}")
            
            index = input("\nWhich entry to delete (number): ").strip()
            try:
                idx = int(index) - 1
                if 0 <= idx < len(data):
                    removed = data.pop(idx)
                    self.write_ts_file(filepath, data, "education", "Education[]")
                    print(f"✓ Deleted: {removed.get('degree', 'N/A')}")
            except (ValueError, IndexError):
                print("Invalid selection.")
    
    def manage_certifications(self):
        """Manage certifications"""
        filepath = self.base_path / self.data_files["certifications"]
        
        print("\n--- CERTIFICATIONS MANAGEMENT ---")
        print("1. View certifications")
        print("2. Add certification")
        print("3. Update certification")
        print("4. Delete certification")
        print("5. Back to main menu")
        
        choice = input("\nEnter choice: ").strip()
        
        if choice == "1":
            data = self.parse_ts_file(filepath)
            if not data:
                print("No certifications found.")
                return
                
            for i, cert in enumerate(data, 1):
                print(f"\n{i}. {cert.get('name', 'N/A')}")
                print(f"   Issuer: {cert.get('issuer', 'N/A')}")
                print(f"   Date: {cert.get('date', 'N/A')}")
                if cert.get('expiryDate'):
                    print(f"   Expires: {cert.get('expiryDate')}")
                if cert.get('credentialId'):
                    print(f"   Credential ID: {cert.get('credentialId')}")
                if cert.get('verificationUrl'):
                    print(f"   Verification: {cert.get('verificationUrl')}")
                if cert.get('skills'):
                    print(f"   Skills: {', '.join(cert['skills'][:5])}...")
                    
        elif choice == "2":
            data = self.parse_ts_file(filepath)
            if not isinstance(data, list):
                data = []
            
            print("\n--- ADD CERTIFICATION ---")
            new_cert = {}
            new_cert['name'] = input("Certification name: ").strip()
            new_cert['issuer'] = input("Issuer: ").strip()
            new_cert['date'] = input("Date (e.g., 'Dec 2024' or 'Planned 2025'): ").strip()
            
            expiry = input("Expiry date (optional): ").strip()
            if expiry:
                new_cert['expiryDate'] = expiry
                
            credential = input("Credential ID (optional): ").strip()
            if credential:
                new_cert['credentialId'] = credential
                
            verification = input("Verification URL/path (optional): ").strip()
            if verification:
                new_cert['verificationUrl'] = verification
                
            skills_input = input("Related skills (comma separated, optional): ").strip()
            if skills_input:
                new_cert['skills'] = [s.strip() for s in skills_input.split(',') if s.strip()]
                
            description = input("Description (optional): ").strip()
            if description:
                new_cert['description'] = description
            
            data.append(new_cert)
            self.write_ts_file(filepath, data, "certifications", "Certification[]")
            print("✓ Certification added successfully!")
            
        elif choice == "3":
            data = self.parse_ts_file(filepath)
            if not data:
                print("No certifications found.")
                return
                
            for i, cert in enumerate(data, 1):
                print(f"{i}. {cert.get('name', 'N/A')} - {cert.get('issuer', 'N/A')}")
            
            index = input("\nWhich certification to update (number): ").strip()
            try:
                idx = int(index) - 1
                if 0 <= idx < len(data):
                    cert = data[idx]
                    print("\nLeave blank to keep current value:")
                    
                    new_name = input(f"Name [{cert.get('name', '')}]: ").strip()
                    if new_name:
                        cert['name'] = new_name
                        
                    new_issuer = input(f"Issuer [{cert.get('issuer', '')}]: ").strip()
                    if new_issuer:
                        cert['issuer'] = new_issuer
                        
                    new_date = input(f"Date [{cert.get('date', '')}]: ").strip()
                    if new_date:
                        cert['date'] = new_date
                    
                    data[idx] = cert
                    self.write_ts_file(filepath, data, "certifications", "Certification[]")
                    print("✓ Certification updated successfully!")
            except (ValueError, IndexError):
                print("Invalid selection.")
                
        elif choice == "4":
            data = self.parse_ts_file(filepath)
            if not data:
                print("No certifications found.")
                return
                
            for i, cert in enumerate(data, 1):
                print(f"{i}. {cert.get('name', 'N/A')} - {cert.get('issuer', 'N/A')}")
            
            index = input("\nWhich certification to delete (number): ").strip()
            try:
                idx = int(index) - 1
                if 0 <= idx < len(data):
                    removed = data.pop(idx)
                    self.write_ts_file(filepath, data, "certifications", "Certification[]")
                    print(f"✓ Deleted: {removed.get('name', 'N/A')}")
            except (ValueError, IndexError):
                print("Invalid selection.")
    
    def manage_community(self):
        """Manage community involvement"""
        filepath = self.base_path / self.data_files["community"]
        
        print("\n--- COMMUNITY INVOLVEMENT ---")
        print("1. View community activities")
        print("2. Add community involvement")
        print("3. Update community entry")
        print("4. Delete community entry")
        print("5. Back to main menu")
        
        choice = input("\nEnter choice: ").strip()
        
        if choice == "1":
            data = self.parse_ts_file(filepath)
            if not data:
                print("No community involvement found.")
                return
                
            for i, comm in enumerate(data, 1):
                print(f"\n{i}. {comm.get('title', 'N/A')}")
                print(f"   Organization: {comm.get('organization', 'N/A')}")
                print(f"   Location: {comm.get('location', 'N/A')}")
                print(f"   Period: {comm.get('period', 'N/A')}")
                if comm.get('points'):
                    print("   Activities:")
                    for point in comm['points'][:2]:  # Show first 2 points
                        print(f"   • {point[:80]}...")
                        
        elif choice == "2":
            data = self.parse_ts_file(filepath)
            if not isinstance(data, list):
                data = []
            
            print("\n--- ADD COMMUNITY INVOLVEMENT ---")
            new_comm = {}
            new_comm['title'] = input("Title/Role: ").strip()
            new_comm['organization'] = input("Organization/Activity: ").strip()
            new_comm['location'] = input("Location: ").strip()
            new_comm['period'] = input("Period (e.g., '2023 - Present'): ").strip()
            
            print("Enter activities/contributions (one per line, empty to finish):")
            points = []
            while True:
                point = input("• ").strip()
                if not point:
                    break
                points.append(point)
            new_comm['points'] = points
            
            data.append(new_comm)
            self.write_ts_file(filepath, data, "community", "Community[]")
            print("✓ Community involvement added successfully!")
            
        elif choice == "3":
            data = self.parse_ts_file(filepath)
            if not data:
                print("No community involvement found.")
                return
                
            for i, comm in enumerate(data, 1):
                print(f"{i}. {comm.get('title', 'N/A')} - {comm.get('organization', 'N/A')}")
            
            index = input("\nWhich entry to update (number): ").strip()
            try:
                idx = int(index) - 1
                if 0 <= idx < len(data):
                    comm = data[idx]
                    print("\nLeave blank to keep current value:")
                    
                    new_title = input(f"Title [{comm.get('title', '')}]: ").strip()
                    if new_title:
                        comm['title'] = new_title
                        
                    new_org = input(f"Organization [{comm.get('organization', '')}]: ").strip()
                    if new_org:
                        comm['organization'] = new_org
                        
                    new_location = input(f"Location [{comm.get('location', '')}]: ").strip()
                    if new_location:
                        comm['location'] = new_location
                        
                    new_period = input(f"Period [{comm.get('period', '')}]: ").strip()
                    if new_period:
                        comm['period'] = new_period
                    
                    update_points = input("Update activities? (y/n): ").strip().lower()
                    if update_points == 'y':
                        print("Current activities:")
                        for point in comm.get('points', []):
                            print(f"• {point}")
                        
                        print("\nEnter new activities (empty line to finish):")
                        points = []
                        while True:
                            point = input("• ").strip()
                            if not point:
                                break
                            points.append(point)
                        if points:
                            comm['points'] = points
                    
                    data[idx] = comm
                    self.write_ts_file(filepath, data, "community", "Community[]")
                    print("✓ Community entry updated successfully!")
            except (ValueError, IndexError):
                print("Invalid selection.")
                
        elif choice == "4":
            data = self.parse_ts_file(filepath)
            if not data:
                print("No community involvement found.")
                return
                
            for i, comm in enumerate(data, 1):
                print(f"{i}. {comm.get('title', 'N/A')} - {comm.get('organization', 'N/A')}")
            
            index = input("\nWhich entry to delete (number): ").strip()
            try:
                idx = int(index) - 1
                if 0 <= idx < len(data):
                    removed = data.pop(idx)
                    self.write_ts_file(filepath, data, "community", "Community[]")
                    print(f"✓ Deleted: {removed.get('title', 'N/A')}")
            except (ValueError, IndexError):
                print("Invalid selection.")
    
    def build_website(self):
        """Build the website"""
        print("\n--- BUILDING WEBSITE ---")
        print("Running: npm run build")
        
        try:
            result = subprocess.run(
                ["npm", "run", "build"],
                cwd=self.base_path.parent,
                capture_output=True,
                text=True
            )
            
            if result.returncode == 0:
                print("✓ Website built successfully!")
                print("Output in: dist/")
                print("\nTo preview: npm run preview")
            else:
                print("✗ Build failed:")
                print(result.stderr)
        except Exception as e:
            print(f"Error running build: {e}")
            print("Make sure npm is installed and you're in the correct directory.")
    
    def backup_data(self):
        """Create backup of all data files"""
        backup_dir = self.base_path.parent / "backups"
        backup_dir.mkdir(exist_ok=True)
        
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_subdir = backup_dir / f"backup_{timestamp}"
        backup_subdir.mkdir()
        
        print(f"\n--- CREATING BACKUP ---")
        for name, filename in self.data_files.items():
            src = self.base_path / filename
            dst = backup_subdir / filename
            
            if src.exists():
                with open(src, 'r') as f:
                    content = f.read()
                with open(dst, 'w') as f:
                    f.write(content)
                print(f"✓ Backed up {filename}")
        
        print(f"\nBackup saved to: {backup_subdir}")
        return backup_subdir
    
    def run(self):
        """Main application loop"""
        print("\n🚀 Welcome to CV Website Content Manager!")
        print("This tool helps you manage your CV website data with ease.")
        
        while True:
            self.display_menu()
            choice = input("\nEnter your choice: ").strip()
            
            if choice == "1":
                self.manage_personal()
            elif choice == "2":
                self.manage_skills()
            elif choice == "3":
                self.manage_experience()
            elif choice == "4":
                self.manage_projects()
            elif choice == "5":
                self.manage_education()
            elif choice == "6":
                self.manage_certifications()
            elif choice == "7":
                self.manage_community()
            elif choice == "8":
                self.build_website()
            elif choice == "9":
                self.backup_data()
            elif choice == "0":
                print("\nGoodbye! 👋")
                break
            else:
                print("Invalid choice. Please try again.")
            
            if choice != "0":
                input("\nPress Enter to continue...")

if __name__ == "__main__":
    manager = CVManager()
    manager.run()