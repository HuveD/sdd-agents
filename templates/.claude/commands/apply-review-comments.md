---
allowed-tools: Read, Edit, MultiEdit, Write, Bash(grep:*), Bash(rg:*), Bash(find:*), Bash(git:*), Bash(go:*), TodoWrite, Grep, Glob, LS, Task, WebSearch
argument-hint: [review comments]
description: Apply code review comments using parallel agent processing for improved efficiency
model: claude-opus-4-1-20250805
---

ultrathink

## Parallel Review Implementation System

You are tasked with critically analyzing code review feedback and implementing improvements using parallel agent processing for maximum efficiency.

### Context
Project information:
- Current branch: !`git branch --show-current`
- Recent commits: !`git log --oneline -5`
- Modified files: !`git diff --name-only HEAD~1`

### Review Comments to Analyze
$ARGUMENTS

## Your Task

### Phase 1: Critical Analysis & Validation
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

### Phase 2: Suggestion Acceptance & Work Grouping
Based on your critical analysis:

1. **Accept Valid Suggestions**:
   - List all technically sound and beneficial suggestions
   - Provide brief justification for acceptance
   - Reject inappropriate suggestions with clear reasoning

2. **Create Independent Work Groups**:
   - Analyze dependencies between accepted changes
   - Group changes that can be executed independently:
     - **Group A**: Changes to independent modules/files
     - **Group B**: Non-overlapping functionality improvements
     - **Group C**: Isolated bug fixes or optimizations
   - Identify sequential dependencies where parallel execution isn't possible
   - Estimate complexity (Low/Medium/High) for each group
   - **CRITICAL**: Prepare to launch ALL independent groups in a SINGLE message with multiple Task calls

### Phase 3: Parallel Agent Assignment & Execution

**🚨 CRITICAL INSTRUCTION FOR TRUE PARALLEL EXECUTION 🚨**
> "Launch multiple agents concurrently whenever possible, to maximize performance; to do that, use a single message with multiple tool uses"
> -- From https://claudelog.com/mechanics/task-agent-tools/

1. **Agent Assignment**:
   - Assign a dedicated agent to each independent work group
   - Define clear scope and deliverables for each agent
   - Specify file access requirements and constraints

2. **TRUE Parallel Execution - MANDATORY APPROACH**:
   
   **THE GOLDEN RULE**: You MUST launch ALL independent agents in a SINGLE message with multiple Task tool calls for concurrent execution.
   
   **✅ CORRECT - True Parallel Execution Example**:
   ```
   "I'll launch all 3 agents concurrently to work on their independent groups:"
   
   <function_calls>
   <invoke name="Task">
     <parameter name="prompt">Agent A: Implement authentication improvements...

### Phase 4: Integration & Verification

1. **Change Integration**:
   - Review all changes made by parallel agents
   - Resolve any conflicts between agent implementations
   - Ensure consistency across all modifications

2. **Quality Assessment**:
   - Verify all accepted suggestions were properly implemented
   - Check for any regressions or new issues
   - Run comprehensive tests: `sh ./scripts/run_test.sh`
   - Verify the application builds and runs correctly

3. **Iterative Refinement Loop**:
   If changes are insufficient or contain issues:
   - Identify specific problems or missing implementations
   - Create new work groups for corrections
   - Launch parallel agents again with refined instructions
   - Repeat until all requirements are satisfied
   
   **Loop Conditions**:
   - Continue if critical suggestions weren't properly addressed
   - Continue if tests fail or regressions are detected
   - Exit when all accepted changes are correctly implemented

## Output Format

Provide your analysis and actions in the following structure:

1. **Critical Analysis Results**
   - Each review comment with assessment
   - Acceptance/Rejection status with reasoning
   - Priority classification (Critical/Important/Nice-to-have)

2. **Work Group Organization**
   - Independent groups identified
   - Changes assigned to each group
   - Dependencies and constraints noted
   - Parallel execution feasibility confirmed

3. **Parallel Agent Execution**
   - Single message containing ALL Task tool calls
   - Simultaneous launch confirmation for all agents
   - Real-time parallel status tracking (not sequential)
   - Completion confirmation from ALL agents before proceeding

4. **Integration Report**
   - Changes from each agent summarized
   - Conflicts resolved (if any)
   - Test results and verification status

5. **Iteration Status** (if applicable)
   - Issues identified requiring re-work
   - New agent assignments for corrections
   - Loop iteration count and progress

6. **Final Summary**
   - All changes successfully implemented
   - Total execution time comparison (parallel vs sequential estimate)
   - Any remaining recommendations

## Execution Guidelines

1. **Critical Thinking**: Not all review feedback is correct. Evaluate each suggestion critically before acceptance.

2. **Parallel Efficiency**: Maximize parallel execution by identifying truly independent work groups. The more agents working simultaneously, the faster the completion.

3. **Task Tool Usage - CRITICAL REQUIREMENT**:
   - **MUST**: Launch ALL independent agents in a SINGLE message with multiple Task tool calls
   - **MUST**: Use the capability to call multiple tools in a single response
   - **MUST NOT**: Launch agents one by one in separate messages
   - **MUST NOT**: Use phrases like "Now let me launch the next agent" between Task calls
   - Example of CORRECT parallel launch:
     ```
     "Launching all 3 agents simultaneously for parallel execution:"
     [Task 1] [Task 2] [Task 3] <- All in same message
     ```

4. **Quality Over Speed**: While parallel execution improves speed, maintain quality through proper verification and iteration when needed.

5. **Clear Communication**: Each agent needs precise, unambiguous instructions to work independently without conflicts.

6. **Parallel Execution Verification**:
   - Count the number of independent groups identified
   - Ensure that exact number of Task calls are made in a SINGLE message
   - Monitor all agents simultaneously, not sequentially
   - Only proceed to integration after ALL agents complete

Remember: The goal is to leverage TRUE parallel processing (multiple Task calls in one message) to dramatically reduce implementation time while maintaining or improving code quality through systematic verification and iteration.