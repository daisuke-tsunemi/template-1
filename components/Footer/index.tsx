import styles from './index.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footer__inner} ${'flex align-center u-gap24 wrap'}`}>
        <Link href='https://www.instagram.com/tsunemiiiiiii/' target='_blank'>
          <Image src='/icon/sns/instagram.webp' alt="instagramアイコン" width="40" height="40" />
        </Link>
        <nav className={`${styles.nav} ${''}`}>
          <Link 
            className={`${styles.nav__link} ${'weight__700'}`}
            href="/news"
          >
            新着投稿
          </Link>
          <Link 
            className={`${styles.nav__link} ${'weight__700'}`}
            href="/#cv"
          >
            ご相談はこちら
          </Link>
        </nav>
        <p className={`${styles.cr} ${'u-right'}`}>©2026 サイト名 All Rights Reserved.</p>
      </div>
    </footer>
  );
}
