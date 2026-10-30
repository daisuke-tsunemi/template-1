import Link from 'next/link';
import Image from 'next/image';
import styles from './articleList.module.scss';
import type { Category } from '@/libs/types';

export type Post = {
  id: string;
  title: string;
  publishedAt?: string;
  eyecatch: {
    url: string;
    height?: number;
    width?: number;
  };
  category: Category;
};

type NewsListProps = {
  posts: Post[];
};

export default function NewsList({ posts }: NewsListProps) {
  return (
    <div className={`${styles.article__list} ${''}`}>
      {posts.map((post) => (
          <Link key={post.id} href={`/news/${post.id}`} className={`${styles.article__item} ${''}`}>
            {post.eyecatch ? (
              <picture>
                <source
                  type="image/webp"
                  media="(max-width: 640px)"
                  srcSet={`${post.eyecatch?.url}?fm=webp&w=414 1x, ${post.eyecatch?.url}?fm=webp&w=414&dpr=2 2x`}
                />
                <source
                  type="image/webp"
                  srcSet={`${post.eyecatch?.url}?fm=webp&fit=crop&w=240&h=126 1x, ${post.eyecatch?.url}?fm=webp&fit=crop&w=240&h=126&dpr=2 2x`}
                />
                <img
                  src={post.eyecatch?.url || `"/img/common/no-image.webp`}
                  alt=""
                  className={styles.list__image}
                  width={post.eyecatch?.width}
                  height={post.eyecatch?.height}
                />
              </picture>
            ) : (
              <Image
                className={styles.list__image}
                src="/img/common/noImage.webp"
                alt="No Image"
                width={200}
                height={100}
                loading="lazy"
              />
            )}
            <div className={`${styles.article__itemText} ${''}`}>
              <div className="flex align-center wrap u-gap16 u-mb8">
                {post.publishedAt && (
                  <time className={`${styles.time} ${'weight__700'}`}>{new Date(post.publishedAt).toLocaleDateString('ja-JP')}</time>
                )}
                <span className={`${styles.tag} ${'text-min weight__500'}`}>{post.category.name}</span>
              </div>
              <h3 className={`${styles.article__itemTitle} ${'c-heading--md'}`}>
                {post.title}
              </h3>
            </div>
          </Link>
      ))}
    </div>
  );
}