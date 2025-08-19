# Project Guidelines for Claude

This document defines the core principles and coding standards for the SDD Agents project. All development work should strictly adhere to these guidelines.

## Core Development Principles

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

## Implementation Notes

- Always verify existing implementations before creating new code
- Prioritize clarity and maintainability over clever solutions
- When in doubt, favor explicitness over implicitness
- Ensure all code changes maintain these principles consistently