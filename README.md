# SDD Agents

**AI Agent Workflow System for Spec-Driven Development (SDD)**

간단한 명령어로 AI 에이전트 기반 개발 워크플로우를 프로젝트에 즉시 적용할 수 있습니다.

## 🚀 빠른 시작

### NPX로 바로 사용하기 (권장)

```bash
# 현재 폴더에 SDD Agents 설정 적용
npx sdd-agents init

# 특정 버전 사용
npx sdd-agents@1.0.0 init

# 기존 설정 강제 덮어쓰기
npx sdd-agents init --force
```

### 글로벌 설치

```bash
# 글로벌 설치
npm install -g sdd-agents

# 사용
sdd-agents init
sdd-agents upgrade
ssd-agents version
```

## 📦 설치되는 내용

### ✅ 포함되는 파일
- **`CLAUDE.md`**: 메인 프로젝트 설정 파일
- **`.claude/agents/`**: 6개 SDD 에이전트 설정
  - `sdd-pm.md` - PM (Product Manager) 에이전트
  - `sdd-qa.md` - QA (Quality Assurance) 에이전트  
  - `sdd-arch.md` - ARCH (Architect) 에이전트
  - `sdd-dev.md` - DEV (Developer) 에이전트
  - `sdd-tc.md` - TC (Test Code) 에이전트
  - `sdd-rev.md` - REV (Reviewer) 에이전트
- **`.claude/commands/`**: 4개 명령어 설정
  - `sdd-init.md` - 프로젝트 초기화
  - `sdd-start.md` - 새 워크플로우 시작 (스마트 에이전트 선택)
  - `sdd-status.md` - 진행 상황 확인
  - `sdd-next.md` - 다음 단계 안내

### ❌ 제외되는 파일
- **`.claude/settings.local.json`**: 로컬 환경 설정 (사용자가 직접 구성)

## 🔧 명령어

### `init`
현재 디렉토리에 SDD Agents 설정을 초기화합니다.

```bash
npx sdd-agents init [options]

Options:
  -f, --force    기존 파일 강제 덮어쓰기
```

### `upgrade`  
기존 SDD Agents 설정을 최신 버전으로 업그레이드합니다.

```bash
npx sdd-agents upgrade
```

### `version`
현재 설치된 버전을 확인합니다.

```bash
npx sdd-agents version
```

## 🎯 사용 방법

### 1. 설치
```bash
npx sdd-agents init
```

### 2. 로컬 설정 (선택사항)
`.claude/settings.local.json` 파일을 생성하여 개인 환경에 맞게 구성:

```json
{
  "permissions": {
    "allow": [
      "Bash(mkdir:*)",
      "Bash(git:*)"
    ],
    "deny": []
  }
}
```

### 3. 워크플로우 시작
Claude Code에서 다음과 같이 시작:

```
"사용자 인증 시스템을 만들고 싶어요"
```

또는 직접 명령어 사용:
```
/sdd-init my-project
/sdd-start "사용자 인증 기능 구현"
/sdd-status
```

Claude Code가 자동으로 적절한 SDD 에이전트를 호출하여 워크플로우를 진행합니다:

1. **PM Agent** → 요구사항 정의
2. **QA Agent** → 테스트 케이스 작성  
3. **ARCH Agent** → 시스템 설계
4. **DEV Agent** → 코드 구현
5. **TC Agent** → 테스트 코드 작성
6. **REV Agent** → 최종 검토

**NEW!** `/sdd-start` 명령어는 작업 유형을 자동 분석하여 필요한 에이전트만 실행합니다:
- 기능 개발: 전체 워크플로우
- 문서 작업: PM → QA → REV
- 버그 수정: DEV → TC → REV
- 리팩토링: ARCH → DEV → TC → REV

## 🏗️ 워크플로우 구조

### 자동 생성되는 SDD 폴더 구조
```
your-project/
├── CLAUDE.md              # 메인 설정
├── .claude/               # Claude Code 설정
│   ├── agents/           # SDD 에이전트 설정
│   ├── commands/         # 명령어 설정
│   └── settings.local.json # 로컬 설정 (수동 생성)
└── sdd/                  # 워크플로우 실행 시 자동 생성
    ├── todos/           # 에이전트별 할일 목록
    ├── spec/            # PM 에이전트 산출물
    ├── qa/              # QA 에이전트 산출물
    ├── arch/            # ARCH 에이전트 산출물
    └── review/          # REV 에이전트 산출물
```

## 🌟 주요 특징

- **🎯 Zero Configuration**: 설치 후 바로 사용 가능
- **🔄 Version Control**: NPM을 통한 체계적인 버전 관리
- **🛡️ Local Privacy**: 민감한 로컬 설정은 배포에서 제외
- **🚀 Cross Platform**: macOS, Linux, Windows 지원
- **📱 Project Agnostic**: 웹, 모바일, API 등 모든 프로젝트 유형 지원
- **🤖 Smart Agent Selection**: 작업 유형에 따라 필요한 에이전트만 자동 실행

## 🔍 버전 확인

현재 설치된 버전과 최신 버전 확인:

```bash
# 현재 버전
npx sdd-agents version

# 최신 버전으로 업그레이드
npx sdd-agents upgrade
```

## 🆘 문제 해결

### 설치 실패 시
```bash
# NPM 캐시 정리 후 다시 시도
npm cache clean --force
npx sdd-agents@latest init
```

### 파일 충돌 시  
```bash
# 강제 덮어쓰기
npx sdd-agents init --force
```

### 권한 문제 시
```bash
# .claude/settings.local.json 수동 생성
mkdir -p .claude
echo '{"permissions":{"allow":[],"deny":[]}}' > .claude/settings.local.json
```

## 📚 더 자세한 정보

설치 완료 후 `CLAUDE.md` 파일에서 전체 워크플로우 가이드를 확인하세요.

### Claude Code 내부 명령어
설치 후 Claude Code에서 사용할 수 있는 명령어:
- `/sdd-init [project-name]` - 프로젝트 초기화
- `/sdd-start [task]` - 새 워크플로우 시작 (스마트 에이전트 선택)
- `/sdd-status` - 워크플로우 진행 상황 확인  
- `/sdd-next` - 다음 에이전트로 자동 진행

## 📄 라이선스

MIT License

## 🤝 기여하기

Issues와 Pull Requests를 환영합니다!