# Update - Workflow Enhancement

You are using the Update command to add improvements to an existing SDD workflow. This command preserves the current workflow state and intelligently re-executes only the necessary agents based on the enhancement request.

## Overview

The `/sdd-update` command:
1. Analyzes the enhancement request in context of existing work
2. Preserves todos and WORKFLOW.md (no reset)
3. Determines which agents need to re-run
4. Updates workflow summary with new changes

**Note**: This command is designed for iterative improvements after `/sdd-start` has completed.

## What Update Does

### 1. Workflow State Preservation (CRITICAL - NO RESET)
**PRESERVE EXISTING STATE:**

#### Keep All Todos
```bash
# Verify todos exist
ls sdd/todos/todo-*.md
```
- **IMPORTANT**: Do NOT delete any existing todo files
- **PRESERVE**: All completed work documentation
- **APPEND**: New requirements to relevant todos

#### Update WORKFLOW.md
```bash
# Add update section to existing WORKFLOW.md
echo -e "\n## Update: $(date -u +"%Y-%m-%dT%H:%M:%SZ")" >> sdd/WORKFLOW.md
echo "### Enhancement Request: [User's new request]" >> sdd/WORKFLOW.md
```
- **APPEND**: Add update section to existing content
- **NO OVERWRITE**: Preserve workflow history
- **TRACK CHANGES**: Document what's being updated

#### Read Current State
- **ANALYZE**: Existing todos to understand completed work
- **REVIEW**: WORKFLOW.md for agent execution history
- **IDENTIFY**: Which agents produced which artifacts

### 2. Enhancement Analysis
Automatically determines update scope:
- **New Feature Addition**: Updates PM → QA → DEV → TC → REV
- **Existing Feature Enhancement**: Updates relevant specs → DEV → TC → REV
- **Bug Fix on Existing Code**: DEV → TC → REV
- **Documentation Addition**: Updates relevant docs → REV
- **Test Enhancement**: QA → TC → REV
- **Performance Improvement**: ARCH → DEV → TC → REV

### Intelligent Re-execution Criteria
**RE-RUN PM AGENT WHEN:**
- New business requirements added
- Scope changes significantly
- User acceptance criteria modified
- New constraints introduced

**RE-RUN QA AGENT WHEN:**
- New test scenarios needed
- Coverage gaps identified
- New edge cases discovered
- Performance requirements added

**RE-RUN ARCH AGENT WHEN:**
- Design changes required
- New technical constraints
- Performance optimizations needed
- Architecture adjustments

**ALWAYS RE-RUN:**
- DEV Agent (to implement changes)
- TC Agent (to update tests)
- REV Agent (to validate all changes)

### 3. Agent Re-orchestration
- **Selective Execution**: Only runs affected agents
- **State Awareness**: Agents read existing todos before updating
- **Incremental Updates**: Appends to existing documentation
- **Change Tracking**: Clearly marks new vs existing content

## WORKFLOW.md Update Structure

```markdown
## Update: [Timestamp]
### Enhancement Request: [User's new request summary]

### Affected Agents
- [✓] PM Agent - [What specs need updating]
- [⊗] QA Agent - [What test scenarios to add]
- [○] ARCH Agent - [Skipped - no design changes]
- [✓] DEV Agent - [What code to modify/add]
- [✓] TC Agent - [What tests to update/add]
- [✓] REV Agent - [Final validation needed]

### Changes Made
#### PM Updates
[New requirements added, specs modified]

#### QA Updates
[New test scenarios, coverage additions]

#### DEV Updates
[Code changes, files modified, features added]

#### TC Updates
[Tests added/modified, coverage improvements]

#### REV Validation
[Compliance check for new changes]
```

## Usage

```bash
/sdd-update "Add pagination to the user list with infinite scroll"
```

```bash
/sdd-update "Improve error handling with retry logic"
```

```bash
/sdd-update "Add unit tests for the authentication module"
```

## Update Type Detection

### Feature Addition
**Triggers**: "add", "include", "extend with", "also support"
**Typical Flow**: PM (update specs) → QA (new scenarios) → DEV → TC → REV

### Enhancement
**Triggers**: "improve", "enhance", "optimize", "make better"
**Typical Flow**: DEV → TC → REV (PM/ARCH only if scope changes)

### Bug Fix Addition
**Triggers**: "also fix", "additionally resolve", "found another issue"
**Typical Flow**: DEV → TC → REV

### Test Addition
**Triggers**: "add tests", "increase coverage", "test for"
**Typical Flow**: QA → TC → REV

### Documentation Update
**Triggers**: "document the new", "update docs for", "add examples"
**Typical Flow**: DEV (if code examples) → REV

## Agent Behavior in Update Mode

### PM Agent (Update Mode)
- Reads existing `todo-pm.md`
- Identifies sections needing updates
- Appends new requirements with clear markers
- Updates acceptance criteria
- Preserves original requirements

### QA Agent (Update Mode)
- Reviews existing test scenarios
- Adds new test cases for enhancements
- Updates coverage requirements
- Marks new vs existing scenarios

### ARCH Agent (Update Mode)
- Reviews current design decisions
- Only runs if architecture changes needed
- Documents incremental design updates
- Preserves existing architecture docs

