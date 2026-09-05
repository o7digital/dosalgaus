import Head from 'next/head';
import HeroSlider from '../../components/home-uomo/HeroSlider';
import ShopPage from '../shop';

export default function HomeEn() {
  return (
    <>
      <Head>
        <title>Dosalga USA - Products for Everyday Life</title>
        <meta name="description" content="Shop practical products for everyday life at Dosalga USA, with clear information and convenient online ordering." />
        <link rel="canonical" href="https://www.dosalga.store/en" />
        <link rel="alternate" hrefLang="en" href="https://www.dosalga.store/en" />
        <link rel="alternate" hrefLang="es" href="https://www.dosalga.store/" />
        <link rel="alternate" hrefLang="x-default" href="https://www.dosalga.store/en" />
        <meta property="og:locale" content="en_US" />
      </Head>
      <HeroSlider />
      <ShopPage />
    </>
  );
}
