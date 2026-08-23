import type { CategoryId } from './taxonomy';

/**
 * 발표와 영상. 글·강의와 같은 범주 축을 공유한다.
 * 주 링크(href)는 볼 수 있는 것 — 영상이 있으면 영상, 없으면 자료.
 */
export interface Talk {
  title: string;
  venue: string;
  /** YYYY.MM 또는 YYYY. 모노스페이스로 표시된다. */
  date: string;
  category: CategoryId;
  href: string;
  /** 영상과 별개로 슬라이드가 있을 때만. */
  slides?: { label: string; href: string };
}

export const TALK_CHANNEL = {
  label: 'YouTube · SudoRemove',
  href: 'https://www.youtube.com/@sudoremove',
  blurb: '새 모델과 논문이 나오면 직접 읽고 정리해 올리는 채널.',
};

export const TALKS: Talk[] = [
  {
    title: 'Moonshot AI Kimi K3 모델 리뷰',
    venue: 'SudoRemove',
    date: '2026.08',
    category: 'models',
    href: 'https://www.youtube.com/watch?v=njM0LT4s6_0',
    slides: {
      label: '발표자료',
      href: 'https://drive.google.com/file/d/1WcWrXhhdhPteDfdHyAOJzqZm-YzFiDlO/view',
    },
  },
  {
    title: '하네스 · 루프 · 그래프 엔지니어링, 순서대로 이해하기',
    venue: 'SudoRemove',
    date: '2026.08',
    category: 'build',
    href: 'https://www.youtube.com/watch?v=lokHQ8_b5Rk',
    slides: {
      label: '발표자료',
      href: 'https://bustling-pea-9a9.notion.site/3b093e636af1801f84c8f97785a7704b',
    },
  },
  {
    title: 'DeepSeek Engram 페이퍼 리뷰',
    venue: 'SudoRemove',
    date: '2026.01',
    category: 'models',
    href: 'https://www.youtube.com/watch?v=Xr6oLkClF6w',
    slides: {
      label: '텍스트 버전',
      href: 'https://www.linkedin.com/feed/update/urn:li:activity:7416984900010090496/',
    },
  },
  {
    title: 'Mixture of Experts',
    venue: 'SudoRemove',
    date: '2025',
    category: 'models',
    href: 'https://www.youtube.com/watch?v=qpHgHcWxB5I',
    slides: {
      label: '발표자료',
      href: 'https://bustling-pea-9a9.notion.site/Mixture-of-Experts-MoE-28193e636af1809ca756cbacea186bf6',
    },
  },
  {
    title: 'Long-Context Attention과 Qwen-3-Next',
    venue: 'SudoRemove',
    date: '2025',
    category: 'models',
    href: 'https://www.youtube.com/watch?v=Vu5n6mFMsDQ',
    slides: {
      label: '발표자료',
      href: 'https://bustling-pea-9a9.notion.site/Attention-Long-Context-DeltaNet-Mamba2-Qwen-3-Next-28493e636af18003a88ddc39d37cf110',
    },
  },
  {
    title: 'LLM의 새로운 전환점, Reasoning 모델 이해하기 (Feat. DeepSeek R1)',
    venue: '테디노트 협업',
    date: '2025',
    category: 'models',
    href: 'https://www.youtube.com/watch?v=Z-ELkZ_azYM',
    slides: {
      label: '강의자료',
      href: 'https://drive.google.com/file/d/1gQDdRkjhrHiEA27eOPPiW6nXzpa3-Hh4/view?usp=sharing',
    },
  },
  {
    title: 'LLM 최신 모델 동향: 추론과 멀티모달',
    venue: '국가보안기술연구소 초청 세미나',
    date: '2025',
    category: 'models',
    href: 'https://drive.google.com/file/d/127f-7tZgekg0czfEz5kHOnc717JVjyp1/view?usp=sharing',
  },
  {
    title: 'LLM 개발과 파인 튜닝',
    venue: '패스트캠퍼스 × 경기도 판교 일할맛 세미나',
    date: '2025',
    category: 'build',
    href: 'https://fastcampus.co.kr/sem_mat_06',
  },
];
