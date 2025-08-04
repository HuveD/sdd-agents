# Verify - SDD Specification and Implementation Validation

You are using the Verify command to validate the entire SDD workflow, ensuring specifications and implementations are aligned, optimized, and free from redundancy. This command leverages the REV agent to orchestrate comprehensive validation and correction.

## Overview

The `/sdd-verify` command:
1. Initiates REV agent as the primary validator
2. Identifies specification misalignments and redundancies
3. Delegates corrections to appropriate agents via sub-agent tasks
4. Ensures PM specifications match actual implementation

**Critical**: This command enforces strict alignment between specifications, documentation, and code.

## What Verify Does

### 1. REV Agent as Orchestrator
The REV agent acts as the central validation authority:

```markdown
## REV Agent Validation Scope
1. **Document Consistency Check**
   - Cross-reference all todo files
   - Identify contradictions between agents
   - Flag specification drift

2. **Implementation Alignment**
   - Compare PM specs with actual code
   - Verify QA scenarios match implementation
   - Ensure ARCH decisions are followed

3. **Redundancy Detection**
   - Find duplicate documentation
   - Identify overlapping test cases
   - Locate redundant code patterns
```

### 2. Validation Categories

#### Specification Compliance
**What REV Checks:**
- PM todo requirements vs actual implementation
- Acceptance criteria fulfillment
- Business logic accuracy
- Feature completeness

**Common Issues:**
- Code implements features not in PM specs
- PM specs contain unimplemented requirements
- Implementation deviates from specified behavior

#### Documentation Integrity
**What REV Checks:**
- Duplicate information across todos
- Outdated documentation
- Missing critical documentation
- Inconsistent terminology

**Common Issues:**
- Same information in multiple todos
- Code comments contradict specs
- Test descriptions mismatch implementation

#### Test Coverage Alignment
**What REV Checks:**
- QA scenarios vs TC implementations
- Test coverage vs PM requirements
- Edge cases coverage
- Performance test alignment

**Common Issues:**
- Tests for non-existent features
- Missing tests for specified features
- Test scenarios not matching specs

### 3. Sub-Agent Delegation Pattern

When REV identifies issues, it delegates fixes:

```markdown
## REV Delegation Examples

### Specification Mismatch Found
Issue: Feature X implemented differently than specified
REV Action:
1. Use sub-agent to call PM Agent:
   - Update specifications to match implementation OR
   - Document why implementation differs
2. Use sub-agent to call DEV Agent:
   - Modify implementation to match specs
3. Use sub-agent to call TC Agent:
   - Update tests to match corrected behavior

### Redundant Documentation Found
Issue: User authentication documented in 3 places
REV Action:
1. Use sub-agent to call PM Agent:
   - Consolidate requirements in todo-pm.md
2. Use sub-agent to call QA Agent:
   - Remove duplicate test scenarios
3. Use sub-agent to call ARCH Agent:
   - Update design docs to reference PM specs

### Missing Implementation Found
Issue: PM spec requires feature Y, not implemented
REV Action:
1. Use sub-agent to call DEV Agent:
   - Implement missing feature
2. Use sub-agent to call TC Agent:
   - Add tests for new feature
3. Re-validate compliance
```

## Validation Workflow

### Phase 1: Comprehensive Audit
```bash
# REV Agent performs full system scan
1. Read all todo-*.md files
2. Analyze WORKFLOW.md history
3. Scan codebase for implementations
4. Review test coverage
5. Check documentation consistency
```

### Phase 2: Issue Categorization
```markdown
## Validation Report Structure

### Critical Issues (Blocking)
- [ ] Spec-Implementation Mismatches
- [ ] Missing Required Features
- [ ] Broken Test Coverage

### Major Issues (High Priority)
- [ ] Redundant Documentation
- [ ] Inconsistent Terminology
- [ ] Outdated Specifications

### Minor Issues (Low Priority)
- [ ] Formatting Inconsistencies
- [ ] Non-critical Documentation Gaps
- [ ] Optional Enhancement Opportunities
```

### Phase 3: Corrective Actions
REV orchestrates fixes based on severity:

1. **Critical Issues**: Immediate sub-agent delegation
2. **Major Issues**: Batch corrections per agent
3. **Minor Issues**: Document for future updates

## Sub-Agent Task Templates

### PM Agent Correction Task
```markdown
## Task for PM Agent
Type: Specification Alignment
Priority: Critical

Issues Found:
1. Feature X specified as synchronous, implemented as async
2. Missing acceptance criteria for error handling
3. Duplicate requirements in sections 3.2 and 5.1

Required Actions:
1. Update section 2.3 to reflect async implementation
2. Add error handling acceptance criteria
3. Consolidate duplicate requirements
```

### DEV Agent Correction Task
```markdown
## Task for DEV Agent
Type: Implementation Correction
Priority: Critical

Issues Found:
1. UserService.create() doesn't validate email format (PM req 2.3)
2. Missing rate limiting on API endpoints (PM req 4.1)
3. Incorrect error codes returned (QA scenario 3.2)

Required Actions:
1. Add email validation to UserService
2. Implement rate limiting middleware
3. Update error responses to match specs
```

### QA Agent Correction Task
```markdown
## Task for QA Agent
Type: Test Scenario Alignment
Priority: Major

Issues Found:
1. Test scenarios for removed feature still present
2. Missing edge cases for new validation rules
3. Performance criteria outdated

Required Actions:
1. Remove obsolete test scenarios
2. Add validation edge case tests
3. Update performance benchmarks
```

