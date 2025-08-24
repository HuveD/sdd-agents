---
model: "claude-3-5-haiku-latest"
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

Create a commit message that:
1. **Follows the detected language** from the project history
2. **Uses the identified convention pattern**
3. **Maintains consistency** with recent commits
4. **Structure**:
   - Title: Concise summary (50-72 characters)
   - Body: Detailed explanation (if changes are complex)
   - Footer: References, breaking changes (if applicable)

### Analysis Results:
Looking at the recent commits, I can see:
- **Primary Language**: [Detected from commit history]
- **Convention Used**: [Detected pattern]
- **Common Prefixes/Types**: [List of used types]
- **Message Style**: [Terse/Detailed/Mixed]

### Generated Commit Message:

Based on the changes and project conventions, here's the appropriate commit message:

```
[Title following detected convention]

[Body if needed - explaining:]
- What changed and why
- Impact of the changes
- Technical details if complex

[Footer if needed - references, breaking changes]
```

### File-by-File Changes Summary:
[List each changed file with a brief description of what changed]

$ARGUMENTS

Note: If you specified a focus area, I've emphasized those aspects in the commit message above.