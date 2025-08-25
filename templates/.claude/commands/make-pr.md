---
description: Create a pull request with comprehensive analysis and documentation
allowed-tools:
  - Bash
  - Read
model: claude-sonnet-4-20250514
argument-hint: "<base-branch> (required - e.g., main, develop, staging)"
---

# Create Pull Request

Create a comprehensive pull request with detailed analysis and context for reviewers.

**Usage**: `/make-pr <base-branch>`
**Example**: `/make-pr main` or `/make-pr develop`

## Step 1: Validate Input and Context

Check if base branch is provided and validate current state:

!if [ -z "$ARGUMENTS" ]; then echo "ERROR: Base branch is required. Usage: /make-pr <base-branch>"; exit 1; else echo "Creating PR against base branch: $ARGUMENTS"; fi

!git branch --show-current
!git status --short

## Step 2: Analyze Commits

Review all commits that will be included in this PR:

!git log --pretty=format:"📝 %h - %s (%an, %ar)" $ARGUMENTS..HEAD 2>/dev/null || echo "Cannot compare with $ARGUMENTS branch. Please ensure it exists."
!git log --pretty=format:"COMMIT: %H%nAUTHOR: %an <%ae>%nDATE: %ad%nSUBJECT: %s%nBODY: %b%n---" $ARGUMENTS..HEAD 2>/dev/null

## Step 3: Analyze Changes

Get comprehensive diff statistics and file changes:

!git diff $ARGUMENTS...HEAD --stat 2>/dev/null || echo "Cannot generate diff statistics"
!git diff $ARGUMENTS...HEAD --name-status 2>/dev/null || echo "Cannot list file changes"

## Step 4: Check Test Coverage

Identify test-related changes in this PR:

!git diff $ARGUMENTS...HEAD --name-only | grep -E '(test|spec)\.(js|ts|py|rb|go|java|cpp|c)$|\.(test|spec)\.(js|ts|jsx|tsx)$|_test\.(go|py)$|Test\.(java|cs)$' 2>/dev/null || echo "No test file changes detected"

## Step 5: Check Documentation Context

Review project context for PR language preference:

![ -f .github/pull_request_template.md ] && head -20 .github/pull_request_template.md 2>/dev/null || echo "No PR template found"
!gh pr list --state merged --limit 3 --json title --jq '.[].title' 2>/dev/null || echo "Unable to fetch recent PRs"

## Step 6: Generate Pull Request

Based on the analysis above, create a comprehensive pull request following this structure:

### PR Title Format
- Use conventional commit format if detected in the project
- Format: `[type]: Brief description`
- Types: feat, fix, docs, refactor, test, chore, perf

### PR Body Template

```markdown
## 📋 Summary
[2-3 sentences describing what this PR accomplishes]

## 🎯 Purpose
[Why these changes are needed]
- Problem being solved
- Related issues: #[issue-number]

## 📝 Changes
### Modified Components
- **[Component/File]**: [What changed and why]
- **[Component/File]**: [What changed and why]

### Technical Details
- [Key technical decision and rationale]
- [Implementation approach]

## 🧪 Testing
### Test Coverage
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated  
- [ ] Manual testing completed

### How to Test
1. [Step-by-step testing instructions]
2. [Expected results]

## 📸 Screenshots
[Include if UI changes are present]

## ✅ Checklist
- [ ] Code follows project guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests passing
- [ ] No debug code left

## 🔗 Related
- Issue: #[number]
- Documentation: [link]

---
🤖 Generated with [Claude Code](https://claude.ai/code)
```

## Step 7: Create the PR

Execute the pull request creation:

1. Push current branch to remote:
!git push -u origin HEAD 2>/dev/null || echo "Branch already pushed or push failed"

2. Create PR using gh CLI with base branch $ARGUMENTS:
- Use the generated title and body
- Set base branch to: $ARGUMENTS
- Return the PR URL

**Important Instructions:**
- Base branch MUST be set to the value provided in $ARGUMENTS
- Generate comprehensive but concise PR description
- Follow project's language conventions (check recent PRs/commits)
- Include all relevant technical context for reviewers
- Make the PR self-documenting and easy to review