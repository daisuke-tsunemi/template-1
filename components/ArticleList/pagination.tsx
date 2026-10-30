// components/Pagination.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import styles from './pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath?: string;
};

export default function Pagination({ 
  currentPage, 
  totalPages,
  basePath = '/news'
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${basePath}?${params.toString()}`);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className={styles.pagination}>
      {/* ページ番号 */}
      <ul className={styles.pagination__list}>
        <li>
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)} className={styles.pagination__listBtn}>
            前へ
          </button>
        )}
        </li>
        {pages.map((page) => (
          <li key={page}>
            {page === currentPage ? (
              <span className={styles.pagination__listCurrent}>{page}</span>
            ) : (
              <button onClick={() => handlePageChange(page)} className={styles.pagination__listBtn}>
                {page}
              </button>
            )}
          </li>
        ))}
        <li>
        {currentPage < totalPages && (
          <button onClick={() => handlePageChange(currentPage + 1)} className={styles.pagination__listBtn}>
            次へ
          </button>
        )}
        </li>
      </ul>
    </nav>
  );
}