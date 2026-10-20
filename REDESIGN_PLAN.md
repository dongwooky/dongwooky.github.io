# dongwooky.github.io 전면 리뉴얼 계획

> 기준 자료: `My CV.pdf` (2026-09-26 버전)
> 목표: 처음 들어온 사람이 **10초 안에** "이 사람은 누구고, 무엇을 잘하고, 무엇을 증명했는가"를 알 수 있는 페이지

---

## 1. 현재 사이트 진단

| 항목 | 현재 상태 | 문제점 |
|---|---|---|
| 구조 | `index.html` 77KB + `styles.css` 76KB + `script.js` 26KB | 섹션 8개, 패치가 누적되어 데스크톱/모바일 별도 레이아웃(아코디언, 모바일 전용 타임라인 등)이 뒤엉킴 |
| 정보 | Projects, Leadership(학생회·방송국 등) 중심 | CV의 **핵심 성과(EMNLP Oral, ACL 2026, DMKD 저널, 등록 특허 2건)** 가 전면에 드러나지 않음 |
| 최신성 | LG/UofT "Jan 2025–Present", Sejong "Present" 등 | 현재 직장(Suresoft, 2025.12~)이 반영되지 않음, 기간 정보 오래됨 |
| 정체성 | "모던한 개인 홈페이지" 일반형 디자인 | 연구자/엔지니어로서의 **포지셔닝 문장**이 없음 |
| 링크 | Google Scholar 링크 `user=dongwook-kwon` | 유효한 Scholar ID 형식이 아님 → 실제 ID로 교체 필요 |
| 부가 기능 | PWA, Service Worker, mailto 폼, 로딩 스피너 | 개인 페이지에 과한 기능. 특히 SW 캐시는 업데이트 후에도 옛 페이지가 보이는 원인이 됨 |

**결론:** 기존 코드를 고치기보다 **새로 작성**하는 것이 빠르고 깔끔함. 기존 자산(프로필 사진, 로고, 수상 사진)만 재사용.

---

## 2. 핵심 메시지 (포지셔닝)

CV에서 뽑아낸 정체성 3축:

1. **LLM & Multi-Agent Systems** — CascadeDebate (ACL 2026), GEMMAS (EMNLP 2025 Oral), Suresoft의 에이전트 기반 AI 검증 시스템
2. **AI 기반 이상 탐지 for Critical Infrastructure** — 원자력/발전소(DMKD 2026), 이식형 의료기기(IBEC Silver, KOSOMBE 우수논문), 네트워크(특허)
3. **연구를 실제 제품·특허로 연결하는 엔지니어** — 등록 특허 2건 + 출원 2건, Hyundai Motor 프로젝트 납품, LG Electronics 협업

### 히어로 문구 (초안, 택1 또는 조합)

- **"Building reliable, secure autonomous AI — from multi-agent LLMs to critical infrastructure."**
- "AI Research Engineer working on LLM multi-agent systems and anomaly detection for systems that can't fail."
- 서브: *AI Engineer @ Suresoft Technologies · M.S. Kwangwoon Univ. · ex-Visiting Researcher @ UofT × LG AI Lab*

---

## 3. 정보 구조 (원페이지 + 앵커 내비)

순서는 "임팩트가 큰 것 → 맥락" 순으로 재배치.

```
┌─────────────────────────────────────────────┐
│ NAV: DK   About  Research  Experience  Awards  CV↓ │
├─────────────────────────────────────────────┤
│ ① HERO                                       │
│   이름 · 한 줄 포지셔닝 · 현 소속             │
│   [CV 다운로드] [Scholar] [GitHub] [LinkedIn] [Email] │
│   ─ Impact Strip ─────────────────────────── │
│   EMNLP'25 Oral │ ACL'26 │ 2 Registered Patents │ 4.33/4.5 GPA │
├─────────────────────────────────────────────┤
│ ② RESEARCH FOCUS (3 카드)                     │
│   LLM·Multi-Agent │ Anomaly Detection │ Secure CPS │
│   각 카드: 1~2줄 설명 + 대표 논문/특허 태그      │
├─────────────────────────────────────────────┤
│ ③ SELECTED PUBLICATIONS (하이라이트 3~4편)      │
│   [ORAL] GEMMAS — EMNLP 2025 Industry          │
│   [ACL]  CascadeDebate — ACL 2026 Industry     │
│   [JOURNAL] Graph-Enhanced BiGRU — DMKD 2026   │
│   [AWARD] Hybrid GAT+Transformer — IBEC 2024   │
│   → "All publications" 펼치기 (나머지 3편)       │
│   본인 이름 굵게, † 공동 1저자 표시, PDF/DOI 링크 │
├─────────────────────────────────────────────┤
│ ④ PATENTS (등록 2 / 출원 2, 상태 배지)         │
├─────────────────────────────────────────────┤
│ ⑤ EXPERIENCE (세로 타임라인, 4개)              │
│   2025.12– Suresoft Technologies — AI Engineer │
│   2025.01–07 UofT × LG Electronics Toronto AI Lab │
│   2021.08–2025.12 Kwangwoon BCML — RA         │
│   2022.07–08 Qualcomm Institute, UCSD         │
│   각 항목 bullet 2~3개 + 기관 로고             │
├─────────────────────────────────────────────┤
│ ⑥ EDUCATION (컴팩트 3행)                      │
├─────────────────────────────────────────────┤
│ ⑦ HONORS & AWARDS (Major / Academic 2그룹)    │
│   클릭 시 수상 사진 라이트박스(기존 이미지 재사용) │
├─────────────────────────────────────────────┤
│ ⑧ CONTACT / FOOTER                            │
│   이메일 + 소셜 아이콘, 간단한 한 줄 메시지     │
└─────────────────────────────────────────────┘
```

