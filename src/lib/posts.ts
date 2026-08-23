import { getCollection, type CollectionEntry } from 'astro:content';

import { CATEGORIES, type CategoryId, type TagId, TAGS } from '../data/taxonomy';

export type Post = CollectionEntry<'posts'>;

/** 초안은 개발 중에만 보인다. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function postPath(post: Post): string {
  return `/posts/${post.id}`;
}

/** 글이 속한 범주는 태그에서 유도한다. 손으로 적지 않는다. */
export function postCategories(post: Post): CategoryId[] {
  const seen = new Set<CategoryId>();
  for (const tag of post.data.tags) seen.add(TAGS[tag as TagId].category);
  return CATEGORIES.filter((c) => seen.has(c.id)).map((c) => c.id);
}

export interface YearGroup {
  year: number;
  posts: Post[];
}

/** 아카이브용. 역시간 순으로 연도 묶음을 만든다. */
export function groupByYear(posts: Post[]): YearGroup[] {
  const groups = new Map<number, Post[]>();
  for (const post of posts) {
    const year = post.data.pubDate.getFullYear();
    const bucket = groups.get(year);
    if (bucket) bucket.push(post);
    else groups.set(year, [post]);
  }
  return [...groups.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, items]) => ({ year, posts: items }));
}

/** 실제로 글이 붙어 있는 태그만. 빈 태그 페이지를 만들지 않기 위해서다. */
export function tagUsage(posts: Post[]): Map<TagId, Post[]> {
  const usage = new Map<TagId, Post[]>();
  for (const post of posts) {
    for (const raw of post.data.tags) {
      const tag = raw as TagId;
      const bucket = usage.get(tag);
      if (bucket) bucket.push(post);
      else usage.set(tag, [post]);
    }
  }
  return usage;
}

export function categoryUsage(posts: Post[]): Map<CategoryId, Post[]> {
  const usage = new Map<CategoryId, Post[]>();
  for (const post of posts) {
    for (const category of postCategories(post)) {
      const bucket = usage.get(category);
      if (bucket) bucket.push(post);
      else usage.set(category, [post]);
    }
  }
  return usage;
}

export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

export function formatYearMonth(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${m}.${d}`;
}
