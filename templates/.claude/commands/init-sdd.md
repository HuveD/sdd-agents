---
allowed-tools: Read, Write, Bash, Glob, Grep, LS
description: Initialize CLAUDE.md with auto-discovered project context and SDD principles (extends built-in /init)
argument-hint: "[--overwrite] - Force overwrite existing CLAUDE.md"
model: claude-opus-4-1-20250805
---

ultrathink

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

These guidelines define the development standards and practices for this project, emphasizing Spec-Driven Development (SDD) principles.

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

#### Pre-Test Planning Requirements
- **Value Assessment**: Does this test verify actual business logic?
- **Test Planning**: Define clear test objectives before implementation
- **ROI Validation**: Is the value worth the test creation/maintenance cost?

#### Unit Testing Core Guidelines
- **Focus on Core Logic**: Prioritize business logic and domain rule validation
- **Pure Functions First**: Test pure functions without external dependencies first
- **Maintain Simplicity**: Tests shouldn't be complex enough to introduce bugs
- **Ensure Isolation**: No real databases, APIs, or external resources

#### Anti-Patterns to Avoid
- **Excessive Mocking**: Reconsider design if >3 mocks are needed
- **Implementation Testing**: Never test private methods or internal implementation
- **Coverage Obsession**: Skip meaningless getter/setter tests
- **Integration Test Overuse**: Don't use integration tests for unit-testable logic

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

#### Comment Format Standard
All comments must follow the "WHY:" template:
```javascript
// WHY: GDPR requires automatic deletion after 30 days for compliance
function deleteExpiredUserData() { ... }

// WHY: [PERFORMANCE] Using heap sort instead of quicksort to maintain O(n log n) for large datasets
function sortLargeDataset(data) { ... }

// WHY: [TEMP] Hardcoded due to delayed API development. TODO: Dynamic load in v2
const apiKey = "tempKey";
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

[INSERT DISCOVERED PROJECT STRUCTURE HERE]

## 🛠 Technology Stack

[INSERT DISCOVERED TECHNOLOGIES, LANGUAGES, AND FRAMEWORKS]

## 📦 Dependencies

[INSERT KEY DEPENDENCIES AND THEIR PURPOSES]

## 🏗 Architecture Patterns

[INSERT DISCOVERED PATTERNS AND ARCHITECTURAL DECISIONS]

## 🧪 Testing Strategy

[INSERT TESTING SETUP AND FRAMEWORKS]

### Testing Philosophy
**Unit Tests Only Strategy**: Achieve system stability through comprehensive unit testing of each single responsibility. Avoid integration and E2E tests due to their inherent complexity and dependency management overhead.

### Why Unit Tests Only?
- **Complete Coverage Through Isolation**: Each unit's single responsibility is thoroughly validated
- **Maintainability**: No complex mocking chains or external dependencies
- **Fast Feedback**: Instant test execution without setup overhead
- **Clear Failure Points**: Precisely identifies which responsibility failed

### Test Writing Checklist
Before writing any test, verify:
- [ ] The test validates a single responsibility
- [ ] The test has zero external dependencies
- [ ] The test requires minimal or no mocking
- [ ] The test is deterministic and repeatable

### When NOT to Write Tests
- Trivial getters/setters without logic
- Simple data transfer objects (DTOs)
- Framework-generated code
- Code that only calls other tested code without adding logic

### Integration/E2E Test Exceptions
Only consider non-unit tests when:
- Critical payment processing flows
- Security authentication boundaries
- Data integrity at system boundaries
Even then, minimize scope and complexity

Apply TDD principles as outlined above, focusing on high-value tests only

## 📝 Coding Conventions

[INSERT DISCOVERED CONVENTIONS]

### Comment and Documentation Standards

#### Comment Ratio Target
- **Goal**: Less than 10% comment-to-code ratio
- **Metric**: High comment ratio indicates need for code refactoring
- **Review**: Every PR should evaluate if comments could be eliminated through better code

#### Documentation Hierarchy
1. **Code itself** (primary documentation through naming and structure)
2. **Type definitions** (interfaces, type hints, schemas)
3. **WHY comments** (only when code cannot express reasoning)
4. **External docs** (README, API docs for complex systems)

#### Code Review Checklist for Comments
- [ ] Is the code self-documenting without the comment?
- [ ] Does the comment explain WHY, not WHAT or HOW?
- [ ] Would a better variable/function name eliminate this comment?
- [ ] Is the comment likely to stay accurate after code changes?
- [ ] Does the comment follow the "WHY:" template format?

### Implementation Examples

```typescript
// ❌ BAD: Redundant comment
// Get user by ID
function getUserById(id: string) { ... }

// ✅ GOOD: Self-documenting
function getUserById(userId: string): User | null { ... }

// ❌ BAD: Explaining WHAT
// Loop through users and filter active ones
const active = users.filter(u => u.status === 'active');

// ✅ GOOD: Explaining WHY when necessary
// WHY: [BUSINESS] Active status expires after 90 days per subscription terms
const activeUsers = users.filter(u => 
  u.status === 'active' && 
  daysSince(u.lastActivity) < 90
);
```

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
7. Ensure code is self-documenting:
   - Write code that doesn't need comments
   - Add WHY comments only when business logic isn't obvious
   - Review and remove outdated comments during refactoring

### Comment Maintenance Process
1. **Before Adding Comments**: Try to refactor code to be self-explanatory
2. **During Code Review**: Question every comment's necessity
3. **During Refactoring**: Update or remove comments that no longer apply
4. **Quarterly Audit**: Review codebase for comment quality and relevance

## 📌 Implementation Notes

- Always verify existing implementations before creating new code
- Prioritize clarity and maintainability over clever solutions
- When in doubt, favor explicitness over implicitness
- Ensure all code changes maintain these principles consistently
- When auto-discovered patterns conflict with SDD principles, SDD principles take precedence

### Comment Quality Standards
- **Enforcement**: Use linters to flag TODO without dates, commented code without explanation
- **CI/CD Integration**: Automated checks for comment patterns and ratios
- **Team Agreement**: All comments must pass the "future developer test" - would someone understand the WHY in 6 months?
- **Living Documentation**: Comments are code - they must be maintained, tested for relevance, and refactored

### Comment Anti-Pattern Detection
Automatically flag and review:
- Files with >15% comment ratio
- Comments without "WHY:" prefix
- TODO comments older than 30 days
- Commented-out code blocks
- Comments that duplicate function/variable names
```

### Phase 4: Implementation Steps

1. Gather all project information using the analysis commands
2. Process and organize the discovered information
3. Intelligently merge with SDD principles, noting where they complement or supersede discovered patterns
4. Create the final CLAUDE.md file without any generation metadata or timestamps
5. Confirm creation: !`ls -la CLAUDE.md`
6. Display success message with summary of what was discovered and configured

### Important Notes
- The SDD principles section should always appear prominently at the beginning
- When discovered patterns conflict with SDD principles, clearly note that SDD takes precedence
- Include specific examples from the actual codebase where relevant
- Maintain a balance between auto-discovered context and prescriptive SDD guidelines
- Use clear section headers and formatting for easy navigation
- The final CLAUDE.md should be a clean, professional document without any metadata, timestamps, or generation notes
- Focus on delivering pure, actionable guidelines that serve as the definitive project standards