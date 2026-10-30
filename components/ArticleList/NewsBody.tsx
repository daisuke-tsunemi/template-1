'use client';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ArticleList, { Post } from '@/components/ArticleList';
import Pagination from './pagination';
import NewsFilter from './NewsFilter';
import { LIMIT } from '@/constants';

type Props = {
  posts: Post[];
};

export default function NewsBody({ posts }: Props) {
  const searchParams = useSearchParams();

  const qParam = searchParams.get('q') ?? '';
  const categoryParam = searchParams.get('category') ?? '';
  const pageParam = searchParams.get('page') ?? '1';

  const [keyword, setKeyword] = useState(qParam);
  const [categoryId, setCategoryId] = useState(categoryParam);
  const categories = useMemo(() => {
    const map = new Map<string, { id: string; name: string }>();
    for (const post of posts) {
      const id = post.category?.id;
      const name = post.category?.name;
      if (!id || !name) continue;
      map.set(id, { id, name });
    }
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name, 'ja'));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    return posts.filter((post) => {
      const hitKeyword = q ? (post.title ?? '').toLowerCase().includes(q) : true;
      const hitCategory = categoryId ? post.category?.id === categoryId : true;
      return hitKeyword && hitCategory;
    });
  }, [posts, keyword, categoryId]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / LIMIT));
  const currentPage = Math.min(Math.max(Number(pageParam) || 1, 1), totalPages);
  const offset = (currentPage - 1) * LIMIT;
  const pagePosts = filteredPosts.slice(offset, offset + LIMIT);
  return (
    <>
      <NewsFilter
        keyword={keyword}
        categoryId={categoryId}
        categories={categories}
        onKeywordChange={setKeyword}
        onCategoryChange={setCategoryId}
      />
      <ArticleList posts={pagePosts} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}


