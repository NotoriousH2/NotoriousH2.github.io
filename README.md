# notorioush2.github.io

변형호(Hyungho Byun)의 블로그. [Astro](https://astro.build) 정적 사이트이며 GitHub Actions로 GitHub Pages에 배포한다.

## 실행

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ 생성
npm run preview  # 빌드 결과 확인
```

## 글 쓰기

`src/content/posts/<슬러그>.md` 를 만든다. 파일 이름이 곧 URL(`/posts/<슬러그>`)이다.

```markdown
---
title: 글 제목
summary: 아카이브 목록에 나오는 한 줄 요약 (10~110자)
pubDate: 2026-08-23
tags:
  - llm
  - rag
---

본문…
```

프론트매터는 `src/content.config.ts`의 스키마로 검증된다. 필드가 빠지거나
`src/data/taxonomy.ts`에 등록되지 않은 태그를 쓰면 **빌드가 실패한다**. 조용히 통과하지 않는다.

`draft: true` 를 넣으면 `npm run dev`에서만 보이고 배포본에서는 빠진다.

### 본문 헤딩은 `##`부터

글의 `<h1>`은 레이아웃이 제목으로 이미 쓰고 있다. 본문에서 `#`을 쓰면 한 문서에 `<h1>`이
둘 이상 생겨 문서 구조가 무너진다. 본문 절은 `##`, 하위 절은 `###`으로 시작한다.

규약을 어겨도 빌드가 막지는 않지만, `.prose h1`에 축소 스타일을 걸어 두어 페이지 제목
크기로 튀지는 않는다.

## 타이포그래피

색과 장식을 걷어낸 화면이라, 위계를 만드는 수단이 사실상 활자 크기 하나뿐이다.
그래서 본문(17px) 대비 페이지 제목을 2.6배까지 올렸다(`global.css`의 `h1`).
이 비율을 줄이면 헤어라인만 남아 화면이 평평해진다.

페이지는 **작은 모노 라벨(eyebrow) + 큰 `<h1>`** 로 연다(`.page-head`). 라벨은 헤딩
요소가 아니라 보조 표시다. 페이지마다 `<h1>`은 정확히 하나여야 한다.

## 정보 구조

`src/data/taxonomy.ts` 한 파일이 사이트 전체의 축이다.

- **범주**는 다섯 개를 넘기지 않는다. 각 범주는 OKLCH hue 하나만 가지며, 명도와 채도는
  `global.css`의 `--cat-l` / `--cat-c`로 고정돼 있어 특정 범주만 눈에 튀지 않는다.
- **한 태그는 정확히 한 범주에만 속한다.** 주제가 겹치면 다중 소속을 허용하는 대신 태그를 쪼갠다.
- 아카이브 필터, 태그 페이지, 주제 지도, 소개의 강의 목록이 전부 이 축을 공유한다.

새 주제를 쓰려면 글보다 taxonomy에 먼저 자리를 만든다.

## 주제 지도 (`/graph`)

태그 공출현 그래프. **레이아웃은 빌드 시점에 d3-force로 수렴시켜 정적 SVG로 굽는다.**

- 브라우저에서 물리 시뮬레이션이 돌지 않는다. 계속 떠다니는 그래프는 정보가 아니라 소음이다.
- JS가 꺼져 있어도 그래프가 그대로 보인다. 클라이언트 JS는 인접 관계 강조에만 쓴다.
- 시드 고정 난수를 쓰므로 같은 입력이면 같은 배치가 나온다. 빌드마다 diff가 흔들리지 않는다.
- 그래프를 볼 수 없는 환경에서는 바로 아래 '범주별 태그' 목록이 대체 화면이 된다.

## 미디어 (`/media`)

유튜브 출연과 세미나 발표 자료를 모은 페이지. `src/data/talks.ts`의 `TALKS` 배열이
전부다. 순서는 `TALKS_BY_DATE`가 날짜로 정렬하므로 배열 중간에 끼워 넣어도 된다.

운영하는 채널이 아니라 **나간 자리의 기록**이다. 채널 주소는 두지 않고, 각 항목에서
실제로 볼 수 있는 것만 연결한다. `venue`는 링크가 아닌 평문 출처다.

```ts
{
  title: 'Mixture of Experts',
  venue: '유튜브 SudoRemove',
  date: '2025',
  category: 'models',
  tags: ['moe', 'llm'],
  video: 'https://www.youtube.com/watch?v=…',   // 없으면 생략
  material: { label: '발표자료', href: 'https://…' },
  note: { asOf: '2026.08', text: '그때는 …라고 말했는데, 지금은 …' },
}
```

`video`와 `material`은 각각 없을 수 있다.

- **제목 링크는 `video`가 있을 때만** 걸린다. 자료뿐인 항목은 제목이 평문이고 썸네일
  자리의 라벨 상자가 목적지다.
- 썸네일은 `video` 주소에서 만든다(`img.youtube.com`). 별도 데이터가 필요 없다.
  영상이 없는 항목은 같은 크기의 라벨 상자로 채운다. 목록에 구멍을 내지 않기 위해서다.

### 태그 (`tags`)

미디어 화면에는 **표시하지 않는다.** 태그별 목록(`/tags/…`)과 주제 지도에서 글과 함께
묶이기 위한 것이다. 그래서 주제 지도의 노드 크기는 '글 수'가 아니라 글과 미디어를 합친
'항목 수'다.

`taxonomy.ts`에 등록된 태그만 쓸 수 있고, 오타는 타입 검사(`npx astro check`)에서 걸린다.
글의 태그는 zod 스키마가, 미디어의 태그는 TypeScript가 막는다.

### 지금 다시 보면 (`note`)

발표는 시점이 박혀 있고 모델 이야기는 특히 빨리 낡는다. 항목마다 지금 시점의 코멘트를
붙일 수 있다.

`asOf`를 함께 적는 이유는 이 코멘트도 결국 낡기 때문이다. 언제 쓴 판단인지 남겨 두지
않으면 원본과 똑같은 문제가 반복된다.

`note`가 없으면 그 줄 자체가 렌더링되지 않고, 코멘트가 하나도 없으면 페이지 머리에서
코멘트를 예고하는 문장도 나오지 않는다.

## 강의 소개

`src/data/lectures.ts`의 `LECTURES` 배열에 항목을 넣으면 소개 페이지에 절이 생긴다.
비어 있으면 그 절 자체가 렌더링되지 않는다. 채울 것이 없는 빈칸을 만들지 않는다.

## 서체

- 제목·데이터: **IBM Plex Sans / IBM Plex Mono** — Astro Fonts API로 빌드 시 내려받아 자체 호스팅.
- 본문: **Pretendard** — 한글 동적 서브셋이라 CDN(jsDelivr)에서 불러온다. 페이지에 실제로
  쓰인 글자 조각만 전송되므로 전체를 자체 호스팅하는 것보다 가볍다.
- IBM Plex에는 한글 글리프가 없으므로, 제목의 한글은 자연히 Pretendard로 떨어진다. 의도된 동작이다.

## 옛 주소

Jekyll 시절 permalink(`/:year/:month/:title.html`)는 `public/` 아래에 실제 `.html`
리다이렉트 파일로 남겨 두었다. Astro의 `redirects` 옵션은 `<경로>/index.html`을 만들기 때문에
확장자로 끝나는 주소에는 맞지 않는다.

`/about.html`, `/archive.html`은 리다이렉트를 두지 않았다. GitHub Pages가 `/about` 요청을
`about.html`로 먼저 해석하기 때문에, 같은 이름의 리다이렉트 파일을 두면 무한 루프가 생긴다.

## 배포

`main`에 푸시하면 `.github/workflows/deploy.yml`이 빌드해서 Pages에 올린다.

> 저장소 **Settings → Pages → Build and deployment → Source** 를 **GitHub Actions** 로
> 바꿔 두어야 한다. (브랜치 기반 배포로 남아 있으면 이 워크플로의 결과가 반영되지 않는다.)
