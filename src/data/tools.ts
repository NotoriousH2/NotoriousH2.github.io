/**
 * 직접 만들어 공개한 도구.
 *
 * 글의 범주 축은 쓰지 않는다. 도구를 가르는 실제 축은 주제가 아니라 '어떤 형태로
 * 쓰는가'(웹인지, 확장인지, 라이브러리인지)이고, 그건 kind에 들어간다.
 */
export interface Tool {
  name: string;
  /** 웹 / 크롬 확장 / 플러그인 / 라이브러리 — 모노스페이스로 표시된다. */
  kind: string;
  summary: string;
  href: string;
  /** 바로 쓸 수 있는 주소와 소스가 다를 때만. */
  repo?: string;
}

export const TOOLS: Tool[] = [
  {
    name: 'LLM Token Counter',
    kind: '웹',
    summary: '텍스트나 파일(PDF·DOCX·TXT·MD)의 토큰 수를 GPT, Claude, Gemini, Hugging Face 모델별로 셉니다.',
    href: 'https://notolab.64bit.kr/tokenizer/',
    repo: 'https://github.com/NotoriousH2/llm_token_counter',
  },
  {
    name: 'LLM Prob Visualizer',
    kind: '웹',
    summary: 'Hugging Face 모델이 다음 토큰에 매기는 확률 분포를 토큰 단위로 보여 줍니다.',
    href: 'https://github.com/NotoriousH2/llm-prob-visualizer',
  },
  {
    name: 'LLM Token Visualizer',
    kind: '웹',
    summary: '문장이 토크나이저에서 어떻게 쪼개지는지 보여 줍니다.',
    href: 'https://github.com/NotoriousH2/llm_token_visualizer',
  },
  {
    name: 'ArXiv PDF Renamer',
    kind: '크롬 확장',
    summary: 'arXiv 논문을 2501.12345.pdf 대신 실제 제목으로 저장합니다.',
    href: 'https://github.com/NotoriousH2/arxiv-pdf-renamer',
  },
  {
    name: 'fluent-korean',
    kind: '플러그인',
    summary: 'Claude Code가 번역투 없는 한국어를 쓰게 만드는 output-style 플러그인입니다.',
    href: 'https://github.com/NotoriousH2/fluent-korean',
  },
];
