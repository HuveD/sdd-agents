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

### Phase 1: Critical Analysis & Evidence-Based Validation
1. **Context Understanding**:
   - Analyze the current project state and understand the reviewed code's purpose
   - Identify the specific files and functionality being reviewed
   - Understand the architectural context and design patterns in use

2. **Evidence Gathering from Codebase**:
   Conduct systematic investigation of the actual codebase for each review comment:
   
   **Investigation Methodology**:
   
   - **Pattern Verification**: When reviewer claims about patterns/conventions
     ```
     Step 1: Search for the claimed pattern across codebase
     - Use Grep with pattern="<specific_pattern>", output_mode="files_with_matches"
     - Use Grep with -C 3 to see context around matches
     - Count occurrences: Grep with output_mode="count"
     
     Step 2: Analyze pattern usage in context
     - Read 3-5 files containing the pattern
     - Identify variations and common usage patterns
     - Check if pattern appears in core modules vs peripheral code
     
     Example: If reviewer claims "this async pattern is not used elsewhere"
     - Grep for "async.*await" and "Promise" patterns
     - Read implementation files to verify actual async handling approach
     ```
   
   - **Convention Validation**: When pointing out style/convention deviations
     ```
     Step 1: Identify similar code structures
     - Glob for files of same type: pattern="**/*.{ext}"
     - Grep for similar function/class signatures
     - Search for naming patterns (e.g., "^handle", "^process", "^validate")
     
     Step 2: Extract convention evidence
     - Read 5-10 similar files to establish patterns
     - Document common conventions found:
       * Naming schemes
       * Parameter ordering
       * Return types
       * Error handling patterns
     
     Step 3: Statistical analysis
     - Count adherence vs deviation from conventions
     - Determine if suggested convention is majority practice
     ```
   
   - **Performance Pattern Investigation**: When performance issues are raised
     ```
     Step 1: Find similar performance-critical code
     - Grep for similar operations (loops, data processing, I/O)
     - Search for optimization comments: pattern="TODO.*optim|PERF|benchmark"
     - Look for existing benchmarks: Glob "**/*bench*.{ext}", "**/*perf*.{ext}"
     
     Step 2: Analyze optimization strategies
     - Read identified performance-critical sections
     - Check for memoization, caching, lazy loading patterns
     - Examine algorithm choices for similar problems
     
     Step 3: Verify performance claims
     - Look for profiling results or benchmarks
     - Check if similar "inefficiencies" exist elsewhere
     - Determine if optimization is premature or necessary
     ```
   
   - **Dependency and Usage Analysis**: When function/module changes are suggested
     ```
     Step 1: Map dependency graph
     - Grep for function/class/module name with word boundaries
     - Search imports: pattern="import.*<module>|require.*<module>"
     - Find all call sites: pattern="<function>\s*\("
     
     Step 2: Analyze usage patterns
     - Read each file using the component
     - Document different usage contexts
     - Identify if changes would break existing usage
     
     Step 3: Test coverage verification
     - Search test files: Glob "**/*test*.{ext}", "**/*spec*.{ext}"
     - Grep for test cases covering the component
     - Verify if suggested changes are tested elsewhere
     ```
   
   - **Security Pattern Audit**: When security concerns are raised
     ```
     Step 1: Search for security-sensitive patterns
     - Grep for similar security contexts (auth, crypto, validation)
     - Search for security comments: pattern="SECURITY|CVE|vulnerability"
     - Look for sanitization/validation patterns
     
     Step 2: Compare security implementations
     - Read security-critical code sections
     - Document how similar risks are mitigated
     - Check for security best practices adherence
     ```
   
   **Evidence Collection Checklist**:
   - [ ] Does each file/function mentioned by reviewer actually exist?
   - [ ] Is the claimed pattern used/not used in the codebase? (with exact counts)
   - [ ] Are proposed alternatives already implemented elsewhere? (with file references)
   - [ ] How are similar problems solved in the codebase? (with specific examples)
   - [ ] Do related tests/documentation exist? (with file paths)
   - [ ] What is the statistical distribution of the pattern usage?
   - [ ] Are there counter-examples that contradict the reviewer's claims?