### 빠지는 것 (의도적으로)
- **Leadership 섹션** (학생회, 방송국, 아마추어 무선): CV에서도 제외됨 → 연구자 포지셔닝을 흐림. 필요하면 About 한 줄로만.
- **SLAM 사족보행 로봇 프로젝트**: CV 미포함. 유지 여부 확인 필요 (아래 Q&A).
- **Contact 폼**: mailto 링크 하나로 충분.
- **주소/전화번호**: CV에는 있지만 공개 웹에는 **넣지 않음** (개인정보).

---

## 4. 디자인 방향

### 컨셉: "Research Lab Dark" — 정돈된 다크 테마 + 하나의 강조색

- **배경**: 거의 검정에 가까운 네이비 (`#0b0f17`) / 라이트 모드도 지원 (`prefers-color-scheme`)
- **강조색 1개**: 일렉트릭 블루 또는 시안 (`#4f8cff` 계열) — 배지·링크·타임라인 점에만 사용
- **배지 색 체계** (의미 기반, 최소한으로):
  - `ORAL` / `ACL` — 강조색 채움
  - `JOURNAL` — 외곽선
  - `PATENT · REGISTERED` — 그린, `PENDING` — 회색
- **타이포**: 헤드라인 `Inter Tight` 또는 `Space Grotesk` (굵고 큰 이름), 본문 `Inter`, 수치·날짜 `JetBrains Mono`
- **임팩트 요소**:
  - 히어로 이름을 화면 폭의 큰 타이포로 (clamp 기반 반응형)
  - 배경에 은은한 **그래프/노드 네트워크** 캔버스 애니메이션 (Multi-Agent·GNN 연구를 시각적으로 암시) — `prefers-reduced-motion` 시 정지
  - Impact Strip 숫자 카운트업 애니메이션 (1회)
  - 스크롤 시 섹션 페이드인 (IntersectionObserver, 과하지 않게)
- **피할 것**: 섹션마다 다른 테마색(이전 커밋의 보라/초록/오렌지), 로딩 스피너, 과도한 hover 효과

### 반응형 원칙
- **모바일·데스크톱 동일한 DOM**, CSS만으로 레이아웃 변경 (이전처럼 모바일 전용 아코디언/타임라인을 따로 만들지 않음)
- 모바일 기준 16px 좌우 여백, 가로 스크롤 없음, 탭 영역 44px 이상

---

## 5. 기술 스택 & 파일 구조

빌드 도구 없이 **순수 HTML/CSS/JS** (GitHub Pages에 그대로 배포, 유지보수 쉬움).
콘텐츠는 **JSON 한 파일**로 분리 → 논문·수상 추가 시 HTML 수정 없이 데이터만 갱신.

```
dongwooky.github.io/
├── index.html            # 시맨틱 마크업 골격
├── assets/
│   ├── css/main.css      # 디자인 토큰(:root 변수) + 레이아웃
│   ├── js/main.js        # 데이터 렌더링, 내비, 애니메이션
│   ├── js/network-bg.js  # 히어로 배경 노드 애니메이션 (독립 모듈)
│   ├── data/cv.json      # ★ 모든 콘텐츠 (논문, 특허, 경력, 학력, 수상)
│   └── img/              # profile, logos/, awards/ 이동
├── Dongwook_Kwon_CV.pdf  # 최신 CV (My CV.pdf → 이름 변경)
├── 404.html              # 새 디자인에 맞춰 단순화
├── robots.txt, sitemap.xml
└── .github/workflows/deploy.yml  # 유지
```

> SEO 보완: JS 렌더링이지만 핵심 텍스트(이름, 포지셔닝, 대표 논문 제목)는 HTML에 직접 넣고,
> `<noscript>` 대체 + JSON-LD `Person` 구조화 데이터 + Open Graph 이미지 추가.

