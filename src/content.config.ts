import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

import { TAG_IDS } from './data/taxonomy';

/**
 * 스키마가 곧 계약이다. 필드가 빠지거나 등록되지 않은 태그를 쓰면 빌드가 실패한다.
 * 화면에 나오는 날짜·요약·태그·범주는 전부 여기서 검증된 값에서만 생성된다.
 */
const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().min(1).max(90),
    /** 아카이브 한 줄 요약. 목록의 밀도를 지키기 위해 길이를 강제한다. */
    summary: z.string().min(10).max(110),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    /** taxonomy.ts에 등록된 태그만 허용한다. 오타가 조용히 통과하지 않는다. */
    tags: z.array(z.enum(TAG_IDS)).min(1).max(8),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
