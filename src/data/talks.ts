import type { CategoryId } from './taxonomy';

/**
 * 출연과 공개 자료. 글·강의와 같은 범주 축을 공유한다.
 *
 * 전부 남이 여는 자리에 나간 기록이다. 운영하는 채널이 아니므로 채널 주소는 두지 않고,
 * 각 항목에서 실제로 볼 수 있는 것(영상 또는 자료)만 연결한다.
 * venue는 어디에 나갔는지를 적는 평문이다. 링크가 아니다.
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

export const TALKS: Talk[] = [
  {
    title: 'Moonshot AI Kimi K3 모델 리뷰',
    venue: '유튜브 SudoRemove',
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
    venue: '유튜브 SudoRemove',
    date: '2026.08',
    category: 'context',
    href: 'https://www.youtube.com/watch?v=lokHQ8_b5Rk',
    slides: {
      label: '발표자료',
      href: 'https://bustling-pea-9a9.notion.site/3b093e636af1801f84c8f97785a7704b',
    },
  },
  {
    title: 'DeepSeek Engram 페이퍼 리뷰',
    venue: '유튜브 SudoRemove',
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
    venue: '유튜브 SudoRemove',
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
    venue: '유튜브 SudoRemove',
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
    venue: '유튜브 테디노트',
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
    category: 'tuning',
    href: 'https://fastcampus.co.kr/sem_mat_06',
  },
];

/** 최신순. 배열에 손으로 끼워 넣어도 순서가 흐트러지지 않는다. */
export const TALKS_BY_DATE: Talk[] = [...TALKS].sort((a, b) => b.date.localeCompare(a.date));