### 제거 대상
- `sw.js`, `manifest.json`, `browserconfig.xml` (PWA) — 기존 방문자 캐시 문제를 막기 위해 **SW 해제 코드**를 새 `main.js`에 1회 포함
- 기존 `styles.css`, `script.js`, `index.html` 전체
- `Dongwook_Kwon_Resume.pdf` (구버전) → 새 CV로 교체
- 사용하지 않는 로고/수상 이미지 (`sk-telecom.png`, `국민대.svg`, `세종대.svg`, `kiif-bronze-2022.jpg` 등 — CV에 없는 항목 정리 여부 확인 후)

---

## 6. 작업 단계

| 단계 | 내용 | 산출물 |
|---|---|---|
| **0. 확정** | 아래 Q&A 답변 받아 포지셔닝/포함 범위 확정 | 이 문서 업데이트 |
| **1. 데이터** | CV → `cv.json` 변환, 링크(DOI/arXiv/Scholar) 수집 | `assets/data/cv.json` |
| **2. 골격** | 시맨틱 HTML + 디자인 토큰 + 타이포 | 정적 레이아웃 |
| **3. 섹션 구현** | Hero → Impact Strip → Research → Pubs → Patents → Experience → Education → Awards → Footer | 완성 페이지 |
| **4. 인터랙션** | 노드 배경, 카운트업, 스크롤 리빌, 수상 라이트박스, 다크/라이트 토글 | |
| **5. 품질 점검** | 모바일(375px)/태블릿/데스크톱 확인, Lighthouse 성능·접근성 90+ 목표, 링크 검증 | |
| **6. 정리 & 배포** | 구 파일 삭제, README 갱신, 브랜치에서 작업 후 main 병합 | 배포 |

작업은 `redesign` 브랜치에서 진행하고, 로컬 미리보기(`python3 -m http.server`)로 확인 후 병합합니다.

---

## 7. 확정된 결정 (2026-10-19)

| 질문 | 결정 |
|---|---|
| 주 독자 | 1순위 미국 연구직 채용 담당자, 2순위 미국 박사과정 입시, 3순위 한국 채용 담당자 → **영문 기본 + 한글 토글** (`?lang=ko`, 브라우저 언어가 한국어면 자동 한글) |
| Google Scholar | `https://scholar.google.com/citations?user=4dZoa_8AAAAJ` |
| 공개 이메일 | `tomiyadragon@gmail.com` |
| CV에 없는 항목 (SLAM 로봇, Leadership, 교내상 등) | **제외** |
| 디자인 톤 | **다크 기본**, 시스템 설정이 라이트면 라이트, 우상단 토글로 변경 가능 |
| 프로필 사진 | 기존 `profile.jpg` 재사용 (웹용 리사이즈) |
| 논문 링크 | GEMMAS → ACL Anthology `2025.emnlp-industry.106` + arXiv `2507.13190` / CascadeDebate → `2026.acl-industry.93` / DMKD → DOI `10.1007/s10618-026-01262-3` / Electronics → DOI `10.3390/electronics14050890` |

---

## 8. (참고) 처음 계획 시 던졌던 질문

1. **주 독자**는 누구인가요? (예: 미국 연구직/채용 담당자, 박사과정 지원, 국내 기업, 혹은 미국 이민(NIW 등) 심사 근거 자료)
   → CV 요약의 "advance the United States' technological edge" 문구로 보아 미국 쪽 독자를 가정하고 **영어 단일 언어**로 계획했습니다. 한/영 토글이 필요하면 말씀해 주세요.
2. **실제 Google Scholar 프로필 URL**이 있나요? (현재 링크는 유효하지 않은 형식)
3. 논문별 **PDF/DOI/arXiv/코드 링크**를 넣을 수 있나요? (ACL Anthology, EMNLP, Springer DOI 등 — 공개된 것은 제가 찾아서 넣을 수 있습니다)
4. 공개 **이메일**은 회사 메일(`dwkwon@suresofttech.com`)과 개인 메일 중 어느 것으로 할까요?
5. CV에 없는 기존 항목 — **SLAM 사족보행 로봇 프로젝트, Leadership 활동, 기타 수상(KIIF 동상, 교내상, 장학금)** — 을 완전히 뺄까요, 하단 "More"로 접어서 둘까요?
6. 디자인 톤: **다크 기본(테크/연구 느낌)** vs **라이트 기본(학술적·깔끔)** 중 선호가 있나요?
7. 프로필 사진은 현재 `profile.jpg`를 그대로 쓸까요?

---

## 9. 할 일 (TODO)

- [ ] **IEIE 2025 우수 학생 논문상 상장 사진** 받으면 `assets/img/awards/`에 넣고 `cv.json`의 `awards` 항목 `image` 연결
- [ ] **특허 한글 명칭** 받으면 `cv.json`의 `patents[*].title.ko` 교체 (현재는 영문 명칭 의역)
- [x] 슈어소프트테크 로고 → `assets/img/logos/suresoft.png` (2026-10-20)
