# Start - New Workflow Initialization

You are using the Start command to begin a new SDD workflow. This command resets the workflow state and orchestrates the appropriate agents based on the user's request.

## Overview

The `/sdd-start` command:
1. Analyzes the user's request to determine required agents
2. Resets todos and WORKFLOW.md for a fresh start
3. Orchestrates agent execution in the optimal sequence
4. Maintains workflow summary throughout the process

**Note**: This command automatically skips unnecessary agents based on the request type.

## What Start Does

### 1. Workflow Reset (CRITICAL - MUST EXECUTE FIRST)
**MANDATORY INITIALIZATION STEPS:**

#### Clear Previous Todos
```bash
# Remove all existing todo files
rm -f sdd/todos/todo-*.md
```
- **IMPORTANT**: Delete ALL `todo-*.md` files in `sdd/todos/` directory
- **DO NOT** preserve any previous todo content
- **VERIFY**: Ensure directory is empty before proceeding

#### Reset WORKFLOW.md
```bash
# Create fresh WORKFLOW.md
echo "# Workflow Status" > sdd/WORKFLOW.md
```
- **OVERWRITE**: Replace entire WORKFLOW.md content
- **NO APPEND**: Do not add to existing content
- **FRESH START**: Begin with clean workflow state

#### Preserve Context Files
- **KEEP**: `sdd/context/project.md`
- **KEEP**: `sdd/context/stack.md`
- **KEEP**: `sdd/context/patterns.md`
- **REASON**: Context accumulates across workflows

### 2. Request Analysis
Automatically categorizes the request:
- **Feature Development**: Full workflow (PM → QA → ARCH → DEV → TC → REV)
- **Documentation Update**: Minimal flow (PM → QA → REV, with DEV/TC if code changes needed)
- **Bug Fix**: Direct flow (DEV → TC → REV, with PM/ARCH if design changes needed)
- **Refactoring**: Technical flow (ARCH → DEV → TC → REV)
- **Custom**: Intelligently selects agents based on specific needs

### 3. Agent Orchestration
- **Sequential Execution**: Each agent completes before the next
- **Dynamic Adjustment**: Adds agents if needs emerge
- **Progress Tracking**: Updates WORKFLOW.md after each agent
- **Smart Skipping**: Bypasses irrelevant agents

## WORKFLOW.md Structure

```markdown
# Workflow Status

## Project: [Name]
## Current Task: [User's request summary]
## Start Time: [Timestamp]
## Status: [Active/Complete]

## Agent Progress
- [✓/○/⊗] PM Agent - [Summary of work]
- [✓/○/⊗] QA Agent - [Summary of work]
- [✓/○/⊗] ARCH Agent - [Summary of work]
- [✓/○/⊗] DEV Agent - [Summary of work]
- [✓/○/⊗] TC Agent - [Summary of work]
- [✓/○/⊗] REV Agent - [Summary of work]

## Workflow Summary

### PM Agent (Requirements)
[What was specified, key decisions, constraints identified]

### QA Agent (Test Documentation)
[Test scenarios created, coverage areas, validation approach]

### ARCH Agent (Design)
[Technical decisions, architecture choices, patterns selected]

### DEV Agent (Implementation)
[Code changes, files modified, features implemented]

### TC Agent (Automated Testing)
[Tests created, coverage achieved, issues found/fixed]

### REV Agent (Validation)
[Compliance status, gaps identified, final verdict]

## Next Steps
[Recommended actions based on current state]
```

Legend: ✓ = Complete, ○ = Skipped, ⊗ = In Progress

## Usage

```bash
/sdd-start "Build user authentication with email verification"
```

```bash
/sdd-start "Update API documentation for v2 endpoints"
```

```bash
/sdd-start "Fix memory leak in background job processor"
```

## Request Type Detection

### Feature Development
**Triggers**: "build", "implement", "create", "add feature"
**Flow**: PM → QA → ARCH → DEV → TC → REV

### Documentation Update
**Triggers**: "update docs", "document", "write documentation"
**Flow**: PM → QA → (DEV if code samples) → (TC if tests needed) → REV