## Usage

```bash
/sdd-verify
```

No parameters needed - performs comprehensive validation of entire workflow.

## Validation Rules

### PM Specification Rules
1. **Completeness**: All features must have acceptance criteria
2. **Consistency**: No contradicting requirements
3. **Traceability**: Each requirement maps to implementation
4. **Clarity**: Unambiguous, testable criteria

### Implementation Rules
1. **Compliance**: Code matches PM specifications exactly
2. **Completeness**: All specified features implemented
3. **Quality**: Follows ARCH design patterns
4. **Testing**: All features have corresponding tests

### Documentation Rules
1. **Single Source**: Each fact documented once
2. **Accuracy**: Docs match current implementation
3. **Completeness**: All features documented
4. **Consistency**: Uniform terminology throughout

## REV Agent Decision Matrix

| Issue Type | Severity | Action | Sub-Agent |
|------------|----------|---------|-----------|
| Spec mismatch | Critical | Fix immediately | PM + DEV |
| Missing feature | Critical | Implement | DEV + TC |
| Duplicate docs | Major | Consolidate | PM/QA/ARCH |
| Outdated test | Major | Update | QA + TC |
| Wrong behavior | Critical | Correct | DEV + TC |
| Missing test | Major | Add | TC |
| Style issue | Minor | Document | None |

## Output Format

### Validation Summary
```markdown
# SDD Verification Report
Generated: [Timestamp]
Status: [PASS/FAIL/NEEDS_CORRECTION]

## Summary
- Total Issues Found: X
- Critical: X
- Major: X  
- Minor: X

## Critical Issues Requiring Immediate Action
[List with sub-agent assignments]

## Corrections Applied
[List of fixes made via sub-agents]

## Remaining Tasks
[Any issues that need manual intervention]
```

## Error Handling

### "No workflow found"
- Run `/sdd-start` first
- Ensure sdd/ directory exists

### "Sub-agent delegation failed"
- Check specific agent error
- May need manual intervention
- Review agent prerequisites

### "Circular dependency detected"
- PM spec requires feature A which needs B which needs A
- Requires architectural review
- Manual resolution needed

## Important Notes

1. **REV Authority**: REV agent has full authority to delegate corrections
2. **Automated Fixes**: Most issues corrected automatically via sub-agents
3. **Preservation**: Original work preserved, only corrections applied
4. **Audit Trail**: All changes documented in WORKFLOW.md
5. **Non-Destructive**: Verification doesn't delete, only corrects

## Implementation Guide for AI

### REV Agent Verification Process

1. **PHASE 1: Full System Scan**
   ```python
   # Pseudo-code for validation logic
   issues = []
   
   # Read all todos
   todos = read_all_todos()
   
   # Check PM->Implementation alignment
   for requirement in todos.pm.requirements:
       if not find_implementation(requirement):
           issues.append(Critical("Missing implementation", requirement))
       
   # Check for redundancy
   for doc1, doc2 in combinations(todos, 2):
       if has_duplicate_content(doc1, doc2):
           issues.append(Major("Duplicate documentation", doc1, doc2))
   ```

2. **PHASE 2: Issue Analysis**
   ```python
   # Categorize and prioritize
   critical_issues = [i for i in issues if i.severity == "Critical"]
   major_issues = [i for i in issues if i.severity == "Major"]
   
   # Create delegation plan
   delegations = []
   for issue in critical_issues:
       delegations.append(create_delegation(issue))
   ```

3. **PHASE 3: Sub-Agent Orchestration**
   ```markdown
   For each delegation:
   1. Call sub-agent with specific task
   2. Wait for completion
   3. Verify fix applied correctly
   4. Update validation report
   ```

### Sub-Agent Task Structure
```json
{
  "task_type": "specification_correction",
  "priority": "critical",
  "agent": "PM",
  "context": {
    "issue": "Requirement mismatch",
    "current": "Feature X is synchronous",
    "actual": "Feature X implemented as async",
    "resolution": "Update spec to match implementation"
  },
  "specific_actions": [
    "Update section 2.3 in todo-pm.md",
    "Add async behavior documentation",
    "Update acceptance criteria"
  ]
}
```

### Validation Checklist
- [ ] All PM requirements have implementations
- [ ] All implementations match PM specs
- [ ] No duplicate documentation exists
- [ ] All features have tests
- [ ] Test scenarios match requirements
- [ ] Architecture decisions are followed
- [ ] No contradicting specifications
- [ ] Documentation is current

### Common Patterns to Detect

#### Specification Drift
```
PM Spec: "User can upload files up to 10MB"
Implementation: maxFileSize = 25 * 1024 * 1024
Action: Update PM spec OR fix implementation
```

#### Redundant Documentation
```
todo-pm.md: "Authentication uses JWT tokens"
todo-arch.md: "JWT token implementation details"
todo-dev.md: "JWT authentication implementation"
Action: Consolidate in PM, reference in others
```

#### Missing Implementation
```
PM Spec: "System sends email on password reset"
Code Search: No email sending found
Action: Delegate to DEV agent for implementation
```

Remember: The verify command ensures your SDD workflow maintains perfect alignment between specifications, implementation, and documentation throughout the project lifecycle.