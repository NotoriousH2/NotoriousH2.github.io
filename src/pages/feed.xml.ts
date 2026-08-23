import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

import { SITE } from '../consts';
import { getPosts, postPath } from '../lib/posts';

// Jekyll 시절부터 쓰던 /feed.xml 주소를 그대로 유지한다.
export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: post.data.pubDate,
      link: postPath(post),
      categories: [...post.data.tags],
    })),
    customData: `<language>ko-kr</language>`,
  });
}