3. **Evidence-Based Review Validation**:
   Evaluate each review comment based on collected evidence:
   
   **Evaluation Criteria**:
   
   - **Evidence Support Strength**:
     - ✅ **Strong**: Codebase investigation clearly supports reviewer's claims
       * Pattern found in >80% of similar contexts
       * Multiple concrete examples confirm the issue
       * Tests or documentation explicitly support the claim
     - ⚠️ **Medium**: Partial support or context-dependent validity
       * Pattern found in 40-80% of cases
       * Some examples support, others contradict
       * Conventions vary by module/team
     - ❌ **Weak**: Evidence contradicts claims or insufficient basis
       * Pattern found in <40% of similar contexts
       * Counter-examples outnumber supporting cases
       * No clear precedent in codebase
   
   - **Technical Validity (Evidence-Based)**:
     - **Accuracy verification**: 
       * Compare with actual code examples found
       * Verify technical claims against implementation
       * Check if suggested fixes actually work in context
     - **Consistency analysis**:
       * Percentage of codebase following the pattern
       * Number of files/modules using alternative approaches
       * Historical commits showing pattern evolution
     - **Performance validation**:
       * Existing benchmarks supporting/refuting claims
       * Similar optimizations elsewhere and their impact
       * Profiling data if available
     - **Security assessment**:
       * How similar security risks are handled
       * Existing security patterns and their effectiveness
       * Compliance with security guidelines
   
   - **Priority Reclassification (Evidence-Based)**:
     - **Critical** - Evidence confirms: bugs, security vulnerabilities, breaking changes
       * Grep/Read found active bugs in similar code
       * Security pattern violations with exploitable paths
       * Breaking changes affecting multiple consumers
     - **Important** - Codebase analysis confirms improvement needs
       * Performance bottlenecks verified in similar code
       * Maintenance issues documented in comments/TODOs
       * Technical debt explicitly acknowledged
     - **Nice-to-have** - Consistency improvements without critical impact
       * Style preferences with <60% codebase adoption
       * Optimizations without measured performance gain
       * Refactoring without clear maintenance benefit
     - **Rejected** - Evidence shows suggestion is inappropriate
       * Contradicts established patterns (>70% different approach)
       * Would break existing functionality (verified by usage analysis)
       * Introduces problems solved elsewhere

4. **Evidence-Based Counterargument**:
   Formulate counterarguments based on codebase investigation:
   
   - **Cite Specific Examples**:
     * "Found 15 instances in core modules using pattern X (files: [list])"
     * "Similar optimization attempted in file Y, reverted in commit Z due to [reason]"
     * "Pattern A is used in 73% of similar contexts, not pattern B as suggested"
   
   - **Present Validated Alternatives**:
     * "Existing implementation in [file:line] handles this more efficiently"
     * "Established pattern in [module] provides better solution"
     * "Test suite [path] validates current approach is correct"
   
   - **Document Codebase-Specific Constraints**:
     * "Due to [specific dependency], this pattern is required"
     * "Historical context in commit [hash] explains why this approach was chosen"
     * "Performance benchmarks in [file] show current approach is optimal"

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

1. **Evidence-Informed Agent Assignment**:
   - Assign a dedicated agent to each independent work group
   - Provide each agent with:
     - Specific scope of work and deliverables
     - Relevant evidence and examples found during codebase investigation
     - Concrete guidelines on existing patterns and conventions
     - Reference file paths for similar implementations
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

1. **Evidence Gathering Results**
   - Detailed codebase investigation for each review comment
   - List of discovered patterns, files, and functions with statistics
   - Evidence support strength assessment (Strong/Medium/Weak) with percentages
   - Specific examples found in codebase with file:line references

2. **Evidence-Based Critical Analysis**
   - 각 리뷰 코멘트의 증거 기반 평가
   - Accept/Reject status with evidence-based justification
   - Priority reclassification (Critical/Important/Nice-to-have/Rejected)

3. **Work Group Organization**
   - Independent groups identified
   - Changes assigned to each group
   - Dependencies and constraints noted
   - Parallel execution feasibility confirmed

4. **Parallel Agent Execution**
   - Single message containing ALL Task tool calls
   - Simultaneous launch confirmation for all agents
   - Real-time parallel status tracking (not sequential)
   - Completion confirmation from ALL agents before proceeding

5. **Integration Report**
   - Changes from each agent summarized
   - Conflicts resolved (if any)
   - Test results and verification status

6. **Iteration Status** (if applicable)
   - Issues identified requiring re-work
   - New agent assignments for corrections
   - Loop iteration count and progress

7. **Final Summary**
   - All changes successfully implemented
   - Total execution time comparison (parallel vs sequential estimate)
   - Any remaining recommendations

## Execution Guidelines

1. **Evidence-Based Validation**: Verify all review feedback through systematic codebase investigation. Never make accept/reject decisions without concrete code evidence.

2. **Critical Thinking with Evidence**: Reviewer suggestions are not always correct. Critically evaluate each suggestion based on codebase evidence, usage patterns, and statistical analysis.

3. **Parallel Efficiency**: Maximize parallel execution by identifying truly independent work groups. The more agents working simultaneously, the faster the completion.

4. **Task Tool Usage - CRITICAL REQUIREMENT**:
   - **MUST**: Launch ALL independent agents in a SINGLE message with multiple Task tool calls
   - **MUST**: Use the capability to call multiple tools in a single response
   - **MUST NOT**: Launch agents one by one in separate messages
   - **MUST NOT**: Use phrases like "Now let me launch the next agent" between Task calls
   - Example of CORRECT parallel launch:
     ```
     "Launching all 3 agents simultaneously for parallel execution:"
     [Task 1] [Task 2] [Task 3] <- All in same message
     ```

5. **Quality Over Speed**: While parallel execution improves speed, maintain quality through proper verification and iteration when needed.

6. **Clear Communication**: Each agent needs precise, unambiguous instructions to work independently without conflicts.

7. **Parallel Execution Verification**:
   - Count the number of independent groups identified
   - Ensure that exact number of Task calls are made in a SINGLE message
   - Monitor all agents simultaneously, not sequentially
   - Only proceed to integration after ALL agents complete

Remember: The goal is to leverage TRUE parallel processing (multiple Task calls in one message) to dramatically reduce implementation time while maintaining or improving code quality through systematic verification and iteration.