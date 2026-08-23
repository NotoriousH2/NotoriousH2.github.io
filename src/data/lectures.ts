import type { CategoryId } from './taxonomy';

/**
 * 강의. 아카이브·주제 지도와 같은 범주 축을 공유한다.
 *
 * 여기 담는 것은 **누구나 수강 신청할 수 있는 공개 과정**뿐이다.
 * 기업 인하우스 교육은 링크할 대상이 없으므로 아래 CORPORATE에 기관명만 남긴다.
 * 배열이 비면 소개 페이지에서 해당 절 자체가 렌더링되지 않는다.
 */
export interface Lecture {
  title: string;
  provider: string;
  /** 오프라인 / 이러닝 / 온라인 — 수강 방식. 모노스페이스로 표시된다. */
  format: string;
  year: number;
  category: CategoryId;
  href: string;
  /** 실습 저장소처럼 곁들일 링크가 있을 때만. */
  extra?: { label: string; href: string };
}

export const LECTURES: Lecture[] = [
  {
    title: '1Day 생성형 AI와 LLM의 이해',
    provider: '멀티캠퍼스',
    format: '오프라인',
    year: 2026,
    category: 'models',
    href: 'https://m.multicampus.com/course/crsDetail?corsCd=FA01KS',
  },
  {
    title: 'LLM 파인튜닝 마스터: 생성형 AI 기초부터 SFT, PEFT까지',
    provider: '멀티캠퍼스',
    format: '오프라인',
    year: 2026,
    category: 'tuning',
    href: 'https://m.multicampus.com/course/crsDetail?corsCd=FA01KP',
  },
  {
    title: 'LLM 파인튜닝 마스터: sLLM 기반의 어플리케이션 만들기',
    provider: '멀티캠퍼스',
    format: '오프라인',
    year: 2026,
    category: 'tuning',
    href: 'https://m.multicampus.com/course/crsDetail?corsCd=FA01KQ',
  },
  {
    title: 'LLM 파인튜닝 마스터: 주요 예제로 배우는 LLM 응용 기술',
    provider: '멀티캠퍼스',
    format: '오프라인',
    year: 2026,
    category: 'tuning',
    href: 'https://m.multicampus.com/course/crsDetail?corsCd=FA01KR',
  },
  {
    title: 'LLM 마스터: LangGraph와 MCP로 AI Agent 개발하기',
    provider: '멀티캠퍼스',
    format: '오프라인',
    year: 2026,
    category: 'context',
    href: 'https://m.multicampus.com/course/crsDetail?corsCd=FA01KW',
  },
  {
    title: 'LLM과 LangChain을 이용한 RAG 어플리케이션 개발',
    provider: '멀티캠퍼스',
    format: '이러닝',
    year: 2025,
    category: 'context',
    href: 'https://www.multicampus.com/em/enrolment/courseDetai?p_menu=NzUjU1VC&p_gubun=Qw==&dxLanYn=N&corsCd=EA0DH1&corsYr=2020&corsDgrCd=10001',
  },
  {
    title: 'LLM 파인 튜닝과 PEFT',
    provider: '멀티캠퍼스',
    format: '이러닝',
    year: 2025,
    category: 'tuning',
    href: 'https://www.multicampus.com/em/enrolment/courseDetai?p_menu=NzUjU1VC&p_gubun=Qw==&dxLanYn=N&corsCd=EA0DH2&corsYr=2020&corsDgrCd=10001',
  },
  {
    title: 'LLM 파인 튜닝과 sLLM 만들기',
    provider: '멀티캠퍼스',
    format: '이러닝',
    year: 2025,
    category: 'tuning',
    href: 'https://www.multicampus.com/em/enrolment/courseDetai?p_menu=NzUjU1VC&p_gubun=Qw==&dxLanYn=N&corsCd=EA0DH3&corsYr=2020&corsDgrCd=10001',
  },
  {
    title: '랭그래프로 한번에 완성하는 복잡한 RAG와 Agent',
    provider: '패스트캠퍼스',
    format: '온라인',
    year: 2025,
    category: 'context',
    href: 'https://fastcampus.co.kr/data_online_langgraph',
    extra: { label: '실습 저장소', href: 'https://github.com/NotoriousH2/fastcampus_langgraph' },
  },
];

/**
 * 기업·기관 인하우스 교육 이력. 공개 수강 링크가 없으므로 기관명만 남긴다.
 * 최근 연도부터.
 */
export interface CorporateYear {
  year: number;
  orgs: string[];
}

export const CORPORATE: CorporateYear[] = [
  {
    year: 2026,
    orgs: [
      '삼성SDS',
      '삼성전자–서울대 AI Expert',
      '현대모비스',
      'LG EXAONE',
      'LG CNS',
      'SK그룹',
      '신한라이프',
    ],
  },
  {
    year: 2025,
    orgs: [
      'LG AI Research',
      '현대자동차그룹 연구소',
      '삼성SDS',
      '삼성전자',
      '신한금융그룹',
      '새마을금고중앙회',
      '포항산업과학연구원(RIST)',
    ],
  },
  {
    year: 2024,
    orgs: [
      '국가보안기술연구소',
      'KT AI 연구소',
      '한전KDN',
      'SK텔레콤',
      '신한금융투자',
      'GS그룹',
      '삼성전자',
      'HL그룹',
      '신세계디에프',
      '한국앤컴퍼니',
      '현대엘리베이터',
      '아주대학교',
    ],
  },
  {
    year: 2023,
    orgs: ['HD현대', '삼성전자', '과학기술정보통신부–정보통신산업진흥원'],
  },
];
