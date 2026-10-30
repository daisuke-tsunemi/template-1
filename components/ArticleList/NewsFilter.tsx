'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './search.module.scss';

export type NewsFilterCategory = {
  id: string;
  name: string;
};

type Props = {
  keyword: string;
  categoryId: string;
  categories: NewsFilterCategory[];
  onKeywordChange: (next: string) => void;
  onCategoryChange: (next: string) => void;
};

export default function NewsFilter({
  keyword,
  categoryId,
  categories,
  onKeywordChange,
  onCategoryChange,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateQuery = (next: { q?: string; category?: string }) => {
    const params = new URLSearchParams(searchParams.toString());
    const nextQ = next.q ?? keyword;
    const nextCategory = next.category ?? categoryId;

    if (nextQ) params.set('q', nextQ);
    else params.delete('q');

    if (nextCategory) params.set('category', nextCategory);
    else params.delete('category');

    // フィルタが変わったら1ページ目に戻す
    params.delete('page');
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex align-center wrap bottom u-gap8 u-mb32">
      <input
        type="search"
        name="q"
        className={styles.search}
        placeholder="タイトルのキーワードで検索"
        value={keyword}
        onChange={(e) => {
          const v = e.target.value;
          onKeywordChange(v);
          updateQuery({ q: v });
        }}
      />
      <fieldset className={`${styles.search__radio} ${'flex align-center wrap u-gap4'}`}>

        <label className="flex align-center u-gap4">
          <input
            type="radio"
            name="category"
            value=""
            checked={categoryId === ''}
            onChange={(e) => {
              const v = e.target.value;
              onCategoryChange(v);
              updateQuery({ category: v });
            }}
          />
          <span>すべてのカテゴリ</span>
        </label>

        {categories.map((c) => (
          <label key={c.id} className="flex align-center u-gap4">
            <input
              type="radio"
              name="category"
              value={c.id}
              checked={categoryId === c.id}
              onChange={(e) => {
                const v = e.target.value;
                onCategoryChange(v);
                updateQuery({ category: v });
              }}
            />
            <span>{c.name}</span>
          </label>
        ))}
      </fieldset>
    </div>
  );
}

