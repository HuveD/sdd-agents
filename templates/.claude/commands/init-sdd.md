---
allowed-tools: Read, Write, Bash, Glob, Grep, LS
description: Initialize CLAUDE.md with SDD principles and current project context
model: claude-opus-4-1-20250805
---

ultrathink

## Initialize SDD-Enhanced Project Guidelines

Create a CLAUDE.md file that establishes SDD (Spec-Driven Development) principles and captures essential project context for the current codebase.

### Phase 1: File Management

Always overwrite existing CLAUDE.md file without confirmation - this ensures the latest SDD principles and current project context are applied.

### Phase 2: Current Project Analysis

Analyze only what currently exists in the project:

1. **Project Structure**:
   - Examine actual directory structure: !`find . -type d -name node_modules -prune -o -type d -print | head -20`
   - Identify existing source directories

2. **Technology Stack**:
   - Check package.json for Node.js projects: @package.json
   - Check requirements.txt or pyproject.toml for Python projects
   - Check go.mod for Go projects
   - Check Cargo.toml for Rust projects

3. **Current Dependencies**:
   - List actual installed dependencies
   - Identify frameworks currently in use

4. **Existing Conventions**:
   - Check for config files (.eslintrc, .prettierrc, tsconfig.json, etc.)
   - Analyze actual code patterns from existing files

5. **Testing Infrastructure**:
   - Identify existing test files and frameworks
   - Note current test scripts and commands

6. **Key Project Files**:
   - List critical configuration files that exist
   - Identify actual entry points

### Phase 3: Create CLAUDE.md

Generate CLAUDE.md with SDD principles and discovered project context:

```markdown
# Project Guidelines for Claude

This document defines development standards based on Spec-Driven Development (SDD) principles and current project implementation.

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

**Core Principle: Focus only on valuable unit tests**

#### Unit Testing Guidelines
- **Focus on Core Logic**: Test business logic and domain rules
- **Pure Functions First**: Test pure functions without external dependencies
- **Maintain Simplicity**: Tests should be simple and maintainable
- **Ensure Isolation**: No real databases, APIs, or external resources

#### What NOT to Test
- Trivial getters/setters without logic
- Simple data transfer objects
- Framework-generated code
- Private methods or internal implementation

### 4. Don't Repeat Yourself (DRY) Principle
- Eliminate code duplication based on SRP boundaries
- Before implementing new functionality, verify if it already exists
- Reuse existing code when responsibilities align
- Only create new implementations when responsibility scopes differ
- Extract common functionality into shared modules when appropriate

### 5. You Aren't Gonna Need It (YAGNI) Principle
- Follow specifications without over-engineering
- Implement only what is explicitly required
- Avoid adding features without clear requirements

### 6. Maintain Concise Code Length
- Keep methods under 15 lines whenever possible
- Maintain files under 500 lines
- When a file or method grows too large, consider refactoring into smaller, focused units
- Use composition and delegation to manage complexity

### 7. Self-Documenting Code & Comment Rules

#### Core Principle: Code as Primary Documentation
- Write code that serves as its own documentation through clear naming and structure
- Minimize comments by maximizing code clarity
- When comments are necessary, focus exclusively on "WHY" not "WHAT" or "HOW"

#### Code Clarity Guidelines
- **Explicit Naming**: Use full, descriptive names that reveal intent
  - ✅ `calculateTotalPriceIncludingTaxAndDiscount()`
  - ❌ `calcTotal()` or `calculate()`
- **Small Functions**: Keep functions under 20-30 lines with single responsibility
- **Type Hints**: Use TypeScript interfaces or Python type hints for clarity
- **Structure Over Comments**: Extract complex logic into well-named functions

#### When to Add Comments (WHY-Only Rule)
Only add comments when code cannot express the "why":
- **Business/Domain Requirements**: Explain regulatory or business rules
- **Performance/Security Decisions**: Document non-obvious optimizations
- **Temporary Solutions**: Mark workarounds with reason and resolution plan
- **Complex Algorithms**: Explain mathematical or scientific background

#### Comment Format
Comments should explain WHY, not WHAT:
```javascript
// WHY: Regulatory requirement for data retention
function deleteExpiredUserData() { ... }

// WHY: Performance optimization for large datasets
function sortLargeDataset(data) { ... }
```

#### Comment Tags
- `[PERFORMANCE]`: Performance-critical decisions
- `[SECURITY]`: Security-related logic
- `[TEMP]`: Temporary solutions with TODO
- `[BUSINESS]`: Business rule implementation
- `[LEGAL]`: Legal/compliance requirements

#### Anti-Patterns to Avoid
- ❌ Comments that describe what code does: `// Increment counter`
- ❌ Comments that become outdated: `// This function returns user data` (when it now returns orders)
- ❌ Commented-out code without explanation
- ❌ TODO comments without action plans or dates

## 📁 Project Structure

[AUTO-DISCOVERED PROJECT STRUCTURE]

## 🛠 Technology Stack

[AUTO-DISCOVERED FROM PROJECT FILES]

## 📦 Dependencies

[ACTUAL DEPENDENCIES FROM PACKAGE FILES]

## 🧪 Testing Configuration

[EXISTING TEST SETUP FROM PROJECT]

### Testing Standards
- Focus on unit tests for business logic
- Test pure functions without external dependencies
- Skip trivial getters/setters and DTOs
- Maintain test isolation and simplicity

## 📝 Coding Conventions

[DISCOVERED FROM EXISTING CODE]

### Comment Standards
- Write self-documenting code
- Comments explain WHY, not WHAT
- Minimize comment-to-code ratio
- Use clear naming to reduce need for comments

- Align conventions with SDD principles
- SDD principles take precedence when conflicts arise

## 🚀 Build & Deployment

[CURRENT BUILD CONFIGURATION]

## 📄 Key Files

[EXISTING PROJECT FILES]

## 🔄 Development Workflow

1. Start with specifications
2. Write tests for business logic
3. Implement following SRP
4. Use Result patterns for error handling
5. Apply DRY within responsibility boundaries
6. Follow YAGNI - implement only what's specified
7. Write self-documenting code

## 📌 Implementation Notes

- Verify existing implementations before creating new code
- Prioritize clarity and maintainability
- Favor explicitness over implicitness
- SDD principles take precedence over discovered patterns
```

### Phase 4: Implementation

1. Gather current project information using analysis commands
2. Organize discovered information about existing implementation
3. Merge with SDD principles (SDD takes precedence)
4. Create CLAUDE.md file (always overwrite existing)
5. Display confirmation of created guidelines

### Key Points
- Focus on actual implementation, not future plans
- SDD principles always take precedence
- Document only what exists in the current codebase
- Keep guidelines actionable and project-neutral