### DEV Agent (Update Mode)
- Reads all existing todos
- Implements only new/changed requirements
- Updates existing code carefully
- Documents what was added vs modified

### TC Agent (Update Mode)
- Reviews existing test implementations
- Adds tests for new functionality
- Updates existing tests if needed
- Maintains test coverage

### REV Agent (Update Mode)
- Validates entire system (old + new)
- Checks integration of new changes
- Ensures no regressions
- Documents compliance status

## Best Practices

1. **Use After Completion**: Run after `/sdd-start` workflow completes
2. **Clear Enhancements**: Be specific about what to add/improve
3. **Review Impact**: Check which agents will re-run
4. **Incremental Changes**: Make focused improvements
5. **Track History**: Review WORKFLOW.md for all changes

## Examples

### Adding to Existing Feature
```
User: /sdd-update "Add email notifications to the authentication system"
Update: Detected feature addition to existing system
       Re-running: PM → QA → DEV → TC → REV
       Preserving: All existing authentication work
```

### Improving Performance
```
User: /sdd-update "Optimize database queries in user service"
Update: Detected performance enhancement
       Re-running: ARCH → DEV → TC → REV
       Skipping: PM (no business changes), QA (no new scenarios)
```

### Adding Tests
```
User: /sdd-update "Add integration tests for the payment module"
Update: Detected test addition request
       Re-running: QA → TC → REV
       Skipping: PM, ARCH, DEV (no production code changes)
```

### Fixing Additional Bugs
```
User: /sdd-update "Fix the race condition in session management"
Update: Detected additional bug fix
       Re-running: DEV → TC → REV
       Using: Existing specifications and design
```

## Error Handling

### "No existing workflow found"
- Run `/sdd-start` first to initialize a workflow
- Check for WORKFLOW.md existence

### "Incomplete workflow detected"
- Review WORKFLOW.md for failed agents
- Complete or fix the current workflow first

### "Conflicting changes"
- Review what's being updated
- Ensure changes don't conflict with existing work
- Consider if `/sdd-start` might be more appropriate

## Important Notes

1. **No Reset**: Never deletes existing todos or workflow
2. **Incremental**: Builds on top of existing work
3. **Smart Re-run**: Only executes necessary agents
4. **Full Validation**: REV always runs to ensure system integrity
5. **History Preserved**: All changes tracked in WORKFLOW.md

## Comparison with /sdd-start

| Aspect | /sdd-start | /sdd-update |
|--------|-----------|-------------|
| Todos | Deletes all | Preserves all |
| WORKFLOW.md | Overwrites | Appends |
| Context | Fresh start | Builds on existing |
| Use Case | New features | Enhancements |
| Agent Run | Full sequence | Selective re-run |

## Implementation Guide for AI

### CRITICAL EXECUTION ORDER
When implementing `/sdd-update`, you MUST:

1. **FIRST**: Verify existing workflow
   ```bash
   # Step 1: Check workflow exists
   if [ ! -f "sdd/WORKFLOW.md" ]; then
     echo "Error: No existing workflow found. Use /sdd-start first."
     exit 1
   fi
   
   # Step 2: Verify todos exist
   if [ -z "$(ls -A sdd/todos/todo-*.md 2>/dev/null)" ]; then
     echo "Error: No existing todos found. Workflow may be corrupted."
     exit 1
   fi
   ```

2. **SECOND**: Read and analyze current state
   - Read all existing todo files
   - Parse WORKFLOW.md for completion status
   - Identify what each agent has produced

3. **THIRD**: Analyze enhancement request
   - Determine scope of changes
   - Identify affected components
   - Map to required agents

4. **FOURTH**: Update WORKFLOW.md with plan
   ```bash
   cat >> sdd/WORKFLOW.md << 'EOF'
   
   ## Update: [Timestamp]
   ### Enhancement Request: [Summary]
   ### Planned Re-execution: [Agent list]
   EOF
   ```

5. **FIFTH**: Execute only necessary agents with update awareness

### VERIFICATION CHECKLIST
Before starting any agent in update mode:
- [ ] WORKFLOW.md exists and shows completed workflow
- [ ] All expected todo files present
- [ ] Enhancement request analyzed
- [ ] Affected agents identified
- [ ] Update section added to WORKFLOW.md

### COMMON MISTAKES TO AVOID
- ❌ Deleting existing todos
- ❌ Overwriting WORKFLOW.md
- ❌ Running all agents unnecessarily  
- ❌ Ignoring existing work
- ✅ Preserve and build upon existing work

### AGENT UPDATE MODE FLAGS
Each agent MUST recognize update mode:
```
1. Check if called with existing todos
2. If todos exist:
   - Read all relevant existing content
   - Identify what to preserve vs update
   - Append new content with clear markers
   - Reference existing decisions
3. If conflicts detected:
   - Document the conflict
   - Suggest resolution approach
   - Request user clarification if needed
```

**Example Update Mode Execution:**
```
DEV Agent in update mode:
- Found existing todo-dev.md with 5 completed tasks
- New requirement: "Add pagination to user list"
- Action: Append task 6 for pagination implementation
- Reference: Uses existing UserList component from task 2
```

Remember: Update command enables iterative development without losing progress, making the SDD workflow truly agile and responsive to changing requirements.