export const SITE = {
  url: 'https://notorioush2.github.io',
  title: 'NotoLab',
  /** 브라우저 탭·OG에 쓰는 한 줄 정의. 세 문단 소개는 홈에서 따로 다룬다. */
  description: '노토랩 변형호. 기업과 연구소에서 LLM 파인튜닝, AI 에이전트, RAG를 강의하고 자문합니다.',
  author: '변형호 (Hyungho Byun)',
  authorEn: 'Hyungho Byun',
  org: 'NotoLAB',
  locale: 'ko-KR',
  lang: 'ko',
} as const;

/** 헤더·푸터에 나가는 외부 링크. 늘리기보다 줄이는 쪽으로 유지한다. */
export const LINKS = [
  { label: 'YouTube', href: 'https://www.youtube.com/@sudoremove' },
  { label: 'GitHub', href: 'https://github.com/NotoriousH2' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hyungho-byun-6b2588224/' },
  { label: 'RSS', href: '/feed.xml' },
] as const;

/** 소개 페이지의 연락 표. 강의·자문 문의는 업무용 주소로 받는다. */
export const CONTACT = [
  { label: 'Email', text: 'notolab.ceo@gmail.com', href: 'mailto:notolab.ceo@gmail.com' },
  { label: 'YouTube', text: '@sudoremove', href: 'https://www.youtube.com/@sudoremove' },
  { label: 'LinkedIn', text: 'hyungho-byun', href: 'https://www.linkedin.com/in/hyungho-byun-6b2588224/' },
  { label: 'GitHub', text: 'NotoriousH2', href: 'https://github.com/NotoriousH2' },
  { label: 'RSS', text: '/feed.xml', href: '/feed.xml' },
] as const;

/** 홈에 노출할 최신 글 개수. 목록이 짧아도 레이아웃이 무너지지 않도록 상한만 둔다. */
export const HOME_POST_LIMIT = 12;
