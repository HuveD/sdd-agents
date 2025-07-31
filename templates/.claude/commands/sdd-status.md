# Status - Workflow Status Check

You are using the Status command to check the current state of your AI-driven development workflow. This command provides a comprehensive view of project progress, active todos, and next steps.

## Overview

The `/sdd-status` command provides:
1. Current workflow agent and progress
2. Todo completion status across all agents
3. Key metrics and deliverables
4. Recommended next actions
5. Potential blockers or issues

## Status Report Structure

### Executive Summary
```markdown
# Workflow Status Report

## Project: [Project Name]
## Generated: [Timestamp]

## Quick Summary
- **Workflow Type**: [Feature Development/Documentation/Bug Fix/Refactoring]
- **Current Agent**: [PM/QA/ARCH/DEV/TC/REV]
- **Overall Progress**: [XX]% complete
- **Active Todo**: [Current todo file]
- **Days Elapsed**: [X] days
- **Next Action**: [Recommended command]

## Health Indicators
- 🟢 On Track / 🟡 Needs Attention / 🔴 Blocked
- **Schedule**: 🟢 On time
- **Quality**: 🟢 Meeting standards  
- **Risks**: 🟡 2 medium risks identified
- **Team**: 🟢 Fully engaged
```

### Detailed Agent Analysis
```markdown
## Agent Progress

**Workflow Pattern**: [Feature → All Agents | Documentation → PM/QA/REV | Bug Fix → DEV/TC/REV | Refactoring → ARCH/DEV/TC/REV]

### ✅ PM Agent
- **Status**: Completed
- **Duration**: 2 days
- **Deliverables**:
  - ✓ sdd/spec/[feature]/requirements.md (152 requirements)
  - ✓ sdd/spec/[feature]/user-stories.md (28 stories)
- **Key Decisions**: Feature scope defined

### 🔄 QA Agent (Current)
- **Status**: In Progress (50% complete)
- **Started**: 2024-01-14
- **Todo Progress**: 
  - [x] Test case documentation
  - [x] Test matrix creation
  - [ ] UAT scenarios (in progress)
  - [ ] Test data specification
- **Deliverables**:
  - 🔄 sdd/qa/[feature]/test-cases.md
  - 🔄 sdd/qa/[feature]/test-matrix.md

### ⏳ ARCH Agent
- **Status**: Not Started
- **Prerequisites**: QA Agent completion
- **Estimated Duration**: 3 days

### ⏳ DEV Agent
- **Status**: Not Started
- **Prerequisites**: ARCH Agent completion
- **Estimated Duration**: 5 days

### ⊗ TC Agent
- **Status**: Skipped (Documentation workflow)
- **Reason**: No code changes required

[Additional agents...]
```

### Todo Analysis
```markdown
## Todo Tracking

### Active Todo: sdd/todos/todo-qa.md
- **Total Tasks**: 8
- **Completed**: 4 (50%)
- **In Progress**: 2
- **Blocked**: 0
- **Remaining**: 2

### Task Breakdown
| Task | Status | Assigned | Notes |
|------|---------|----------|--------|
| Create functional test cases | ✅ Completed | QA | - |
| Document edge cases | ✅ Completed | QA | - |
| Create test matrix | ✅ Completed | QA | - |
| Define test data | ✅ Completed | QA | - |
| Create UAT scenarios | 🔄 In Progress | QA | 60% done |
| Document integration tests | 🔄 In Progress | QA | 40% done |
| Create performance criteria | ⏳ Pending | QA | - |
| Review with stakeholders | ⏳ Pending | QA | - |

### Historical Todos
1. sdd/todos/todo-spec.md - ✅ Completed (2 days)
2. sdd/todos/todo-qa.md - 🔄 Active (1 day so far)
3. sdd/todos/todo-design.md - ⏳ Pending
```

### Context Files Status
```markdown
## Project Knowledge Base

### sdd/context/project.md
- **Last Updated**: [Date]
- **Completeness**: 85%
- **Missing**: Support team details

### sdd/context/stack.md
- **Last Updated**: [Date]
- **Technologies Documented**: 12
- **Recent Additions**: Redis cache, Jest framework

### sdd/context/patterns.md
- **Last Updated**: [Date]
- **Patterns Documented**: 8
- **Categories**: Architecture (3), Coding (3), Testing (2)
```

