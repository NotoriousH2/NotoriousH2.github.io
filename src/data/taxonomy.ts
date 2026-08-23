/**
 * 사이트 전체의 정보 구조.
 *
 * 규칙
 *  1. 범주는 다섯 개를 넘기지 않는다.
 *  2. 한 태그는 정확히 한 범주에만 속한다. 겹치는 주제는 다중 소속 대신 태그를 쪼개서 푼다.
 *  3. 내비게이션·아카이브 필터·지식 그래프·강의 소개가 전부 이 축을 공유한다.
 *  4. 색은 hue 하나만 다르다. 명도(L)와 채도(C)는 global.css의 --cat-l / --cat-c로 고정돼
 *     있어서, 특정 범주만 눈에 튀는 일이 구조적으로 생기지 않는다.
 */

export const CATEGORY_IDS = ['models', 'build', 'industry', 'data', 'teaching'] as const;
export type CategoryId = (typeof CATEGORY_IDS)[number];

export interface Category {
  id: CategoryId;
  label: string;
  /** 범주 페이지 상단 한 줄. 목록만으로 성격이 안 잡힐 때만 읽히면 된다. */
  blurb: string;
  /** OKLCH hue. 명도·채도는 전역 고정값을 쓴다. */
  hue: number;
}

export const CATEGORIES: readonly Category[] = [
  { id: 'models', label: '모델', blurb: '모델의 구조와 성능, 그리고 그 성능을 재는 방법.', hue: 262 },
  { id: 'build', label: '구축', blurb: '파인튜닝, RAG, 에이전트 — 모델을 돌아가는 시스템으로 만드는 일.', hue: 150 },
  { id: 'industry', label: '산업', blurb: '모델을 만들어 내놓는 회사들과 그 발표.', hue: 42 },
  { id: 'data', label: '데이터', blurb: '학습과 평가에 쓰는 데이터, 그리고 결과를 읽는 방법.', hue: 318 },
  { id: 'teaching', label: '교육', blurb: '강의에서 다루는 내용과 입문용 정리.', hue: 205 },
] as const;

export interface Tag {
  label: string;
  category: CategoryId;
}

/**
 * 등록된 태그 목록. 여기 없는 태그를 글에 쓰면 빌드가 실패한다(src/content.config.ts).
 * 표시되는 구조물은 전부 이 표에서 나오므로, 새 주제를 쓰려면 먼저 여기에 자리를 만든다.
 */
export const TAGS = {
  // 모델
  llm: { label: 'LLM', category: 'models' },
  evaluation: { label: '평가', category: 'models' },
  benchmark: { label: '벤치마크', category: 'models' },
  'open-model': { label: '오픈 모델', category: 'models' },
  solar: { label: 'Solar', category: 'models' },
  gpt: { label: 'GPT', category: 'models' },
  multimodal: { label: '멀티모달', category: 'models' },

  // 구축
  rag: { label: 'RAG', category: 'build' },
  agent: { label: '에이전트', category: 'build' },
  'fine-tuning': { label: '파인튜닝', category: 'build' },
  prompt: { label: '프롬프트', category: 'build' },
  api: { label: 'API', category: 'build' },

  // 산업
  news: { label: '뉴스', category: 'industry' },
  openai: { label: 'OpenAI', category: 'industry' },
  upstage: { label: '업스테이지', category: 'industry' },
  huggingface: { label: '허깅페이스', category: 'industry' },
  policy: { label: '정책', category: 'industry' },

  // 데이터
  analysis: { label: '데이터 분석', category: 'data' },
  visualization: { label: '시각화', category: 'data' },
  dataset: { label: '데이터셋', category: 'data' },

  // 교육
  lecture: { label: '강의', category: 'teaching' },
  'getting-started': { label: '입문', category: 'teaching' },
} as const satisfies Record<string, Tag>;

export type TagId = keyof typeof TAGS;

export const TAG_IDS = Object.keys(TAGS) as [TagId, ...TagId[]];

const CATEGORY_BY_ID = new Map(CATEGORIES.map((c) => [c.id, c]));

export function getCategory(id: CategoryId): Category {
  const category = CATEGORY_BY_ID.get(id);
  if (!category) throw new Error(`Unknown category: ${id}`);
  return category;
}

export function getTag(id: TagId): Tag {
  return TAGS[id];
}

export function tagCategory(id: TagId): Category {
  return getCategory(TAGS[id].category);
}

/** 태그 하나에 대응하는 CSS 색. hue만 바뀌고 명도·채도는 전역 토큰을 그대로 쓴다. */
export function categoryColorVar(id: CategoryId): string {
  return `var(--cat-${id})`;
}
