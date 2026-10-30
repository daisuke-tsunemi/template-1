import Image from 'next/image';
import Link from 'next/link';
import GlobalNav from '@/components/GlobalNav';
import styles from './index.module.scss';

export default function Header() {
  return (
    <header className={`${styles.header} flex items-center p-4 bg-olive-400`}>
      <Link href="/" className='u-mt8'>
        <Image
          src="/img/logo.svg"
          alt="ロゴ"
          className={styles.header__logo}
          width={58}
          height={18}
          priority
        />
      </Link>
      <GlobalNav />
    </header>
  );
}
