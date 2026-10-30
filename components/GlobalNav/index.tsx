'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './GlobalNav.module.scss';

export default function GlobalNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* ハンバーガーボタン */}
      <button
        className={styles.hamburger}
        onClick={toggleMenu}
        aria-label="メニューを開く"
        aria-expanded={isOpen}
      >
        <span className={styles.hamburger__line}></span>
        <span className={styles.hamburger__line}></span>
      </button>

      {/* ナビゲーションメニュー */}
      <nav className={`${styles.nav} ${isOpen ? styles.nav__open : ''}`}>
        <Link 
          className={styles.nav__link} 
          href="/news"
          onClick={closeMenu}
        >
          新着投稿
        </Link>
        <Link 
          className={styles.nav__link} 
          href="/#cv"
          onClick={closeMenu}
        >
          ご相談はこちら
        </Link>
      </nav>

      {/* オーバーレイ（モバイル用） */}
      {isOpen && (
        <div 
          className={styles.overlay}
          onClick={closeMenu}
        />
      )}
    </>
  );
}
