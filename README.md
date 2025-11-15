# SDD Agents

**AI Agent Workflow System for Spec-Driven Development (SDD)**

## 설치

### 글로벌 설치
```bash
npm install -g sdd-agents
```

### 프로젝트별 설치
```bash
npm install --save-dev sdd-agents
```

## 초기 설정

### 기본 초기화

프로젝트에 SDD 템플릿과 Claude 커맨드를 설정합니다:

```bash
npx sdd-agents init
```

### 초기화 옵션

```bash
npx sdd-agents init --force
```

**옵션:**
- `--force`: 기존 파일을 강제로 덮어쓰기
  - CLAUDE.md 파일이 존재해도 덮어쓰기
  - .claude/agents/ 파일들 덮어쓰기
  - .claude/commands/ 파일들 덮어쓰기

### 업그레이드

최신 템플릿과 커맨드로 업데이트:

```bash
npx sdd-agents upgrade
```

**동작:**
- 모든 템플릿 파일을 최신 버전으로 강제 업데이트
- 기존 설정은 보존하면서 새로운 기능 추가
- `--force` 옵션이 자동으로 적용됨

### 생성되는 파일 구조

초기화 시 다음 파일들이 생성됩니다:

- `.claude/` - Claude 커맨드 및 에이전트 디렉토리
  - `commands/` - 커스텀 커맨드
    - `init-sdd.md` - SDD 프로젝트 초기화 커맨드
    - `apply-review-comments.md` - 리뷰 코멘트 적용 커맨드
    - `validate-specs.md` - 스펙 검증 커맨드
  - `agents/` - AI 에이전트
    - `command-generator.md` - 커맨드 생성 에이전트
- `.agent/` - 에이전트 전용 리소스 디렉토리
  - `templates/` - 에이전트용 템플릿
    - `spec-writing-guide.md` - 스펙 작성 가이드
- `docs/` - 프로젝트 문서 디렉토리
  - `specs/` - 프로젝트 스펙 문서

**참고:** CLAUDE.md 파일은 `/init-sdd` 커맨드로 생성됩니다.

### 초기화 동작 상세

1. **디렉토리 생성**: .claude 및 docs 구조 자동 생성
2. **파일 확인**: 기존 파일 존재 여부 체크
3. **선택적 복사**: --force 미사용 시 기존 파일 보존
4. **로그 출력**: 각 단계별 진행 상황 표시
   - 📁 .claude 디렉토리 구조 생성
   - 🤖 에이전트 파일 복사
   - ⚙️ 커맨드 파일 복사
   - 📁 docs 디렉토리 구조 생성
   - 📄 템플릿 파일 복사
   - ✅ 초기화 완료

## Claude 커맨드 사용법

### /init-sdd

SDD 프로젝트를 초기화하고 프로젝트 컨텍스트를 자동 분석하여 CLAUDE.md를 생성합니다.

**사용법:**
```
/init-sdd [--overwrite]
```

**옵션:**
- `--overwrite`: 기존 CLAUDE.md 파일을 강제로 덮어쓰기

**기능:**
- 프로젝트 구조 자동 분석 (디렉토리, 파일, 기술 스택)
- 의존성 및 프레임워크 감지
- 코딩 컨벤션 및 테스트 설정 파악
- SDD 원칙과 프로젝트 컨텍스트를 결합한 CLAUDE.md 생성
- 기존 파일이 있을 경우 확인 요청 (--overwrite 미사용시)

### /apply-review-comments

코드 리뷰 코멘트를 비판적으로 분석하고 선택적으로 적용합니다.

**사용법:**
```
/apply-review-comments [리뷰 코멘트 내용]
```

**예시:**
```
/apply-review-comments "1. 함수명을 더 명확하게 변경해주세요
2. 에러 처리를 추가해주세요
3. 테스트 케이스를 보완해주세요"
```

**기능:**
- 리뷰 코멘트 심층 분석 및 우선순위 분류
  - Critical: 반드시 수정 (버그, 보안 이슈)
  - Important: 수정 권장 (성능, 유지보수성)
  - Nice-to-have: 선택적 개선사항
  - Questionable: 부적절할 수 있는 제안
- 각 제안에 대한 기술적 타당성 검증
- 프로젝트 컨텍스트와 일치성 확인
- TodoWrite로 구현 계획 추적
- 변경사항 구현 후 자동 검증

## 프로젝트 구조

```
your-project/
├── docs/
│   └── specs/           # 프로젝트 스펙 문서
├── .claude/
│   ├── commands/        # Claude 커스텀 커맨드
│   └── agents/          # AI 에이전트 정의
├── .agent/
│   └── templates/       # 에이전트용 템플릿
└── CLAUDE.md           # 프로젝트별 AI 가이드라인 (/init-sdd로 생성)
```

## SDD 워크플로우

1. **스펙 작성**: `.agent/templates/spec-writing-guide.md`를 참고하여 기능 스펙 작성
2. **스펙 검증**: `/validate-specs` 커맨드로 스펙 품질 검증
3. **구현**: 승인된 스펙을 기반으로 개발
4. **리뷰 반영**: `/apply-review-comments` 커맨드로 PR 피드백 자동 적용

## 특징

- ✅ Spec-Driven Development 지원
- ✅ Claude AI와의 원활한 통합
- ✅ 프로젝트별 커스터마이징 가능
- ✅ GitHub PR 워크플로우 자동화
- ✅ 표준화된 문서 템플릿 제공

## 라이선스

MIT

## 기여

이슈 및 PR은 언제든 환영합니다!