---
allowed-tools: Read, Edit, MultiEdit, Write, Bash(grep:*), Bash(rg:*), Bash(find:*), Bash(git:*), Bash(go:*), TodoWrite, Grep, Glob, LS, Task, WebSearch
argument-hint: [review comments]
description: Apply received code review comments after critical analysis
model: claude--4-1-20250805
---

## Review Feedback Analysis

You are tasked with critically analyzing code review feedback and implementing necessary improvements.

### Context
Project information:
- Current branch: !`git branch --show-current`
- Recent commits: !`git log --oneline -5`
- Modified files: !`git diff --name-only HEAD~1`

### Review Comments to Analyze
$ARGUMENTS

## Your Task

### Phase 1: Deep Analysis
1. **Context Understanding**:
   - Analyze the current project state and understand the reviewed code's purpose
   - Identify the specific files and functionality being reviewed
   - Understand the architectural context and design patterns in use

2. **Review Validation**:
   - Critically evaluate each review comment for:
     - Technical accuracy and correctness
     - Alignment with project architecture and conventions
     - Impact on performance, maintainability, and security
     - Consistency with existing codebase patterns
   - Identify which suggestions are:
     - **Critical** - Must be addressed (bugs, security issues, breaking changes)
     - **Important** - Should be addressed (performance, maintainability)
     - **Nice-to-have** - Optional improvements (style, minor optimizations)
     - **Questionable** - May not be appropriate for this context

3. **Counterargument Consideration**:
   - For each suggestion, consider potential drawbacks or trade-offs
   - Evaluate if the suggestion might introduce new issues
   - Consider alternative approaches that might be better suited

### Phase 2: Planning
Based on your analysis, create an improvement plan that:
1. Prioritizes changes by importance and impact
2. Groups related changes for logical implementation
3. Identifies any changes that should NOT be implemented with clear reasoning
4. Estimates the scope and risk of each change

### Phase 3: Implementation
1. Use TodoWrite to track all planned improvements
2. Implement changes in priority order:
   - Start with critical issues
   - Test each change before moving to the next
   - Ensure backward compatibility where relevant
3. For each implemented change:
   - Verify it doesn't break existing functionality
   - Check that it follows project conventions
   - Add or update tests if necessary

### Phase 4: Verification
After implementing changes:
1. Run relevant tests: `sh ./scripts/run_test.sh`
2. Verify the application still builds and runs correctly
3. Document any significant architectural decisions or trade-offs made

## Output Format

Provide your analysis and actions in the following structure:

1. **Review Analysis Summary**
   - List each review comment with your critical assessment
   - Categorize by priority (Critical/Important/Nice-to-have/Rejected)
   - Provide reasoning for any rejected suggestions

2. **Implementation Plan**
   - Ordered list of changes to implement
   - Estimated complexity and risk for each

3. **Implementation Progress**
   - Track each change as you implement it
   - Note any issues or deviations from the plan

4. **Final Summary**
   - Changes successfully implemented
   - Changes skipped with reasoning
   - Any follow-up work recommended

Remember: Not all review feedback is correct or appropriate. Your role is to be a critical thinker who implements improvements that genuinely benefit the project while respectfully explaining why certain suggestions might not be suitable.