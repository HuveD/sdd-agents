# Agent Spec Process

## Purpose
Ensure every agent specification is authored and reviewed in strict alignment with the shared templates. Spec must exist as Project's Final Preserved Knowledge (프로젝트의 최종 보존 지식) and Feature Manual (기능 매뉴얼) in complete, finalized form only.

## Author Checklist

### Pre-Writing Requirements
- [ ] Thoroughly review `docs/templates/spec-writing-guide.md`
- [ ] Understand the distinction between Spec vs API documentation vs Design documents

### Writing Mandates
- [ ] Complete all 8 required sections: Purpose/Scope (목적/범위), Terminology (용어), Goals/Non-Goals (목표/비목표), High-Level Flow (상위 플로우), Detailed Scenarios (상세 시나리오), State Definition/Transitions (상태 정의/전이), Policies (정책), Acceptance Criteria (승인 기준)
- [ ] Absolutely prohibit incomplete expressions: TODO, TBD, or similar markers
- [ ] Exclude version history, version numbers, dates, or change logs
- [ ] Exclude API schemas, endpoints, request/response structures
- [ ] Exclude file paths, class names, function names, or implementation details
- [ ] Use Mermaid exclusively for all diagrams
- [ ] Focus on business logic, inter-feature relationships, and exception handling

## Reviewer Checklist

### Document Quality Verification (Priority)
- [ ] Are all 8 sections complete and finalized?
- [ ] Are there no incomplete expressions (TODO, TBD, etc.)?
- [ ] Is version history/dates excluded?
- [ ] Are API schemas/endpoint details excluded?
- [ ] Are file paths/class names and implementation details excluded?
- [ ] Is this a final specification (not a partial update or draft)?

### Content Verification
- [ ] Does it pass all requirements in `docs/templates/spec-review-guide.md`?
- [ ] Are Acceptance Criteria (AC) measurable and testable?
- [ ] Are business logic and policies clearly documented?

### Approval Criteria
- Block approval until all items above pass
- Document deviations in review comments and request corrections

## Submission Flow
1. Draft the specification following the writing guide (as a final specification)
2. Perform self-review using the Author Checklist and document completion in PR description
3. Request review; reviewers evaluate exclusively via Reviewer Checklist and approve only when all items pass
