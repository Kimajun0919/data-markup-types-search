# Google 구조화 데이터 레퍼런스

Google Search 공식 문서 기반 구조화 데이터 레퍼런스 사이트.

- 34가지 마크업 타입 (Article, FAQ, Recipe, Product, Event 등)
- 820개 속성 정의 (필수여부 · DB컬럼 · 데이터형식 · 예시값)
- 타입별 JSON-LD 코드 예시 (복사 버튼 포함)
- 카테고리/키워드 검색 · 속성 내 필터

## 빠른 시작

```bash
npm install
npm run dev
```

## 빌드 & 배포

```bash
npm run build   # dist/ 생성
npm run preview # 로컬 미리보기
```

### GitHub Pages 배포

`vite.config.js`의 `base`를 레포지토리 이름으로 변경:

```js
base: '/structured-data-ref/',
```

그 다음 `dist/` 폴더를 `gh-pages` 브랜치에 push.

### Netlify / Vercel 배포

- Build command: `npm run build`
- Publish directory: `dist`
- `base: '/'` 그대로 사용

## 데이터 업데이트

구조화 데이터를 수정하려면:

1. `google_structured_data_v2.xlsx` 수정
2. `extract_json.py` 실행 → `structured_data.json` 재생성
3. `public/data/structured_data.json` 교체

## 프로젝트 구조

```
src/
├── components/
│   ├── Header.jsx         # 상단 헤더
│   ├── Sidebar.jsx        # 카테고리 필터 + 검색창
│   ├── CardGrid.jsx       # 타입 카드 그리드
│   ├── Card.jsx           # 개별 타입 카드
│   ├── DetailPanel.jsx    # 우측 슬라이드 상세 패널
│   ├── PropTable.jsx      # 속성 목록 테이블 (필터 포함)
│   └── CodeBlock.jsx      # JSON-LD 코드 블록 (복사 기능)
├── hooks/
│   ├── useData.js         # JSON 데이터 fetch
│   ├── useFilter.js       # 카테고리·검색어 필터링 (useMemo)
│   └── useKeyboard.js     # ⌘K / ESC 단축키
├── constants/
│   └── categories.js      # 카테고리 색상·아이콘 설정
├── App.jsx
├── App.module.css
├── index.css              # CSS 변수 & 글로벌 스타일
└── main.jsx
public/
└── data/
    └── structured_data.json
```