### Bug Fix
**Triggers**: "fix", "resolve", "debug", "patch"
**Flow**: DEV → TC → REV → (PM/ARCH if design changes needed)

### Refactoring
**Triggers**: "refactor", "optimize", "improve performance", "clean up"
**Flow**: ARCH → DEV → TC → REV

## Agent Summaries

Each agent completion adds a summary to WORKFLOW.md including:
- **Key Deliverables**: What was created/modified
- **Important Decisions**: Choices made during execution
- **Dependencies**: What the next agent needs to know
- **Status**: Success/Issues/Blockers

## Dynamic Agent Addition

Start monitors for conditions requiring additional agents:

### During DEV Agent
- Specification conflicts → Adds PM Agent
- Architecture issues → Adds ARCH Agent
- Missing test cases → Adds QA Agent

### During TC Agent
- Production code issues → Returns to DEV Agent
- Specification gaps → Adds PM Agent
- Design flaws → Adds ARCH Agent

### During REV Agent
- Always runs when any changes occur
- Triggers returns to specific agents for gaps
- Documents all findings in review report

## Best Practices

1. **Clear Requests**: Be specific about what you need
2. **Trust the Analysis**: Let Start determine the optimal flow
3. **Review Summaries**: Check WORKFLOW.md for progress
4. **Complete Cycles**: Let all required agents finish

## Examples

### Feature Request
```
User: /sdd-start "Add multi-factor authentication with SMS and authenticator app support"
Start: Detected feature development request
      Executing: PM → QA → ARCH → DEV → TC → REV
```

### Documentation Update
```
User: /sdd-start "Update README with new installation instructions"
Start: Detected documentation request
      Executing: PM → QA → REV
```

### Bug Fix
```
User: /sdd-start "Fix null pointer exception in user profile loading"
Start: Detected bug fix request
      Executing: DEV → TC → REV
```

### Refactoring
```
User: /sdd-start "Refactor database connection pooling for better performance"
Start: Detected refactoring request
      Executing: ARCH → DEV → TC → REV
```

## Error Handling

### "No sdd/ directory found"
Run `/sdd-init` first to set up the workflow structure

### "Agent failed to complete"
- Check agent output for specific errors
- Review prerequisites in todo files
- Ensure all dependencies are met

### "Workflow already in progress"
- Complete current workflow or
- Force restart with new `/sdd-start` command

## Important Notes

1. **REV Agent Always Runs**: Any code or documentation change triggers REV
2. **Automatic Flow**: No manual agent selection needed
3. **Progress Persistence**: WORKFLOW.md tracks everything
4. **Smart Dependencies**: Agents know what previous agents produced

Remember: Start analyzes your needs and runs only necessary agents, saving time while ensuring completeness.

## Implementation Guide for AI

### CRITICAL EXECUTION ORDER
When implementing `/sdd-start`, you MUST:

1. **FIRST**: Execute workflow reset
   ```bash
   # Step 1: Clear all todos
   rm -f sdd/todos/todo-*.md
   
   # Step 2: Reset WORKFLOW.md
   cat > sdd/WORKFLOW.md << 'EOF'
   # Workflow Status
   
   ## Project: [Project Name]
   ## Current Task: [User Request]
   ## Start Time: [ISO Timestamp]
   ## Status: Active
   
   ## Agent Progress
   - [ ] PM Agent - Not started
   - [ ] QA Agent - Not started
   - [ ] ARCH Agent - Not started
   - [ ] DEV Agent - Not started
   - [ ] TC Agent - Not started
   - [ ] REV Agent - Not started
   EOF
   ```

2. **SECOND**: Analyze request type
3. **THIRD**: Determine agent sequence
4. **FOURTH**: Execute first agent

### VERIFICATION CHECKLIST
Before starting any agent:
- [ ] All todo files deleted from `sdd/todos/`
- [ ] WORKFLOW.md completely replaced (not appended)
- [ ] Context files preserved in `sdd/context/`
- [ ] Request type identified
- [ ] Agent sequence determined

### COMMON MISTAKES TO AVOID
- ❌ Appending to existing WORKFLOW.md
- ❌ Preserving old todo files
- ❌ Starting agents before reset
- ❌ Partial deletion of todos
- ✅ Complete reset then start fresh