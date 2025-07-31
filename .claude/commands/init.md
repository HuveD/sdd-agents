# Init - Project Initialization

You are using the Init command to initialize a project with the AI-driven development workflow structure. This command creates the necessary directory structure and initial files for todo-based development.

## Overview

The `/init` command prepares your project by:
1. Analyzing the existing project structure (if any)
2. Creating workflow directories without disrupting existing code
3. Setting up todo-based development system
4. Generating initial documentation based on project analysis

**Note**: Init is designed to work with ANY project type - web apps, mobile apps, APIs, libraries, CLI tools, etc. The structure adapts to your project's needs.

## What Init Creates

### Universal Structure
```
project/
├── sdd/                   # Software Design Documents
│   ├── todos/             # Agent-specific todo files
│   │   ├── todo-spec.md   # PM Agent todos
│   │   ├── todo-qa.md     # QA Agent todos
│   │   ├── todo-design.md # ARCH Agent todos
│   │   ├── todo-build.md  # DEV Agent todos
│   │   ├── todo-test.md   # TC Agent todos
│   │   └── todo-review.md # REV Agent todos
│   ├── context/           # Project context
│   │   ├── project.md     # Project overview
│   │   ├── stack.md       # Technology stack (auto-detected)
│   │   └── patterns.md    # Discovered patterns
│   └── WORKFLOW.md        # Workflow status tracker
└── [your existing project files remain untouched]
```

### Project Analysis

When run on an existing project, `/init` performs parallel analysis to:
- Detect technology stack and frameworks
- Identify project type (web, mobile, API, library, etc.)
- Discover existing patterns and conventions
- Map current project structure
- Generate appropriate documentation

### Initial Files

#### sdd/WORKFLOW.md
```markdown
# Workflow Status

## Project: [Auto-detected or provided name]
## Type: [Auto-detected: Web App/Mobile App/API/Library/etc.]
## Current Status: Initialized
## Last Updated: [Date]

## Agent Progress
- [ ] PM Agent (sdd-pm)
- [ ] QA Agent (sdd-qa)
- [ ] ARCH Agent (sdd-arch)
- [ ] DEV Agent (sdd-dev)
- [ ] TC Agent (sdd-tc)
- [ ] REV Agent (sdd-rev)

## Detected Stack
[Auto-populated based on analysis]

## Next Steps
1. Review generated context files
2. Start with PM Agent (sdd-pm) for new features
3. Or jump to appropriate agent for current work
```

#### sdd/context/project.md
Generated based on project analysis, includes:
- Project type and purpose
- Key technologies detected
- Existing structure overview
- Development setup instructions

#### sdd/context/stack.md
Auto-generated technology inventory:
- Languages and versions
- Frameworks and libraries
- Build tools and scripts
- Testing frameworks
- Dependencies

#### sdd/context/patterns.md
Discovered conventions:
- Code style patterns
- File organization
- Naming conventions
- Architecture patterns

## Usage

### Basic Usage
```bash
/init
```
Initializes the current directory with workflow structure

### With Project Name
```bash
/init "My Awesome Project"
```
Sets a custom project name

### With Description
```bash
/init "My Project" --description "A revolutionary app"
```
Adds project description to context

## How Init Works

1. **Project Detection**: Analyzes existing files to understand:
   - Project type (web, mobile, API, etc.)
   - Technology stack
   - Build system
   - Test framework

2. **Parallel Analysis**: Creates multiple analysis tasks to examine:
   - Package files (package.json, Cargo.toml, go.mod, etc.)
   - Configuration files
   - Source code structure
   - Existing documentation

3. **Smart Generation**: Creates only what's needed:
   - Skips architecture docs for simple scripts
   - Includes API specs only for API projects
   - Adapts to mobile vs web vs library needs

4. **Non-Invasive**: 
   - Never modifies existing files
   - Only adds workflow structure
   - Preserves all project conventions

## Project Type Adaptations

### Web Applications
- Detects frontend frameworks (React, Vue, Angular, etc.)
- Identifies backend technologies
- Maps API structure

### Mobile Applications
- Recognizes iOS/Android/Flutter/React Native
- Skips irrelevant web-specific documentation
- Focuses on app-specific patterns

### APIs and Services
- Maps endpoint structure
- Identifies authentication methods
- Documents API patterns

### Libraries and Packages
- Focuses on public API documentation
- Identifies distribution methods
- Maps example usage

### CLI Tools
- Documents command structure
- Maps configuration options
- Identifies plugin systems

## Post-Initialization

After running `/init`:

1. **Review Generated Files**:
   - Check sdd/context/ for accuracy
   - Verify detected stack
   - Confirm project type

2. **Start Workflow**:
   - For new features: Start with PM Agent (sdd-pm)
   - For bug fixes: Jump to DEV Agent (sdd-dev) or TC Agent (sdd-tc)
   - For documentation: Start with QA Agent (sdd-qa)

3. **Customize as Needed**:
   - Edit context files for accuracy
   - Adjust workflow for your team
   - Add project-specific patterns

## Best Practices

1. **Run Early**: Initialize before major development
2. **Review Detection**: Verify auto-detected information
3. **Keep Context Updated**: Update sdd/context/ as project evolves
4. **Commit Structure**: Add sdd/ to version control

## Troubleshooting

### "Project type unclear"
- Add more specific files (package.json, etc.)
- Use --description to clarify

### "Stack detection incomplete"
- Ensure config files are present
- Manually update sdd/context/stack.md

### "Existing sdd/ directory"
- Init preserves existing structure
- Adds only missing files

Remember: Init adapts to YOUR project. It's not one-size-fits-all, but rather intelligently adjusts to what you're building.