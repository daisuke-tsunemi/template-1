// app/news/page.tsx
import { cacheLife, cacheTag } from 'next/cache';
import { client } from '@/libs/microcms';
import type { Post } from '@/components/ArticleList';
import NewsBody from '@/components/ArticleList/NewsBody';
import pageStyles from '../pages.module.scss'
import { LIMIT } from '@/constants';

async function getBlogPosts(page: number = 1) {
  'use cache';
  cacheLife('daily');
  cacheTag('microcms-news');
  const offset = (page - 1) * LIMIT;

  const data = await client.get({
    endpoint: 'news',
    queries: {
      fields: 'id,eyecatch,title,publishedAt,category.id,category.name',
    },
  });

  return {
    contents: data.contents as Post[],
    totalCount: data.totalCount,
  };
}

export default async function News() {
  const { contents: posts } = await getBlogPosts(1);

  return (
    <section className={`${pageStyles.page} ${'p-section'}`}>
      <div className={`${'container'}`}>
        <div className={`${pageStyles.heading} ${'p-section__head'}`}>
          <h1 className={`${pageStyles.heading__title__h1} ${'weight__200'}`}>
            <span>News</span>
          </h1>
          <h2 className={pageStyles.heading__title__h2}>
            <span>新着情報一覧</span>
          </h2>
        </div>
        <div className={`${pageStyles.page__content} ${'p-section__body'}`}>
          <NewsBody posts={posts} />
        </div>
      </div>
    </section>
  );
}