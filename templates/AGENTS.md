# Project Guidelines

- This document defines development standards based on Spec-Driven Development (SDD) principles and current project implementation.
- Please use Korean.

## 🎯 Core SDD Development Principles

### 1. Specification-Driven Development Methodology
- Development is always based on specifications located in `docs/specs/`.
- When new specifications are added or existing ones need to be modified, the corresponding specification documents must be updated.
- Specifications must be written in accordance with the guidelines in `@docs/templates/spec-writing-guide.md`.
- Each specification document should always remain as a single, finalized version.

### 2. Understand the Project Using `@PROJECT.md`
- Before starting any work, read the `@PROJECT.md` file to understand the basic structure of the project and then begin your tasks.
- If there are important project-related rules that all team members should know and follow, update this file to ensure they are preserved.

### 3. Single Responsibility Principle (SRP)
- Every document, module, function, and class has a single responsibility.
- Only one reason to change per unit; avoid mixing concerns.

### 4. Result Pattern for Exception Handling
- Avoid uncontrolled exceptions.
- Prefer explicit success/failure results with structured return types.

### 5. Unit Test-Based Test-Driven Development (TDD)
- **Focus on Core Logic**: business/domain rules first.
- **Pure Functions First**: avoid external dependencies.
- **Keep Tests Simple & Isolated**: no real DB/API/resources.
- **Do NOT Test**: trivial getters/setters, DTOs, generated code, private methods.

### 6. DRY (Don't Repeat Yourself)
- Remove duplication within SRP boundaries; reuse where responsibilities align.

### 7. YAGNI (You Aren't Gonna Need It)
- Implement only what specs require; no over-engineering.

### 8. Maintain Concise Code Length
- Methods ~25 lines when feasible; files ~500 lines; refactor if exceeding.
- Use composition/delegation to manage complexity.

### 9. Self-Documenting Code & WHY-Only Comments
- Clear naming & structure; comments explain **WHY**, not WHAT/HOW.
- Tags: `[PERFORMANCE] [SECURITY] [TEMP] [BUSINESS] [LEGAL]`.

---

## 🔄 Development Workflow
1. Start with specifications (read/update)
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
- **SDD principles take precedence over discovered patterns**
- Do not alter production code to make tests pass; adjust the test environment instead when necessary.
