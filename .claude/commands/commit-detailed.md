---
model: "claude-sonnet-4-20250514"
allowed-tools:
  - Bash
description: "Analyze git changes and generate a detailed commit message following project conventions"
argument-hint: "[optional: specific focus area]"
---

Analyze the current git changes and create a comprehensive commit message following the project's existing conventions.

First, let me analyze the project's commit history to understand the conventions:

!git log --oneline -30

Now, let me gather all the git change information:

!git status --porcelain

!git diff --cached --stat

!git diff --cached

!git diff --stat

!git diff

Based on the commit history and changes above, I will now:

## 1. Language Detection
Analyze the language used in recent commits (last 30 commits):
- If mostly English → use English
- If mostly Korean → use Korean  
- If mixed → follow the most recent pattern
- If another language → use that language

## 2. Convention Pattern Detection
Identify the commit message pattern from history:
- **Conventional Commits**: `type(scope): description` or `type: description`
  - Common types: feat, fix, docs, style, refactor, test, chore, perf, ci, build, revert
- **Gitmoji**: Using emojis like 🎨, 🐛, ✨, 📝, etc.
- **Angular**: Similar to conventional but with specific scopes
- **Simple**: Just descriptive messages without prefixes
- **Custom**: Project-specific patterns

## 3. Commit Message Generation

Create an effective commit message that balances detail with readability:
1. **Follows the detected language** from the project history
2. **Uses the identified convention pattern**
3. **Maintains consistency** with recent commits
4. **Provides essential context** without overwhelming detail

### Analysis Results:
Looking at the recent commits, I can see:
- **Primary Language**: [Detected from commit history]
- **Convention Used**: [Detected pattern]
- **Common Prefixes/Types**: [List of used types]
- **Change Complexity**: [Simple/Moderate/Complex based on file count and diff size]

### Adaptive Commit Message Strategy:

I'll determine the appropriate level of detail based on:
- Number of files changed
- Complexity of changes
- Presence of breaking changes
- Architectural impact

#### For SIMPLE changes (1-2 files, straightforward fixes):
```
[type]: [concise description]

- Fixed [specific issue]
- Updated [component] to [handle case]
```

#### For MODERATE changes (3-10 files, feature additions):
```
[type]: [clear summary of change]

Context:
[1-2 sentences: why this change was needed]

Changes:
- [Main change 1 and its purpose]
- [Main change 2 and its purpose]
- [Any important side effects]

Testing: [How it was tested]
```

#### For COMPLEX changes (10+ files, architectural changes, breaking changes):
```
[type]: [comprehensive summary]

## Why
[2-3 sentences: Problem being solved, previous limitations]

## What Changed
[3-5 bullet points: Key modifications and approach]

## Impact
[Only if breaking changes or migration needed]

## Key Files
- [critical_file.js]: [Core logic change]
- [config.json]: [New configuration added]
[List only files with significant changes]

## Testing
[Test approach and coverage]

Refs: #[issue] [related PRs]
```

### Essential Context Guidelines:

**ALWAYS Include:**
- **Why**: The problem or requirement (1-2 sentences)
- **What**: Key changes made (bullet points)
- **Risk**: Breaking changes or security impacts (if any)

**Include When Relevant:**
- **How**: Technical approach (only for complex logic)
- **Testing**: Test coverage (for critical changes)
- **References**: Related issues/PRs

**AVOID:**
- Redundant file lists (git already shows this)
- Obvious changes ("updated version number")
- Implementation details that are clear from code
- Boilerplate text that adds no value

### Generated Commit Message:

Based on the analysis of [X files changed, Y insertions, Z deletions]:

```
[Title: Clear, actionable summary]

[Context - Why This Change]
Brief explanation of the problem or need that prompted this change.
Focus on the "why" rather than the "what" (code shows what).

[Key Changes]
• Main modification and its purpose
• Secondary change if significant
• Any important side effects or considerations

[Impact - Only if needed]
Breaking: [describe if applicable]
Migration: [steps if required]
Performance: [impact if significant]

[Testing - For non-trivial changes]
Tested: [approach used]

[References - If applicable]
Issue: #XXX
Related: #XXX
```

### Real Examples:

**Simple Fix:**
```
fix: Correct null pointer exception in user authentication

- Added null check before accessing user.email
- Returns early with proper error message
```

**Feature Addition:**
```
feat: Add dark mode support to dashboard

Context:
Users requested dark mode for better visibility in low-light environments.

Changes:
• Implemented theme context provider with localStorage persistence
• Added CSS variables for dynamic color switching
• Updated all dashboard components to use theme-aware colors

Testing: Manual testing on Chrome, Firefox, Safari
```

**Complex Refactor:**
```
refactor: Migrate authentication to JWT-based system

## Why
Session-based auth was causing scaling issues with multiple servers.
JWT enables stateless authentication and better microservice support.

## What Changed
• Replaced session store with JWT token generation
• Updated middleware to validate JWT instead of sessions
• Added refresh token mechanism for security
• Modified user model to store refresh tokens

## Breaking Changes
- API now requires Bearer token instead of cookie
- Logout endpoint changed from DELETE to POST

## Migration
1. Update client to store JWT in localStorage
2. Implement token refresh logic
3. Update API calls to include Authorization header

Tested: Unit tests + integration tests + staging deployment
Refs: #1234, RFC-007
```

$ARGUMENTS

Note: If you specified a focus area, I've emphasized those aspects in the commit message above.

## 4. Execute Commit

Now I'll create the commit with the generated message:

!git add -A

!git commit -m "[Insert the generated commit title here]" -m "[Insert the body and footer if needed]"

The commit has been created successfully. You can verify with:

!git log --oneline -1