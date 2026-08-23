// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import { SITE } from './src/consts.ts';

export default defineConfig({
  site: SITE.url,
  trailingSlash: 'ignore',

  // Jekyll 시절 permalink(/:year/:month/:title.html)는 public/ 아래 실제 .html 파일로
  // 남겨 두었다. Astro의 redirects는 `<경로>/index.html`을 만들기 때문에
  // 확장자로 끝나는 옛 주소에는 맞지 않는다.

  integrations: [sitemap()],

  markdown: {
    // 제목의 id는 Sätteri(Astro 7 기본 마크다운 프로세서)가 알아서 붙인다.
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: true,
    },
  },

  // 제목·데이터용 IBM Plex는 빌드 시점에 내려받아 자체 호스팅한다.
  // 본문용 Pretendard는 한글 동적 서브셋(약 300개 조각)이라 CDN 쪽이 실제 전송량이 훨씬 작다.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'IBM Plex Sans',
      cssVariable: '--font-display',
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Pretendard', 'system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-mono',
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['ui-monospace', 'SFMono-Regular', 'monospace'],
    },
  ],
});
