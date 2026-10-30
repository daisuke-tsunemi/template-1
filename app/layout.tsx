import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';
import styles from './layout.module.scss';
import { Suspense } from 'react';
import { Metadata } from 'next';
import GoogleTagManager from '@/components/Google/GoogleTagManager';
import GoogleAnalytics from '@/components/Google/GoogleAnalytics';
import Pointer from '@/components/Pointer';
import ScrollTop from '@/components/ScrollTop';
import SvgDefs from '@/components/SvgDefs';
import { montserrat, zenKaku } from '@/libs/fonts';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'https://inner-communication.vercel.app'),
  robots: 'noindex, nofollow',
  title: {
    template: '%s | AtoC-ITラボ',
    default: 'AtoC-ITラボ | 世代を超えて学ぶパソコン・プログラミングスクール',
  },
  description:
    'AtoC-ITラボは、9歳のお子様から80歳のシニアまで通える地域のパソコン・プログラミングスクールです。Scratchを使ったキッズプログラミングから、大人のエクセル・ワード基礎、シニア向けの個別学習まで、あなたの「やりたい」を全力でサポートします。',
  keywords: 'パソコン教室,プログラミングスクール,Scratch,子供,シニア,初心者,AtoC-ITラボ',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: {
      template: '%s | AtoC-ITラボ',
      default: 'AtoC-ITラボ | 世代を超えて学ぶパソコン・プログラミングスクール',
    },
    description:
      'AtoC-ITラボは、9歳から80歳まで通える地域のパソコン教室です。キッズプログラミングから大人の個別学習まで、あなたの「やりたい」を叶えます。',
    images: ['/ogp.jpg'],
    type: 'website',
    url: '/',
    locale: 'ja_JP',
    siteName: 'AtoC-ITラボ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AtoC-ITラボ | 世代を超えて学ぶパソコン・プログラミングスクール',
    description:
      'AtoC-ITラボは、9歳から80歳まで通える地域のパソコン教室です。キッズプログラミングから大人の個別学習まで、あなたの「やりたい」を叶えます。',
    images: ['/twitter-image.jpg'],
  },
  alternates: {
    canonical: '/',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
  return (
    <html lang="ja" className={`${montserrat.variable} ${zenKaku.variable}`} data-scroll-behavior="smooth">
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <body>
        {/* GTM NoScriptタグ */}
        {GTM_ID && (
          <>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              />
            </noscript>
            <Suspense fallback={null}>
              <GoogleTagManager GTM_ID={GTM_ID} />
            </Suspense>
          </>
        )}
        {/* Google Analytics 4 を直接実装 */}
        {GA_MEASUREMENT_ID && (
          <Suspense fallback={null}>
            <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />
          </Suspense>
        )}
        <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
          <SvgDefs />
          <Pointer />
          <Header />
          <main className={styles.main}>{children}</main>
          <ScrollTop />
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
