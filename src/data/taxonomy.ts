/**
 * 사이트 전체의 정보 구조.
 *
 * 규칙
 *  1. 범주는 다섯 개를 넘기지 않는다.
 *  2. 한 태그는 정확히 한 범주에만 속한다. 겹치는 주제는 다중 소속 대신 태그를 쪼개서 푼다.
 *  3. 내비게이션·아카이브 필터·지식 그래프·강의 소개가 전부 이 축을 공유한다.
 *  4. 색은 hue 하나만 다르다. 명도(L)와 채도(C)는 global.css의 --cat-l / --cat-c로 고정돼
 *     있어서, 특정 범주만 눈에 튀는 일이 구조적으로 생기지 않는다.
 *
 * 축을 이렇게 가른 이유
 *  모델을 원하는 대로 움직이게 만드는 방법은 크게 둘로 갈린다. 가중치를 건드리거나
 *  (tuning), 입력을 건드리거나(context). 강의 커리큘럼도 이 선을 따라 나뉘어 있다.
 *  거기에 대상인 모델 자체(models), 결과를 재고 굴리는 일(ops), 모델을 내놓는
 *  바깥 세계(industry)를 더해 다섯이 된다.
 */

export const CATEGORY_IDS = ['models', 'tuning', 'context', 'ops', 'industry'] as const;
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
  { id: 'models', label: '모델', blurb: '모델의 구조와 성능', hue: 262 },
  { id: 'tuning', label: '파인튜닝', blurb: '가중치를 바꾸는 학습', hue: 150 },
  { id: 'context', label: '컨텍스트', blurb: '학습 대신 입력을 설계하는 방법', hue: 318 },
  { id: 'ops', label: '평가·운영', blurb: '성능 측정, 서빙, 비용', hue: 205 },
  { id: 'industry', label: '산업', blurb: '모델을 내놓는 회사와 발표', hue: 42 },
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
  // 모델 — 무엇을 다루는가
  llm: { label: 'LLM', category: 'models' },
  'open-model': { label: '오픈 모델', category: 'models' },
  reasoning: { label: '추론 모델', category: 'models' },
  moe: { label: 'MoE', category: 'models' },
  'long-context': { label: '롱 컨텍스트', category: 'models' },
  multimodal: { label: '멀티모달', category: 'models' },
  solar: { label: 'Solar', category: 'models' },
  gpt: { label: 'GPT', category: 'models' },

  // 파인튜닝 — 가중치를 건드린다
  'fine-tuning': { label: '파인튜닝', category: 'tuning' },
  cpt: { label: 'CPT', category: 'tuning' },
  sft: { label: 'SFT', category: 'tuning' },
  peft: { label: 'PEFT', category: 'tuning' },
  lora: { label: 'LoRA', category: 'tuning' },
  dpo: { label: 'DPO', category: 'tuning' },
  grpo: { label: 'GRPO', category: 'tuning' },
  'synthetic-data': { label: '합성 데이터', category: 'tuning' },
  sllm: { label: 'sLLM', category: 'tuning' },

  // 컨텍스트 — 입력을 건드린다
  rag: { label: 'RAG', category: 'context' },
  agent: { label: '에이전트', category: 'context' },
  langgraph: { label: 'LangGraph', category: 'context' },
  mcp: { label: 'MCP', category: 'context' },
  memory: { label: '메모리', category: 'context' },
  skills: { label: '스킬', category: 'context' },
  prompt: { label: '프롬프트', category: 'context' },
  'tool-calling': { label: '툴 콜링', category: 'context' },

  // 평가·운영 — 재고 굴린다
  evaluation: { label: '평가', category: 'ops' },
  benchmark: { label: '벤치마크', category: 'ops' },
  serving: { label: '서빙', category: 'ops' },
  vllm: { label: 'vLLM', category: 'ops' },
  tracing: { label: '트레이싱', category: 'ops' },
  cost: { label: '비용', category: 'ops' },

  // 산업 — 바깥에서 벌어지는 일
  news: { label: '뉴스', category: 'industry' },
  openai: { label: 'OpenAI', category: 'industry' },
  upstage: { label: '업스테이지', category: 'industry' },
  huggingface: { label: '허깅페이스', category: 'industry' },
  policy: { label: '정책', category: 'industry' },
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
