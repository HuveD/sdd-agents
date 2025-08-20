---
allowed-tools: Read, Write, Bash, Glob, Grep, LS
description: Initialize CLAUDE.md with auto-discovered project context and SDD principles (extends built-in /init)
argument-hint: "[--overwrite] - Force overwrite existing CLAUDE.md"
model: claude-opus-4-1-20250805
---

## Initialize SDD-Enhanced Project Guidelines

You are tasked with creating a comprehensive CLAUDE.md that combines auto-discovered project context (similar to the built-in /init command) with the core SDD (Spec-Driven Development) principles. This creates a richer, more context-aware guidelines document.

### Phase 1: Check Existing File

First, check if CLAUDE.md already exists:
!`ls -la CLAUDE.md 2>/dev/null || echo "File does not exist"`

If CLAUDE.md exists and the user hasn't passed "--overwrite" in `$ARGUMENTS`:
- Inform the user that CLAUDE.md already exists
- Ask for explicit confirmation before overwriting
- Only proceed if the user confirms or if "--overwrite" was provided

### Phase 2: Project Analysis (Similar to Built-in /init)

Perform comprehensive project analysis to understand:

1. **Project Structure**:
   - Analyze directory structure: !`find . -type d -name node_modules -prune -o -type d -print | head -30`
   - Identify main source directories
   - Detect project type and framework

2. **Technology Stack**:
   - Check package.json for Node.js projects: @package.json
   - Check requirements.txt or pyproject.toml for Python projects
   - Check go.mod for Go projects
   - Check Cargo.toml for Rust projects
   - Analyze file extensions to determine primary languages

3. **Dependencies & Frameworks**:
   - Extract and list key dependencies
   - Identify framework patterns (React, Vue, Express, Django, etc.)
   - Note testing frameworks in use

4. **Coding Conventions**:
   - Check for existing config files (.eslintrc, .prettierrc, tsconfig.json, etc.)
   - Analyze code style from sample files
   - Detect naming conventions (camelCase, snake_case, etc.)

5. **Testing Setup**:
   - Look for test directories and files
   - Identify testing frameworks
   - Check test coverage configuration

6. **Build & Deployment**:
   - Check for CI/CD configuration (.github/workflows, .gitlab-ci.yml, etc.)
   - Identify build scripts and tools
   - Note deployment configurations

7. **Key Files**:
   - List and describe important configuration files
   - Identify entry points and main modules
   - Note documentation files

### Phase 3: Create Comprehensive CLAUDE.md

Create a CLAUDE.md that intelligently merges the discovered context with SDD principles:

```markdown
# Project Guidelines for Claude

This document combines auto-discovered project context with Spec-Driven Development (SDD) principles to guide AI-assisted development.

## 🎯 Core SDD Development Principles

These principles take precedence and should guide all development decisions:

### 1. Single Responsibility Principle (SRP)
- Every document, module, function, and class must have a single, well-defined responsibility
- Each component should have only one reason to change
- Avoid mixing different concerns within the same code unit

### 2. Result Pattern for Exception Handling
- Avoid uncontrolled throwing of exceptions
- Use explicit success/failure handling with Result patterns
- Return structured results that clearly indicate success or failure states

### 3. Unit Test-Based Test-Driven Development (TDD)
- Write tests before implementing functionality
- Keep unit tests simple and focused - avoid complex dependencies and mocking
- Unit tests must not access real databases, APIs, or external resources
- Focus on clear, maintainable test cases that validate single units of functionality
- Minimize test complexity to reduce testing overhead

### 4. Don't Repeat Yourself (DRY) Principle
- Eliminate code duplication based on SRP boundaries
- Before implementing new functionality, verify if it already exists
- Reuse existing code when responsibilities align
- Only create new implementations when responsibility scopes differ
- Extract common functionality into shared modules when appropriate

### 5. You Aren't Gonna Need It (YAGNI) Principle
- Strictly follow the specifications without over-engineering
- Do not implement features not explicitly required in the specification
- Avoid adding "nice-to-have" features without explicit requirements
- When improvements are necessary, request specification updates rather than implementing beyond scope

### 6. Maintain Concise Code Length
- Keep methods under 15 lines whenever possible
- Maintain files under 500 lines
- When a file or method grows too large, consider refactoring into smaller, focused units
- Use composition and delegation to manage complexity

### 7. Self-Documenting Code
- Write code that serves as its own documentation through clear naming and structure
- Use descriptive variable, function, and class names
- Keep code simple and readable
- Comments should focus on explaining "why" rather than "what"
- Document the intent, business logic, and non-obvious decisions
- Avoid redundant comments that merely restate what the code does

## 📁 Project Structure

[INSERT DISCOVERED PROJECT STRUCTURE HERE]

## 🛠 Technology Stack

[INSERT DISCOVERED TECHNOLOGIES, LANGUAGES, AND FRAMEWORKS]

## 📦 Dependencies

[INSERT KEY DEPENDENCIES AND THEIR PURPOSES]

## 🏗 Architecture Patterns

[INSERT DISCOVERED PATTERNS AND ARCHITECTURAL DECISIONS]

## 🧪 Testing Strategy

[INSERT TESTING SETUP AND FRAMEWORKS]
- Apply TDD principles as outlined above
- Ensure all tests follow the unit test guidelines

## 📝 Coding Conventions

[INSERT DISCOVERED CONVENTIONS]
- These conventions should align with SDD principles
- When conflicts arise, SDD principles take precedence

## 🚀 Build & Deployment

[INSERT BUILD AND DEPLOYMENT CONFIGURATION]

## 📄 Key Files and Directories

[INSERT IMPORTANT FILES WITH DESCRIPTIONS]

## 🔄 Development Workflow

1. Always start with clear specifications
2. Apply TDD by writing tests first
3. Implement following SRP and keeping code concise
4. Use Result patterns for error handling
5. Apply DRY principle within responsibility boundaries
6. Follow YAGNI - implement only what's specified
7. Ensure code is self-documenting

## 📌 Implementation Notes

- Always verify existing implementations before creating new code
- Prioritize clarity and maintainability over clever solutions
- When in doubt, favor explicitness over implicitness
- Ensure all code changes maintain these principles consistently
- When auto-discovered patterns conflict with SDD principles, SDD principles take precedence

---
*Generated on [DATE] by SDD-enhanced init command*
```

### Phase 4: Implementation Steps

1. Gather all project information using the analysis commands
2. Process and organize the discovered information
3. Intelligently merge with SDD principles, noting where they complement or supersede discovered patterns
4. Create the comprehensive CLAUDE.md file
5. Confirm creation: !`ls -la CLAUDE.md`
6. Display success message with summary of what was discovered and configured

### Important Notes
- The SDD principles section should always appear prominently at the beginning
- When discovered patterns conflict with SDD principles, clearly note that SDD takes precedence
- Include specific examples from the actual codebase where relevant
- Maintain a balance between auto-discovered context and prescriptive SDD guidelines
- Use clear section headers and formatting for easy navigation