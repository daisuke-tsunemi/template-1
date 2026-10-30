import { Suspense } from 'react';
import { cacheLife, cacheTag } from 'next/cache';
import { client } from '@/libs/microcms';
import ArticleList, { type Post } from '@/components/ArticleList';
import Link from 'next/link';
import Image from 'next/image';
import styles from './home.module.scss';
import { HomeLIMIT } from '@/constants';

const PER_PAGE = HomeLIMIT; // 1ページあたりの表示件数

// microCMSからブログ記事を取得
async function getBlogPosts(page: number = 1) {
  'use cache';
  cacheLife('daily');
  cacheTag('microcms-news');
  const offset = (page - 1) * PER_PAGE;
  const data = await client.get({
    endpoint: 'news',
    queries: {
      fields: 'id,eyecatch,title,publishedAt,category.id,category.name',
      limit: PER_PAGE,
      offset: offset,
    },
  });
  return {
    contents: data.contents as Post[],
  };
}

type HomeProps = {
  searchParams: Promise<{ page?: string }>;
};

// searchParams（URLデータ）はSuspense内で読む
export default function Home({ searchParams }: HomeProps) {
  return (
    <Suspense fallback={null}>
      <HomeContent searchParams={searchParams} />
    </Suspense>
  );
}

async function HomeContent({ searchParams }: HomeProps) {
  const params = await searchParams; // awaitで取得
  const currentPage = Number(params.page) || 1;
  const { contents: posts } = await getBlogPosts(currentPage);
  return (
    <div className={`${styles.wrapper}`}>
      <section className={`${styles.hero}`}>
        <div>
          <div className={`${styles.hero__copy} u-center`}>
            <h1 className="u-mt24">
              <Image
                src="/img/common/logo/logo_simple.svg"
                alt="ロゴサンプル"
                className={styles.header__logo}
                width={200}
                height={48}
                priority
              />
            </h1>
            <h2 className={`${styles.hero__title} c-heading--3xl`}>
              <span className={`${styles.hero__titleReflect} color__white`}>習って、</span>
              <span className={`${styles.hero__titleReflect} color__white`}>知って、</span>
              <br className="off__md" />
              <span className={`${styles.hero__titleReflect} color__white`}>創り出す！</span>
            </h2>
            <h2 className={`${styles.hero__title} c-heading--3xl`}>
              <small className="color__primary">
                明日の自分が進歩する
                <br />
                パソコン教室
              </small>
            </h2>
            <h3 className="c-heading--lg color__70 u-mt24">
              世代を超えて「やりたい」を叶える。
              <br />
              学ぶだけで終わらせない、
              <br className="off__md" />
              人生の選択肢が増える
              <br />
              パソコン・インターネット
              <br className="off__md" />
              スクールです。
            </h3>
          </div>
        </div>
      </section>
      <section id="about" className={`${styles.about} p-section `}>
        <div className={`${styles.about__content} container__1080`}>
          <div className={styles.section__text}>
            <div className={`${styles.section__title} p-section__head`}>
              <h2 className={`c-heading--3xl`}>
                「わかった！」の
                <br className="off__sm" />
                笑顔が、原動力です。
              </h2>
            </div>
            <div className={`${styles.about__contentVertical} p-section__body`}>
              <div>
                <p className="text-lg weight__500 u-mb24">
                  私のスクールは、単なる操作の暗記ではなく、
                  <br className="on__md" />
                  9歳から80歳まで一人ひとりが
                  <br className="on__md" />
                  「やりたいこと」を形にするための場所です。
                  <br />
                  パソコンを「道具」として使いこなし、日常をより豊かに、
                  <br className="on__md" />
                  より楽しく、進歩していくお手伝いをしています。
                </p>
                <div className={`${styles.about__promise}`}>
                  <h3 className={`c-heading--xl color__primaryDark u-mb16`}>
                    大事にしている<strong className="c-heading--2xl">3</strong>つのこと
                  </h3>
                  <h4 className={`c-heading--lg flex align-center u-gap8`}>
                    <svg className={`icon fill__primaryDark`}>
                      <use href="#check_circle"></use>
                    </svg>
                    やりたいを形にする伴走者
                  </h4>
                  <p className={`text-lg weight__500 u-mb16`}>
                    決まった教科書をなぞるのではなく、あなたの好奇心や目的を一番大切にします。
                  </p>
                  <h4 className={`c-heading--lg flex align-center u-gap8`}>
                    <svg className={`icon fill__primaryDark`}>
                      <use href="#check_circle"></use>
                    </svg>
                    何度でも、笑顔で
                  </h4>
                  <p className={`text-lg weight__500 u-mb16`}>
                    「こんなこと聞いてもいいのかな？」という不安は不要。何度でも、寄り添ってサポートします。
                  </p>
                  <h4 className={`c-heading--lg flex align-center u-gap8`}>
                    <svg className={`icon fill__primaryDark`}>
                      <use href="#check_circle"></use>
                    </svg>
                    使う以上の価値を
                  </h4>
                  <p className={`text-lg weight__500`}>
                    プログラミングの論理的思考や、ネットリテラシーなど、一生モノの知恵も一緒にお伝えします。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="news" className={`${styles.news} p-section`}>
        <div className={`${styles.news__content} container`}>
          <div className={`${styles.section__title} p-section__head`}>
            <h2 className={`c-heading--4xl weight__500 u-center`}>
              <span>新着情報</span>
            </h2>
          </div>
          <div className={`${styles.news__list} p-section__body`}>
            <ArticleList posts={posts} />
          </div>
          <div className="p-section__foot flex align-center center">
            <Link href="/news" className="c-btn__line lg">
              新着情報一覧へ
            </Link>
          </div>
        </div>
      </section>
      <section id="feature" className={`${styles.feature} p-section`}>
        <div className={`${styles.feature__content} container`}>
          <div className={`${styles.section__title} ${styles.feature__head}  p-section__head`}>
            <h2 className={`c-heading--4xl weight__500`}>
              <span>サービスの機能・メリット</span>
            </h2>
            <p className="u-mt32 text-lg">
              下流の方は川はば一ぱい銀河が巨おおきく写ってまるで水のないそのままのそらのように見えました。ジョバンニはそのカムパネルラはもうあの銀河のはずれにしかいないというような気がしてしかたなかったのです。
            </p>
          </div>
          <div className={`${styles.feature__contentGrid} p-section__body`}>
            {[
              {
                src: '/img/home/service_kids.webp',
                title: (
                  <>
                    はじめてのプログラミング<small>（キッズ向け）</small>
                  </>
                ),
                copy: '「遊ぶ側」から「創る側」へ。好奇心が、論理的な思考を育てます！',
                link: 'https://culture.jeugia.co.jp/lesson_detail_36-41361.html',
                description:
                  'ゲームが大好きな子どもたちが、自らの手でプログラムを組み、キャラクターを動かす。「なぜ思い通りに動かないんだろう？」という試行錯誤の連続が、一生モノの論理的思考力を養います。パソコンの仕組みから安全な使い方まで、楽しみながらデジタルネイティブの基礎を身につけるコースです。',
              },
              {
                src: '/img/home/service_junior.webp',
                title: (
                  <>
                    子どものためのプログラミング<small>（ステップアップ）</small>
                  </>
                ),
                copy: '個性に合わせた学び。ゼロからイチを創り出す、自信をつける！',
                link: 'https://culture.jeugia.co.jp/lesson_detail_37-37098.html',
                description:
                  'レベルに合わせたきめ細やかな指導で、プログラミングの面白さを深掘りします。自分のアイディアが形になる喜びは、子どもたちの大きな自信に繋がります。「次はこんなゲームを作りたい！」という自発的な挑戦を、経験豊富な講師が全力でバックアップ。未来を切り拓く創造力を、ここから始めましょう。',
              },
              {
                src: '/img/home/service_kiso.webp',
                title: '基礎からのパソコン',
                copy: '初めてでも大丈夫！パソコンの基礎を学ぶと共にワードやエクセルも学びましょう！',
                link: 'https://culture.jeugia.co.jp/lesson_detail_36-41164.html',
                description:
                  '電源の入れ方やマウス操作、そして日常で役立つワード・エクセルまで。一つひとつ、階段を登るように丁寧にレクチャーします。「いまさら聞けない」なんてことはありません。基礎をしっかり固めることで、仕事の効率が上がり、趣味の幅がぐっと広がります。明日からのパソコンライフが、もっと楽しみになるはずです。',
              },
              {
                src: '/img/home/service_basic.webp',
                title: (
                  <>
                    パソコン基礎講座<small>（一般・初心者向け）</small>
                  </>
                ),
                copy: 'パソコンを有効活用してみましょう。基本設定方法、マウス、OSの基本操作から役立つ実践編までを学びます。',
                link: 'https://culture.jeugia.co.jp/lesson_detail_36-41164.html',
                description:
                  '電源の入れ方やマウス操作、そして日常で役立つワード・エクセルまで。一歩ずつ、階段を登るように丁寧にレクチャーします。「いまさら聞けない」なんてことはありません。基礎をしっかり固めることで、仕事の効率が上がり、趣味の幅がぐっと広がります。明日からのパソコンライフが、もっと楽しみになるはずです。',
              },
              {
                src: '/img/home/service_senior.webp',
                title: 'シニアのためのパソコン教室',
                copy: '生涯学習を、もっと能動的に。デジタルで、人生の新しい扉を開く。',
                link: 'https://culture.jeugia.co.jp/lesson_detail_37-27830.html',
                description:
                  '決まったカリキュラムはありません。あなたが「今、知りたいこと」を学ぶのが、この教室のスタイルです。指先と脳を動かし、新しい世界と繋がる。その喜びは人生をより鮮やかに彩ります。お孫さんとのやり取りやインターネット検索など、あなたの「やりたい」を叶えるための、優しく温かな学び場です。',
              },
            ].map((feature, index) => (
              <div key={index} className={`${styles.feature__contentItem}`}>
                <Image
                  src={feature.src}
                  alt="紹介イメージ"
                  className={styles.feature__contentImg}
                  width={320}
                  height={160}
                  loading="lazy"
                />
                <div className={`${styles.feature__contentText}`}>
                  <h3 className="c-heading--xl text-height--1 u-mb16">{feature.title}</h3>
                  <h4 className="color__primary">
                    <strong className="weight__900">{feature.copy}</strong>
                  </h4>
                  <p className="u-mt4">{feature.description}</p>
                  <div className="flex align-center center u-mt16">
                    <a href={feature.link} target="_blank" className="c-btn__line wide u-gap8">
                      詳細はこちら
                      <svg className={`icon__w16 fill__primaryDark`}>
                        <use href="#external_link"></use>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