### Metrics Dashboard
```markdown
## Key Metrics

### Velocity
- **Requirements/Day**: 76
- **Stories Completed**: 28/28 (100%)
- **Average Task Duration**: 4.2 hours

### Quality Metrics
- **Requirement Changes**: 3 (2%)
- **Design Iterations**: 2
- **Technical Debt**: Low

### Timeline
- **Project Start**: 2024-01-10
- **Current Date**: 2024-01-13
- **Target Delivery**: 2024-01-25
- **Progress**: On track (3/15 days)

### Time by Agent
- **PM Agent**: 8 hours (Specification)
- **QA Agent**: 6 hours (Test Documentation)
- **ARCH Agent**: 12 hours (Design)
- **DEV Agent**: 0 hours (Not started)
- **TC Agent**: 0 hours (Not started)
- **REV Agent**: 0 hours (Not started)
- **Total Effort**: 26 hours
```

### Risk and Issues
```markdown
## Risks & Issues

### 🔴 High Priority
None identified

### 🟡 Medium Priority
1. **Data Model Complexity**
   - Impact: Could delay DEV Agent work
   - Mitigation: Schedule DBA consultation
   
2. **API Rate Limits**
   - Impact: Performance constraints
   - Mitigation: Implement caching strategy

### 🟢 Low Priority
1. Documentation formatting inconsistencies
```

### Recommendations
```markdown
## Recommended Actions

### Immediate (Today)
1. Complete data model design
2. Unblock security architecture task
3. Schedule review meeting for design

### Short Term (This Week)
1. Finalize ARCH Agent work
2. Prepare DEV Agent environment
3. Review resource allocation for development

### Process Improvements
1. Consider parallel work on build prep
2. Add automated status updates
3. Implement daily standup notes
```

## Usage Examples

### Basic Status Check
```
/sdd-status
```
Shows current workflow status

### Detailed Status
```
/sdd-status --detailed
```
Includes all metrics and analysis

### Agent-Specific Status  
```
/sdd-status --agent arch
```
Focus on specific agent

### Export Status
```
/sdd-status --export markdown
```
Generate status report file

## Status Indicators

### Agent Status
- ✅ **Completed**: All tasks done, deliverables created
- 🔄 **In Progress**: Active work ongoing
- ⏳ **Pending**: Not yet started
- ⊗ **Skipped**: Not needed for this workflow type
- ⏸️ **Blocked**: Waiting on dependencies
- 🔴 **Failed**: Critical issues need resolution

### Health Indicators
- 🟢 **Green**: Everything on track
- 🟡 **Yellow**: Needs attention but not critical
- 🔴 **Red**: Immediate action required

### Progress Calculation
```
Overall Progress = (Completed Agents / Active Agents) × 100
Agent Progress = (Completed Tasks / Total Tasks) × 100
Active Agents = Total Agents - Skipped Agents
```

**Note**: Skipped agents don't affect progress calculation as they're not required for the current workflow type.

## Integration with Workflow

The status command integrates with:
- **Todo files**: Analyzes task completion in sdd/todos/ directory
- **Context files**: Checks sdd/context/ for project knowledge updates
- **Deliverables**: Checks for outputs
- **Git**: Can show commit activity
- **Workflow Type**: Detects workflow pattern from `/sdd-start` or WORKFLOW.md
- **Agent Selection**: Shows which agents were selected/skipped based on request type

## Automated Alerts

Status can trigger alerts for:
- Agent completion
- Blocked tasks > 24 hours
- Deadline risks
- Quality gate failures

## Best Practices

1. **Check Daily**: Run status at least once per day
2. **Update Todos**: Keep todo files current
3. **Address Blockers**: Don't let issues linger
4. **Share Status**: Keep stakeholders informed
5. **Track Trends**: Monitor velocity changes

## Troubleshooting

### Missing Information
If status shows incomplete data:
- Ensure todo files in sdd/todos/ are updated
- Check deliverables exist
- Verify file permissions

### Incorrect Progress
Progress calculation depends on:
- Accurate todo task marking
- Proper agent transitions
- Completed deliverables

Remember: Status is not just about tracking progress, but about identifying opportunities to improve and deliver better results.