# /sdd-next - Advance SDD Workflow to Next Agent

## Overview

Automatically advances your SDD workflow to the next agent by detecting current progress and invoking the appropriate agent.

## Usage

```
/sdd-next [feature-name]
```

- `feature-name` (optional): If omitted, detects the active feature automatically

## How It Works

1. **Detects Current State**
   - Analyzes todo file completion in `sdd/todos/`
   - Identifies which agent last completed work (100% todo completion)
   - Determines the most recent active feature from directory timestamps

2. **Agent Workflow Sequence**
   ```
   sdd-pm → sdd-qa → sdd-arch → sdd-dev → sdd-tc → sdd-rev
   ```

3. **Invokes Next Agent**

   | Current Agent Completed | Next Agent | Purpose |
   |------------------------|------------|---------|
   | None | sdd-pm | Create specifications |
   | sdd-pm | sdd-qa | Create test documentation |
   | sdd-qa | sdd-arch | Design architecture |
   | sdd-arch | sdd-dev | Build implementation |
   | sdd-dev | sdd-tc | Create test code |
   | sdd-tc | sdd-rev | Review & validate |
   | sdd-rev | Complete | Workflow finished |

## Examples

### Basic Usage
```
/sdd-next
```
Detects current state and advances workflow.

### Feature-Specific
```
/sdd-next auth
```
Advances workflow for the specified feature.

## Status Display Example
```
📊 SDD Workflow Status - Feature: auth

[✓] sdd-pm   Specifications complete
[✓] sdd-qa   Test docs complete
[→] sdd-arch Ready to invoke
[ ] sdd-dev  Waiting...
[ ] sdd-tc   Waiting...
[ ] sdd-rev  Waiting...

🚀 Invoking sdd-arch agent...
```

## Common Scenarios

### No Features Yet
```
No features detected. Please describe what you want to build.
```

### Multiple Features
```
Multiple features found:
1. auth - Ready for sdd-arch
2. payment - Ready for sdd-qa

Specify feature: /sdd-next auth
```

### All Complete
```
✨ Feature 'auth' complete!
All agents finished.
```

### Prerequisites Missing
```
⚠️ Cannot proceed - sdd-arch incomplete
Please finish current agent's work first.
```

## Implementation Overview

The command:
1. Analyzes project state to find last completed agent
2. Detects active feature (or prompts for selection)
3. Determines next agent in workflow
4. Validates prerequisites are met
5. Invokes the appropriate agent using Task tool

### Agent Progress Detection
Analyzes todo files in `sdd/todos/` to determine workflow progress:

**Todo Files and Corresponding Agents:**
- `todo-spec.md` → PM Agent (sdd-pm)
- `todo-qa.md` → QA Agent (sdd-qa)  
- `todo-design.md` → ARCH Agent (sdd-arch)
- `todo-build.md` → DEV Agent (sdd-dev)
- `todo-test.md` → TC Agent (sdd-tc)
- `todo-review.md` → REV Agent (sdd-rev)

**Progress Calculation:**
- Counts `[x]` (completed) vs `[ ]` (pending) checkboxes in each todo file
- 100% completion = Agent work finished, ready for next agent
- 1-99% completion = Agent work in progress
- 0% or missing file = Agent not started yet

**Current Agent Detection:**
1. Find the last todo file with 100% completion
2. The next todo in sequence is the current active agent
3. If no todos exist, start with PM Agent (sdd-pm)

### Agent Invocation
Uses Claude Code's Task tool with:
```
{
  subagent_type: "[appropriate-agent]",
  description: "Continue SDD workflow for [feature]",
  prompt: "Continue to [next-agent] for [feature]..."
}
```

### Agent Progression
```
Completed Agent → Next Agent
───────────────────────────
None → PM Agent/sdd-pm (specifications)
PM Agent/sdd-pm → QA Agent/sdd-qa (test docs)
QA Agent/sdd-qa → ARCH Agent/sdd-arch (architecture)
ARCH Agent/sdd-arch → DEV Agent/sdd-dev (implementation)
DEV Agent/sdd-dev → TC Agent/sdd-tc (test code)
TC Agent/sdd-tc → REV Agent/sdd-rev (validation)
REV Agent/sdd-rev → Workflow complete
```

### Key Behaviors
- Each agent creates a fresh todo file (overwrites previous)
- Agents automatically create feature folders as needed
- Context files are updated when new information is discovered
- **Todo completion is the primary indicator of agent progress**
- Progress is tracked exclusively through todo files, not deliverables

## Integration

- Use after `/sdd-init` to start workflow
- Check `/sdd-status` for detailed state before advancing
- Replaces manual agent invocation

## Workflow Example

1. `/sdd-init my-project`
2. "I need authentication"
3. `/sdd-next` → checks todos, finds none → invokes PM Agent (sdd-pm)
4. PM Agent completes (todo-spec.md 100%)
5. `/sdd-next` → detects todo-spec.md complete → invokes QA Agent (sdd-qa)
6. QA Agent completes (todo-qa.md 100%)
7. `/sdd-next` → detects todo-qa.md complete → invokes ARCH Agent (sdd-arch)
8. Continue through all agents based on todo completion

## Notes

- Cannot skip agents without completing prerequisites
- Defaults to most recently active feature
- Validates todo completion before invoking next agent
- Each agent must complete before the next can be invoked