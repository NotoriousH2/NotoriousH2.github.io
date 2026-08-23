import type { CategoryId, TagId } from './taxonomy';

/**
 * 출연과 공개 자료. 글·강의와 같은 범주 축을 공유한다.
 *
 * 전부 남이 여는 자리에 나간 기록이다. 운영하는 채널이 아니므로 채널 주소는 두지 않고,
 * 각 항목에서 실제로 볼 수 있는 것만 연결한다.
 * venue는 어디에 나갔는지를 적는 평문이다. 링크가 아니다.
 */
export interface Talk {
  title: string;
  venue: string;
  /** YYYY.MM 또는 YYYY. 모노스페이스로 표시된다. */
  date: string;
  category: CategoryId;
  /**
   * 미디어 목록에는 나오지 않는다. 태그별 목록과 주제 지도에서 글과 함께 묶이기 위한
   * 것이다. taxonomy.ts에 등록된 태그만 쓸 수 있고 오타는 타입 검사에서 걸린다.
   */
  tags: TagId[];
  /** 유튜브 영상. 있으면 제목과 썸네일이 여기로 연결된다. */
  video?: string;
  /** 발표 자료나 행사 페이지. 영상이 없으면 이쪽이 유일한 목적지다. */
  material?: { label: string; href: string };
  /**
   * 지금 다시 보면 달라진 점. 발표 시점과 읽는 시점 사이의 간극을 메운다.
   *
   * asOf를 함께 적는 이유: 이 코멘트도 결국 낡는다. 언제 쓴 판단인지 남겨 두지 않으면
   * 원본과 똑같은 문제가 반복된다.
   */
  note?: { asOf: string; text: string };
}

export const TALKS: Talk[] = [
  {
    title: 'Moonshot AI Kimi K3 모델 리뷰',
    venue: '유튜브 SudoRemove',
    date: '2026.08',
    category: 'models',
    tags: ['llm', 'moe', 'open-model'],
    video: 'https://www.youtube.com/watch?v=njM0LT4s6_0',
    material: {
      label: '발표자료',
      href: 'https://drive.google.com/file/d/1WcWrXhhdhPteDfdHyAOJzqZm-YzFiDlO/view',
    },
  },
  {
    title: '하네스 · 루프 · 그래프 엔지니어링, 순서대로 이해하기',
    venue: '유튜브 SudoRemove',
    date: '2026.08',
    category: 'context',
    tags: ['agent', 'prompt'],
    video: 'https://www.youtube.com/watch?v=lokHQ8_b5Rk',
    material: {
      label: '발표자료',
      href: 'https://bustling-pea-9a9.notion.site/3b093e636af1801f84c8f97785a7704b',
    },
  },
  {
    title: 'DeepSeek Engram 페이퍼 리뷰',
    venue: '유튜브 SudoRemove',
    date: '2026.01',
    category: 'models',
    tags: ['llm', 'open-model'],
    video: 'https://www.youtube.com/watch?v=Xr6oLkClF6w',
    material: {
      label: '텍스트 버전',
      href: 'https://www.linkedin.com/feed/update/urn:li:activity:7416984900010090496/',
    },
  },
  {
    title: 'Agent를 위한 Fine Tuning',
    venue: 'InstructKR 밋업',
    date: '2025.12',
    category: 'tuning',
    tags: ['fine-tuning', 'agent'],
    material: {
      label: '발표자료',
      href: 'https://drive.google.com/file/d/12uSBxT0L1Hz7ulJwYiIF8W0p4as78xk5/view?usp=sharing',
    },
  },
  {
    title: 'Mixture of Experts',
    venue: '유튜브 SudoRemove',
    date: '2025',
    category: 'models',
    tags: ['moe', 'llm'],
    video: 'https://www.youtube.com/watch?v=qpHgHcWxB5I',
    material: {
      label: '발표자료',
      href: 'https://bustling-pea-9a9.notion.site/Mixture-of-Experts-MoE-28193e636af1809ca756cbacea186bf6',
    },
  },
  {
    title: 'Long-Context Attention과 Qwen-3-Next',
    venue: '유튜브 SudoRemove',
    date: '2025',
    category: 'models',
    tags: ['long-context', 'moe', 'llm'],
    video: 'https://www.youtube.com/watch?v=Vu5n6mFMsDQ',
    material: {
      label: '발표자료',
      href: 'https://bustling-pea-9a9.notion.site/Attention-Long-Context-DeltaNet-Mamba2-Qwen-3-Next-28493e636af18003a88ddc39d37cf110',
    },
  },
  {
    title: 'LLM의 새로운 전환점, Reasoning 모델 이해하기 (Feat. DeepSeek R1)',
    venue: '유튜브 테디노트',
    date: '2025',
    category: 'models',
    tags: ['reasoning', 'llm', 'open-model'],
    video: 'https://www.youtube.com/watch?v=Z-ELkZ_azYM',
    material: {
      label: '강의자료',
      href: 'https://drive.google.com/file/d/1gQDdRkjhrHiEA27eOPPiW6nXzpa3-Hh4/view?usp=sharing',
    },
  },
  {
    title: 'LLM 최신 모델 동향: 추론과 멀티모달',
    venue: '국가보안기술연구소 초청 세미나',
    date: '2025',
    category: 'models',
    tags: ['reasoning', 'multimodal', 'llm'],
    material: {
      label: '발표자료',
      href: 'https://drive.google.com/file/d/127f-7tZgekg0czfEz5kHOnc717JVjyp1/view?usp=sharing',
    },
  },
  {
    title: 'LLM 개발과 파인 튜닝',
    venue: '패스트캠퍼스 × 경기도 판교 일할맛 세미나',
    date: '2025',
    category: 'tuning',
    tags: ['fine-tuning', 'llm'],
    material: { label: '행사 페이지', href: 'https://fastcampus.co.kr/sem_mat_06' },
  },
];

/** 최신순. 배열에 손으로 끼워 넣어도 순서가 흐트러지지 않는다. */
export const TALKS_BY_DATE: Talk[] = [...TALKS].sort((a, b) => b.date.localeCompare(a.date));

/** 유튜브 주소에서 영상 id를 뽑는다. 썸네일 주소를 만들 때만 쓴다. */
export function youtubeId(url: string): string | null {
  return url.match(/[?&]v=([\w-]{6,})/)?.[1] ?? null;
}

/** 목록용 썸네일(320×180). 별도 데이터 없이 영상 주소에서 만든다. */
export function thumbnailFor(talk: Talk): string | null {
  const id = talk.video ? youtubeId(talk.video) : null;
  return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : null;
}
